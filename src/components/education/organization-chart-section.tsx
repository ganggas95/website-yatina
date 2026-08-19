"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, X, Users } from "lucide-react";

import { OrganizationChartTree } from "@/components/education/organization-chart-tree";
import { SectionHeading } from "@/components/ui/section-heading";
import type {
  EducationOrganizationSection,
  EducationUnit,
} from "@/types/education";

interface OrganizationChartSectionProps {
  unit: EducationUnit;
  organization?: EducationOrganizationSection;
}

export function OrganizationChartSection({
  unit,
  organization,
}: OrganizationChartSectionProps) {
  const tiers = organization?.tiers?.filter((tier) => tier.members.length > 0) ?? [];
  const hasOrganization = tiers.length > 0;
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isFullscreenOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    previousFocusedElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFullscreenOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusedElementRef.current?.focus();
    };
  }, [isFullscreenOpen]);

  return (
    <div>
      <SectionHeading
        eyebrow="Profil Kelembagaan"
        title={organization?.title ?? `Struktur Organisasi ${unit.name}`}
        description={
          organization?.description ??
          `Struktur organisasi ${unit.shortName} akan ditampilkan setelah data resmi dari pengelola unit pendidikan diterima.`
        }
      />

      <div className="mt-10">
        {!hasOrganization ? (
          <div className="rounded-3xl border-2 border-dashed border-primary-200 bg-white p-10 text-center sm:p-14">
            <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <Users className="h-7 w-7" />
            </span>
            <div className="mx-auto mt-4 max-w-2xl space-y-3">
              <h3 className="font-heading text-xl font-bold text-primary-800">
                Struktur organisasi belum tersedia
              </h3>
              <p className="leading-7 text-secondary-600">
                Susunan personel dan jabatan resmi untuk {unit.name} akan ditambahkan di sini
                setelah data kelembagaan selesai diverifikasi.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-primary-100 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent-700">
                    Peta Struktur
                  </p>
                  <p className="leading-7 text-secondary-700">
                    Susunan berikut dirender per lapisan jabatan agar tetap mudah dibaca pada
                    mobile maupun desktop.
                  </p>
                </div>
                <div className="rounded-2xl bg-primary-50 px-4 py-3 text-sm text-primary-800 ring-1 ring-primary-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{tiers.length} lapisan organisasi</span>
                  </div>
                </div>
              </div>

              {organization?.sourceNote && (
                <p className="mt-4 rounded-2xl bg-accent-50 px-4 py-3 text-sm leading-6 text-accent-900 ring-1 ring-accent-100">
                  {organization.sourceNote}
                </p>
              )}
            </div>

            <OrganizationChartTree unit={unit} organization={organization!} onClickFullScreen={() => {
              setIsFullscreenOpen(true);
            }} />
          </div>
        )}
      </div>

      {hasOrganization && isFullscreenOpen && (
        <div
          className="fixed inset-0 z-[110] bg-primary-700/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Tampilan full-screen ${organization?.title ?? `struktur organisasi ${unit.name}`}`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 bg-primary-950/90 px-4 py-4 text-white sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-200">
                  Full-screen
                </p>
                <h3 className="font-heading text-lg font-bold sm:text-xl text-accent-50">
                  {organization?.title ?? `Struktur Organisasi ${unit.name}`}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsFullscreenOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
              >
                <X className="h-4 w-4" />
                Tutup
              </button>
            </div>

            <div className="flex-1 overflow-hidden bg-surface px-3 py-3 sm:px-6 sm:py-6">
              <OrganizationChartTree
                className="h-full"
                unit={unit}
                organization={organization!}
                fullscreen
                onClickFullScreen={() => {
                  setIsFullscreenOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
