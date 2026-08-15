## 1. Goal
Membuat card “Informasi Pendukung” pada semua halaman detail unit pendidikan tetap ringkas dan proporsional meskipun card visi, misi, atau tujuan berisi konten yang panjang.

## 2. Approach
Masalah utama ada pada layout di [education-unit-profile.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/education-unit-profile.tsx?type=file&root=%252F): kolom kanan berada dalam grid yang secara default men-stretch tinggi item, sementara card kanan juga memakai `flex` + `justify-between`, sehingga ia ikut mengisi tinggi kolom kiri saat misi/tujuan panjang. Solusi paling aman adalah mempertahankan struktur halaman yang sudah ada, tetapi mengubah kolom kanan menjadi self-sized dan merapikan isi card pendukung menjadi blok yang lebih kompak agar tampilan tetap stabil di semua unit tanpa menyentuh data di [education-units.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/education-units.ts?type=file&root=%252F).

## 3. File Changes
- **Modify** [education-unit-profile.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/education-unit-profile.tsx?type=file&root=%252F)
  - File ini merender section profil unit pendidikan, termasuk card Visi, Misi, Tujuan, dan card “Informasi Pendukung”.
  - Perubahan akan difokuskan pada blok grid profil di baris 65-106, khususnya kolom kanan `lg:col-span-2` yang saat ini ikut meregang setinggi kolom kiri.
- **No data changes** [education-units.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/education-units.ts?type=file&root=%252F)
  - File ini tetap menjadi sumber data bersama untuk semua unit. Riset menunjukkan kasus terpanjang ada pada MTs di baris 78-101, sehingga file ini menjadi referensi validasi visual, bukan target perubahan.
- **No route changes** [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/unit-pendidikan/%5Bslug%5D/page.tsx?type=file&root=%252F)
  - File route detail unit tetap memakai `EducationUnitProfile` di baris 42-55, jadi satu perubahan komponen akan berlaku ke semua halaman unit pendidikan.

## 4. Implementation Steps
### Task 1: Hilangkan perilaku stretch pada kolom card pendukung
1. Di [education-unit-profile.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/education-unit-profile.tsx?type=file&root=%252F), ubah wrapper grid profil pada baris 65 agar item kolom tidak dipaksa sama tinggi di breakpoint besar; gunakan alignment yang membuat masing-masing kolom mengikuti tinggi kontennya.
2. Pada kolom kanan baris 83-106, tambahkan kelas alignment seperti `self-start` dan hilangkan pola `justify-between` yang memaksa distribusi vertikal penuh di card.

### Task 2: Ringkas struktur isi card “Informasi Pendukung”
1. Di [education-unit-profile.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/education-unit-profile.tsx?type=file&root=%252F), ubah isi card pendukung pada baris 84-105 dari satu card tinggi dengan dua area berjauhan menjadi stack konten yang lebih padat.
2. Pertahankan informasi yang sudah ada (“Jenjang”, “Status”, deskripsi singkat), tetapi pindahkan ke susunan yang lebih ringkas, misalnya:
   - intro singkat di atas,
   - grid statistik kecil tetap dua item,
   - catatan placeholder tetap ada namun tidak menjadi pengisi ruang kosong.
3. Pastikan spacing vertikal card kanan memakai gap tetap yang kecil/menengah, bukan distribusi penuh tinggi container.

### Task 3: Jaga konsistensi visual dengan card kiri
1. Di [education-unit-profile.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/education-unit-profile.tsx?type=file&root=%252F), sesuaikan padding, ukuran heading, dan gap card pendukung supaya tetap seimbang dengan `InfoBlock` pada baris 14-52 tanpa memperkenalkan pola UI baru.
2. Pastikan solusi tetap responsif: pada mobile card tetap mengikuti urutan dokumen di bawah card visi/misi/tujuan, dan pada desktop card kanan tidak meninggalkan ruang kosong besar yang tampak seperti bug layout.

## 5. Acceptance Criteria
- Pada halaman detail unit pendidikan, card “Informasi Pendukung” tidak lagi memanjang mengikuti tinggi total card visi, misi, dan tujuan ketika konten misi/tujuan sangat panjang.
- Pada kasus data panjang seperti MTs di [education-units.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/education-units.ts?type=file&root=%252F), card kanan tetap berhenti sesuai tinggi kontennya sendiri.
- Informasi “Jenjang” dan “Status” tetap tampil di card pendukung setelah perubahan.
- Teks placeholder “Informasi terkait akreditasi...” tetap tersedia, tetapi tidak dipakai sebagai elemen yang mengisi sisa tinggi layout.
- Tidak ada perubahan pada data unit, slug routing, metadata, atau struktur route detail di [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/unit-pendidikan/%5Bslug%5D/page.tsx?type=file&root=%252F).
- Komponen tetap server-compatible; tidak menambah state client, `use client`, API route, atau dependency baru.

## 6. Verification Steps
1. Jalankan `npm run typecheck` untuk memastikan perubahan kelas Tailwind/JSX tidak memicu error TypeScript.
2. Jalankan `npm run lint` untuk memastikan struktur JSX dan formatting tetap sesuai aturan proyek.
3. Buka halaman detail unit dengan konten panjang, terutama slug `mts-riadlul-jannah`, lalu verifikasi secara visual bahwa:
   - card visi/misi/tujuan tetap tampil penuh,
   - card “Informasi Pendukung” berhenti setinggi kontennya sendiri,
   - tidak ada ruang kosong vertikal besar di dalam card kanan,
   - layout mobile dan desktop tetap rapi.
4. Verifikasi satu unit dengan konten lebih pendek, misalnya `mi-riadlul-jannah`, untuk memastikan card kanan tetap proporsional dan tidak terlihat terlalu padat.

## 7. Risks & Mitigations
- **Risk:** Menghapus stretch bisa membuat keseimbangan visual desktop berubah jika gap antar kolom tidak diatur dengan baik.
  - **Mitigation:** Pertahankan lebar kolom existing (`lg:grid-cols-5`, `lg:col-span-3`, `lg:col-span-2`) dan batasi perubahan hanya pada alignment dan internal spacing card kanan.
- **Risk:** Perubahan yang terlalu agresif pada isi card kanan bisa mengubah hirarki visual halaman.
  - **Mitigation:** Pertahankan semua copy yang ada dan hanya ubah susunan layout serta spacing, bukan informasi inti.
- **Risk:** Solusi yang hanya mengandalkan tinggi tetap (`max-height` atau clamp) bisa memotong konten atau menciptakan scroll internal yang buruk.
  - **Mitigation:** Hindari tinggi tetap; gunakan intrinsic sizing (`self-start` / `items-start`) agar card tetap natural mengikuti kontennya.