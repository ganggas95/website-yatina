import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EducationUnitPreview } from "@/components/education/education-unit-preview";
import { educationUnits } from "@/data/education-units";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "Unit Pendidikan", description: "Daftar jenjang pendidikan TK, MI, MTs, dan MA di bawah Yayasan Titi Samaguna, Penjor, Lombok Utara.", path: "/unit-pendidikan", keywords: ["TK Yatina", "MI Riadlul Jannah NW Penjor", "MTs Riadlul Jannah NW Penjor", "MA Riadlul Jannah NW Penjor"] });

export default function UnitPendidikanPage() {
  return (
    <div className="space-y-0">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary-50 via-background to-background">
        <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="max-w-3xl space-y-5 animate-fade-in">
            <span className="inline-flex items-center rounded-full bg-white border border-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-700 shadow-sm">
              TK • MI • MTs • MA
            </span>
            <SectionHeading
              eyebrow="Jenjang Pendidikan"
              title="Unit Pendidikan Yayasan Titi Samaguna"
              description="Empat unit pendidikan berjenjang yang dirancang untuk memberikan layanan pendidikan Islami yang berkelanjutan, mulai dari usia dini hingga menuju pendidikan tinggi."
            />
          </div>
        </Container>
      </section>

      <section aria-label="Daftar unit pendidikan" className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-4">
            {educationUnits.map((unit) => (
              <EducationUnitPreview key={unit.slug} unit={unit} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
