"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryCarouselItem {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  badge?: string;
}

interface GalleryCarouselProps {
  items: GalleryCarouselItem[];
  children: (openAt: (index: number) => void) => React.ReactNode;
}

const SWIPE_THRESHOLD = 48;
const SLIDE_DURATION_MS = 280;
type SlideDirection = "next" | "previous";

export function GalleryCarousel({ items, children }: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [transition, setTransition] = React.useState<{
    from: number;
    to: number;
    direction: SlideDirection;
  } | null>(null);
  const [slideActive, setSlideActive] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const isOpen = activeIndex !== null;
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const close = React.useCallback(() => setActiveIndex(null), []);

  const clearAnimation = React.useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const goToIndex = React.useCallback(
    (nextIndex: number, direction: SlideDirection) => {
      setActiveIndex((current) => {
        if (current === null || items.length === 0) return current;
        if (current === nextIndex) return current;

        clearAnimation();
        setSlideActive(false);
        setTransition({ from: current, to: nextIndex, direction });

        animationFrameRef.current = requestAnimationFrame(() => {
          setSlideActive(true);
        });

        timeoutRef.current = setTimeout(() => {
          setTransition(null);
          setSlideActive(false);
          timeoutRef.current = null;
        }, SLIDE_DURATION_MS);

        return nextIndex;
      });
    },
    [clearAnimation, items.length]
  );

  const openAt = React.useCallback(
    (index: number) => {
      if (!items.length) return;
      const safeIndex = Math.max(0, Math.min(index, items.length - 1));
      clearAnimation();
      setTransition(null);
      setSlideActive(false);
      setActiveIndex(safeIndex);
    },
    [clearAnimation, items.length]
  );

  const showPrevious = React.useCallback(() => {
    if (activeIndex === null || items.length === 0) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    goToIndex(nextIndex, "previous");
  }, [activeIndex, goToIndex, items.length]);

  const showNext = React.useCallback(() => {
    if (activeIndex === null || items.length === 0) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    goToIndex(nextIndex, "next");
  }, [activeIndex, goToIndex, items.length]);

  React.useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, isOpen, showNext, showPrevious]);

  React.useEffect(() => {
    return () => {
      clearAnimation();
    };
  }, [clearAnimation]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX > 0) {
      showPrevious();
      return;
    }

    showNext();
  };

  return (
    <>
      {children(openAt)}

      {isMounted && isOpen && activeItem
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] bg-primary-900/55 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label={activeItem.title ?? activeItem.alt}
            >
              <button
                type="button"
                aria-label="Tutup carousel"
                onClick={close}
                className="absolute inset-0 cursor-default"
              />

              <div className="relative flex h-screen flex-col">
                <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
                  <div className="min-w-0 text-white">
                    <p className="text-sm font-semibold text-primary-100">
                      {activeIndex + 1} / {items.length}
                    </p>
                    <p className="mt-1 text-xs text-primary-200/80">
                      Gunakan keyboard ← → atau geser kiri-kanan
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Tutup"
                    onClick={close}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-6 sm:pb-6">
                  {items.length > 1 && (
                    <button
                      type="button"
                      aria-label="Gambar sebelumnya"
                      onClick={showPrevious}
                      className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                  )}

                  <div
                    className="relative flex h-full w-full max-w-7xl items-center justify-center overflow-hidden rounded-3xl"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="relative h-full w-full min-h-[280px]">
                      {transition ? (
                        <>
                          <div
                            className={cn(
                              "absolute inset-0 transition-transform duration-300 ease-out",
                              slideActive
                                ? transition.direction === "next"
                                  ? "-translate-x-full"
                                  : "translate-x-full"
                                : "translate-x-0"
                            )}
                          >
                            <Image
                              src={items[transition.from].src}
                              alt={items[transition.from].alt}
                              fill
                              priority
                              sizes="100vw"
                              className="object-contain"
                            />
                          </div>

                          <div
                            className={cn(
                              "absolute inset-0 transition-transform duration-300 ease-out",
                              slideActive
                                ? "translate-x-0"
                                : transition.direction === "next"
                                  ? "translate-x-full"
                                  : "-translate-x-full"
                            )}
                          >
                            <Image
                              src={items[transition.to].src}
                              alt={items[transition.to].alt}
                              fill
                              priority
                              sizes="100vw"
                              className="object-contain"
                            />
                          </div>
                        </>
                      ) : (
                        <Image
                          key={`${activeItem.src}-${activeIndex}`}
                          src={activeItem.src}
                          alt={activeItem.alt}
                          fill
                          priority
                          sizes="100vw"
                          className="object-contain"
                        />
                      )}
                    </div>
                  </div>

                  {items.length > 1 && (
                    <button
                      type="button"
                      aria-label="Gambar berikutnya"
                      onClick={showNext}
                      className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  )}
                </div>

                {(activeItem.title || activeItem.description || activeItem.alt || activeItem.badge) && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <div className="mx-auto max-w-5xl rounded-3xl bg-primary-950/80 p-4 text-white ring-1 ring-white/10 backdrop-blur-md">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 space-y-2">
                          <p className="text-lg font-bold text-white">
                            {activeItem.title ?? activeItem.alt}
                          </p>
                          {activeItem.description ? (
                            <p className="max-w-3xl text-sm leading-7 text-primary-100/90">
                              {activeItem.description}
                            </p>
                          ) : activeItem.title && activeItem.alt !== activeItem.title ? (
                            <p className="max-w-3xl text-sm leading-7 text-primary-100/90">
                              {activeItem.alt}
                            </p>
                          ) : null}
                        </div>

                        {activeItem.badge ? (
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15"
                            )}
                          >
                            {activeItem.badge}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
