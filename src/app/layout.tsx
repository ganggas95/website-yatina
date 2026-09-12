import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Pendidikan Islam di Penjor, Lombok Utara`,
    template: `%s | ${siteConfig.name}`,
  },
  ...createMetadata({
    title: `${siteConfig.name} | Pendidikan Islam di Penjor, Lombok Utara`,
    description: siteConfig.description,
    path: "/",
    keywords: ["Yayasan Titi Samaguna", "Yatina Penjor", "Madrasah Penjor", "Pendidikan Islam Lombok Utara"],
  }),
  keywords: [
    "Yayasan Titi Samaguna",
    "Yatina Penjor",
    "Sekolah Penjor Lombok Utara",
    "Madrasah Penjor",
    "TK Yatina",
    "MI Riadlul Jannah NW Penjor",
    "MTs Riadlul Jannah NW Penjor",
    "MA Riadlul Jannah NW Penjor",
    "Pendidikan Islam Lombok Utara",
    "Nahdlatul Wathan",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Pendidikan Islam di Penjor, Lombok Utara`,
    description: siteConfig.description,
    images: [{ url: absoluteUrl("/favicon.png"), alt: `${siteConfig.name} - logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Pendidikan Islam di Penjor, Lombok Utara`,
    description: siteConfig.description,
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F5132",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={siteConfig.language}
      className={`${inter.variable} ${plusJakarta.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Lompat ke konten utama
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          <JsonLd data={{
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name, legalName: siteConfig.legalName, url: siteConfig.url, logo: absoluteUrl("/favicon.png"), description: siteConfig.description, address: { "@type": "PostalAddress", streetAddress: "Jalan Jurusan Selelos Km 7", addressLocality: siteConfig.address.village, addressRegion: siteConfig.address.province, addressCountry: "ID" }, geo: { "@type": "GeoCoordinates", latitude: siteConfig.maps.latitude, longitude: siteConfig.maps.longitude } },
              { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, url: siteConfig.url, name: siteConfig.name, publisher: { "@id": `${siteConfig.url}/#organization` }, inLanguage: siteConfig.language },
            ],
          }} />
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
