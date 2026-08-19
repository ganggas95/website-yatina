import { Container } from "@/components/ui/container";
import { OrganizationChartSection } from "@/components/education/organization-chart-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TODO_CONTENT } from "@/lib/utils";
import type { EducationUnit } from "@/types/education";
import { CheckCircle2, Eye, Award, BookOpenCheck, CalendarDays, Building2, Target } from "lucide-react";

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

function HistoryBlock({ unit }: { unit: EducationUnit }) {
  const history = unit.history?.length ? unit.history : [TODO_CONTENT];
  const isPlaceholder = history.every((item) => item === TODO_CONTENT);

  return (
    <article className="rounded-2xl bg-white ring-1 ring-primary-100 p-6 sm:p-7 space-y-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <BookOpenCheck className="h-5 w-5" />
        </span>
        <h3 className="font-heading text-xl font-bold text-primary-800">Sejarah</h3>
      </div>

      {isPlaceholder ? (
        <div className="space-y-3">
          <p className="leading-7 italic text-secondary-500">
            Sejarah resmi {unit.shortName} akan ditambahkan setelah data dan dokumen pendukung
            diterima dari pengelola unit pendidikan.
          </p>
          <div className="space-y-2 pt-1">
            <div className="h-3 w-3/4 rounded bg-primary-100 animate-pulse" />
            <div className="h-3 w-full rounded bg-primary-100 animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-primary-100 animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((paragraph, idx) => (
            <p key={idx} className="leading-7 text-secondary-700">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}

export function EducationUnitProfile({ unit }: { unit: EducationUnit }) {
  const accreditation = unit.accreditation ?? {
    status: TODO_CONTENT,
    grade: TODO_CONTENT,
    year: TODO_CONTENT,
    certificateNumber: TODO_CONTENT,
  };
  const accreditationPlaceholder =
    accreditation.status === TODO_CONTENT &&
    accreditation.grade === TODO_CONTENT &&
    accreditation.year === TODO_CONTENT &&
    accreditation.certificateNumber === TODO_CONTENT;

  return (
    <section aria-labelledby="profil-sekolah-heading" className="py-20 sm:py-28 bg-surface">
      <Container>
        <div className="space-y-20 lg:space-y-24">
          <div>
            <SectionHeading
              eyebrow={`Tentang ${unit.shortName}`}
              title={`Profil ${unit.name}`}
              description="Informasi lengkap mengenai visi, misi, tujuan, program unggulan, dan fasilitas yang tersedia untuk mendukung proses pendidikan peserta didik."
            />
            <div className="mt-10 grid items-start gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3 space-y-6">
                <HistoryBlock unit={unit} />
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
                <InfoBlock
                  icon={Target}
                  title="Tujuan"
                  items={unit.goals?.length ? unit.goals : [TODO_CONTENT]}
                />
              </div>
              <div className="self-start lg:col-span-2 rounded-2xl bg-gradient-to-br from-primary-50 to-white p-6 ring-1 ring-primary-100 sm:p-7">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wider text-accent-700">
                      Informasi Pendukung
                    </p>
                    <p className="font-heading text-lg font-bold text-primary-800">
                      Jenjang {unit.level} di bawah Yayasan Titi Samaguna
                    </p>
                    <p className="leading-7 text-secondary-700">
                      Ringkasan informasi dasar unit pendidikan untuk membantu orang tua dan
                      calon peserta didik memahami profil singkat sekolah.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-primary-100">
                      <p className="text-xs text-secondary-500">Jenjang</p>
                      <p className="font-bold text-primary-800">{unit.level}</p>
                    </div>
                    <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-primary-100">
                      <p className="text-xs text-secondary-500">Status</p>
                      <p className="font-bold text-primary-800">Aktif</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wider text-accent-700">
                      Akreditasi
                    </p>
                    <div className="space-y-3 rounded-2xl bg-white p-4 ring-1 ring-primary-100">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-secondary-500">Status</p>
                          <p className={`font-semibold ${accreditation.status === TODO_CONTENT ? "italic text-secondary-500" : "text-primary-800"}`}>
                            {accreditation.status === TODO_CONTENT ? "Belum tersedia" : accreditation.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-500">Nilai</p>
                          <p className={`font-semibold ${accreditation.grade === TODO_CONTENT ? "italic text-secondary-500" : "text-primary-800"}`}>
                            {accreditation.grade === TODO_CONTENT ? "Belum tersedia" : accreditation.grade}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-500">Tahun</p>
                          <p className={`font-semibold ${accreditation.year === TODO_CONTENT ? "italic text-secondary-500" : "text-primary-800"}`}>
                            {accreditation.year === TODO_CONTENT ? "Belum tersedia" : accreditation.year}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-secondary-500">Sertifikat</p>
                          <p className={`break-words font-semibold ${accreditation.certificateNumber === TODO_CONTENT ? "italic text-secondary-500" : "text-primary-800"}`}>
                            {accreditation.certificateNumber === TODO_CONTENT
                              ? "Belum tersedia"
                              : accreditation.certificateNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    {accreditationPlaceholder && (
                      <p className="text-sm leading-6 italic text-secondary-500">
                        Data akreditasi resmi untuk {unit.shortName} akan ditambahkan setelah dokumen pendukung diterima.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <OrganizationChartSection unit={unit} organization={unit.organization} />
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
