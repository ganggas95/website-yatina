## 1. Goal
Menambahkan section Sejarah pada setiap halaman detail jenjang pendidikan, dengan data paragraf untuk MI dan MTs dari `docs/history.md`, serta placeholder untuk TK dan MA.

## 2. Approach
Perubahan paling aman adalah memperluas model `EducationUnit` agar mendukung data `history` berbentuk list paragraf, lalu merender section baru di komponen profil unit yang sudah menjadi pusat konten detail sekolah. Pendekatan ini menjaga arsitektur saat ini tetap konsisten: konten tetap berada di `src/data/`, UI tetap decoupled dari sumber data, dan nanti mudah dipindahkan ke CMS tanpa mengubah struktur presentasional.

## 3. File Changes
- **Modify** `src/types/education.ts:3-20`
  - Tambahkan properti baru pada interface `EducationUnit`, misalnya `history?: string[]`, agar setiap unit bisa menyimpan daftar paragraf sejarah.
- **Modify** `src/data/education-units.ts:4-146`
  - Isi `history` untuk setiap unit pendidikan.
  - MI mengambil 4 paragraf dari `docs/history.md:12-19`.
  - MTs mengambil 5 paragraf dari `docs/history.md:1-10`.
  - TK dan MA diisi placeholder berbasis `TODO_CONTENT` agar section tetap tampil sesuai keputusan scope.
- **Modify** `src/components/education/education-unit-profile.tsx:7-166`
  - Tambahkan section Sejarah pada area profil unit.
  - Render `history` sebagai beberapa paragraf, bukan list bullet, dengan fallback placeholder yang konsisten dengan gaya existing pada halaman `tentang`.
  - Jika perlu, perluas `InfoBlock` atau buat blok kecil terpisah khusus konten paragraf jamak supaya tidak memaksa struktur list existing.
- **Reference only** `docs/history.md:1-19`
  - Sumber isi sejarah MI dan MTs; tidak perlu diubah kecuali implementasi memerlukan normalisasi copy di tahap terpisah.

## 4. Implementation Steps
### Task 1: Tambahkan dukungan data sejarah di model konten
1. Ubah `src/types/education.ts:3-20` untuk menambah properti `history?: string[]` pada `EducationUnit`.
2. Perbarui `src/data/education-units.ts:4-146` agar setiap object unit memiliki field `history`.
3. Salin isi sejarah dari `docs/history.md:1-10` ke unit `mts-riadlul-jannah` sebagai array paragraf 5 item.
4. Salin isi sejarah dari `docs/history.md:12-19` ke unit `mi-riadlul-jannah` sebagai array paragraf 4 item.
5. Isi `history` untuk `tk-yatina` dan `ma-riadlul-jannah` dengan placeholder `[TODO_CONTENT]` supaya UI selalu punya sumber data yang seragam.

### Task 2: Render section Sejarah di halaman detail unit
1. Ubah `src/components/education/education-unit-profile.tsx:14-52` untuk mendukung blok paragraf jamak, atau tambahkan komponen internal baru khusus section sejarah.
2. Sisipkan section baru di `src/components/education/education-unit-profile.tsx:59-117`, idealnya sebelum blok Visi/Misi/Tujuan atau tepat setelah heading profil, supaya alur kontennya menjadi: deskripsi profil → sejarah → visi/misi/tujuan.
3. Render `unit.history` dengan `.map()` menjadi beberapa elemen `<p>` dalam container bergaya serupa dengan pola di `src/app/tentang/page.tsx:109-147`, bukan sebagai `<ul>`.
4. Tambahkan deteksi placeholder untuk kasus `history` berisi hanya `TODO_CONTENT`, lalu tampilkan copy fallback yang eksplisit untuk TK/MA, misalnya bahwa sejarah resmi unit akan ditambahkan setelah data diterima.
5. Pastikan section memakai semantic heading yang jelas, misalnya “Sejarah” atau “Sejarah Madrasah”, dan tetap konsisten dengan `SectionHeading`/card styling yang sudah dipakai di file ini.

### Task 3: Verifikasi integrasi halaman unit
1. Pastikan `src/app/unit-pendidikan/[slug]/page.tsx:37-56` tidak perlu perubahan karena `EducationUnitProfile` sudah menerima seluruh object `unit`; cukup verifikasi bahwa field baru otomatis tersedia lewat prop yang sama.
2. Cek bahwa halaman MI dan MTs menampilkan paragraf sejarah nyata, sedangkan TK dan MA menampilkan placeholder tanpa memecahkan layout.
3. Pastikan tidak ada penggunaan lain dari `EducationUnit` yang rusak akibat penambahan properti opsional baru.

## 5. Acceptance Criteria
- Pada halaman detail MI (`/unit-pendidikan/mi-riadlul-jannah`), section Sejarah tampil dan berisi 4 paragraf dari `docs/history.md:12-19`.
- Pada halaman detail MTs (`/unit-pendidikan/mts-riadlul-jannah`), section Sejarah tampil dan berisi 5 paragraf dari `docs/history.md:1-10`.
- Pada halaman detail TK dan MA, section Sejarah tetap tampil namun menampilkan placeholder yang jelas, bukan area kosong dan bukan bullet list.
- Data sejarah disimpan di `src/data/education-units.ts`, bukan hardcoded langsung di komponen UI.
- Tipe `EducationUnit` mendukung data sejarah berbentuk `string[]` tanpa memaksa perubahan pada halaman lain.
- Render sejarah menggunakan elemen paragraf (`<p>` hasil map array), bukan `<ul>/<li>`.
- Layout halaman detail unit tetap statis dan tidak menambah kebutuhan client component atau browser-only logic.

## 6. Verification Steps
- Jalankan `npm run typecheck` untuk memastikan penambahan field `history` tidak memicu error TypeScript.
- Jalankan `npm run lint` untuk memastikan perubahan JSX dan conditional rendering tetap sesuai aturan lint.
- Jalankan `npm run build` untuk memastikan semua halaman detail unit tetap statically buildable.
- Verifikasi manual empat route:
  - `/unit-pendidikan/tk-yatina`
  - `/unit-pendidikan/mi-riadlul-jannah`
  - `/unit-pendidikan/mts-riadlul-jannah`
  - `/unit-pendidikan/ma-riadlul-jannah`
- Pada verifikasi manual, cek tiga hal: urutan section masuk akal, paragraf sejarah memiliki jarak baca yang baik, dan placeholder TK/MA tetap selaras secara visual dengan card lain.

## 7. Risks & Mitigations
- **Risk:** `InfoBlock` saat ini hanya cocok untuk satu paragraf atau bullet list (`src/components/education/education-unit-profile.tsx:7-52`), sehingga memaksakan sejarah ke sana akan menghasilkan markup yang tidak tepat.
  - **Mitigation:** Buat varian blok baru untuk `history` atau perluas `InfoBlock` secara terbatas agar mendukung `paragraphs?: string[]` tanpa mencampur logika list dan paragraf.
- **Risk:** Copy di `docs/history.md` mengandung typo/format yang tidak seragam, misalnya kapitalisasi dan spasi ganda (`docs/history.md:4-8`, `15-19`).
  - **Mitigation:** Untuk task ini, pindahkan isi apa adanya ke data agar scope tetap jelas; jika perlu normalisasi editorial, lakukan sebagai task terpisah supaya tidak mencampur konten dan struktur.
- **Risk:** Placeholder `TODO_CONTENT` bila dirender langsung sebagai paragraf akan terlihat terlalu generik.
  - **Mitigation:** Di layer UI, deteksi placeholder dan ubah menjadi kalimat fallback yang spesifik untuk section sejarah, seperti pola yang sudah dipakai pada `src/app/tentang/page.tsx:124-140`.