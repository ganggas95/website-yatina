## 1. Goal
Menambahkan menu dan halaman baru untuk Prestasi serta Ekstrakurikuler (dengan subhalaman Pramuka dan Sepak Bola) dalam struktur App Router yang statis, konsisten dengan pola data-driven situs saat ini.

## 2. Approach
Situs saat ini sudah memusatkan konten aktivitas di [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&root=%252F) dan menampilkan navigasi utama secara hardcoded di [header.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/layout/header.tsx?type=file&root=%252F). Pendekatan paling stabil adalah tetap memakai sumber data yang sama, lalu menambah metadata ringan pada item aktivitas supaya halaman Prestasi, Ekstrakurikuler, Pramuka, dan Sepak Bola dapat dibangun dengan filter yang eksplisit, bukan dengan daftar slug yang rapuh.

Untuk menjaga UI tetap konsisten dan tidak menduplikasi hero/listing layout dari [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/kegiatan/page.tsx?type=file&root=%252F), implementasi sebaiknya menambah komponen server yang bisa merender halaman listing aktivitas bertema. Dengan begitu route baru hanya menyuplai metadata, breadcrumb, judul, dan subset data yang relevan.

## 3. File Changes
- Modify `src/types/activity.ts` (sekitar baris 3-20)
  - Tambahkan properti opsional untuk klasifikasi halaman baru, misalnya `section?: "prestasi" | "ekstrakurikuler"` dan `program?: "pramuka" | "sepak-bola"` atau nama setara.
  - Tujuannya agar filter route baru tidak bergantung pada pencocokan judul/slug.

- Modify `src/data/activities.ts` (sekitar baris 9-97)
  - Lengkapi item yang sudah ada dengan metadata section/program yang baru.
  - Tambahkan minimal data aktivitas/entri representatif untuk `Prestasi` dan `Sepak Bola`, karena saat ini hanya ada `ekstrakurikuler-pramuka` dan belum ada data untuk dua halaman baru.
  - Tambahkan helper terarah seperti `getActivitiesByCategory`, `getActivitiesBySection`, atau `getActivitiesByProgram` agar page files tetap tipis.

- Create `src/components/activity/activity-list-page.tsx`
  - Komponen server reusable untuk hero, breadcrumb opsional, deskripsi halaman, dan grid aktivitas.
  - Gunakan komponen yang sudah ada seperti [ActivityGrid](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/activity/activity-grid.tsx?type=file&root=%252F), [Container](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/ui/container.tsx?type=file&root=%252F), [SectionHeading](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/ui/section-heading.tsx?type=file&root=%252F), dan [Breadcrumb](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/ui/breadcrumb.tsx?type=file&root=%252F).

- Create `src/app/prestasi/page.tsx`
  - Halaman utama Prestasi dengan metadata sendiri, copy Indonesia, dan daftar item aktivitas kategori/section prestasi.

- Create `src/app/ekstrakurikuler/page.tsx`
  - Landing page Ekstrakurikuler yang menjelaskan program ekstrakurikuler dan menautkan ke subhalaman Pramuka serta Sepak Bola.
  - Bisa menampilkan semua aktivitas section ekstrakurikuler di bawah hero, supaya page induk tidak kosong.

- Create `src/app/ekstrakurikuler/pramuka/page.tsx`
  - Halaman program Pramuka yang memfilter item program `pramuka`.

- Create `src/app/ekstrakurikuler/sepak-bola/page.tsx`
  - Halaman program Sepak Bola yang memfilter item program `sepak-bola`.

- Modify `src/components/layout/header.tsx` (baris 12-27, 32, 55-62, 98-159, 208-246)
  - Ubah struktur `navLinks` supaya mendukung dua dropdown independen: `Unit Pendidikan` yang sudah ada dan `Ekstrakurikuler` yang baru, plus link top-level `Prestasi`.
  - Refactor state dropdown yang sekarang masih spesifik ke `educationOpen` agar tidak mentok pada satu menu dropdown saja.
  - Pastikan desktop dan mobile navigation sama-sama menampilkan struktur baru.

- Modify `src/components/layout/footer.tsx` (baris 18-25, 117-131)
  - Tambahkan tautan `Prestasi` dan `Ekstrakurikuler` pada menu footer agar struktur navigasi konsisten di seluruh situs.

- Modify `src/app/sitemap.ts` (baris 10-33)
  - Tambahkan route statis baru `/prestasi`, `/ekstrakurikuler`, `/ekstrakurikuler/pramuka`, dan `/ekstrakurikuler/sepak-bola`.
  - Pertahankan aktivitas detail di `/kegiatan/[slug]` seperti pola sekarang.

- Optional Modify `src/components/home/latest-activities.tsx` (baris 17-24)
  - Jika setelah penambahan data terbaru komposisi konten homepage jadi kurang representatif, sesuaikan copy deskripsi agar eksplisit menyebut prestasi dan program ekstrakurikuler baru.
  - Ini opsional; lakukan hanya bila copy lama menjadi tidak akurat.

## 4. Implementation Steps
### Task 1: Perluas model data aktivitas
1. Ubah `src/types/activity.ts` untuk menambah field klasifikasi halaman baru yang opsional dan tetap backward-compatible dengan item lama.
2. Ubah `src/data/activities.ts` untuk mengisi field baru pada data yang sudah ada, khususnya menandai item Pramuka sebagai bagian dari section ekstrakurikuler dan program `pramuka`.
3. Tambahkan item baru di `src/data/activities.ts` untuk minimal satu entri `Prestasi` dan satu entri `Sepak Bola`, lengkap dengan slug, excerpt, category, date, dan image placeholder yang mengikuti pola `activityImage(...)` pada baris 4-7.
4. Tambahkan helper query di `src/data/activities.ts` agar route baru dapat memanggil daftar terfilter tanpa logika inline yang berulang.

### Task 2: Siapkan komponen halaman listing reusable
1. Buat `src/components/activity/activity-list-page.tsx` untuk membungkus hero section, breadcrumb, deskripsi, dan pemanggilan `ActivityGrid`.
2. Rancang props komponen ini agar bisa dipakai oleh `src/app/kegiatan/page.tsx`, `src/app/prestasi/page.tsx`, `src/app/ekstrakurikuler/page.tsx`, dan subhalaman program tanpa duplikasi markup.
3. Bila diperlukan, sesuaikan `src/components/activity/activity-grid.tsx` agar empty-state copy bisa diparameterkan; lakukan hanya jika copy default “kategori” tidak pas untuk halaman program.

### Task 3: Tambahkan route baru
1. Buat `src/app/prestasi/page.tsx` dengan metadata terpisah dan data dari helper prestasi.
2. Buat `src/app/ekstrakurikuler/page.tsx` sebagai landing page induk yang menampilkan pengantar, tautan ke `/ekstrakurikuler/pramuka` dan `/ekstrakurikuler/sepak-bola`, serta daftar aktivitas ekstrakurikuler.
3. Buat `src/app/ekstrakurikuler/pramuka/page.tsx` yang memfilter program `pramuka`.
4. Buat `src/app/ekstrakurikuler/sepak-bola/page.tsx` yang memfilter program `sepak-bola`.
5. Pertahankan route detail `src/app/kegiatan/[slug]/page.tsx` apa adanya, kecuali bila breadcrumb perlu menaut kembali ke halaman tema yang lebih tepat; kalau tidak ada kebutuhan UX kuat, jangan perluas scope ke detail page.

### Task 4: Integrasikan ke navigasi global
1. Refactor `src/components/layout/header.tsx` agar `navLinks` dapat memuat link biasa dan dropdown multipel tanpa state yang hardcoded ke `educationOpen`.
2. Tambahkan top-level link `Prestasi` di header, serta menu `Ekstrakurikuler` dengan children `Pramuka` dan `Sepak Bola` pada desktop dropdown dan mobile drawer.
3. Ubah `src/components/layout/footer.tsx` untuk menambahkan tautan ke halaman baru di footer menu.

### Task 5: Perbarui SEO dan discoverability
1. Tambahkan route baru ke `src/app/sitemap.ts` bersama prioritas yang sejalan dengan halaman informasional lain.
2. Pastikan setiap page baru memiliki `metadata` yang relevan dalam bahasa Indonesia, termasuk title, description, dan keywords seperlunya.
3. Tinjau `src/components/home/latest-activities.tsx` bila copy ringkas homepage menjadi tidak akurat setelah data prestasi dan sepak bola ditambahkan.

## 5. Acceptance Criteria
- Header desktop dan mobile menampilkan menu utama `Prestasi` dan menu `Ekstrakurikuler` dengan submenu `Pramuka` dan `Sepak Bola`.
- Route `/prestasi` merender halaman statis yang buildable dan menampilkan daftar item aktivitas bertema prestasi dari `src/data/activities.ts`.
- Route `/ekstrakurikuler` merender halaman induk yang dapat diakses langsung dan menaut ke `/ekstrakurikuler/pramuka` serta `/ekstrakurikuler/sepak-bola`.
- Route `/ekstrakurikuler/pramuka` hanya menampilkan item program Pramuka.
- Route `/ekstrakurikuler/sepak-bola` hanya menampilkan item program Sepak Bola.
- Tidak ada filtering halaman yang bergantung pada string judul atau daftar slug hardcoded; filtering menggunakan field data yang eksplisit pada model aktivitas.
- `src/app/sitemap.ts` memasukkan keempat route baru sehingga halaman ikut terindeks dalam sitemap statis.
- Seluruh copy baru tetap berbahasa Indonesia dan tidak memperkenalkan kebutuhan backend, API route, atau client state baru di luar kebutuhan dropdown navigasi yang memang sudah ada.

## 6. Verification Steps
1. Jalankan `npm run typecheck` untuk memastikan field baru di `Activity` dan seluruh page/component baru lolos pemeriksaan TypeScript.
2. Jalankan `npm run lint` untuk memastikan route dan komponen baru mengikuti aturan lint proyek.
3. Jalankan `npm run build` untuk memverifikasi semua halaman baru tetap statically buildable di Next.js App Router.
4. Verifikasi manual:
   - buka `/prestasi` dan pastikan kontennya tampil;
   - buka `/ekstrakurikuler` dan pastikan ada tautan ke dua subhalaman;
   - buka `/ekstrakurikuler/pramuka` dan `/ekstrakurikuler/sepak-bola` lalu cek daftar item sesuai program;
   - cek header desktop, mobile drawer, dan footer untuk memastikan semua tautan baru muncul dan mengarah ke route yang benar.
5. Cek `sitemap.xml` hasil build atau output route metadata untuk memastikan empat route baru tercantum.

## 7. Risks & Mitigations
- Risiko: model data sekarang belum punya field untuk membedakan program ekstrakurikuler; jika difilter berdasarkan slug/judul, implementasi akan rapuh.
  - Mitigasi: tambahkan field klasifikasi opsional di `src/types/activity.ts` dan isi eksplisit di `src/data/activities.ts`.
- Risiko: `header.tsx` saat ini hanya mendukung satu dropdown (`educationOpen`), sehingga menambah dropdown kedua tanpa refactor dapat memicu perilaku buka/tutup yang salah.
  - Mitigasi: ubah state menjadi keyed/open-menu state yang generik sebelum menambah menu `Ekstrakurikuler`.
- Risiko: halaman baru bisa kosong karena data `Prestasi` dan `Sepak Bola` belum ada.
  - Mitigasi: tambahkan minimal satu entri representatif untuk masing-masing halaman saat implementasi, memakai pola placeholder konten yang sudah lazim di repository ini.
- Risiko: duplikasi markup antara `/kegiatan`, `/prestasi`, dan `/ekstrakurikuler/*` akan meningkatkan biaya maintenance.
  - Mitigasi: ekstrak layout listing ke komponen reusable server-side sebelum membuat route-route baru.