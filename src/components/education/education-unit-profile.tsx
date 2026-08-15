import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TODO_CONTENT } from "@/lib/utils";
import type { EducationUnit } from "@/types/education";
import { CheckCircle2, Eye, Award, BookOpenCheck, CalendarDays, Building2 } from "lucide-react";

interface InfoBlockProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items?: string[];
  content?: string;
}

function InfoBlock({ icon: Icon, title, items, content }: InfoBlockProps) {
  const isPlaceholder =
    (content && content === TODO_CONTENT) ||
    (items && items.length > 0 && items.every((i) => i === TODO_CONTENT));

  return (
    <article className="rounded-2xl bg-white ring-1 ring-primary-100 p-6 sm:p-7 space-y-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-heading text-xl font-bold text-primary-800">{title}</h3>
      </div>
      {content && (
        <p
          className={`leading-7 text-secondary-700 ${
            isPlaceholder ? "italic text-secondary-500" : ""
          }`}
        >
          {content}
        </p>
      )}
      {items && (
        <ul className="space-y-2.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm leading-6 text-secondary-700">
              <CheckCircle2
                className={`h-4 w-4 mt-0.5 shrink-0 ${
                  isPlaceholder ? "text-secondary-300" : "text-primary-500"
                }`}
              />
              <span className={isPlaceholder ? "italic text-secondary-500" : ""}>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function EducationUnitProfile({ unit }: { unit: EducationUnit }) {
  return (
    <section aria-labelledby="profil-sekolah-heading" className="py-20 sm:py-28 bg-surface">
      <Container>
        <div className="space-y-20 lg:space-y-24">
          <div>
            <SectionHeading
              eyebrow={`Tentang ${unit.shortName}`}
              title={`Profil ${unit.name}`}
              description="Informasi lengkap mengenai profil, tujuan, program unggulan, dan fasilitas yang tersedia untuk mendukung proses pendidikan peserta didik."
            />
            <div className="mt-10 grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <InfoBlock
                  icon={Eye}
                  title="Visi"
                  content={unit.vision ?? TODO_CONTENT}
                />
                <InfoBlock
                  icon={Award}
                  title="Misi"
                  items={unit.mission?.length ? unit.mission : [TODO_CONTENT]}
                />
              </div>
              <div className="lg:col-span-2 flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-br from-primary-50 to-white ring-1 ring-primary-100 p-6 sm:p-7">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent-700">
                    Informasi Pendukung
                  </p>
                  <p className="font-heading text-lg font-bold text-primary-800">
                    Jenjang {unit.level} di bawah Yayasan Titi Samaguna
                  </p>
                  <p className="leading-7 text-secondary-700">
                    Informasi terkait akreditasi, jumlah peserta didik, tenaga pendidik, dan data
                    pendukung lainnya akan ditambahkan segera setelah data resmi diterima.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white ring-1 ring-primary-100 px-4 py-3">
                    <p className="text-xs text-secondary-500">Jenjang</p>
                    <p className="font-bold text-primary-800">{unit.level}</p>
                  </div>
                  <div className="rounded-xl bg-white ring-1 ring-primary-100 px-4 py-3">
                    <p className="text-xs text-secondary-500">Status</p>
                    <p className="font-bold text-primary-800">Aktif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Kurikulum & Kegiatan" title="Program & Kegiatan Unggulan" />
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <InfoBlock
                icon={BookOpenCheck}
                title="Program Pendidikan"
                items={unit.programs?.length ? unit.programs : [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT]}
              />
              <InfoBlock
                icon={CalendarDays}
                title="Kegiatan Unggulan"
                items={unit.activities?.length ? unit.activities : [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT]}
              />
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Sarana & Prasarana" title="Fasilitas Pendukung" />
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(unit.facilities?.length ? unit.facilities : [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT]).map(
                (facility, idx) => {
                  const ph = facility === TODO_CONTENT;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl bg-white ring-1 ring-primary-100 p-5"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                        <Building2 className="h-4 w-4" />
                      </span>
                      <p
                        className={`leading-6 text-sm text-secondary-700 ${
                          ph ? "italic text-secondary-500" : ""
                        }`}
                      >
                        {ph ? "Data fasilitas akan ditambahkan" : facility}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
