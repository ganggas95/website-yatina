import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { EducationUnitHero } from "@/components/education/education-unit-hero";
import { EducationUnitProfile } from "@/components/education/education-unit-profile";
import { SchoolPageTemplate } from "@/components/education/school-page-template";
import { educationUnits, getEducationUnit } from "@/data/education-units";
import { createMetadata, absoluteUrl, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

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
    return createMetadata({ title: "Unit Pendidikan Tidak Ditemukan", description: "Unit pendidikan yang diminta tidak ditemukan.", path: `/unit-pendidikan/${slug}` });
  }
  return createMetadata({ title: unit.name, description: unit.description, path: `/unit-pendidikan/${slug}`, keywords: [unit.name, unit.level, unit.category], image: unit.image, imageAlt: `${unit.name} - ${unit.category}`, type: "article" });
}

export default async function UnitPendidikanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const unit = getEducationUnit(slug);
  if (!unit) notFound();

  return (
    <article><JsonLd data={{ "@context": "https://schema.org", "@type": "EducationalOrganization", name: unit.name, description: unit.description, url: absoluteUrl(`/unit-pendidikan/${slug}`), image: absoluteUrl(unit.image), parentOrganization: { "@type": "Organization", name: "Yayasan Titi Samaguna", url: absoluteUrl("/") }, address: { "@type": "PostalAddress", addressLocality: "Dusun Penjor, Desa Genggelang", addressRegion: "Nusa Tenggara Barat", addressCountry: "ID" } }} /><JsonLd data={{ "@context": "https://schema.org", ...breadcrumbSchema([{ name: "Beranda", path: "/" }, { name: "Unit Pendidikan", path: "/unit-pendidikan" }, { name: unit.name }]) }} />
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
