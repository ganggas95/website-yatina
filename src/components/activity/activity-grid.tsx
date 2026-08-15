"use client";

import * as React from "react";
import type { Activity } from "@/types/activity";
import type { EducationLevel } from "@/types/education";
import { ActivityCard } from "./activity-card";
import { cn } from "@/lib/utils";

type FilterValue = EducationLevel | "Yayasan" | "Semua";

const filters: { label: string; value: FilterValue }[] = [
  { label: "Semua", value: "Semua" },
  { label: "Yayasan", value: "Yayasan" },
  { label: "TK", value: "TK" },
  { label: "MI", value: "MI" },
  { label: "MTs", value: "MTs" },
  { label: "MA", value: "MA" },
];

interface ActivityGridProps {
  activities: Activity[];
}

export function ActivityGrid({ activities }: ActivityGridProps) {
  const [filter, setFilter] = React.useState<FilterValue>("Semua");

  const filtered = React.useMemo(
    () =>
      filter === "Semua"
        ? activities
        : activities.filter((a) => a.educationUnit === filter),
    [activities, filter]
  );

  return (
    <div className="space-y-8">
      <div
        role="tablist"
        aria-label="Filter kegiatan berdasarkan unit pendidikan"
        className="flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const active = f.value === filter;
          return (
            <button
              key={f.value}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.value)}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
                active
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-white text-secondary-700 ring-1 ring-primary-100 hover:bg-primary-50 hover:text-primary-700"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((activity) => (
            <ActivityCard key={activity.slug} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-primary-200 bg-white p-10 sm:p-14 text-center space-y-3">
          <p className="font-heading text-xl font-bold text-primary-800">
            Belum ada kegiatan pada kategori ini
          </p>
          <p className="max-w-md mx-auto leading-7 text-secondary-600">
            Kegiatan pada kategori yang Anda pilih akan ditambahkan seiring berjalannya waktu.
            Silakan pilih kategori lain atau kembali di lain kesempatan.
          </p>
        </div>
      )}
    </div>
  );
}
