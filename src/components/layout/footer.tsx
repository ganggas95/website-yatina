import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { educationUnits } from "@/data/education-units";
import { Container } from "@/components/ui/container";
import { TODO_CONTENT } from "@/lib/utils";

const footerMenus = [
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Unit Pendidikan", href: "/unit-pendidikan" },
  { label: "Prestasi", href: "/prestasi" },
  { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "PPDB", href: "/ppdb" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

const socialBaseClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors";

function SocialIcon({
  href,
  icon: Icon,
  label,
  placeholder,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  placeholder: boolean;
}) {
  const classes = `${socialBaseClass} ${
    placeholder ? "opacity-50" : "hover:bg-primary-500 hover:text-white"
  }`;
  if (placeholder) {
    return (
      <span aria-label={label} className={classes}>
        <Icon className="h-4 w-4" />
      </span>
    );
  }
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={classes}
    >
      <Icon className="h-4 w-4" />
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const wa = siteConfig.contact.whatsapp === TODO_CONTENT;
  const email = siteConfig.contact.email === TODO_CONTENT;
  const phone = siteConfig.contact.phone === TODO_CONTENT;
  const ig = siteConfig.social.instagram === TODO_CONTENT;
  const fb = siteConfig.social.facebook === TODO_CONTENT;
  const yt = siteConfig.social.youtube === TODO_CONTENT;

  return (
    <footer className="relative mt-24 bg-primary-800 text-white" role="contentinfo">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent-500 via-secondary-400 to-accent-500" />
      <Container className="pt-14 pb-8">
        <div className="grid gap-10 md:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.png"
                alt=""
                width={512}
                height={512}
                className="h-12 w-12 shrink-0 rounded-2xl bg-white object-contain shadow"
              />
              <div>
                <p className="font-heading text-xl font-bold">{siteConfig.name}</p>
                <p className="text-sm text-primary-200">{siteConfig.shortName} • {siteConfig.address.regency}</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-primary-100/90">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <SocialIcon
                href={siteConfig.social.instagram}
                icon={Instagram}
                label="Instagram Yayasan Titi Samaguna"
                placeholder={ig}
              />
              <SocialIcon
                href={siteConfig.social.facebook}
                icon={Facebook}
                label="Facebook Yayasan Titi Samaguna"
                placeholder={fb}
              />
              <SocialIcon
                href={siteConfig.social.youtube}
                icon={Youtube}
                label="YouTube Yayasan Titi Samaguna"
                placeholder={yt}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-white">Menu</h3>
            <ul className="space-y-2.5">
              {footerMenus.map((menu) => (
                <li key={menu.href}>
                  <Link
                    href={menu.href}
                    className="inline-flex items-center gap-2 text-sm text-primary-100/85 transition-colors hover:text-white hover:underline underline-offset-4"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent-400" />
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-white">Unit Pendidikan</h3>
              <ul className="space-y-2.5">
                {educationUnits.map((unit) => (
                  <li key={unit.slug}>
                    <Link
                      href={`/unit-pendidikan/${unit.slug}`}
                      className="text-sm text-primary-100/85 transition-colors hover:text-white hover:underline underline-offset-4"
                    >
                      {unit.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-semibold text-white">Kontak</h3>
              <ul className="space-y-2.5 text-sm text-primary-100/85">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-accent-300" />
                  <span className="leading-relaxed">{siteConfig.address.full}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4 shrink-0 text-accent-300" />
                  <span className={wa ? "opacity-50" : ""}>
                    {wa ? "Nomor WhatsApp belum tersedia" : siteConfig.contact.whatsapp}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-accent-300" />
                  <span className={email ? "opacity-50" : ""}>
                    {email ? "Email belum tersedia" : siteConfig.contact.email}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-accent-300" />
                  <span className={phone ? "opacity-50" : ""}>
                    {phone ? "Telepon belum tersedia" : siteConfig.contact.phone}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-primary-100/70">
          <p>
            © {year} {siteConfig.copyright.holder}. All rights reserved.
          </p>
          <p className="text-primary-100/60">
            Dibuat dengan penuh semangat untuk pendidikan generasi Islami.
          </p>
        </div>
      </Container>
    </footer>
  );
}
