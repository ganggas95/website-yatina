"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { educationUnits } from "@/data/education-units";
import { PPDBCTA } from "@/components/ui/ppdb-cta";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang Kami" },
  {
    href: "/unit-pendidikan",
    label: "Unit Pendidikan",
    children: educationUnits.map((u) => ({
      href: `/unit-pendidikan/${u.slug}`,
      label: u.name,
    })),
  },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/ppdb", label: "PPDB" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [educationOpen, setEducationOpen] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (!educationOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setEducationOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [educationOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur border-b border-primary-50 shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-lg"
            aria-label="Beranda Yayasan Titi Samaguna"
          >
            <Image
              src="/favicon.png"
              alt=""
              width={512}
              height={512}
              className="h-10 w-10 shrink-0 rounded-xl object-contain"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-base md:text-lg font-bold text-primary-700">
                Yatina
              </span>
              <span className="text-[10px] md:text-xs text-secondary-600 tracking-wide">
                Yayasan Titi Samaguna
              </span>
            </div>
          </Link>

          <nav
            ref={navRef}
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-1"
          >
            {navLinks.map((link) => {
              if ("children" in link && link.children) {
                return (
                  <div key={link.href} className="relative">
                    <button
                      type="button"
                      onClick={() => setEducationOpen((v) => !v)}
                      aria-haspopup="true"
                      aria-expanded={educationOpen}
                      className="inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-secondary-700 transition-colors hover:text-primary-700 hover:bg-primary-50/60 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          educationOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {educationOpen && (
                      <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl border border-primary-100 bg-white shadow-lg ring-1 ring-black/5 animate-fade-in">
                        <div className="p-2 space-y-0.5">
                          <Link
                            href={link.href}
                            onClick={() => setEducationOpen(false)}
                            className="block px-3 py-2 rounded-lg text-sm font-semibold text-primary-700 hover:bg-primary-50"
                          >
                            Seluruh Unit Pendidikan
                          </Link>
                          <div className="h-px bg-primary-100 my-1.5" />
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setEducationOpen(false)}
                              className="block px-3 py-2 rounded-lg text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-700"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-secondary-700 transition-colors hover:text-primary-700 hover:bg-primary-50/60 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <PPDBCTA size="sm" />
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Buka menu navigasi"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary-700 hover:bg-primary-50 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi mobile"
            className="absolute top-0 right-0 h-full w-full max-w-[22rem] bg-white shadow-2xl flex flex-col animate-fade-in"
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-primary-100">
              <span className="font-heading text-lg font-bold text-primary-700">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Tutup menu navigasi"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-secondary-700 hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
              {navLinks.map((link) => {
                if ("children" in link && link.children) {
                  return (
                    <div key={link.href} className="space-y-1">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 rounded-lg text-base font-semibold text-primary-700 hover:bg-primary-50"
                      >
                        {link.label}
                      </Link>
                      <div className="pl-4 space-y-0.5 border-l-2 border-primary-100 ml-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3 py-2 rounded-lg text-sm text-secondary-700 hover:bg-primary-50"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-700"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-primary-100 space-y-2">
              <PPDBCTA size="lg" className="w-full" />
            </div>
          </div>
          </div>,
          document.body
        )}
    </header>
  );
}
