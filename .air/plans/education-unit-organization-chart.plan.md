# 1. Goal

Menambahkan visualisasi struktur organisasi yang web-native, responsif, dan reusable pada halaman detail unit pendidikan, dimulai dari struktur organisasi aktual MI Riadlul Jannah NW Penjor.

# 2. Approach

Struktur pada foto akan diterjemahkan ke model data bertingkat di `src/data/education-units.ts` agar tetap konsisten dengan arsitektur statis repo yang memang menempatkan konten institusional di layer data typed (`docs/about-project.md:89-125`, `docs/about-project.md:1351-1357`, `src/data/education-units.ts:4-185`). Visualisasinya tidak akan menyalin poster fisik apa adanya; implementasi yang lebih tepat untuk web adalah org chart berbasis section/card yang aksesibel, responsif, dan bisa dipakai ulang oleh unit lain yang kemungkinan memiliki pola serupa.

Analisis struktur dari foto:
- Ada satu node pimpinan utama di puncak: Kepala Madrasah.
- Di bawahnya ada lapisan peran inti/staf pendukung seperti operator, bendahara/wali kelas, waka kurikulum, tata usaha, dan satu guru sentral di area tengah.
- Lapisan berikutnya berisi wali kelas/guru mapel yang tersebar dalam dua baris.
- Secara visual pola ini lebih cocok dimodelkan sebagai beberapa `tiers`/lapisan daripada grid datar seperti struktur yayasan di halaman `tentang` saat ini (`src/app/tentang/page.tsx:226-284`).

Catatan integritas data:
- Beberapa nama/jabatan pada foto cukup jelas, tetapi sebagian teks kecil tidak cukup tajam untuk dijadikan sumber final tanpa verifikasi. Sesuai aturan konten repo, jabatan yang belum pasti harus tetap memakai placeholder atau catatan verifikasi, bukan diisi dengan tebakan (`docs/about-project.md:1219-1249`).

# 3. File Changes

- **Modify** `src/types/education.ts:10-30`
  - Perluasan `EducationUnit` agar dapat menyimpan data struktur organisasi per unit.
  - Tambahkan tipe baru yang eksplisit, misalnya `EducationOrganizationSection`, `EducationOrganizationTier`, dan `EducationOrganizationMember`, supaya UI tetap terlepas dari sumber data dan siap dipindah ke CMS nanti.

- **Modify** `src/data/education-units.ts:30-87`
  - Tambahkan data struktur organisasi untuk unit `mi-riadlul-jannah`.
  - Gunakan bentuk bertingkat yang mengikuti komposisi foto: tier pimpinan, tier staf inti, tier guru/wali kelas.
  - Untuk entri yang teks jabatannya belum tervalidasi dari foto, isi field catatan/verifikasi atau `TODO_CONTENT` parsial sesuai kebijakan integritas.

- **Modify** `src/data/education-units.ts:88-184`
  - Tambahkan placeholder struktur organisasi untuk `mts-riadlul-jannah`, `ma-riadlul-jannah`, dan `tk-yatina` hanya jika dibutuhkan oleh API data baru agar bentuk data konsisten lintas unit.
  - Jangan isi konten faktual yang belum ada.

- **Create** `src/components/education/organization-chart-section.tsx`
  - Komponen server-side reusable untuk merender org chart per unit.
  - Tanggung jawab komponen ini: heading section, keterangan sumber/catatan, layout per tier, node person card, koneksi visual sederhana antartier, fallback tanpa foto, dan empty-state bila data struktur belum tersedia.

- **Modify** `src/components/education/education-unit-profile.tsx:92-246`
  - Sisipkan section struktur organisasi ke alur profil unit, paling tepat setelah blok sejarah/visi/misi/tujuan dan sebelum program/fasilitas.
  - Import komponen baru dan gunakan data dari `unit.organization`.
  - Pertahankan gaya visual yang sudah dipakai di halaman profil unit: `SectionHeading`, card putih dengan ring halus, dan warna primary/accent yang konsisten (`src/components/education/education-unit-profile.tsx:105-245`, `src/components/ui/section-heading.tsx:13-58`).

- **Optional Create** `public/images/organization/mi/` 
  - Folder ini hanya diperlukan bila implementasi memutuskan memakai portrait per orang sebagai aset terpisah.
  - Jika belum ada aset portrait yang layak, jangan paksa membuatnya dari poster WhatsApp; komponen cukup mendukung fallback initials/icon.

# 4. Implementation Steps

## Task 1: Bentuk model data struktur organisasi

1. Perluas `src/types/education.ts:10-30` dengan tipe nested untuk organisasi unit.
   - Tambahkan field tingkat section seperti `title`, `description`, `sourceNote`.
   - Tambahkan tier/level array untuk merepresentasikan hierarki visual.
   - Tambahkan member fields minimal: `id`, `name`, `role`, `image?`, `notes?`.

2. Sesuaikan `EducationUnit` di `src/types/education.ts:10-30` agar memiliki field opsional `organization`.
   - Tetap opsional supaya unit yang belum punya data tidak rusak.
   - Jangan ubah field existing yang sudah dipakai hero/profile/page lain (`src/app/unit-pendidikan/[slug]/page.tsx:37-56`, `src/components/education/education-unit-hero.tsx:7-65`).

## Task 2: Masukkan data MI dengan struktur yang siap dipakai ulang

3. Tambahkan data organisasi ke objek `mi-riadlul-jannah` di `src/data/education-units.ts:30-87`.
   - Representasikan paling tidak tiga lapisan: pimpinan, staf inti, guru/wali kelas.
   - Masukkan nama/jabatan yang terbaca jelas dari foto.
   - Tandai item yang masih butuh verifikasi teks kecil dengan `notes` atau placeholder, bukan asumsi.

4. Review objek unit lain di `src/data/education-units.ts:4-185` dan pastikan shape barunya aman.
   - Bila perlu, set `organization` undefined untuk unit lain.
   - Hindari pengisian data struktur palsu pada TK/MTs/MA, sesuai `docs/about-project.md:1223-1249`.

## Task 3: Buat komponen visual org chart reusable

5. Buat `src/components/education/organization-chart-section.tsx` sebagai server component.
   - Gunakan `Container`/`SectionHeading` pattern yang sudah ada (`src/components/ui/container.tsx:8-17`, `src/components/ui/section-heading.tsx:13-58`).
   - Render tiap tier sebagai baris terpisah; desktop memakai grid fleksibel per tier, mobile menumpuk vertikal.
   - Untuk node anggota, tampilkan nama, jabatan, dan avatar/fallback.

6. Di komponen baru tersebut, sediakan dua mode state:
   - `organization` tersedia: render chart lengkap.
   - `organization` tidak tersedia atau tier kosong: render empty-state ringan, mengikuti pola placeholder existing di `src/app/tentang/page.tsx:240-252` dan placeholder profile existing di `src/components/education/education-unit-profile.tsx:67-88`.

7. Tambahkan koneksi visual yang sederhana dan stabil secara CSS-only.
   - Fokus pada garis pemisah/lane per tier, bukan diagram SVG kompleks.
   - Ini menjaga static build tetap sederhana dan menghindari over-engineering untuk pola yang saat ini masih kemungkinan berulang lintas jenjang.

## Task 4: Integrasikan ke halaman unit pendidikan

8. Import dan render komponen baru di `src/components/education/education-unit-profile.tsx:92-246`.
   - Tempatkan setelah blok profil institusional agar urutan informasi menjadi: identitas unit → sejarah/visi/misi/tujuan → struktur organisasi → program/kegiatan → fasilitas.
   - Ini sejalan dengan fakta bahwa struktur organisasi adalah konten profil resmi unit, bukan bagian galeri atau CTA (`docs/about-project.md:1231-1247`, `src/components/education/school-page-template.tsx:12-140`).

9. Pastikan section baru tidak membutuhkan perubahan routing pada `src/app/unit-pendidikan/[slug]/page.tsx:37-56`.
   - Halaman ini sudah memakai template reusable untuk seluruh unit, jadi perubahan cukup melalui data + profile composition.

## Task 5: Dukungan aset visual dan aksesibilitas

10. Jika portrait individu tersedia, simpan aset di folder terstruktur seperti `public/images/organization/mi/` dan referensikan dari data.
    - Jika tidak tersedia, gunakan fallback initial/avatar icon.
    - Jangan crop langsung dari foto poster kecuali kualitas hasilnya memadai untuk web.

11. Pastikan markup section baru memakai heading yang semantik dan alt text yang jelas.
    - Node image memakai `alt` nama personel.
    - Empty-state menjelaskan bahwa data organisasi belum lengkap bila ada tier/anggota yang belum tervalidasi.

# 5. Acceptance Criteria

- Halaman `/unit-pendidikan/mi-riadlul-jannah` menampilkan section “Struktur Organisasi” baru tanpa mengubah routing existing (`src/app/unit-pendidikan/[slug]/page.tsx:43-56`).
- Data struktur organisasi MI disimpan di layer data statis, bukan hardcoded di JSX (`src/data/education-units.ts:30-87`).
- Tipe TypeScript baru memvalidasi bentuk data organisasi per unit dan tidak memaksa unit lain memiliki data organisasi (`src/types/education.ts:10-30`).
- Layout org chart menampilkan minimal tiga tier visual yang merepresentasikan hierarki dari foto: pimpinan, staf inti, dan guru/wali kelas.
- Pada viewport mobile, node anggota ditampilkan dalam susunan vertikal atau grid 1 kolom/2 kolom tanpa overflow horizontal yang memutus konten utama.
- Pada viewport desktop, tiap tier tetap terbaca sebagai lapisan yang terpisah dan tidak jatuh menjadi daftar teks datar.
- Jika unit belum memiliki `organization`, komponen menampilkan placeholder/empty-state yang konsisten dengan pola repo, bukan area kosong atau error.
- Data jabatan/nama yang belum dapat diverifikasi dari foto tidak diisi dengan tebakan; implementasi memakai placeholder/catatan verifikasi sesuai aturan konten (`docs/about-project.md:1223-1249`).
- Implementasi tidak menambah dependency baru dan tetap compatible dengan static build sesuai batasan proyek (`docs/about-project.md:77-125`).

# 6. Verification Steps

1. Jalankan `npm run typecheck` untuk memastikan perluasan tipe `EducationUnit` dan penggunaan field `organization` valid.
2. Jalankan `npm run lint` untuk memastikan komponen section baru dan conditional rendering mengikuti aturan lint project.
3. Jalankan `npm run build` untuk memverifikasi halaman unit tetap statically buildable.
4. Verifikasi manual pada halaman `/unit-pendidikan/mi-riadlul-jannah`:
   - section struktur organisasi muncul di posisi yang direncanakan;
   - nama dan jabatan tampil konsisten;
   - node tier pertama hanya menampilkan kepala madrasah;
   - tier bawah tetap rapi pada lebar mobile dan desktop.
5. Verifikasi manual pada satu unit lain yang belum punya data organisasi, misalnya `/unit-pendidikan/ma-riadlul-jannah`, untuk memastikan empty-state tampil dengan baik dan tidak memicu error.
6. Jika portrait image dipakai, cek bahwa semua image path valid dan tidak ada broken image pada build output.

# 7. Risks & Mitigations

- **Risiko: teks nama/jabatan pada foto tidak seluruhnya terbaca akurat.**
  - Mitigasi: hanya masukkan entri yang jelas; sisanya beri placeholder atau catatan verifikasi sesuai `TODO_CONTENT` policy (`docs/about-project.md:1223-1249`).

- **Risiko: pola struktur unit lain tidak identik 1:1 dengan MI.**
  - Mitigasi: gunakan model `tiers` yang fleksibel, bukan field khusus seperti `headmaster`, `staff`, `teachers` yang terlalu kaku.

- **Risiko: layout org chart terlalu padat di mobile karena banyak node dalam satu tier.**
  - Mitigasi: desain tier sebagai stack responsif dengan wrapping/grid dan garis koneksi yang sederhana, bukan diagram fixed-position.

- **Risiko: kualitas foto poster tidak cukup baik untuk dijadikan avatar personel.**
  - Mitigasi: jadikan image per personel opsional; fallback ke avatar initials/icon sampai aset resmi tersedia.

- **Risiko: section baru bercampur dengan struktur yayasan di halaman `tentang`, sehingga pengguna bingung.**
  - Mitigasi: label section secara spesifik sebagai “Struktur Organisasi MI Riadlul Jannah” atau berbasis nama unit, bukan label umum yayasan.