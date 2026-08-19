## 1. Goal
Menggunakan `react-avatar` secara konsisten pada kartu struktur organisasi yayasan dan unit pendidikan, dengan aturan: pakai foto bila `image` valid, dan fallback ke avatar berbasis nama bila tidak ada foto.

## 2. Approach
Saat ini ada dua implementasi fallback yang berbeda: unit pendidikan membuat inisial manual di [organization-chart-section.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/organization-chart-section.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A0%2C%22second%22%3A5447%7D%2C%22lines%22%3A%7B%22first%22%3A0%2C%22second%22%3A178%7D%7D&root=%252F), sedangkan halaman yayasan memakai ikon `Users` di [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/tentang/page.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A9392%2C%22second%22%3A11599%7D%2C%22lines%22%3A%7B%22first%22%3A229%2C%22second%22%3A295%7D%7D&root=%252F). Saya sarankan satu komponen avatar terpusat yang membungkus `next/image` untuk foto lokal dan `react-avatar` untuk fallback nama, karena itu menyatukan perilaku tanpa mengubah arsitektur data di [education.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/types/education.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A0%2C%22second%22%3A1297%7D%2C%22lines%22%3A%7B%22first%22%3A0%2C%22second%22%3A54%7D%7D&root=%252F) dan [values.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/values.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A1909%2C%22second%22%3A2139%7D%2C%22lines%22%3A%7B%22first%22%3A68%2C%22second%22%3A74%7D%7D&root=%252F).

`react-avatar` 5.0.4 mendukung `src`, `name`, `maxInitials`, `round`, dan fallback ke initials dari nama, jadi kebutuhan user tercakup. Namun paket ini menambah dependency baru pada proyek yang saat ini belum memilikinya di [package.json](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/package.json?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A0%2C%22second%22%3A598%7D%2C%22lines%22%3A%7B%22first%22%3A0%2C%22second%22%3A31%7D%7D&root=%252F), jadi integrasi harus dibatasi hanya untuk fallback avatar dan tidak menggantikan optimisasi `next/image` untuk foto asli. Ini juga menghindari konflik dengan arahan repo di AGENTS.md untuk memprioritaskan built-in Next.js dan menjaga dependency tetap minimal.

## 3. File Changes
- Modify: [package.json](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/package.json?type=file&root=%252F)
  - Tambah `react-avatar` (dan `prop-types` bila diperlukan oleh paket/runtime proyek) ke dependencies.
- Create: [organization-avatar.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/ui/organization-avatar.tsx?type=file&root=%252F)
  - Komponen terpusat untuk logika `image` vs fallback avatar; bertanggung jawab memvalidasi `image`, merender `next/image` untuk foto, dan `react-avatar` untuk fallback nama.
- Modify: [organization-chart-section.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/organization-chart-section.tsx?type=file&root=%252F)
  - Ganti implementasi `getInitials` + blok `member.image ? <Image /> : ...` dengan komponen avatar baru.
- Modify: [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/tentang/page.tsx?type=file&root=%252F)
  - Ganti fallback ikon `Users` pada daftar pengurus yayasan dengan komponen avatar baru agar perilakunya sama dengan struktur unit pendidikan.
- Optional modify: [education-units.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/education-units.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A4185%2C%22second%22%3A5194%7D%2C%22lines%22%3A%7B%22first%22%3A84%2C%22second%22%3A139%7D%7D&root=%252F)
  - Bersihkan placeholder `image: "/images/"` pada `mi-kepala-madrasah` menjadi kosong/undefined supaya tidak diperlakukan sebagai URL foto yang valid.
- Optional modify: [values.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/values.ts?type=file&root=%252F)
  - Jika diperlukan, ekstrak tipe anggota organisasi yayasan agar reuse dengan komponen avatar lebih rapi.

## 4. Implementation Steps
### Task 1: Tambahkan dependency avatar
1. Ubah [package.json](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/package.json?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A0%2C%22second%22%3A598%7D%2C%22lines%22%3A%7B%22first%22%3A0%2C%22second%22%3A31%7D%7D&root=%252F) untuk menambahkan `react-avatar` ke dependencies proyek.
2. Verifikasi kebutuhan `prop-types` dari dokumentasi paket; jika runtime atau type resolution proyek membutuhkannya, tambahkan juga supaya build Next tidak bergantung pada transitive dependency yang tidak eksplisit.

### Task 2: Buat komponen avatar organisasi terpusat
1. Buat [organization-avatar.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/ui/organization-avatar.tsx?type=file&root=%252F) sebagai komponen kecil yang menerima minimal `name`, `image`, `size`, dan `className`.
2. Di komponen ini, definisikan helper validasi `image` yang menolak nilai kosong, whitespace, dan placeholder tidak usable seperti `"/images/"`; alasan teknisnya adalah kondisi truthy sekarang di [organization-chart-section.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/organization-chart-section.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A731%2C%22second%22%3A1245%7D%2C%22lines%22%3A%7B%22first%22%3A24%2C%22second%22%3A40%7D%7D&root=%252F) akan mencoba memuat gambar yang tidak valid.
3. Jika `image` valid, render `next/image` agar optimisasi gambar lokal tetap dipakai sesuai arahan repo.
4. Jika `image` tidak valid, render `react-avatar` dengan `name`, `round`, `size`, `maxInitials={2}`, dan warna yang diselaraskan ke palet site saat ini.
5. Tandai komponen ini dengan `"use client"` hanya jika `react-avatar` memang mensyaratkan rendering client-side pada integrasi Next 15; jika paket tetap aman pada SSR, pertahankan server-friendly boundary seminimal mungkin.

### Task 3: Migrasikan struktur organisasi unit pendidikan
1. Ubah [organization-chart-section.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/organization-chart-section.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A0%2C%22second%22%3A5447%7D%2C%22lines%22%3A%7B%22first%22%3A0%2C%22second%22%3A178%7D%7D&root=%252F) untuk menghapus `getInitials()` dan mengganti blok avatar di baris 27-40 dengan komponen baru.
2. Pertahankan layout kartu, ukuran avatar 64px, dan styling ring/background yang sudah dipakai agar perubahan fokus pada perilaku avatar, bukan redesign section.
3. Pastikan nama seperti `Menunggu verifikasi` tetap menghasilkan fallback yang stabil; bila perlu, komponen avatar bisa menerima `nameForAvatar` berbeda dari teks display untuk menghindari inisial yang membingungkan.

### Task 4: Migrasikan struktur yayasan
1. Ubah area pengurus di [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/tentang/page.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A9392%2C%22second%22%3A11183%7D%2C%22lines%22%3A%7B%22first%22%3A253%2C%22second%22%3A281%7D%7D&root=%252F) untuk mengganti blok `person.image ? <Image /> : <Users />` dengan komponen avatar yang sama.
2. Pertahankan ukuran avatar 80px dan card layout yang ada supaya perilaku halaman tetap konsisten dengan desain sekarang.

### Task 5: Rapikan data organisasi
1. Ubah nilai placeholder `image: "/images/"` pada [education-units.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/education-units.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A4508%2C%22second%22%3A4700%7D%2C%22lines%22%3A%7B%22first%22%3A97%2C%22second%22%3A102%7D%7D&root=%252F) menjadi `undefined` atau hapus field tersebut.
2. Jika pengurus yayasan akan memakai avatar yang sama dalam jangka panjang, pertimbangkan mengekstrak tipe organisasi yayasan dari inline array di [values.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/values.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A1909%2C%22second%22%3A2139%7D%2C%22lines%22%3A%7B%22first%22%3A68%2C%22second%22%3A74%7D%7D&root=%252F) agar prop komponen bisa typed secara eksplisit.

## 5. Acceptance Criteria
- Pada struktur unit pendidikan, anggota dengan `image` valid dirender sebagai foto melalui `next/image`; anggota tanpa `image` valid dirender sebagai avatar berbasis nama.
- Pada struktur yayasan, pengurus dengan `image` valid dirender sebagai foto; tanpa `image` valid dirender sebagai avatar berbasis nama, bukan ikon `Users`.
- Nilai placeholder seperti `"/images/"`, string kosong, atau whitespace tidak menghasilkan broken image; sistem langsung memakai fallback avatar.
- Tidak ada duplikasi logika fallback avatar antara [organization-chart-section.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/organization-chart-section.tsx?type=file&root=%252F) dan [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/tentang/page.tsx?type=file&root=%252F); keduanya memakai komponen avatar yang sama.
- TypeScript tetap lolos tanpa error dari perubahan prop, import, atau tipe data organisasi.
- Tampilan avatar tetap konsisten dengan desain saat ini: rounded, ukuran tetap per konteks, dan nama/jabatan tidak bergeser atau overflow secara visual pada grid yang ada.

## 6. Verification Steps
- Jalankan `npm run typecheck` untuk memastikan integrasi `react-avatar`, props komponen baru, dan data organisasi tetap valid.
- Jalankan `npm run lint` untuk memastikan tidak ada import tidak terpakai atau isu JSX/Next lint setelah migrasi komponen.
- Jalankan `npm run build` untuk memastikan kombinasi `next/image` + `react-avatar` aman pada build statis Next 15.
- Verifikasi manual pada halaman Tentang dan satu halaman unit pendidikan yang memiliki organisasi (minimal MI) dengan skenario:
  1. `image` valid menampilkan foto.
  2. `image` kosong/undefined menampilkan avatar initials.
  3. `image` placeholder seperti `"/images/"` menampilkan avatar initials, bukan gambar rusak.
  4. Nama `Menunggu verifikasi` tetap menghasilkan fallback yang dapat diterima secara visual.

## 7. Risks & Mitigations
- Risiko: `react-avatar` menambah dependency untuk kasus yang sebenarnya sudah bisa dikerjakan manual.
  - Mitigasi: batasi pemakaiannya hanya pada fallback avatar; tetap gunakan `next/image` untuk foto asli supaya penambahan dependency memberi nilai yang jelas.
- Risiko: paket membutuhkan boundary client component dan bisa memperluas area `use client`.
  - Mitigasi: isolasi `react-avatar` di satu komponen kecil [organization-avatar.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/ui/organization-avatar.tsx?type=file&root=%252F) agar sisa halaman tetap server-first.
- Risiko: data lama berisi path pseudo-valid seperti `"/images/"` yang lolos pengecekan sederhana `if (image)`.
  - Mitigasi: validasi `image` secara eksplisit di komponen avatar dan bersihkan data yang sudah teridentifikasi di [education-units.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/education-units.ts?type=file&root=%252F).
- Risiko: fallback initials default dari `react-avatar` mungkin tidak sesuai untuk nama placeholder atau copy Indonesia tertentu.
  - Mitigasi: gunakan prop `maxInitials` dan, bila perlu, `initials` custom function agar hasil untuk nama seperti `Menunggu verifikasi` tetap konsisten dengan keputusan UI yang diinginkan.

## Catatan analisis library
`react-avatar` cocok secara fitur untuk kebutuhan `image jika ada, avatar jika tidak ada`, karena mendukung `src` + fallback nama/inisial. Tetapi untuk repo ini, ia bukan pengganti `next/image`; ia lebih tepat dipakai sebagai lapisan fallback avatar dalam komponen kecil yang terisolasi. Itu menjaga constraint repo: static-friendly, dependency minimal, dan tetap mengutamakan built-in Next untuk foto asli.