"use client";

import {
  hierarchy,
  tree,
  type HierarchyPointLink,
  type HierarchyPointNode,
} from "d3-hierarchy";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  GitBranchPlus,
  Search,
  ZoomIn,
  ZoomOut,
  UserRound,
  Expand,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import { cn } from "@/lib/utils";
import type {
  EducationOrganizationMember,
  EducationOrganizationSection,
  EducationUnit,
} from "@/types/education";
import clsx from "clsx";

type OrganizationTreeNode =
  | {
    id: string;
    kind: "virtual-root";
    children: OrganizationTreeNode[];
  }
  | {
    id: string;
    kind: "root-member";
    member: EducationOrganizationMember;
    children: OrganizationTreeNode[];
  }
  | {
    id: string;
    kind: "root-tier";
    title: string;
    description: string;
    children: OrganizationTreeNode[];
  }
  | {
    id: string;
    kind: "tier";
    title: string;
    description?: string;
    memberCount: number;
    children: OrganizationTreeNode[];
  }
  | {
    id: string;
    kind: "row-group";
    children: OrganizationTreeNode[];
  }
  | {
    id: string;
    kind: "member";
    member: EducationOrganizationMember;
    children?: never;
  };

interface OrganizationChartTreeProps extends React.ComponentPropsWithoutRef<'div'> {
  unit: EducationUnit;
  organization: EducationOrganizationSection;
  fullscreen?: boolean;
  onClickFullScreen?: () => void
}

type OrganizationChartLineMode = "curve" | "orthogonal";

const LAYOUT_NODE_WIDTH = 288;
const LAYOUT_LEVEL_HEIGHT = 300;
const LAYOUT_CHILD_ROW_HORIZONTAL_STEP = 252;
const LAYOUT_WRAPPED_ROW_GROUP_OFFSET = 112;
const LAYOUT_WRAPPED_ROW_ITEM_OFFSET = 136;
const LAYOUT_WRAPPED_ROW_STACK_GAP = 252;
const MAX_NODES_PER_ROW = 4;
const SVG_PADDING_X = 96;
const SVG_PADDING_Y = 72;
const SVG_PADDING_BOTTOM = 200;
const VIEWPORT_TOP_PADDING = 88;
const VIEWPORT_SIDE_PADDING = 96;
const VIEWPORT_BOTTOM_PADDING = 120;
const FIT_PADDING = 24;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.15;
const MINIMAP_WIDTH = 168;
const MINIMAP_HEIGHT = 108;

function useElementSize() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    const rect = element.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });

    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

function buildTreeData(
  unit: EducationUnit,
  organization: EducationOrganizationSection,
  collapsedNodeIds: Set<string>,
): OrganizationTreeNode {
  function chunkNodes<T>(items: T[], chunkSize: number) {
    const chunks: T[][] = [];

    for (let index = 0; index < items.length; index += chunkSize) {
      chunks.push(items.slice(index, index + chunkSize));
    }

    return chunks;
  }

  function wrapChildrenIntoRows(
    parentId: string,
    children: OrganizationTreeNode[],
  ): OrganizationTreeNode[] {
    if (children.length <= MAX_NODES_PER_ROW) {
      return children;
    }

    return chunkNodes(children, MAX_NODES_PER_ROW).map((groupChildren, index) => ({
      id: `${parentId}__row-group-${index + 1}`,
      kind: "row-group" as const,
      children: groupChildren,
    }));
  }

  const leadershipTier = organization.tiers.find((tier) => tier.id === "leadership");
  const remainingTiers = organization.tiers.filter((tier) => tier.id !== "leadership");

  const downstreamChildren = wrapChildrenIntoRows(
    `${unit.slug}-organization-downstream`,
    remainingTiers.map((tier) => ({
      id: tier.id,
      kind: "tier" as const,
      title: tier.title,
      description: tier.description,
      memberCount: tier.members.length,
      children: collapsedNodeIds.has(tier.id)
        ? []
        : wrapChildrenIntoRows(
          tier.id,
          tier.members.map((member) => ({
            id: member.id,
            kind: "member" as const,
            member,
          })),
        ),
    })),
  );

  const leadershipMembers = leadershipTier?.members ?? [];
  const primaryLeaderIndex = leadershipMembers.findIndex((member) =>
    member.role.toLowerCase().includes("kepala"),
  );

  const rootMembers =
    leadershipMembers.length > 0
      ? leadershipMembers.map((member, index) => ({
        id: `root-${member.id}`,
        kind: "root-member" as const,
        member,
        children:
          index === (primaryLeaderIndex >= 0 ? primaryLeaderIndex : 0) &&
            !collapsedNodeIds.has(`root-${member.id}`)
            ? downstreamChildren
            : [],
      }))
      : [
        {
          id: `${unit.slug}-organization-root-tier`,
          kind: "root-tier" as const,
          title: unit.shortName,
          description: organization.title,
          children: downstreamChildren,
        },
      ];

  return {
    id: `${unit.slug}-organization-virtual-root`,
    kind: "virtual-root",
    children: rootMembers,
  };
}

function getExpandableNodeIds(
  organization: EducationOrganizationSection,
) {
  const remainingTiers = organization.tiers.filter((tier) => tier.id !== "leadership");

  return remainingTiers
    .filter((tier) => tier.members.length > 0)
    .map((tier) => tier.id);
}

function getInitialCollapsedNodeIds(organization: EducationOrganizationSection) {
  return new Set<string>(getExpandableNodeIds(organization));
}

function getNodeDimensions(node: OrganizationTreeNode) {
  if (node.kind === "virtual-root" || node.kind === "row-group") {
    return { width: 0, height: 0 };
  }

  if (node.kind === "root-member") {
    return { width: 240, height: 212 };
  }

  if (node.kind === "root-tier") {
    return { width: 220, height: 88 };
  }

  if (node.kind === "tier") {
    return { width: 240, height: 104 };
  }

  return { width: 240, height: 212 };
}

function RootMemberNodeCard({
  member,
  isExpanded,
  canToggle,
  onToggle,
}: {
  member: Extract<OrganizationTreeNode, { kind: "root-member" }>["member"];
  isExpanded?: boolean;
  canToggle?: boolean;
  onToggle?: () => void;
}) {
  return (
    <article className="rounded-2xl bg-primary-900 p-5 text-center text-white shadow-lg shadow-primary-900/15 ring-1 ring-primary-700">
      <OrganizationAvatar
        name={member.name}
        image={member.image}
        size={72}
        className="mx-auto flex items-center justify-center border border-white/10 bg-white/10 ring-0"
      />
      <div className="mt-4 space-y-2">
        <p className="font-heading text-base font-bold text-white">{member.name}</p>
        <p className="text-sm leading-6 text-primary-100">{member.role}</p>
        <div className="flex items-center justify-center gap-2">
          <p className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-accent-100">
            <UserRound className="h-3.5 w-3.5" />
            Pimpinan
          </p>
          {canToggle ? (
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs text-accent-100 transition hover:bg-white/15"
            >
              {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              {isExpanded ? "Tutup" : "Buka"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function RootTierNodeCard({
  node,
  isExpanded,
  canToggle,
  onToggle,
}: {
  node: Extract<OrganizationTreeNode, { kind: "root-tier" }>;
  isExpanded?: boolean;
  canToggle?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="rounded-2xl bg-primary-900 px-5 py-4 text-center text-white shadow-lg shadow-primary-900/15 ring-1 ring-primary-700">
      <p className="font-heading text-lg font-bold">{node.title}</p>
      <p className="mt-1 text-xs leading-5 text-primary-100">{node.description}</p>
      {canToggle ? (
        <button
          type="button"
          onClick={onToggle}
          className="mt-3 inline-flex items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs text-accent-100 transition hover:bg-white/15"
        >
          {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          {isExpanded ? "Tutup" : "Buka"}
        </button>
      ) : null}
    </div>
  );
}

function TierNodeCard({
  node,
  isExpanded,
  canToggle,
  onToggle,
}: {
  node: Extract<OrganizationTreeNode, { kind: "tier" }>;
  isExpanded?: boolean;
  canToggle?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-primary-200 bg-gradient-to-b from-white to-primary-50 p-5 text-center shadow-sm shadow-primary-100/30">
      <div className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
        <Building2 className="h-5 w-5" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-700">
        {node.title}
      </p>
      {node.description && (
        <p className="mt-2 text-sm leading-6 text-secondary-600">{node.description}</p>
      )}
      <div className="mt-3 flex items-center justify-center gap-2">
        <p className="text-xs font-medium text-primary-700">{node.memberCount} personel</p>
        {canToggle ? (
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-1 rounded-xl bg-primary-100 px-3 py-2 text-xs text-primary-700 transition hover:bg-primary-200"
          >
            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            {isExpanded ? "Tutup" : "Buka"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function MemberNodeCard({ member }: { member: EducationOrganizationMember }) {
  return (
    <article className="rounded-2xl bg-white p-5 text-center ring-1 ring-primary-100 shadow-sm shadow-primary-100/30">
      <OrganizationAvatar
        name={member.name}
        image={member.image}
        size={64}
        className="mx-auto flex items-center justify-center"
      />
      <div className="mt-4 space-y-2">
        <p className="font-heading text-base font-bold text-primary-800">{member.name}</p>
        <p className="text-sm leading-6 text-secondary-600">{member.role}</p>
        {member.notes ? (
          <p className="rounded-xl bg-accent-50 px-3 py-2 text-xs leading-5 text-accent-800">
            {member.notes}
          </p>
        ) : (
          <p className="inline-flex items-center gap-2 rounded-xl bg-primary-50 px-3 py-2 text-xs text-primary-700">
            <UserRound className="h-3.5 w-3.5" />
            Personel aktif
          </p>
        )}
      </div>
    </article>
  );
}

interface ContentBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface ViewportPan {
  x: number;
  y: number;
}

interface PositionedNode {
  id: string;
  data: OrganizationTreeNode;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface OrganizationChartViewState {
  zoom: number;
  pan: ViewportPan;
  collapsedNodeIds: string[];
  lineMode: OrganizationChartLineMode;
}

const organizationChartViewStateStore = new Map<string, OrganizationChartViewState>();

function getContentBounds(
  nodes: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>,
): ContentBounds {
  const left = Math.min(...nodes.map((node) => node.x));
  const top = Math.min(...nodes.map((node) => node.y));
  const right = Math.max(...nodes.map((node) => node.x + node.width));
  const bottom = Math.max(...nodes.map((node) => node.y + node.height));

  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
  };
}

function getViewportRectInContentSpace(
  pan: ViewportPan,
  zoom: number,
  viewportWidth: number,
  viewportHeight: number,
) {
  return {
    left: (-pan.x) / zoom,
    top: (-pan.y) / zoom,
    width: viewportWidth / zoom,
    height: viewportHeight / zoom,
  };
}

function getConnectorPath(
  source: Pick<PositionedNode, "x" | "y" | "width" | "height">,
  target: Pick<PositionedNode, "x" | "y" | "width" | "height">,
  targetKind: OrganizationTreeNode["kind"],
  lineMode: OrganizationChartLineMode,
) {
  const startX = source.x + source.width / 2;
  const startY =
    targetKind === "row-group"
      ? source.y + source.height * 0.72
      : source.y + source.height;
  const endX = target.x + target.width / 2;
  const endY = target.y;

  if (lineMode === "orthogonal") {
    const midY = startY + (endY - startY) / 2;
    return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
  }

  const midY = startY + (endY - startY) / 2;
  return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
}

export function OrganizationChartTree({
  unit,
  organization,
  fullscreen = false,
  onClickFullScreen = () => { },
  ...props
}: OrganizationChartTreeProps) {
  const { ref: viewportRef, size: viewportSize } = useElementSize();
  const minimapRef = useRef<HTMLDivElement | null>(null);
  const expandableNodeIds = useMemo(
    () => getExpandableNodeIds(organization),
    [organization],
  );
  const [collapsedNodeIds, setCollapsedNodeIds] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<ViewportPan>({ x: 0, y: 0 });
  const [lineMode, setLineMode] = useState<OrganizationChartLineMode>("orthogonal");
  const hasRestoredViewStateRef = useRef(false);
  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
  });

  useEffect(() => {
    const storedState = organizationChartViewStateStore.get(unit.slug);

    if (storedState) {
      setCollapsedNodeIds(new Set(storedState.collapsedNodeIds));
      setZoom(storedState.zoom);
      setPan(storedState.pan);
      setLineMode(storedState.lineMode);
      hasRestoredViewStateRef.current = true;
      return;
    }

    setCollapsedNodeIds(getInitialCollapsedNodeIds(organization));
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setLineMode("curve");
    hasRestoredViewStateRef.current = false;
  }, [organization, unit.slug]);

  function toggleNode(nodeId: string) {
    setCollapsedNodeIds((current) => {
      const next = new Set(current);

      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }

      return next;
    });
  }

  function expandAll() {
    setCollapsedNodeIds(new Set());
  }

  function collapseAll() {
    setCollapsedNodeIds(new Set(expandableNodeIds));
  }

  function clampZoom(nextZoom: number) {
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(nextZoom.toFixed(2))));
  }

  const layout = useMemo(() => {
    const rootData = buildTreeData(unit, organization, collapsedNodeIds);
    const root = hierarchy(rootData);
    const treeLayout = tree<OrganizationTreeNode>().nodeSize([
      LAYOUT_NODE_WIDTH,
      LAYOUT_LEVEL_HEIGHT,
    ]);
    const laidOutRoot = treeLayout(root);
    const allDescendants = laidOutRoot.descendants();
    const links = laidOutRoot.links();
    const descendants = allDescendants.filter(
      (node: HierarchyPointNode<OrganizationTreeNode>) => node.data.kind !== "virtual-root",
    );

    function shiftSubtree(node: HierarchyPointNode<OrganizationTreeNode>, deltaX: number) {
      node.each((descendant) => {
        descendant.x += deltaX;
      });
    }

    function repositionWrappedRows(node: HierarchyPointNode<OrganizationTreeNode>) {
      const rowGroups = node.children?.filter((child) => child.data.kind === "row-group") ?? [];

      rowGroups.forEach((rowGroup) => {
        rowGroup.x = node.x;

        rowGroup.children?.forEach((child, childIndex, rowChildren) => {
          const targetX =
            node.x + (childIndex - (rowChildren.length - 1) / 2) * LAYOUT_CHILD_ROW_HORIZONTAL_STEP;
          const deltaX = targetX - child.x;

          shiftSubtree(child, deltaX);
        });
      });

      node.children?.forEach((child) => repositionWrappedRows(child));
    }

    const yCache = new Map<string, number>();

    function getNodeY(node: HierarchyPointNode<OrganizationTreeNode>): number {
      const cached = yCache.get(node.data.id);

      if (cached !== undefined) {
        return cached;
      }

      let nextY = 0;

      if (node.parent) {
        const parentY = getNodeY(node.parent);

        if (node.data.kind === "row-group") {
          const rowGroups =
            node.parent.children?.filter((child) => child.data.kind === "row-group") ?? [];
          const rowIndex = rowGroups.findIndex((child) => child.data.id === node.data.id);
          nextY =
            parentY +
            LAYOUT_WRAPPED_ROW_GROUP_OFFSET +
            Math.max(0, rowIndex) * LAYOUT_WRAPPED_ROW_STACK_GAP;
        } else if (node.parent.data.kind === "row-group") {
          nextY = parentY + LAYOUT_WRAPPED_ROW_ITEM_OFFSET;
        } else if (node.parent.data.kind === "virtual-root") {
          nextY = 0;
        } else {
          nextY = parentY + LAYOUT_LEVEL_HEIGHT;
        }
      }

      yCache.set(node.data.id, nextY);

      return nextY;
    }

    repositionWrappedRows(laidOutRoot);

    const visibleRawNodes = descendants
      .filter((node) => node.data.kind !== "row-group")
      .map((node) => {
        const dimensions = getNodeDimensions(node.data);

        return {
          node,
          x: node.x,
          y: getNodeY(node),
          width: dimensions.width,
          height: dimensions.height,
        };
      });
    const minVisibleX = Math.min(...visibleRawNodes.map((node) => node.x));
    const maxVisibleRight = Math.max(...visibleRawNodes.map((node) => node.x + node.width));
    const maxVisibleBottom = Math.max(...visibleRawNodes.map((node) => node.y + node.height));
    const normalizedOffsetX = SVG_PADDING_X - minVisibleX;

    const allNodes: PositionedNode[] = descendants.map((node: HierarchyPointNode<OrganizationTreeNode>) => {
      const dimensions = getNodeDimensions(node.data);

      return {
        id: node.data.id,
        data: node.data,
        x: node.x + normalizedOffsetX,
        y: getNodeY(node) + SVG_PADDING_Y,
        width: dimensions.width,
        height: dimensions.height,
      };
    });
    const nodes = allNodes.filter((node) => node.data.kind !== "row-group");
    const totalWidth = maxVisibleRight + normalizedOffsetX + SVG_PADDING_X;
    const totalHeight = maxVisibleBottom + SVG_PADDING_Y + SVG_PADDING_BOTTOM;
    const contentBounds = getContentBounds(nodes);

    return { nodes, allNodes, links, totalWidth, totalHeight, contentBounds };
  }, [collapsedNodeIds, organization, unit]);
  const canvasWidth = layout.totalWidth;
  const canvasHeight = layout.totalHeight;
  const [isDraggingMinimap, setIsDraggingMinimap] = useState(false);

  const clampPan = useCallback(
    (nextPan: ViewportPan, scale: number) => {
      const { width: viewportWidth, height: viewportHeight } = viewportSize;

      if (!viewportWidth || !viewportHeight) {
        return nextPan;
      }

      const { left, top, right, bottom } = layout.contentBounds;
      const minX = viewportWidth - right * scale - VIEWPORT_SIDE_PADDING;
      const maxX = -left * scale + VIEWPORT_SIDE_PADDING;
      const minY = viewportHeight - bottom * scale - VIEWPORT_BOTTOM_PADDING;
      const maxY = VIEWPORT_TOP_PADDING - top * scale;

      return {
        x: Math.min(Math.max(nextPan.x, Math.min(minX, maxX)), Math.max(minX, maxX)),
        y: Math.min(Math.max(nextPan.y, Math.min(minY, maxY)), Math.max(minY, maxY)),
      };
    },
    [layout.contentBounds, viewportSize],
  );

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const viewportElement = viewport;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;

      if (!target || target.closest("button")) {
        return;
      }

      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startPanX: pan.x,
        startPanY: pan.y,
      };
      setIsDragging(true);
      viewportElement.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: PointerEvent) {
      if (dragStateRef.current.pointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - dragStateRef.current.startX;
      const deltaY = event.clientY - dragStateRef.current.startY;

      setPan(
        clampPan(
          {
            x: dragStateRef.current.startPanX + deltaX,
            y: dragStateRef.current.startPanY + deltaY,
          },
          zoom,
        ),
      );
    }

    function endDrag(event: PointerEvent) {
      if (dragStateRef.current.pointerId !== event.pointerId) {
        return;
      }

      if (viewportElement.hasPointerCapture(event.pointerId)) {
        viewportElement.releasePointerCapture(event.pointerId);
      }

      dragStateRef.current.pointerId = null;
      setIsDragging(false);
    }

    viewportElement.addEventListener("pointerdown", handlePointerDown);
    viewportElement.addEventListener("pointermove", handlePointerMove);
    viewportElement.addEventListener("pointerup", endDrag);
    viewportElement.addEventListener("pointercancel", endDrag);

    return () => {
      viewportElement.removeEventListener("pointerdown", handlePointerDown);
      viewportElement.removeEventListener("pointermove", handlePointerMove);
      viewportElement.removeEventListener("pointerup", endDrag);
      viewportElement.removeEventListener("pointercancel", endDrag);
    };
  }, [clampPan, pan.x, pan.y, viewportRef, zoom]);

  const getReadablePan = useCallback(
    (scale: number) =>
      clampPan(
        {
          x:
            (viewportSize.width - layout.contentBounds.width * scale) / 2 -
            layout.contentBounds.left * scale,
          y: VIEWPORT_TOP_PADDING - layout.contentBounds.top * scale,
        },
        scale,
      ),
    [clampPan, layout.contentBounds, viewportSize.width],
  );

  const getFitPan = useCallback(
    (scale: number) =>
      clampPan(
        {
          x:
            (viewportSize.width - layout.contentBounds.width * scale) / 2 -
            layout.contentBounds.left * scale,
          y:
            (viewportSize.height - layout.contentBounds.height * scale) / 2 -
            layout.contentBounds.top * scale,
        },
        scale,
      ),
    [clampPan, layout.contentBounds, viewportSize.height, viewportSize.width],
  );

  const minimap = useMemo(() => {
    const bounds = layout.contentBounds;
    const scale = Math.min(
      MINIMAP_WIDTH / bounds.width,
      MINIMAP_HEIGHT / bounds.height,
    );
    const width = bounds.width * scale;
    const height = bounds.height * scale;
    const offsetX = (MINIMAP_WIDTH - width) / 2;
    const offsetY = (MINIMAP_HEIGHT - height) / 2;
    const viewportRect = getViewportRectInContentSpace(
      pan,
      zoom,
      viewportSize.width,
      viewportSize.height,
    );

    return {
      scale,
      width,
      height,
      offsetX,
      offsetY,
      viewportRect: {
        x: offsetX + (viewportRect.left - bounds.left) * scale,
        y: offsetY + (viewportRect.top - bounds.top) * scale,
        width: viewportRect.width * scale,
        height: viewportRect.height * scale,
      },
    };
  }, [layout.contentBounds, pan, viewportSize.height, viewportSize.width, zoom]);

  const updateZoomFromViewportPoint = useCallback(
    (nextZoom: number, viewportX: number, viewportY: number) => {
      const clampedZoom = clampZoom(nextZoom);
      const contentPointX = (viewportX - pan.x) / zoom;
      const contentPointY = (viewportY - pan.y) / zoom;
      const nextPan = clampPan(
        {
          x: viewportX - contentPointX * clampedZoom,
          y: viewportY - contentPointY * clampedZoom,
        },
        clampedZoom,
      );

      setZoom(clampedZoom);
      setPan(nextPan);
    },
    [clampPan, pan.x, pan.y, zoom],
  );

  const updateZoom = useCallback(
    (nextZoom: number) => {
      if (!viewportSize.width || !viewportSize.height) {
        setZoom(clampZoom(nextZoom));
        return;
      }

      updateZoomFromViewportPoint(
        nextZoom,
        viewportSize.width / 2,
        viewportSize.height / 2,
      );
    },
    [updateZoomFromViewportPoint, viewportSize.height, viewportSize.width],
  );

  const handleDoubleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      const target = event.target as HTMLElement | null;

      if (target?.closest("button")) {
        return;
      }

      const rect = viewport.getBoundingClientRect();
      const viewportX = event.clientX - rect.left;
      const viewportY = event.clientY - rect.top;

      updateZoomFromViewportPoint(zoom + ZOOM_STEP * 2, viewportX, viewportY);
    },
    [updateZoomFromViewportPoint, viewportRef, zoom],
  );

  const moveViewportToContentPoint = useCallback(
    (contentX: number, contentY: number) => {
      const nextPan = clampPan(
        {
          x: viewportSize.width / 2 - contentX * zoom,
          y: viewportSize.height / 2 - contentY * zoom,
        },
        zoom,
      );

      setPan(nextPan);
    },
    [clampPan, viewportSize.height, viewportSize.width, zoom],
  );

  const handleMinimapPointer = useCallback(
    (clientX: number, clientY: number) => {
      const minimapElement = minimapRef.current;

      if (!minimapElement) {
        return;
      }

      const rect = minimapElement.getBoundingClientRect();
      const minimapX = clientX - rect.left;
      const minimapY = clientY - rect.top;
      const contentX =
        layout.contentBounds.left +
        (minimapX - minimap.offsetX) / minimap.scale;
      const contentY =
        layout.contentBounds.top +
        (minimapY - minimap.offsetY) / minimap.scale;

      moveViewportToContentPoint(contentX, contentY);
    },
    [
      layout.contentBounds.left,
      layout.contentBounds.top,
      minimap.offsetX,
      minimap.offsetY,
      minimap.scale,
      moveViewportToContentPoint,
    ],
  );

  function handleResetView() {
    const nextZoom = 1;
    setZoom(nextZoom);
    setPan(getReadablePan(nextZoom));
  }

  function handleFitToScreen() {
    const { width: viewportWidth, height: viewportHeight } = viewportSize;

    if (!viewportWidth || !viewportHeight) {
      return;
    }

    const availableWidth = viewportWidth - FIT_PADDING * 2;
    const availableHeight = viewportHeight - FIT_PADDING * 2;
    const fittedZoom = clampZoom(
      Math.min(
        availableWidth / layout.contentBounds.width,
        availableHeight / layout.contentBounds.height,
        MAX_ZOOM,
      ),
    );

    setZoom(fittedZoom);
    setPan(getFitPan(fittedZoom));
  }

  useEffect(() => {
    if (!viewportSize.width || !viewportSize.height) {
      return;
    }

    const storedState = organizationChartViewStateStore.get(unit.slug);

    if (storedState && hasRestoredViewStateRef.current) {
      setZoom(storedState.zoom);
      setPan(clampPan(storedState.pan, storedState.zoom));
      return;
    }

    setZoom(1);
    setPan(getReadablePan(1));
  }, [clampPan, getReadablePan, organization, unit.slug, viewportSize.height, viewportSize.width]);

  useEffect(() => {
    setPan((current) => clampPan(current, zoom));
  }, [clampPan, zoom]);

  useEffect(() => {
    organizationChartViewStateStore.set(unit.slug, {
      zoom,
      pan,
      collapsedNodeIds: Array.from(collapsedNodeIds),
      lineMode,
    });
  }, [collapsedNodeIds, lineMode, pan, unit.slug, zoom]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const viewportElement = viewport;

    function handleWheel(event: WheelEvent) {
      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }

      event.preventDefault();

      const rect = viewportElement.getBoundingClientRect();
      const viewportX = event.clientX - rect.left;
      const viewportY = event.clientY - rect.top;
      const direction = event.deltaY > 0 ? -1 : 1;

      updateZoomFromViewportPoint(zoom + direction * ZOOM_STEP, viewportX, viewportY);
    }

    viewportElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      viewportElement.removeEventListener("wheel", handleWheel);
    };
  }, [updateZoomFromViewportPoint, viewportRef, zoom]);

  useEffect(() => {
    if (!isDraggingMinimap) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      handleMinimapPointer(event.clientX, event.clientY);
    }

    function handlePointerUp() {
      setIsDraggingMinimap(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handleMinimapPointer, isDraggingMinimap]);

  return (
    <div className={clsx([
      "overflow-hidden rounded-[2rem] border border-primary-100 bg-white",
      props.className
    ])}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-100 bg-primary-50/60 px-4 py-3 sm:px-5">
        {/*<p className="text-sm text-secondary-700">*/}
        {/*  Geser chart untuk navigasi. Gunakan tombol zoom atau Ctrl/Cmd + scroll untuk memperbesar tampilan.*/}
        {/*</p>*/}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-primary-700 ring-1 ring-primary-100 transition hover:bg-primary-50"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-primary-700 ring-1 ring-primary-100 transition hover:bg-primary-50"
          >
            Collapse all
          </button>
          <button
            type="button"
            onClick={() => updateZoom(zoom - ZOOM_STEP)}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-primary-700 ring-1 ring-primary-100 transition hover:bg-primary-50"
          >
            <ZoomOut className="h-4 w-4" />
            Zoom out
          </button>
          <span className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-primary-800 ring-1 ring-primary-100">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => updateZoom(zoom + ZOOM_STEP)}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-primary-700 ring-1 ring-primary-100 transition hover:bg-primary-50"
          >
            <ZoomIn className="h-4 w-4" />
            Zoom in
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-primary-700 ring-1 ring-primary-100 transition hover:bg-primary-50"
          >
            <Search className="h-4 w-4" />
            Reset posisi
          </button>
          <button
            type="button"
            onClick={handleFitToScreen}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-100 px-3 py-2 text-sm text-primary-800 ring-1 ring-primary-200 transition hover:bg-primary-200"
          >
            <Search className="h-4 w-4" />
            Fit to screen
          </button>
          <div className="flex items-center overflow-hidden rounded-xl bg-white ring-1 ring-primary-100">
            <button
              type="button"
              onClick={() => setLineMode("orthogonal")}
              className={cn(
                "inline-flex items-center gap-2 border-l border-primary-100 px-3 py-2 text-sm transition",
                lineMode === "orthogonal"
                  ? "bg-primary-700 text-white"
                  : "text-primary-700 hover:bg-primary-50",
              )}
            >
              <GitBranchPlus className="h-4 w-4" />
              Tegak
            </button>
            <button
              type="button"
              onClick={() => setLineMode("curve")}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-2 text-sm transition",
                lineMode === "curve"
                  ? "bg-primary-700 text-white"
                  : "text-primary-700 hover:bg-primary-50",
              )}
            >
              <GitBranchPlus className="h-4 w-4" />
              Curve
            </button>
          </div>

          {!fullscreen && <button
            type="button"
            onClick={onClickFullScreen}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-primary-700 ring-1 ring-primary-100 transition hover:bg-primary-50"
          >
            <Expand className="h-4 w-4" />
            Full-screen
          </button>}
        </div>
      </div>
      <div
        ref={viewportRef}
        onDoubleClick={handleDoubleClick}
        className={cn(
          fullscreen
            ? "relative h-full min-h-[24rem] overflow-hidden touch-none select-none"
            : "relative h-[min(70vh,56rem)] min-h-[32rem] overflow-hidden touch-none select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: canvasWidth,
            height: canvasHeight,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0"
            width={canvasWidth}
            height={canvasHeight}
            viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          >
            {layout.links.map((link: HierarchyPointLink<OrganizationTreeNode>) => {
              if (
                link.source.data.kind === "virtual-root" ||
                link.target.data.kind === "virtual-root"
              ) {
                return null;
              }

              const source = layout.allNodes.find((node) => node.id === link.source.data.id);
              const target = layout.allNodes.find((node) => node.id === link.target.data.id);

              if (!source || !target) {
                return null;
              }

              return (
                <path
                  key={`${source.id}-${target.id}`}
                  d={getConnectorPath(source, target, link.target.data.kind, lineMode)}
                  fill="none"
                  stroke="#cddfcf"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {layout.nodes.map((node) => (
            <div
              key={node.id}
              className={cn("absolute")}
              style={{
                left: node.x,
                top: node.y,
                width: node.width,
                minHeight: node.height,
              }}
            >
              {node.data.kind === "root-member" && (
                <RootMemberNodeCard
                  member={node.data.member}
                  canToggle={expandableNodeIds.includes(node.data.id)}
                  isExpanded={!collapsedNodeIds.has(node.data.id)}
                  onToggle={() => toggleNode(node.data.id)}
                />
              )}
              {node.data.kind === "root-tier" && (
                <RootTierNodeCard
                  node={node.data}
                  canToggle={expandableNodeIds.includes(node.data.id)}
                  isExpanded={!collapsedNodeIds.has(node.data.id)}
                  onToggle={() => toggleNode(node.data.id)}
                />
              )}
              {node.data.kind === "tier" && (
                <TierNodeCard
                  node={node.data}
                  canToggle={expandableNodeIds.includes(node.data.id)}
                  isExpanded={!collapsedNodeIds.has(node.data.id)}
                  onToggle={() => toggleNode(node.data.id)}
                />
              )}
              {node.data.kind === "member" && <MemberNodeCard member={node.data.member} />}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute right-4 top-4 z-10 hidden rounded-2xl border border-primary-200 bg-white/95 p-2.5 shadow-lg shadow-primary-900/10 backdrop-blur sm:block">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
              Minimap
            </p>
            <p className="text-[10px] text-secondary-500">
              Drag atau klik
            </p>
          </div>
          <div
            ref={minimapRef}
            role="presentation"
            onPointerDown={(event) => {
              setIsDraggingMinimap(true);
              handleMinimapPointer(event.clientX, event.clientY);
            }}
            className="pointer-events-auto relative overflow-hidden rounded-xl bg-primary-50 ring-1 ring-primary-100"
            style={{ width: MINIMAP_WIDTH, height: MINIMAP_HEIGHT }}
          >
            <svg
              aria-hidden="true"
              className="absolute inset-0"
              width={MINIMAP_WIDTH}
              height={MINIMAP_HEIGHT}
              viewBox={`0 0 ${MINIMAP_WIDTH} ${MINIMAP_HEIGHT}`}
            >
              {layout.links.map((link: HierarchyPointLink<OrganizationTreeNode>) => {
                if (
                  link.source.data.kind === "virtual-root" ||
                  link.target.data.kind === "virtual-root"
                ) {
                  return null;
                }

                const source = layout.allNodes.find((node) => node.id === link.source.data.id);
                const target = layout.allNodes.find((node) => node.id === link.target.data.id);

                if (!source || !target) {
                  return null;
                }

                const minimapSource = {
                  x: minimap.offsetX + (source.x - layout.contentBounds.left) * minimap.scale,
                  y: minimap.offsetY + (source.y - layout.contentBounds.top) * minimap.scale,
                  width: source.width * minimap.scale,
                  height: source.height * minimap.scale,
                };
                const minimapTarget = {
                  x: minimap.offsetX + (target.x - layout.contentBounds.left) * minimap.scale,
                  y: minimap.offsetY + (target.y - layout.contentBounds.top) * minimap.scale,
                  width: target.width * minimap.scale,
                  height: target.height * minimap.scale,
                };

                return (
                  <path
                    key={`minimap-${source.id}-${target.id}`}
                    d={getConnectorPath(minimapSource, minimapTarget, link.target.data.kind, lineMode)}
                    fill="none"
                    stroke="#b6cdbd"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {layout.nodes.map((node) => (
              <div
                key={`minimap-node-${node.id}`}
                className={cn(
                  "absolute rounded-sm",
                  node.data.kind === "root-member"
                    ? "bg-primary-700"
                    : node.data.kind === "tier" || node.data.kind === "root-tier"
                      ? "bg-accent-600"
                      : "bg-primary-300",
                )}
                style={{
                  left:
                    minimap.offsetX +
                    (node.x - layout.contentBounds.left) * minimap.scale,
                  top:
                    minimap.offsetY +
                    (node.y - layout.contentBounds.top) * minimap.scale,
                  width: Math.max(4, node.width * minimap.scale),
                  height: Math.max(4, node.height * minimap.scale),
                }}
              />
            ))}

            <div
              className="absolute rounded-lg border-2 border-primary-500 bg-primary-200/20 shadow-sm"
              style={{
                left: minimap.viewportRect.x,
                top: minimap.viewportRect.y,
                width: Math.min(MINIMAP_WIDTH, Math.max(18, minimap.viewportRect.width)),
                height: Math.min(MINIMAP_HEIGHT, Math.max(18, minimap.viewportRect.height)),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
