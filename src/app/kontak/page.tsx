import { LocationSection } from "@/components/home/location-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import { siteConfig } from "@/data/site";
import { TODO_CONTENT } from "@/lib/utils";
import {
    Clock,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Youtube,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Yayasan Titi Samaguna via WhatsApp, telepon, email, atau media sosial. Alamat di Dusun Penjor, Desa Genggelang, Gangga, Lombok Utara.",
  keywords: [
    "Kontak Yatina",
    "Alamat Yayasan Titi Samaguna",
    "WhatsApp Yatina",
  ],
};

type SocialIcon = typeof Instagram | typeof Facebook | typeof Youtube;

const hasContent = (value: string) => value !== TODO_CONTENT;

const contactWa = hasContent(siteConfig.contact.whatsapp);
const contactPhone = hasContent(siteConfig.contact.phone);
const contactEmail = hasContent(siteConfig.contact.email);
const mapsReady = hasContent(siteConfig.maps.url);
const socialIG = hasContent(siteConfig.social.instagram);
const socialFB = hasContent(siteConfig.social.facebook);
const socialYT = hasContent(siteConfig.social.youtube);

function ContactItem({
  icon: Icon,
  label,
  value,
  placeholder,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  placeholder?: boolean;
  href?: string;
}) {
  const linkable = Boolean(href && !placeholder);
  const inner = (
    <>
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 ring-1 ring-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-colors">
        <Icon className="h-5 w-5" />
      </span>
      <div className="space-y-1 min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
          {label}
        </p>
        <p
          className={`leading-6 font-semibold break-words ${
            placeholder
              ? "italic text-secondary-500 font-normal"
              : "text-primary-800"
          }`}
        >
          {value}
        </p>
      </div>
    </>
  );

  const classes = `group flex items-start gap-4 rounded-2xl bg-white ring-1 ring-primary-100 p-5 sm:p-6 transition-all ${
    linkable ? "hover:ring-primary-300 hover:shadow-md cursor-pointer" : ""
  }`;

  if (linkable) {
    const external = href!.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href!} className={classes}>
        {inner}
      </Link>
    );
  }
  return <div className={classes}>{inner}</div>;
}

function SocialItem({
  icon: Icon,
  label,
  value,
  href,
  placeholder,
}: {
  icon: SocialIcon;
  label: string;
  value: string;
  href: string;
  placeholder: boolean;
}) {
  const inner = (
    <>
      <span
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-primary-100 text-white transition-all ${
          placeholder
            ? "bg-secondary-300"
            : "bg-gradient-to-br from-primary-600 to-primary-700 group-hover:from-primary-700 group-hover:to-primary-800"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="space-y-1 min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
          {label}
        </p>
        <p
          className={`leading-6 font-semibold break-words ${
            placeholder
              ? "italic text-secondary-500 font-normal"
              : "text-primary-800"
          }`}
        >
          {value}
        </p>
      </div>
    </>
  );
  const classes = `flex items-center gap-4 rounded-2xl bg-white ring-1 ring-primary-100 p-5 sm:p-6 transition-all ${
    placeholder ? "opacity-60" : "hover:ring-primary-300 hover:shadow-md group"
  }`;

  if (placeholder) {
    return <div className={classes}>{inner}</div>;
  }
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {inner}
    </Link>
  );
}

export default function KontakPage() {
  return (
    <div className="space-y-0">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(201,169,97,0.4) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(63,125,94,0.45) 0%, transparent 55%)",
          }}
        />
        <Container className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-200">
              <MapPin className="h-3.5 w-3.5" />
              Kami siap membantu
            </span>
            <h1 className="font-heading text-accent-50 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance">
              Hubungi Kami
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-8 text-primary-100/90 max-w-2xl">
              Ada pertanyaan mengenai pendaftaran, informasi unit pendidikan,
              kerja sama, atau sekadar ingin berkunjung? Tim kami siap merespons
              setiap pertanyaan Anda.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <WhatsAppCTA size="lg" />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="kontak-info-heading" className="py-20 sm:py-24">
        <Container>
          <div className="mb-12 sm:mb-14">
            <SectionHeading
              eyebrow="Kontak Utama"
              title="Informasi kontak & jam operasional"
              description="Pilih kanal komunikasi yang paling nyaman bagi Anda. Kami akan merespons secepat mungkin pada jam kerja."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ContactItem
              icon={MessageCircle}
              label="WhatsApp"
              value={
                contactWa
                  ? siteConfig.contact.whatsapp
                  : "Nomor WhatsApp akan segera diumumkan"
              }
              placeholder={!contactWa}
              href={
                contactWa
                  ? `https://wa.me/${String(siteConfig.contact.whatsapp).replace(/\D/g, "")}`
                  : undefined
              }
            />
            <ContactItem
              icon={Phone}
              label="Telepon"
              value={
                contactPhone
                  ? siteConfig.contact.phone
                  : "Nomor telepon akan segera diumumkan"
              }
              placeholder={!contactPhone}
              href={
                contactPhone
                  ? `tel:${String(siteConfig.contact.phone).replace(/\D/g, "")}`
                  : undefined
              }
            />
            <ContactItem
              icon={Mail}
              label="Email"
              value={
                contactEmail
                  ? siteConfig.contact.email
                  : "Email resmi akan segera diumumkan"
              }
              placeholder={!contactEmail}
              href={
                contactEmail ? `mailto:${siteConfig.contact.email}` : undefined
              }
            />
            <ContactItem
              icon={MapPin}
              label="Alamat"
              value={siteConfig.address.full}
              href={mapsReady ? siteConfig.maps.url : undefined}
            />
            <ContactItem
              icon={Clock}
              label="Jam Operasional"
              value="Senin – Jumat, 08.00 – 15.00 WITA (Sabtu & Minggu tutup, kecuali acara khusus)"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-background via-primary-50/40 to-background">
        <Container>
          <div className="mb-12 sm:mb-14">
            <SectionHeading
              eyebrow="Media Sosial"
              title="Ikuti kami di media sosial"
              description="Dapatkan update kegiatan, informasi PPDB, dan cerita inspiratif seputar dunia pendidikan di Yatina."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <SocialItem
              icon={Instagram}
              label="Instagram"
              value={
                socialIG
                  ? siteConfig.social.instagram
                  : "@yatinapenjor (akan diaktifkan)"
              }
              href={siteConfig.social.instagram}
              placeholder={!socialIG}
            />
            <SocialItem
              icon={Facebook}
              label="Facebook"
              value={
                socialFB
                  ? siteConfig.social.facebook
                  : "Yayasan Titi Samaguna (akan diaktifkan)"
              }
              href={siteConfig.social.facebook}
              placeholder={!socialFB}
            />
            <SocialItem
              icon={Youtube}
              label="YouTube"
              value={
                socialYT
                  ? siteConfig.social.youtube
                  : "Yayasan Titi Samaguna (akan diaktifkan)"
              }
              href={siteConfig.social.youtube}
              placeholder={!socialYT}
            />
          </div>
        </Container>
      </section>

      <LocationSection />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 text-white p-8 sm:p-12 shadow-xl shadow-primary-900/20">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-400/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />
            <div className="grid lg:grid-cols-5 gap-8 items-center relative">
              <div className="lg:col-span-3 space-y-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent-200">
                  Tidak menemukan jawaban?
                </p>
                <h2 className="text-accent-50 font-heading text-3xl sm:text-4xl font-extrabold leading-tight text-balance">
                  Kami sangat senang mendengar dari Anda.
                </h2>
                <p className="text-lg leading-8 text-primary-100/90">
                  Sampaikan pertanyaan atau saran Anda melalui WhatsApp. Tim
                  Yayasan Titi Samaguna akan merespons dengan senang hati.
                </p>
              </div>
              <div className="lg:col-span-2 flex flex-col sm:flex-row lg:flex-col gap-3">
                <WhatsAppCTA
                  size="lg"
                  className="w-full bg-white !text-primary-700 hover:!bg-primary-50 shadow-lg"
                />
                <Link
                  href="/ppdb"
                  className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-6 text-base font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Informasi PPDB
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
