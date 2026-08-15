import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { EducationUnitHero } from "@/components/education/education-unit-hero";
import { EducationUnitProfile } from "@/components/education/education-unit-profile";
import { SchoolPageTemplate } from "@/components/education/school-page-template";
import { educationUnits, getEducationUnit } from "@/data/education-units";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return educationUnits.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const unit = getEducationUnit(slug);
  if (!unit) {
    return { title: "Unit Pendidikan Tidak Ditemukan" };
  }
  return {
    title: unit.name,
    description: unit.description,
    keywords: [unit.name, unit.level, unit.category, "Yayasan Titi Samaguna"],
    openGraph: {
      title: `${unit.name} | Yayasan Titi Samaguna`,
      description: unit.description,
      images: [{ url: unit.image, alt: unit.name }],
      type: "article",
    },
  };
}

export default async function UnitPendidikanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const unit = getEducationUnit(slug);
  if (!unit) notFound();

  return (
    <article>
      <EducationUnitHero unit={unit} />
      <Container className="py-6 sm:py-8">
        <Breadcrumb
          items={[
            { label: "Unit Pendidikan", href: "/unit-pendidikan" },
            { label: unit.level },
            { label: unit.name },
          ]}
        />
      </Container>
      <EducationUnitProfile unit={unit} />
      <SchoolPageTemplate unit={unit} />
    </article>
  );
}
