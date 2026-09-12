## 1. Goal

Menyiapkan fondasi SEO teknis dan on-page untuk situs statis Yatina agar setiap URL penting memiliki metadata, canonical URL, social preview, structured data, sitemap/robots yang konsisten, serta konten dan tautan internal yang lebih mudah dipahami mesin pencari.

## 2. Approach

Gunakan utilitas SEO terpusat berbasis Metadata API Next.js sehingga judul, deskripsi, canonical, dan Open Graph tidak ditulis dengan format yang berbeda-beda di setiap route. Tambahkan structured data JSON-LD yang bersumber dari `siteConfig` dan data kegiatan/unit pendidikan, sehingga informasi organisasi, lokasi, breadcrumbs, artikel, dan institusi pendidikan tetap decoupled dari komponen presentasi. Pertahankan arsitektur statis dan dependency saat ini; panduan Search Console/Google Business Profile hanya didokumentasikan untuk eksekusi manual setelah deployment.

## 3. File Changes

- **Create** `src/lib/seo.ts` — helper untuk URL absolut, canonical route, metadata halaman, judul/deskripsi Open Graph, serta pemilihan gambar sosial yang memakai aset publik yang sudah ada.
- **Create** `src/components/seo/json-ld.tsx` — server component aman untuk merender JSON-LD tanpa menambah dependency.
- **Modify** `src/data/site.ts:1-45` — rapikan identitas brand yang tidak konsisten (termasuk typo “Titik/Titi”), sediakan nama legal/short name, alamat terstruktur, dan data organisasi yang tersedia; jangan mempublikasikan nilai `TODO_CONTENT` sebagai schema atau tautan sosial.
- **Modify** `src/app/layout.tsx:23-79` — gunakan helper SEO, lengkapi Open Graph image/default social metadata, dan pasang schema global `Organization`/website dengan data Yatina.
- **Modify** `src/app/page.tsx:1-25` — tambahkan metadata homepage yang eksplisit dan schema `WebSite`/organisasi bila belum diwariskan secara global.
- **Modify** `src/app/tentang/page.tsx:13-33`, `src/app/unit-pendidikan/page.tsx:7-20`, `src/app/ppdb/page.tsx:9-20`, `src/app/kegiatan/page.tsx:5-18`, `src/app/prestasi/page.tsx:5-18`, `src/app/ekstrakurikuler/page.tsx:7-18`, `src/app/galeri/page.tsx:7-18`, dan `src/app/kontak/page.tsx:20-31` — migrasikan metadata ke helper agar setiap route memiliki canonical dan social metadata yang benar; selaraskan keyword dengan intent halaman tanpa keyword stuffing.
- **Modify** `src/app/ekstrakurikuler/pramuka/page.tsx:5-9` dan `src/app/ekstrakurikuler/sepak-bola/page.tsx:5-9` — migrasikan metadata ke helper dan tambahkan breadcrumb structured data pada halaman program.
- **Modify** `src/app/kegiatan/[slug]/page.tsx:17-32` — tambahkan canonical, image metadata absolut, `Article` JSON-LD, dan `BreadcrumbList`; pertahankan static generation dan gunakan tanggal kegiatan sebagai `datePublished`.
- **Modify** `src/app/unit-pendidikan/[slug]/page.tsx:17-36` — tambahkan canonical, metadata gambar, `EducationalOrganization` JSON-LD untuk unit, dan `BreadcrumbList`.
- **Modify** `src/app/sitemap.ts:5-48` — gunakan URL canonical dari helper, hindari `lastModified: new Date()` yang berubah setiap build, dan tetap masukkan seluruh route statis, unit pendidikan, serta kegiatan yang memang dapat di-generate.
- **Modify** `src/app/robots.ts:4-16` — konsistenkan sitemap/host terhadap base URL canonical dan pertahankan akses crawl publik.
- **Modify** `src/components/ui/breadcrumb.tsx:1-58` atau buat wrapper server di area SEO — pertahankan breadcrumb visual yang sekarang dan sediakan representasi data yang bisa dipakai schema tanpa menjadikan seluruh halaman client-only.
- **Modify** `src/components/layout/header.tsx:18-36`, `src/components/layout/footer.tsx:1-170`, dan komponen CTA terkait — aktifkan tautan internal penting yang saat ini dikomentari (khususnya PPDB dan ekstrakurikuler) bila sesuai struktur navigasi, serta pastikan link eksternal placeholder tidak dirender sebagai URL kosong.
- **Modify** `src/components/home/hero-section.tsx:19-121`, `src/components/activity/activity-detail.tsx:45-205`, dan komponen halaman unit — audit heading hierarchy, semantic landmarks, `alt`, `sizes`, dan prioritas gambar untuk memastikan setiap halaman memiliki satu H1 bermakna dan gambar utama terindeks dengan konteks.
- **Modify** `src/data/activities.ts`, `src/data/education-units.ts`, `src/data/values.ts`, dan `src/data/site.ts` — tandai atau hilangkan konten placeholder dari output publik yang dapat menjadi thin content; pertahankan data yang memang sudah tersedia dan jangan membuat fakta baru.
- **Create** `docs/seo-checklist.md` — dokumentasikan target query utama per kelompok halaman, checklist deployment, verifikasi Search Console, pengiriman sitemap, validasi rich result, dan setup Google Business Profile tanpa menyimpan kredensial.

## 4. Implementation Steps

### Task 1: Bentuk sumber SEO tunggal

1. Tambahkan tipe/helper di `src/lib/seo.ts` untuk menerima `title`, `description`, `path`, `keywords`, `image`, dan tipe halaman lalu menghasilkan `Metadata` dengan canonical absolut, Open Graph, Twitter card, dan image alt.
2. Perbaiki data identitas di `src/data/site.ts`; normalisasi “Yayasan Titi Samaguna” di semua SEO-facing copy, alamat, dan schema.
3. Tambahkan `JsonLd` server component dengan serialisasi yang mencegah string konten merusak tag script.

### Task 2: Terapkan metadata dan schema global

1. Migrasikan metadata root di `src/app/layout.tsx` ke helper dan tambahkan default social image dari aset lokal yang sudah ada.
2. Tambahkan schema global `Organization` + `WebSite` menggunakan nama, URL, alamat, logo/favicon, dan koordinat yang sudah tersedia; omit field yang masih placeholder.
3. Tambahkan metadata eksplisit homepage di `src/app/page.tsx`, lalu migrasikan semua static page metadata listed di bagian File Changes.
4. Tambahkan schema breadcrumb pada route yang sudah memiliki breadcrumb visual, tanpa mengubahnya menjadi client component.

### Task 3: Perkuat route dinamis dan crawlability

1. Di `src/app/kegiatan/[slug]/page.tsx`, gunakan metadata helper dengan canonical per slug, gambar utama absolut, dan JSON-LD `Article` yang hanya memakai data activity.
2. Di `src/app/unit-pendidikan/[slug]/page.tsx`, gunakan metadata helper dan JSON-LD `EducationalOrganization`/breadcrumb untuk setiap unit.
3. Stabilkan `src/app/sitemap.ts`: static route memakai perubahan yang deterministik, dynamic route memakai tanggal kegiatan atau tanggal build hanya jika tidak ada tanggal konten; jangan masukkan URL yang tidak dapat dirender.
4. Validasi `src/app/robots.ts` terhadap canonical domain dan sitemap route.

### Task 4: On-page, internal linking, dan kualitas konten

1. Audit komponen hero/detail/unit agar heading hierarchy menghasilkan tepat satu H1 per halaman, H2 untuk section, dan landmark semantic tetap valid.
2. Pastikan gambar hero/detail memakai alt deskriptif, `sizes` yang sesuai, dan `priority` hanya untuk gambar above-the-fold.
3. Hubungkan halaman PPDB dan ekstrakurikuler dari navigasi/footer/CTA yang relevan; jangan membuat halaman baru atau tautan ke data placeholder.
4. Hapus typo “Titik Samaguna” dari konten publik dan ubah placeholder yang tampil ke pengguna menjadi copy jujur yang tidak dipromosikan sebagai fakta.
5. Tulis `docs/seo-checklist.md` dengan target intent: brand/lokasi untuk homepage dan tentang, jenjang untuk unit pendidikan, pendaftaran untuk PPDB, serta kegiatan/prestasi untuk arsip dan detail.

### Task 5: Verifikasi dan handoff

1. Jalankan `npm run typecheck`, `npm run lint`, dan `npm run build`.
2. Inspeksi output route metadata dan endpoint `/robots.txt`, `/sitemap.xml`, serta source HTML untuk JSON-LD.
3. Uji seluruh URL dari sitemap: status 200, canonical menunjuk ke URL sendiri, title/description tidak kosong, dan halaman dinamis memiliki schema yang sesuai.
4. Validasi JSON-LD dengan Rich Results Test/Schema Markup Validator setelah deployment.
5. Ikuti `docs/seo-checklist.md` untuk mendaftarkan property domain di Search Console, mengirim sitemap, memeriksa indexing, dan melengkapi Google Business Profile secara manual.

## 5. Acceptance Criteria

- Setiap route publik di `src/app` memiliki title non-kosong, description non-kosong, canonical absolut yang menunjuk ke URL route tersebut, dan Open Graph title/description.
- Homepage memiliki default social image yang dapat dimuat dari domain situs; route kegiatan dan unit pendidikan memakai gambar utama masing-masing dengan URL absolut dan alt yang bermakna.
- `/robots.txt` mengizinkan crawler publik dan menunjuk tepat ke `https://yatinapenjor.sch.id/sitemap.xml`.
- `/sitemap.xml` memuat homepage, seluruh static route, seluruh slug unit pendidikan, dan seluruh slug kegiatan yang dihasilkan `generateStaticParams`, tanpa URL duplikat atau 404.
- Source HTML root memuat JSON-LD valid untuk organisasi/website; halaman detail kegiatan memuat `Article`; halaman detail unit memuat `EducationalOrganization`; breadcrumb schema sesuai breadcrumb visual.
- Tidak ada schema, canonical, social link, atau metadata yang mengandung `TODO_CONTENT`, URL kosong, atau nama “Yayasan Titik Samaguna”.
- Setiap halaman utama dan detail memiliki tepat satu H1 yang menjelaskan intent halaman, semantic `main` tetap ada, dan gambar konten memiliki alt text.
- PPDB dan ekstrakurikuler dapat dicapai dari minimal satu navigasi/footer/CTA HTML yang dirender publik dan tidak hanya dari URL yang tersembunyi.
- `npm run typecheck`, `npm run lint`, dan `npm run build` selesai tanpa error.
- Dokumen checklist menjelaskan langkah Search Console, pengiriman sitemap, validasi schema, dan Google Business Profile tanpa mengklaim tindakan eksternal sudah dilakukan.

## 6. Verification Steps

- Jalankan `npm run typecheck`, `npm run lint`, dan `npm run build`.
- Setelah build/start, buka `/`, `/tentang`, `/unit-pendidikan/mi-riadlul-jannah`, `/kegiatan/<slug-valid>`, `/robots.txt`, dan `/sitemap.xml`.
- Periksa source HTML untuk `<title>`, meta description, canonical, `og:image`, dan script JSON-LD.
- Parse daftar URL sitemap dan request satu per satu untuk memastikan tidak ada 404.
- Coba slug unit/kegiatan tidak valid dan pastikan menghasilkan not-found tanpa muncul di sitemap.
- Cek mobile navigation: PPDB dan ekstrakurikuler bisa ditemukan, semua link placeholder dinonaktifkan atau tidak dirender.
- Jalankan validator JSON-LD/Rich Results setelah domain deployment tersedia; gunakan Search Console URL Inspection untuk homepage, halaman unit, PPDB, dan satu detail kegiatan.

## 7. Risks & Mitigations

- **Konten placeholder dapat menurunkan kualitas halaman.** Mitigasi: jangan masukkan placeholder ke schema/metadata; tampilkan copy status yang jelas atau sembunyikan section kosong sampai data nyata tersedia.
- **Canonical global saat ini berpotensi diwariskan ke semua route.** Mitigasi: tetapkan canonical per route melalui helper dan uji source setiap kelompok URL.
- **Metadata/social image relatif dapat gagal di crawler.** Mitigasi: gunakan `metadataBase` dan normalisasi semua image URL menjadi absolut dalam helper.
- **Schema organisasi dapat mempublikasikan fakta yang belum final.** Mitigasi: whitelist field dari `siteConfig`, omit kontak/media sosial yang masih `TODO_CONTENT`, dan review alamat/koordinat sebelum deploy.
- **Navigasi tambahan dapat memengaruhi layout mobile/client behavior.** Mitigasi: hanya mengubah konfigurasi link yang sudah ada, lalu verifikasi desktop dan mobile tanpa menambah state baru.
- **Google tidak menjamin rich result atau ranking dari structured data.** Mitigasi: perlakukan schema sebagai representasi fakta yang valid, lalu ukur indexing dan query melalui Search Console setelah publikasi.