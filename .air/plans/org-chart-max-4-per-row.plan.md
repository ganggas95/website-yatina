## 1. Goal
Membatasi tampilan org chart menjadi maksimal 4 node per baris, dan jika child melebihi 4 maka sisa node turun ke baris berikutnya sambil tetap mempertahankan struktur parent-child.

## 2. Approach
Komponen org chart saat ini membangun layout langsung dari `d3-hierarchy` di [organization-chart-tree.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/organization-chart-tree.tsx?type=file&root=%252F) baris 114-169 dan 477-517, sehingga pembatasan 4 node per baris paling aman dilakukan di model tree internal, bukan di CSS. Pendekatannya adalah menambahkan node virtual khusus untuk “row wrapper” di bawah parent yang memiliki lebih dari 4 child, lalu menyesuaikan perhitungan dimensi, vertical spacing, dan rendering link di [organization-chart-tree.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/organization-chart-tree.tsx?type=file&root=%252F) baris 185-203, 477-517, dan 985-1124 agar baris tambahan terlihat sebagai perpanjangan struktur, bukan level organisasi baru.

## 3. File Changes
- **Modify** `src/components/education/organization-chart-tree.tsx`
  - Lokasi relevan saat ini:
    - definisi node internal di baris 30-62
    - pembentukan tree data di baris 114-169
    - dimensi node di baris 185-203
    - layout D3 di baris 477-517
    - rendering konektor SVG di baris 985-1016 dan 1085-1124
  - Perubahan yang direncanakan:
    - tambah tipe node virtual untuk pembungkus baris child
    - pecah child per parent menjadi kelompok maksimal 4 item
    - atur node virtual agar tidak dirender sebagai kartu, tetapi tetap ikut layout
    - sesuaikan perhitungan link supaya konektor tetap terlihat benar dari parent ke row wrapper lalu ke child
    - sesuaikan total tinggi/lebar dan minimap agar mencerminkan baris tambahan

## 4. Implementation Steps
### Task 1: Tambahkan representasi baris virtual pada model tree
1. Ubah union `OrganizationTreeNode` di `src/components/education/organization-chart-tree.tsx:30-62` untuk menambah jenis node virtual baru, misalnya `row-group`, yang hanya dipakai layout dan tidak punya kartu UI.
2. Tambahkan helper lokal di `src/components/education/organization-chart-tree.tsx` dekat `buildTreeData` (`114-169`) untuk memecah array child menjadi chunk berukuran 4.
3. Ubah `buildTreeData` di `src/components/education/organization-chart-tree.tsx:114-169` agar setiap tier yang expand tidak lagi langsung memiliki seluruh member sebagai child; bila member > 4, tier membentuk beberapa `row-group`, masing-masing berisi maksimal 4 member. Struktur parent tier → row-group → member menjaga relasi parent-child tetap eksplisit.
4. Terapkan pola yang sama pada root downstream bila dibutuhkan, supaya parent dengan child non-member yang suatu saat bertambah juga tetap memakai aturan maksimum 4 per baris tanpa mengubah data di [education.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/types/education.ts?type=file&root=%252F) baris 18-29.

### Task 2: Sesuaikan aturan dimensi dan level layout
1. Perbarui `getNodeDimensions` di `src/components/education/organization-chart-tree.tsx:185-203` agar `row-group` berdimensi nol atau minimal sesuai kebutuhan layout, sehingga wrapper tidak menambah kartu visual tetapi tetap punya posisi untuk routing link.
2. Ganti konstanta `LAYOUT_LEVEL_HEIGHT` dan/atau tambahkan konstanta baru di `src/components/education/organization-chart-tree.tsx:71-84` untuk membedakan jarak antar level organisasi vs jarak antar baris child hasil wrapping, karena baris kedua child seharusnya lebih rapat daripada level organisasi baru.
3. Sesuaikan blok layout `useMemo` di `src/components/education/organization-chart-tree.tsx:477-517` agar node virtual tidak merusak kalkulasi `contentBounds`, `totalHeight`, dan `totalWidth`; node virtual tetap boleh ikut `links()`, tetapi harus diperlakukan khusus saat menghitung area nyata kartu.

### Task 3: Koreksi rendering konektor dan node agar wrapper tidak terlihat
1. Ubah renderer konektor utama di `src/components/education/organization-chart-tree.tsx:985-1016` agar link yang melibatkan `row-group` tetap membentuk jalur yang masuk akal: dari parent ke titik tengah row wrapper, lalu ke tiap child, tanpa menggambar kartu kosong.
2. Ubah renderer node di `src/components/education/organization-chart-tree.tsx:1019-1055` agar `row-group` tidak menghasilkan elemen DOM visual.
3. Ubah renderer konektor minimap di `src/components/education/organization-chart-tree.tsx:1085-1124` dan node minimap di `1127-1148` agar wrapper virtual tidak muncul sebagai kotak baru, tetapi posisi viewport dan jaringan koneksi tetap sinkron dengan layout aktual.

### Task 4: Pastikan perilaku interaksi tetap konsisten
1. Verifikasi bahwa state collapse/expand di `src/components/education/organization-chart-tree.tsx:171-183` dan `451-470` tetap bekerja pada tier yang sama walaupun child sekarang dibungkus ke beberapa row group.
2. Tinjau ulang pan/fit/reset logic di `src/components/education/organization-chart-tree.tsx:522-835` agar chart yang menjadi lebih tinggi masih ter-center dengan benar ketika dibuka, di-reset, dan saat fit-to-screen.
3. Uji dengan data existing yang sudah punya tier >4 member di [education-units.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/education-units.ts?type=file&root=%252F) baris 105-195 (MI) dan 293-380+ (MTs) sebagai baseline utama karena keduanya sudah mewakili kasus overflow.

## 5. Acceptance Criteria
- Pada tier yang memiliki 1-4 member, semua member tetap muncul dalam satu baris seperti sebelumnya.
- Pada tier yang memiliki 5-8 member, baris pertama menampilkan tepat 4 node dan sisa node pindah ke baris kedua di bawah parent yang sama.
- Pada tier yang memiliki lebih dari 8 member, setiap baris berisi maksimum 4 node sampai seluruh child habis ditampilkan.
- Tidak ada child yang berpindah ke bawah parent lain; seluruh node tetap berada di jalur konektor parent yang benar.
- Tombol `Expand all`, `Collapse all`, toggle per tier, `Reset posisi`, dan `Fit to screen` di [organization-chart-tree.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/organization-chart-tree.tsx?type=file&root=%252F) baris 895-957 tetap berfungsi setelah perubahan layout.
- Minimap tetap merepresentasikan ukuran chart yang baru dan tidak menampilkan kotak kosong tambahan untuk wrapper virtual.
- Data schema di [education.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/types/education.ts?type=file&root=%252F) baris 10-29 tidak perlu berubah untuk mendukung aturan 4 node per baris.

## 6. Verification Steps
1. Jalankan `npm run typecheck` untuk memastikan union type baru dan seluruh branch render di `src/components/education/organization-chart-tree.tsx` tetap valid.
2. Jalankan `npm run lint` untuk memastikan tidak ada branch rendering/link logic yang menghasilkan warning atau unused path.
3. Jalankan `npm run build` untuk memastikan chart tetap statically buildable sesuai constraint repo.
4. Verifikasi manual pada halaman unit pendidikan yang punya org chart:
   - buka halaman MI dan pastikan tier `Guru & Wali Kelas` dari data di `src/data/education-units.ts:130-195` terbungkus menjadi beberapa baris dengan maksimum 4 node per baris
   - buka halaman MTs dan pastikan tier dengan 5+ member seperti `Administrasi & Operasional` (`293-323`) dan `Wakabag & Koordinator` (`325-359`) juga terbungkus benar
   - cek mode normal dan full-screen dari [organization-chart-section.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/education/organization-chart-section.tsx?type=file&root=%252F) baris 108-152
   - cek minimap, drag, zoom, reset, dan fit-to-screen sesudah chart menjadi lebih tinggi
5. Edge case manual:
   - tier dengan tepat 4 child tidak membuat baris kosong tambahan
   - tier dengan 5 child hanya membuat satu baris tambahan berisi 1 node
   - tier yang collapse tidak menyisakan link atau ruang vertikal aneh

## 7. Risks & Mitigations
- **Risk:** `d3.tree()` menganggap `row-group` sebagai level baru sehingga jarak vertikal bisa terlalu besar.
  - **Mitigation:** perlakukan `row-group` sebagai node layout-only dan sesuaikan `LAYOUT_LEVEL_HEIGHT`/post-processing posisi di `src/components/education/organization-chart-tree.tsx:477-517` agar jarak baris wrapped lebih rapat dari level tier normal.
- **Risk:** kalkulasi `contentBounds` saat ini memasukkan semua node di `365-385`; bila node virtual ikut penuh, pan/fit/minimap bisa meleset.
  - **Mitigation:** filter node virtual dari bounds visual atau beri dimensi nol yang konsisten, lalu validasi ulang alur `clampPan`, `getReadablePan`, dan `getFitPan` di `522-643`.
- **Risk:** konektor SVG cubic bezier saat ini diasumsikan parent langsung terhubung ke kartu child di `985-1016` dan `1085-1124`; dengan wrapper virtual, sebagian jalur bisa terlihat patah atau dobel.
  - **Mitigation:** buat aturan routing khusus untuk link yang melibatkan `row-group`, lalu verifikasi visual pada tier 5, 8, dan 12 member menggunakan data existing MI/MTs.