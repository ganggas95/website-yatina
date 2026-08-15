# Project: Official Website Yayasan Titi Samaguna (Yatina)

Anda bertindak sebagai **Senior Frontend Engineer, UI/UX Designer, dan Software Architect**.

Bangun website resmi **Yayasan Titi Samaguna (Yatina)** menggunakan **Next.js App Router**.

Website pada fase pertama merupakan **fully static website**. Jangan membuat database, authentication, CMS, ataupun backend API kecuali diperlukan oleh fitur bawaan Next.js.

---

# 1. Informasi Yayasan

Nama:

**Yayasan Titi Samaguna (Yatina)**

Lokasi:

**Dusun Penjor, Desa Genggelang, Kecamatan Gangga, Kabupaten Lombok Utara, Nusa Tenggara Barat, Indonesia.**

Yayasan bergerak di bidang pendidikan dan berada dalam lingkungan organisasi **Nahdlatul Wathan (NW)**.

Yayasan menaungi empat unit pendidikan:

1. **TK Yatina**
2. **MI Riadlul Jannah NW Penjor**
3. **MTs Riadlul Jannah NW Penjor**
4. **MA Riadlul Jannah NW Penjor**

Website harus memberikan kesan:

- Islami
- edukatif
- terpercaya
- sederhana
- modern
- ramah masyarakat
- tetap mempertahankan identitas lokal Lombok dan Nahdlatul Wathan

Website bukan aplikasi SaaS.

Prioritaskan penyampaian informasi, branding yayasan, dokumentasi kegiatan dan kemudahan calon siswa/orang tua mendapatkan informasi sekolah.

---

# 2. Teknologi

Gunakan:

- Next.js terbaru
- App Router
- TypeScript
- Tailwind CSS
- React Server Components secara default
- `next/image`
- `next/font`
- Lucide Icons bila membutuhkan icon
- ESLint
- static generation

Jangan menggunakan library yang tidak diperlukan.

Hindari penggunaan Client Component apabila tidak membutuhkan interaktivitas browser.

Gunakan `"use client"` hanya pada component seperti:

- mobile navigation
- carousel apabila memang diperlukan
- accordion
- interactive gallery
- interaksi UI sederhana lainnya

---

# 3. Static Website Architecture

Website fase pertama harus dapat dibangun secara static.

Hindari:

- database
- Prisma
- Supabase
- server authentication
- dashboard admin
- API route yang tidak diperlukan
- server action yang tidak diperlukan

Konten website disimpan dalam:

```text
src/
  data/
```

atau:

```text
src/
  content/
```

Gunakan TypeScript object agar content bersifat type-safe.

Contoh:

```ts
export interface EducationUnit {
  slug: string;
  name: string;
  shortName: string;
  level: "TK" | "MI" | "MTs" | "MA";
  description: string;
  image: string;
  address: string;
}
```

Kemudian:

```ts
export const educationUnits: EducationUnit[] = [...]
```

Arsitektur harus dibuat supaya suatu saat sumber data tersebut mudah diganti menjadi CMS atau database tanpa perlu merombak seluruh UI.

---

# 4. Design Direction

Gunakan website:

https://ribath-almusthofa.org

sebagai **inspirasi pengalaman pengguna dan penyajian konten**, bukan untuk dicopy pixel-by-pixel.

Ambil inspirasi dari:

- penggunaan foto kegiatan sebagai elemen visual utama
- typography yang bersih
- whitespace yang cukup
- section informasi yang sederhana
- storytelling yayasan
- navigasi yang tidak rumit
- layout modern tetapi tetap sesuai institusi pendidikan Islam

Buat identitas visual Yatina sendiri.

---

# 5. Branding

Gunakan karakter warna bernuansa:

- hijau tua sebagai primary
- hijau natural sebagai secondary
- putih/off-white untuk background
- warna emas lembut sebagai accent jika diperlukan

Jangan membuat desain terlalu ramai.

Hindari:

- gradient berlebihan
- glassmorphism berlebihan
- shadow besar
- card pada setiap elemen
- animasi berlebihan
- desain seperti dashboard SaaS

Gunakan rounded corner secara moderat.

Prioritaskan photography dan typography.

---

# 6. Typography

Gunakan kombinasi typography yang memberikan kesan:

**Islamic educational institution + modern professional website.**

Gunakan font dari `next/font`.

Pastikan:

- heading memiliki hierarchy yang kuat
- body mudah dibaca
- line-height nyaman
- mobile typography responsive
- jangan menggunakan terlalu banyak font

Gunakan maksimal dua font family.

---

# 7. Global Navigation

Desktop navbar:

```text
Logo Yatina

Beranda
Tentang Kami
Unit Pendidikan
Kegiatan
PPDB
Galeri
Kontak
```

"Unit Pendidikan" memiliki dropdown:

```text
TK Yatina
MI Riadlul Jannah NW Penjor
MTs Riadlul Jannah NW Penjor
MA Riadlul Jannah NW Penjor
```

Tambahkan CTA:

**Informasi PPDB**

Navbar harus:

- responsive
- accessible
- sticky atau semi-sticky
- tetap sederhana
- mobile memiliki hamburger menu

---

# 8. Sitemap

Gunakan route berikut:

```text
/
 /tentang
 /unit-pendidikan
 /unit-pendidikan/tk-yatina
 /unit-pendidikan/mi-riadlul-jannah
 /unit-pendidikan/mts-riadlul-jannah
 /unit-pendidikan/ma-riadlul-jannah

 /kegiatan
 /kegiatan/[slug]

 /ppdb
 /galeri
 /kontak
```

Karena website static, halaman detail kegiatan berasal dari static data dan menggunakan `generateStaticParams()`.

---

# 9. Homepage

Homepage harus menjadi landing page utama yayasan.

Susunan section:

## Section 1 — Hero

Gunakan foto asli siswa/sekolah sebagai background atau visual dominan.

Content contoh:

**Yayasan Titi Samaguna**

Headline:

> Mendidik Generasi Berilmu, Berakhlak dan Bermanfaat

Supporting text:

> Yayasan pendidikan yang menaungi jenjang TK hingga Madrasah Aliyah di Dusun Penjor, Desa Genggelang, Lombok Utara.

CTA:

**Kenali Yatina**

Secondary CTA:

**Lihat Unit Pendidikan**

Tampilkan identitas:

**TK • MI • MTs • MA**

Hindari hero yang terlihat seperti startup teknologi.

---

# 10. Intro Yayasan

Section berikutnya memperkenalkan yayasan.

Heading:

**Membangun Pendidikan dari Penjor untuk Generasi Masa Depan**

Berikan placeholder content karena informasi resmi sejarah yayasan akan diberikan kemudian.

Jangan membuat fakta atau sejarah fiktif.

Gunakan:

```ts
TODO_CONTENT;
```

untuk informasi yang belum diberikan.

Contoh:

```ts
history: "TODO_CONTENT: sejarah resmi Yayasan Titi Samaguna";
```

Jangan mengarang:

- tahun pendirian
- nama pendiri
- jumlah siswa
- jumlah alumni
- prestasi
- visi/misi resmi

---

# 11. Unit Pendidikan

Buat section:

**Pendidikan dari Usia Dini hingga Madrasah Aliyah**

Tampilkan empat unit.

## TK Yatina

Kategori:

**Pendidikan Anak Usia Dini**

CTA:

**Lihat TK Yatina**

---

## MI Riadlul Jannah NW Penjor

Kategori:

**Madrasah Ibtidaiyah**

CTA:

**Lihat MI**

---

## MTs Riadlul Jannah NW Penjor

Kategori:

**Madrasah Tsanawiyah**

CTA:

**Lihat MTs**

---

## MA Riadlul Jannah NW Penjor

Kategori:

**Madrasah Aliyah**

CTA:

**Lihat MA**

Gunakan photography yang besar dan menarik.

Jangan menjadikan semua informasi sebagai card kecil.

---

# 12. Nilai Pendidikan

Buat section tentang nilai pendidikan yayasan.

Untuk sementara gunakan konsep placeholder:

- Keislaman
- Ilmu Pengetahuan
- Akhlakul Karimah
- Kedisiplinan
- Kebersamaan
- Pengabdian kepada masyarakat

Tetapi tandai data tersebut agar mudah dikoreksi setelah yayasan memberikan nilai resmi.

---

# 13. Identitas NW

Karena sekolah berada dalam lingkungan Nahdlatul Wathan, sediakan section yang bisa digunakan untuk menjelaskan identitas tersebut.

Contoh heading:

**Bernaung dalam Tradisi Pendidikan Nahdlatul Wathan**

Namun:

Jangan membuat klaim organisasi atau hubungan hukum yang belum diberikan.

Content sementara harus berupa placeholder.

Struktur data:

```ts
nwIdentity: {
  title: "...",
  description: "TODO_CONTENT"
}
```

---

# 14. Kegiatan Terbaru

Homepage menampilkan tiga atau empat kegiatan terbaru.

Contoh kategori:

- Kegiatan Madrasah
- Keagamaan
- Prestasi
- Ekstrakurikuler
- Yayasan
- Sosial

Setiap kegiatan memiliki:

```ts
{
  slug;
  title;
  excerpt;
  image;
  category;
  date;
  educationUnit;
}
```

Homepage hanya mengambil beberapa item terbaru.

CTA:

**Lihat Semua Kegiatan**

---

# 15. Gallery Preview

Buat visual photo gallery.

Prioritaskan:

- kegiatan belajar
- kegiatan keagamaan
- siswa
- guru
- lingkungan sekolah
- acara yayasan

Gunakan asymmetric grid atau masonry-style layout sederhana.

CTA:

**Lihat Galeri**

---

# 16. PPDB

Tambahkan section penting:

**Penerimaan Peserta Didik Baru**

Copy sementara:

> Bergabung bersama keluarga besar Yayasan Titi Samaguna dan temukan lingkungan pendidikan yang mendukung perkembangan ilmu, akhlak dan karakter peserta didik.

Tampilkan jenjang:

```text
TK
MI
MTs
MA
```

CTA utama:

**Informasi PPDB**

CTA secondary:

**Hubungi Panitia**

WhatsApp number harus berasal dari config/data.

Jangan hardcode nomor di banyak component.

Contoh:

```ts
siteConfig.contact.whatsapp;
```

---

# 17. Location

Tampilkan:

**Yayasan Titi Samaguna**

Dusun Penjor  
Desa Genggelang  
Kecamatan Gangga  
Kabupaten Lombok Utara  
Nusa Tenggara Barat

Sediakan placeholder untuk:

- Google Maps URL
- coordinates
- nomor WhatsApp
- email
- Instagram
- Facebook
- YouTube

Jangan membuat data palsu.

---

# 18. Footer

Footer terdiri dari:

Logo + Yayasan Titi Samaguna

Deskripsi singkat.

Menu:

```text
Tentang Kami
Unit Pendidikan
Kegiatan
PPDB
Galeri
Kontak
```

Unit:

```text
TK Yatina
MI Riadlul Jannah NW Penjor
MTs Riadlul Jannah NW Penjor
MA Riadlul Jannah NW Penjor
```

Contact information.

Social media.

Copyright:

```text
© {currentYear} Yayasan Titi Samaguna. All rights reserved.
```

---

# 19. Halaman Tentang Kami

Route:

```text
/tentang
```

Struktur:

### Hero

Tentang Yayasan Titi Samaguna

### Sekilas Yatina

Informasi umum.

### Sejarah

Gunakan placeholder sampai data resmi tersedia.

### Visi

Placeholder.

### Misi

Placeholder.

### Nilai Pendidikan

Placeholder/data terstruktur.

### Struktur Yayasan

Siapkan layout tetapi gunakan placeholder.

Contoh:

```ts
organization = [];
```

### Identitas Nahdlatul Wathan

Section tersendiri.

### Lokasi

Alamat + map.

---

# 20. Halaman Unit Pendidikan

Route:

```text
/unit-pendidikan
```

Heading:

**Unit Pendidikan Yayasan Titi Samaguna**

Intro singkat.

Kemudian tampilkan keempat sekolah dengan visual besar.

Setiap sekolah menuju halaman masing-masing.

---

# 21. Detail Sekolah

Gunakan satu reusable template.

Contoh:

```text
/unit-pendidikan/tk-yatina
/unit-pendidikan/mi-riadlul-jannah
/unit-pendidikan/mts-riadlul-jannah
/unit-pendidikan/ma-riadlul-jannah
```

Jangan membuat empat halaman dengan duplicated markup.

Gunakan data:

```ts
educationUnits;
```

dan dynamic route bila lebih baik:

```text
/unit-pendidikan/[slug]
```

dengan:

```ts
generateStaticParams();
```

Setiap halaman memiliki:

### School Hero

Nama sekolah + foto.

### Profil Sekolah

Deskripsi.

### Visi & Misi

Placeholder.

### Program Pendidikan

Placeholder.

### Kegiatan Unggulan

Placeholder.

### Fasilitas

Placeholder.

### Galeri Sekolah

Filter berdasarkan unit.

### Informasi PPDB

CTA.

### Kontak

Informasi unit bila tersedia.

---

# 22. Halaman Kegiatan

Route:

```text
/kegiatan
```

Display artikel/kegiatan.

Filter visual berdasarkan:

```text
Semua
Yayasan
TK
MI
MTs
MA
```

Jika implementasi filter membutuhkan Client Component, hanya bagian filter/grid tersebut yang menjadi Client Component.

Data kegiatan tetap static.

---

# 23. Detail Kegiatan

Route:

```text
/kegiatan/[slug]
```

Static generation.

Struktur:

```text
breadcrumb

category
title
date

featured image

article content

related activities
```

Tambahkan metadata SEO berdasarkan kegiatan.

---

# 24. PPDB Page

Route:

```text
/ppdb
```

Heading:

**Penerimaan Peserta Didik Baru**

Display pilihan:

```text
TK Yatina
MI Riadlul Jannah NW Penjor
MTs Riadlul Jannah NW Penjor
MA Riadlul Jannah NW Penjor
```

Masing-masing memiliki:

- jenjang
- informasi pendaftaran
- persyaratan
- jadwal
- biaya bila ada
- contact person
- WhatsApp CTA

Semua menggunakan placeholder sampai informasi resmi tersedia.

Tidak perlu registration system online untuk fase pertama.

---

# 25. Gallery

Route:

```text
/galeri
```

Gallery dapat difilter berdasarkan:

```text
Semua
Yayasan
TK
MI
MTs
MA
```

Optimization wajib menggunakan `next/image`.

Thumbnail tidak boleh menyebabkan layout shift.

---

# 26. Contact

Route:

```text
/kontak
```

Tampilkan:

- alamat
- WhatsApp
- email
- social media
- Google Maps

CTA:

**Hubungi melalui WhatsApp**

Tidak perlu contact form backend pada fase pertama.

Jika contact form belum memiliki backend, jangan membuat form yang terlihat berfungsi tetapi sebenarnya tidak mengirimkan data.

---

# 27. Site Configuration

Centralize global information.

Contoh:

```ts
export const siteConfig = {
  name: "Yayasan Titi Samaguna",
  shortName: "Yatina",
  address: {
    hamlet: "Penjor",
    village: "Genggelang",
    district: "Gangga",
    regency: "Lombok Utara",
    province: "Nusa Tenggara Barat",
    country: "Indonesia",
  },

  contact: {
    whatsapp: "",
    email: "",
  },

  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  maps: {
    url: "",
  },
};
```

---

# 28. Proposed Project Structure

Gunakan struktur kurang lebih:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   │
│   ├── tentang/
│   │   └── page.tsx
│   │
│   ├── unit-pendidikan/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── kegiatan/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── ppdb/
│   │   └── page.tsx
│   │
│   ├── galeri/
│   │   └── page.tsx
│   │
│   └── kontak/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── mobile-navigation.tsx
│   │
│   ├── home/
│   ├── education/
│   ├── activity/
│   ├── gallery/
│   └── ui/
│
├── data/
│   ├── site.ts
│   ├── education-units.ts
│   ├── activities.ts
│   ├── gallery.ts
│   └── ppdb.ts
│
├── types/
│   ├── education.ts
│   ├── activity.ts
│   └── gallery.ts
│
└── lib/
    └── utils.ts
```

Jangan membuat abstraction yang tidak diperlukan.

---

# 29. Reusable Components

Minimal siapkan:

```text
Header
MobileNavigation
Footer

Container
SectionHeading
Breadcrumb

EducationUnitPreview
EducationUnitHero

ActivityCard
ActivityGrid

GalleryGrid

WhatsAppCTA

PPDBCTA

LocationSection
```

Jangan membuat satu component raksasa untuk homepage.

Pisahkan berdasarkan domain/section yang masuk akal.

---

# 30. Image Strategy

Foto merupakan bagian penting website.

Gunakan:

```text
/public/images/
```

Struktur:

```text
images/
  foundation/
  tk/
  mi/
  mts/
  ma/
  activities/
  gallery/
```

Gunakan temporary placeholder image selama foto asli belum tersedia.

Tetapi buat proses penggantian foto menjadi sangat mudah.

Selalu gunakan:

```tsx
<Image />
```

dari Next.js.

Set:

- width/height atau fill secara tepat
- sizes
- meaningful alt text
- priority hanya untuk gambar above-the-fold yang penting

---

# 31. SEO

Buat metadata global.

Format title:

```text
Yayasan Titi Samaguna | Pendidikan Islam di Penjor, Lombok Utara
```

Setiap halaman memiliki title dan description sendiri.

Contoh sekolah:

```text
MI Riadlul Jannah NW Penjor | Yayasan Titi Samaguna
```

Implementasikan:

- metadata
- OpenGraph
- favicon placeholder
- robots
- sitemap

Tambahkan semantic HTML:

```text
header
nav
main
section
article
footer
```

---

# 32. Local SEO

Karena yayasan memiliki lokasi fisik, prioritaskan pencarian seperti:

```text
Yayasan Titi Samaguna
Yatina Penjor
Sekolah Penjor Lombok Utara
Madrasah Penjor
MI Riadlul Jannah NW Penjor
MTs Riadlul Jannah NW Penjor
MA Riadlul Jannah NW Penjor
```

Namun jangan melakukan keyword stuffing.

Konten harus tetap natural.

---

# 33. Accessibility

Pastikan:

- semantic HTML
- navigation keyboard friendly
- focus state
- alt images
- sufficient contrast
- proper heading hierarchy
- mobile menu accessible
- aria label bila diperlukan

Target minimal:

**WCAG AA reasonable compliance.**

---

# 34. Performance

Target Lighthouse:

```text
Performance >= 90
Accessibility >= 90
Best Practices >= 90
SEO >= 90
```

Prioritaskan:

- Server Components
- minimal JavaScript
- static generation
- optimized image
- optimized font
- no unnecessary animation library
- no unnecessary dependencies

---

# 35. Responsive Design

Design mobile-first.

Pastikan bekerja baik pada:

```text
360px
390px
768px
1024px
1280px
1440px+
```

Homepage pada mobile tidak boleh sekadar versi desktop yang diperkecil.

Perhatikan khusus:

- navbar
- hero typography
- photography
- unit pendidikan
- gallery
- PPDB CTA
- footer

---

# 36. Animation

Animation sangat minimal.

Gunakan CSS transition untuk:

- hover
- navigation
- buttons
- image interactions

Jangan memasang Framer Motion hanya untuk membuat semua section fade-in.

Website institusi pendidikan harus terasa cepat dan tenang.

---

# 37. Content Integrity

INI SANGAT PENTING.

Jangan pernah mengarang informasi resmi yayasan.

Jika data belum tersedia, gunakan:

```text
TODO_CONTENT
```

Terutama untuk:

- sejarah
- tahun berdiri
- pendiri
- jumlah siswa
- jumlah guru
- prestasi
- akreditasi
- visi
- misi
- nomor kontak
- rekening
- kepala sekolah
- struktur organisasi
- program unggulan
- biaya PPDB

Lebih baik menampilkan placeholder di source code daripada membuat informasi palsu.

---

# 38. UI Content Rule

Pada development UI, jangan memenuhi halaman dengan Lorem Ipsum.

Gunakan copy bahasa Indonesia yang relevan dan natural apabila merupakan generic UI copy.

Untuk factual institutional content yang belum diketahui gunakan `TODO_CONTENT`.

---

# 39. Phase 1 Scope

Implementasikan hanya:

### Public Static Website

- Homepage
- Tentang Yayasan
- Unit Pendidikan
- Detail 4 unit pendidikan
- Kegiatan
- Detail kegiatan
- PPDB
- Galeri
- Kontak
- Responsive navigation
- SEO
- Static content architecture

JANGAN implementasikan:

- login
- admin
- student portal
- teacher portal
- database
- CMS
- online payment
- online PPDB system
- attendance
- school management
- donation management
- analytics dashboard

Hal tersebut berada di luar scope Phase 1.

---

# 40. Development Stages

Kerjakan secara bertahap.

## Stage 1 — Foundation

Setup:

- Next.js
- TypeScript
- Tailwind
- fonts
- global styles
- color tokens
- container
- siteConfig

Pastikan project dapat build.

---

## Stage 2 — Global Layout

Implementasikan:

- Header
- Desktop navigation
- Mobile navigation
- Footer
- reusable container
- reusable section heading

Pastikan responsive.

---

## Stage 3 — Homepage

Implementasikan seluruh homepage.

Prioritaskan visual homepage sebelum halaman lain.

Pastikan homepage terlihat production-quality.

---

## Stage 4 — Education Units

Implementasikan:

```text
/unit-pendidikan
/unit-pendidikan/[slug]
```

Gunakan reusable template dan static data.

---

## Stage 5 — Foundation Profile

Implementasikan:

```text
/tentang
```

---

## Stage 6 — Activities

Implementasikan:

```text
/kegiatan
/kegiatan/[slug]
```

Static generation.

---

## Stage 7 — PPDB, Gallery & Contact

Implementasikan:

```text
/ppdb
/galeri
/kontak
```

---

## Stage 8 — SEO & Optimization

Review:

- metadata
- OpenGraph
- sitemap
- robots
- images
- fonts
- bundle
- accessibility
- responsive
- Lighthouse

---

# 41. Agent Working Rules

Setelah menyelesaikan setiap stage:

1. Jalankan lint.
2. Jalankan type checking.
3. Jalankan production build.
4. Perbaiki error sebelum melanjutkan.
5. Jangan meninggalkan TypeScript error.
6. Jangan menggunakan `any` tanpa alasan kuat.
7. Jangan membuat dependency baru jika native Next.js/CSS sudah cukup.
8. Jangan melakukan refactor besar yang tidak berhubungan dengan task.
9. Pastikan existing functionality tetap bekerja.
10. Review responsive behavior.

---

# 42. Definition of Done

Phase 1 dianggap selesai ketika:

- seluruh halaman dapat diakses
- seluruh route static-compatible
- homepage production-quality
- empat unit pendidikan memiliki halaman masing-masing
- tidak ada informasi institusi yang dibuat-buat
- responsive mobile/desktop
- navigation bekerja
- gambar optimized
- metadata SEO tersedia
- sitemap dan robots tersedia
- tidak ada TypeScript error
- lint berhasil
- production build berhasil
- website dapat langsung dideploy
- kode mudah dikembangkan menjadi dynamic website pada fase berikutnya
