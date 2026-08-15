# Perencanaan Pengembangan Website Yayasan Titi Samaguna (Yatina)

## A. Kesimpulan Riset Repo

**Status Repo Saat Ini:**
- Repo kosong, hanya berisi `docs/about-project.md`
- Belum ada inisialisasi project (tidak ada `package.json`, `tsconfig.json`, dll.)
- Perlu setup dari nol: scaffolding Next.js, dependencies, struktur folder, dan seluruh implementasi UI

**Kesimpulan Dokumen [about-project.md](file:///Users/nizar/MyProject/website-yatina/docs/about-project.md):**
- Website resmi Yayasan Titi Samaguna (Yatina), bergerak di 4 unit pendidikan (TK, MI, MTs, MA) di bawah Nahdlatul Wathan, Lombok Utara
- **Phase 1: Fully Static Website** — TIDAK ADA database, auth, CMS, API route, server action kecuali yang built-in Next.js
- Tech stack: Next.js terbaru + App Router + TypeScript + Tailwind CSS + React Server Components (default) + Lucide Icons
- Konten disimpan di `src/data/` sebagai TypeScript object (type-safe), mudah diganti ke CMS nanti
- 8 Stage development bertahap dengan gate check (lint → typecheck → build)
- Branding: hijau tua primary, hijau natural secondary, off-white bg, emas lembut accent
- Prioritas: mobile-first, performance Lighthouse ≥ 90, WCAG AA reasonable, SEO/OpenGraph/sitemap

---

## B. File dan Modul yang Akan Dibuat/Diedit

### B.1 Konfigurasi Root Project
| File | Tujuan |
|---|---|
| `package.json` | Project manifest & scripts (`dev`, `build`, `start`, `lint`, `typecheck`) |
| `tsconfig.json` | TypeScript strict, path alias `@/*` → `src/*` |
| `next.config.mjs` | Next.js config (image domains, static build opts) |
| `tailwind.config.ts` | Color tokens, typography, container, custom theme |
| `postcss.config.mjs` | Tailwind + autoprefixer |
| `.eslintrc.json` | ESLint (Next.js core-web-vitals preset) |
| `.gitignore` | Standard Node/Next.js |
| `next-env.d.ts` | Next.js type declarations |

### B.2 Aset Publik
| Path | Tujuan |
|---|---|
| `public/images/foundation/` | Foto yayasan (placeholder) |
| `public/images/tk/`, `public/images/mi/`, `public/images/mts/`, `public/images/ma/` | Foto per unit pendidikan |
| `public/images/activities/` | Foto kegiatan |
| `public/images/gallery/` | Foto galeri |
| `public/favicon.ico` | Favicon placeholder |
| `public/robots.txt` | SEO robots |
| `public/sitemap.xml` | Dihasilkan via Next.js `sitemap.ts` |

### B.3 Struktur `src/`
```
src/
├── app/
│   ├── layout.tsx              (Root Layout: fonts, metadata, Header/Footer, SEO)
│   ├── page.tsx                (Homepage: Hero → Intro → Education → Nilai → NW → Kegiatan → Gallery → PPDB → Location)
│   ├── not-found.tsx           (404 page)
│   ├── sitemap.ts              (generate sitemap)
│   ├── robots.ts               (generate robots)
│   ├── tentang/page.tsx
│   ├── unit-pendidikan/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx     (generateStaticParams: 4 slugs)
│   ├── kegiatan/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx     (generateStaticParams)
│   ├── ppdb/page.tsx
│   ├── galeri/page.tsx
│   └── kontak/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── header.tsx          (Desktop nav, dropdown Unit Pendidikan, CTA PPDB, sticky/semi-sticky)
│   │   ├── footer.tsx          (Logo, menu, unit, contact, social, copyright dynamic year)
│   │   └── mobile-navigation.tsx  ("use client": hamburger, slide-over drawer, accessible)
│   │
│   ├── home/
│   │   ├── hero-section.tsx
│   │   ├── intro-foundation.tsx
│   │   ├── education-units-section.tsx
│   │   ├── values-section.tsx
│   │   ├── nw-identity-section.tsx
│   │   ├── latest-activities.tsx
│   │   ├── gallery-preview.tsx
│   │   ├── ppdb-section.tsx
│   │   └── location-section.tsx
│   │
│   ├── education/
│   │   ├── education-unit-preview.tsx
│   │   ├── education-unit-hero.tsx
│   │   ├── education-unit-profile.tsx
│   │   └── school-page-template.tsx
│   │
│   ├── activity/
│   │   ├── activity-card.tsx
│   │   ├── activity-grid.tsx       ("use client": filter by unit)
│   │   └── activity-detail.tsx
│   │
│   ├── gallery/
│   │   └── gallery-grid.tsx        ("use client": filter by unit, asymmetric/masonry)
│   │
│   ├── ppdb/
│   │   └── ppdb-card.tsx
│   │
│   └── ui/
│       ├── container.tsx
│       ├── section-heading.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx              (variant: primary/secondary/ghost, size)
│       ├── whatsapp-cta.tsx
│       └── ppdb-cta.tsx
│
├── data/
│   ├── site.ts                 (siteConfig: name, address, contact, social, maps)
│   ├── education-units.ts      (4 unit: interface + array with TODO_CONTENT placeholder)
│   ├── activities.ts           (Sample 5-6 kegiatan untuk dev/test)
│   ├── gallery.ts              (Sample gallery image data)
│   ├── ppdb.ts                 (PPDB per jenjang: placeholder)
│   └── values.ts               (Nilai pendidikan placeholder struktural)
│
├── types/
│   ├── education.ts            (EducationUnit interface)
│   ├── activity.ts             (Activity, ActivityCategory)
│   └── gallery.ts              (GalleryImage)
│
└── lib/
    └── utils.ts                (cn helper untuk classNames, tanggal formatter)
```

---

## C. Tahapan Modifikasi / Fitur (sesuai 8 Stage dokumen)

### Stage 1 — Foundation (Setup & Konfigurasi Dasar)
1. Inisialisasi project Next.js terbaru dengan App Router + TypeScript + Tailwind + ESLint
2. Setup path alias `@/*`
3. Konfigurasi `tailwind.config.ts`:
   - Primary: hijau tua (`#0F5132` / `green-900` custom)
   - Secondary: hijau natural (`#3F7D5E` / `green-700`)
   - Background: off-white (`#FAFAF7`), surface: putih
   - Accent: emas lembut (`#C9A961`)
   - Container max-width: `7xl`, padding responsive
4. Setup fonts via `next/font/google`:
   - Heading: **Plus Jakarta Sans** atau **Amiri Quran** (untuk nuansa Islami yang modern) — pilih 1 font heading
   - Body: **Inter**
5. Setup global styles di `app/globals.css` (reset, typography base, focus ring)
6. Buat `src/data/site.ts` dengan placeholder TODO_CONTENT untuk kontak/sosmed/maps
7. Buat `src/types/` + interfaces dasar
8. Buat reusable dasar: `Container`, `SectionHeading`, `Button`, `utils.ts`
9. **Exit Gate**: `npm run lint` ✓, `npx tsc --noEmit` ✓, `npm run build` ✓

### Stage 2 — Global Layout (Header, Nav, Footer)
1. `Header.tsx`: semi-sticky, logo + nav link (Beranda, Tentang Kami, Unit Pendidikan [dropdown 4 item], Kegiatan, PPDB, Galeri, Kontak) + CTA "Informasi PPDB"
2. `MobileNavigation.tsx` ("use client"): hamburger button, slide drawer dengan backdrop, keyboard focus trap minimal, close on link click, aria-expanded/aria-controls
3. `Footer.tsx`: logo, deskripsi singkat, 3 kolom (menu, unit pendidikan, kontak), social media icons (Lucide), copyright `new Date().getFullYear()`
4. `app/layout.tsx`: pasang Header/Footer, set metadata global + OpenGraph default, bahasa `id`, favicon
5. **Exit Gate**: responsive test 360–1440px, lint/typecheck/build ✓

### Stage 3 — Homepage
1. `HeroSection`: foto dominan + headline "Mendidik Generasi Berilmu, Berakhlak dan Bermanfaat" + 2 CTA (Kenali Yatina, Lihat Unit Pendidikan) + badge TK • MI • MTs • MA
2. `IntroFoundation`: heading placeholder sejarah dengan `TODO_CONTENT` marker
3. `EducationUnitsSection`: 4 unit dengan foto besar, kategori label, CTA per unit
4. `ValuesSection`: 6 kartu nilai (Keislaman, Ilmu Pengetahuan, Akhlakul Karimah, Kedisiplinan, Kebersamaan, Pengabdian) dengan Lucide icons
5. `NWIdentitySection`: heading "Bernaung dalam Tradisi Pendidikan Nahdlatul Wathan" + deskripsi TODO_CONTENT
6. `LatestActivities`: 3-4 ActivityCard terbaru + CTA "Lihat Semua Kegiatan"
7. `GalleryPreview`: asymmetric/masonry 6-8 gambar + CTA
8. `PPDBSection`: 4 jenjang badge + CTA Informasi PPDB + secondary WhatsApp (ambil dari `siteConfig`)
9. `LocationSection`: alamat lengkap + placeholder maps URL
10. **Exit Gate**: lint/typecheck/build ✓, visual review mobile+desktop

### Stage 4 — Unit Pendidikan
1. `/unit-pendidikan/page.tsx`: heading intro + 4 kartu besar ke detail
2. `/unit-pendidikan/[slug]/page.tsx`:
   - `generateStaticParams()` mengembalikan 4 slug: `tk-yatina`, `mi-riadlul-jannah`, `mts-riadlul-jannah`, `ma-riadlul-jannah`
   - Satu template reusable yang membaca data dari `education-units.ts`
   - Section: Hero → Profil → Visi & Misi (TODO) → Program (TODO) → Kegiatan Unggulan (TODO) → Fasilitas (TODO) → Galeri (filter unit) → PPDB CTA → Kontak unit
3. Buat `education-units.ts` dengan placeholder TODO_CONTENT untuk data fakta institusi
4. **Exit Gate**: semua 4 route ter-generate, lint/typecheck/build ✓

### Stage 5 — Tentang Yayasan
1. `/tentang/page.tsx`:
   - Hero: "Tentang Yayasan Titi Samaguna"
   - Sekilas Yatina (sekilas + TODO)
   - Sejarah (TODO_CONTENT block besar)
   - Visi (TODO) + Misi (TODO list)
   - Nilai Pendidikan (shared data dari `values.ts`)
   - Struktur Yayasan: `organization = []` kosong dengan layout placeholder
   - Identitas NW (section khusus)
   - Lokasi (shared component `LocationSection`)
2. **Exit Gate**: lint/typecheck/build ✓

### Stage 6 — Kegiatan
1. `/kegiatan/page.tsx`:
   - Hero heading + filter tabs (Semua, Yayasan, TK, MI, MTs, MA)
   - `ActivityGrid` ("use client"): filter interaktif, data static
2. `/kegiatan/[slug]/page.tsx`:
   - `generateStaticParams()` dari sample kegiatan
   - Breadcrumb → category badge → title → date → featured image → article content (placeholder) → related activities (berdasarkan unit/kategori)
   - Metadata per halaman (title, description, OG image)
3. Buat sample data 5-6 kegiatan di `activities.ts` agar halaman terisi selama dev
4. **Exit Gate**: static generation semua slug, lint/typecheck/build ✓

### Stage 7 — PPDB, Galeri & Kontak
1. `/ppdb/page.tsx`:
   - Heading "Penerimaan Peserta Didik Baru"
   - 4 kartu per jenjang: informasi pendaftaran (TODO), persyaratan (TODO list), jadwal (TODO), biaya (TODO), CP + WhatsApp CTA per jenjang
2. `/galeri/page.tsx`:
   - Filter tabs (mirip kegiatan)
   - `GalleryGrid` ("use client"): asymmetric/masonry layout, `next/image` dengan width/height fix atau aspect-ratio container + fill agar tanpa CLS
   - Semua gambar punya alt text meaningful
3. `/kontak/page.tsx`:
   - Alamat lengkap
   - WhatsApp (dari siteConfig) + CTA button "Hubungi melalui WhatsApp"
   - Email, sosial media
   - Google Maps embed placeholder (dari `siteConfig.maps.url`)
   - **TIDAK** membuat contact form (tanpa backend)
4. **Exit Gate**: lint/typecheck/build ✓

### Stage 8 — SEO & Optimization
1. Metadata per halaman (export `const metadata` di setiap `page.tsx`):
   - Format title: `{Page Title} | Yayasan Titi Samaguna`
   - Description relevan per halaman
   - OpenGraph: title, description, type, url, images, locale `id_ID`
2. `app/sitemap.ts`: generate seluruh route static + dynamic params
3. `app/robots.ts`: allow semua, link sitemap
4. Favicon placeholder + manifest minimal
5. Image audit: setiap `<Image>` punya width/height/fill + sizes + alt, priority hanya hero above-fold
6. Font audit: preload, display swap
7. Bundle audit: pastikan tidak ada dependency berlebih (tidak ada framer-motion, dll.)
8. Accessibility audit: semantic header/nav/main/section/article/footer, focus visible, heading hierarchy h1→h2→h3, alt images, contrast
9. Responsive audit breakpoint: 360, 390, 768, 1024, 1280, 1440+
10. Final gate: lint, typecheck, production build
11. **Definition of Done** sesuai pasal 42 about-project.md

---

## D. Potensi Dependensi & Pertimbangan

**Dependencies yang akan di-install (bawaan create-next-app + minimal):**
- `next` (terbaru)
- `react`, `react-dom`
- `typescript`
- `tailwindcss`, `postcss`, `autoprefixer`
- `eslint`, `eslint-config-next`
- `lucide-react` (icons)
- `clsx` + `tailwind-merge` (untuk `cn()` helper, standar minimal) — ini opsional; jika bisa pakai string literal saja, lebih baik. Tetapi `cn()` helper sangat umum dan mencegah bug class override Tailwind.

**Pertimbangan Arsitektur (penting untuk scalability ke fase 2):**
- SELURUH data konten (pendidikan, kegiatan, galeri, ppdb, values) diisolasi di `src/data/` dengan interface eksplisit di `src/types/`
- Komponen UI HANYA membaca data dari data layer, tidak pernah hardcode content institusi (kecuali copy generic UI Indonesia yang natural)
- Dynamic route `[slug]` + `generateStaticParams()` untuk memudahkan nanti swap data source ke CMS (tanpa rubah UI)
- `siteConfig` sebagai single source of truth untuk kontak, sosial, maps (bukan hardcode per komponen)

**Konten Strategy:**
- Data institusional FAKTA (sejarah, tahun berdiri, pendiri, jumlah, visi-misi resmi, nomor WhatsApp nyata, email, dll.) SELALU menggunakan marker string `TODO_CONTENT` di source code, **tidak ada fiksi**
- Copy UI generic (tombol, label nav, heading section, microcopy seperti "Kembali ke atas") ditulis natural bahasa Indonesia
- Sample kegiatan dan galeri: data dummy cukup realistis sebagai scaffolding visual, tetapi BUKAN klaim fakta (contoh: judul kegiatan generic "Kegiatan Belajar Mengajar" bukan "Juara 1 Lomba Tahun 2024")

---

## E. Penanganan Risiko

| Risiko | Mitigasi |
|---|---|
| **Data palsu terlanjur masuk** | Wajib marker `TODO_CONTENT` untuk semua factual institutional content. Audit akhir grep `TODO_CONTENT` untuk menandai bagian yang perlu diisi user nanti. |
| **Client Component berlebih** | Default RSC. Hanya file yang perlu state/effect ditandai `"use client"`: MobileNavigation, ActivityGrid filter, GalleryGrid filter. |
| **Build gagal di stage akhir** | Exit gate setiap stage: lint → tsc → build. Jangan lanjut stage sebelum gate lulus. |
| **Performance Lighthouse < 90** | Audit image sizes, priority prop, font preload, minimal JS. Jika perlu, ganti placeholder image ke format webp modern. |
| **Responsive broken mobile** | Mobile-first approach. Setiap stage 2-8 wajib manual test viewport 360px (Chrome DevTools device). |
| **Abstraksi berlebih / overengineering** | Ikuti aturan: "Don't create abstraction you don't need". Struktur folder sesuai proposal dokumen. Tidak extract component yang hanya dipakai 1x. |
| **Refactor besar di tengah** | Setiap perubahan fokus pada scope stage yang sedang berjalan. Jika terlihat perlu refactor lintas domain, catat dan tunda sampai Stage 8 atau sesudah DoD. |
| **Accessibility mobile menu** | Pastikan: aria-expanded, focus ke drawer ketika open, ESC menutup, body scroll-lock saat drawer terbuka. |

---

## F. Exit Gates (Ringkasan per Stage)
Setiap stage WAJIB lulus sebelum lanjut:
```bash
npm run lint          # tidak ada error, warning boleh review
npx tsc --noEmit      # tidak ada TypeScript error (strict mode)
npm run build         # production build berhasil
```
Review tambahan per stage: visual mobile (360px) + desktop (1280px), heading hierarchy, semantic HTML.

---

## G. Scope Di Luar Phase 1 (TEGAS DILARANG diimplementasikan)
- Login/Auth, dashboard admin, student/teacher portal
- Database (Prisma/Supabase/dll.), CMS, API route custom
- Online PPDB system, payment, attendance, donation management
- Analytics dashboard, Framer Motion fade-in massal
- Contact form tanpa backend
- Informasi fiktif yayasan apapun bentuknya
