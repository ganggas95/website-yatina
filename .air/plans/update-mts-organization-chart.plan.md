## 1. Goal

Memperbarui visualisasi struktur organisasi MTs Riadlul Jannah NW Penjor agar mengikuti bagan resmi pada gambar konsultasi yayasan, termasuk hubungan hierarki dan pengelompokan wali kelas.

## 2. Approach

Perluas model organisasi yang saat ini hanya mengenal tiers datar di src/types/education.ts dengan relasi turunan opsional yang tetap kompatibel dengan data MI/organisasi lain. Data MTs di src/data/education-units.ts akan ditata berdasarkan struktur resmi: komite sejajar sebagai pengawas, Kepala Madrasah sebagai pusat, unit langsung di bawahnya, anak Tata Usaha, dan blok Wali Kelas di bawah Wakabag Kurikulum. Renderer di src/components/education/organization-chart-tree.tsx akan membangun tree dari relasi tersebut, sambil mempertahankan collapse/expand, zoom, pan, minimap, fullscreen, dan dukungan data tier lama.

## 3. File Changes

- Modify src/types/education.ts:10-30 — tambahkan representasi relasi anak pada anggota organisasi atau node organisasi yang memungkinkan satu personel mengelola anggota/tier tertentu tanpa mengubah kontrak wajib yang sudah dipakai unit lain.
- Modify src/data/education-units.ts:270-404 — rapikan data MTs berdasarkan bagan referensi: Kepala Madrasah Saiful Muslim, Ketua Komite Rabin, Bendahara I’Anah, Kepala TU Astriali beserta Ahmad Musliman Hadi dan Abdul Khabir Makbul di bawahnya, seluruh Wakabag/Koordinator, Penjaga Madrasah, serta tujuh wali kelas dengan urutan dan pengelompokan sesuai gambar. Hapus komentar placeholder pada deskripsi tier dan tambahkan metadata relasi yang diperlukan.
- Modify src/components/education/organization-chart-tree.tsx:127-227 — ubah pembentukan tree agar memakai relasi organisasi resmi ketika tersedia, dengan komite tetap tidak menjadi induk operasional, Kepala Madrasah menjadi induk utama, dan relasi khusus KTU serta Wakabag Kurikulum ditampilkan sebagai cabang. Sesuaikan identifikasi node yang bisa collapse/expand agar node parent baru tetap berfungsi.
- Modify src/components/education/organization-chart-tree.tsx:229-484 dan 585-727 — sesuaikan dimensi/layout/connector bila diperlukan untuk cabang bertingkat dan panel wali kelas, sehingga hubungan tidak saling menimpa saat expanded pada desktop maupun mobile; pertahankan mode garis curve/orthogonal dan node drag.
- Modify src/components/education/organization-chart-section.tsx:18-109 — hanya bila diperlukan setelah model tree berubah, perbarui penghitung/labelling lapisan agar tidak menyebut struktur baru sebagai tier datar yang tidak lagi akurat.

## 4. Implementation Steps

### Task 1: Model relasi organisasi

1. Di src/types/education.ts:10-30, tentukan field relasi minimal, misalnya daftar ID anggota anak dan/atau daftar tier anak, tanpa menambah dependensi atau state client.
2. Pastikan field bersifat opsional sehingga organisasi MI dan struktur lain yang masih memakai tier datar tetap dapat dirender tanpa migrasi besar.

### Task 2: Encode bagan resmi MTs

1. Di src/data/education-units.ts:270-404, pertahankan seluruh nama/jabatan yang terbaca pada gambar dan normalkan struktur ID agar unik.
2. Pertahankan Ketua Komite sebagai cabang pengawasan yang terhubung ke Kepala Madrasah, tetapi bukan induk cabang kerja.
3. Set Kepala Madrasah sebagai node utama dengan cabang Bendahara, Kepala TU, Wakabag Kurikulum, Wakabag Kesiswaan, Wakabag Sarpras, Wakabag Humas, Koordinator BK, Koordinator Pustaka, dan Penjaga Madrasah.
4. Set Ahmad Musliman Hadi sebagai Staf Tata Usaha dan Abdul Khabir Makbul sebagai Operator Data di bawah Astriali/Kepala Tata Usaha.
5. Set tujuh wali kelas sebagai satu blok yang terhubung ke Neni Supartini/Wakabag Kurikulum, dengan kelas VII A, VII B, VIII A, VIII B, IX A, IX B, dan IX C sesuai gambar. Pertahankan data rangkap jabatan I’Anah dan Mayanti tanpa membuat duplikasi personel ambigu secara visual.

### Task 3: Render hierarchy secara aman

1. Di src/components/education/organization-chart-tree.tsx:127-212, buat fungsi pembentukan tree yang menggunakan relasi eksplisit bila data tersedia dan fallback ke perilaku tier lama bila tidak tersedia.
2. Pastikan node komite dirender sebagai cabang khusus/sejajar dari Kepala Madrasah, bukan sebagai sumber semua downstream children.
3. Pastikan collapse/expand pada Kepala Madrasah, Kepala TU, Wakabag Kurikulum, dan blok wali kelas bekerja konsisten dengan state yang disimpan per slug.
4. Di src/components/education/organization-chart-tree.tsx:229-484 dan layout sekitar 585-727, sesuaikan ukuran node, wrapping, jarak vertikal, dan connector untuk nested children dan tujuh wali kelas.
5. Pertahankan perilaku fullscreen dan interaksi yang sudah ada di src/components/education/organization-chart-section.tsx:18-164; ubah label lapisan hanya bila hasil render menunjukkan istilah tersebut menyesatkan.

### Task 4: Verifikasi

1. Jalankan npm run typecheck.
2. Jalankan npm run lint.
3. Jalankan npm run build.
4. Buka /unit-pendidikan/mts-riadlul-jannah dan verifikasi Kepala Madrasah/Komite, relasi KTU ke dua anak, relasi Wakabag Kurikulum ke tujuh wali kelas, serta seluruh jabatan lain.
5. Uji expand/collapse, zoom, pan, connector curve/orthogonal, minimap, drag node, fullscreen, dan viewport mobile/desktop saat semua cabang dibuka.

## 5. Acceptance Criteria

- Bagan MTs menampilkan Saiful Muslim, S.PdI sebagai Kepala Madrasah dan Rabin sebagai Ketua Komite Madrasah pada level atas.
- Kepala Madrasah menjadi sumber cabang operasional; Ketua Komite tidak menjadi induk Tata Usaha, wakabag, koordinator, atau wali kelas.
- Astriali/Kepala Tata Usaha memiliki relasi visual langsung ke Ahmad Musliman Hadi/Staf Tata Usaha dan Abdul Khabir Makbul/Operator Data.
- Neni Supartini/Wakabag Kurikulum memiliki relasi visual langsung ke blok Wali Kelas yang memuat VII A, VII B, VIII A, VIII B, IX A, IX B, dan IX C.
- Jabatan Satuhu, Hayudin, H. Syarif Hidayatullah, Firman Hadi Yudistira, Mayanti Da’in, I’Anah, dan Syurdi tampil dengan nama serta peran sesuai gambar.
- Data organisasi MI dan unit lain yang belum memakai relasi eksplisit tetap lolos typecheck dan dapat dirender dengan fallback tier.
- Saat seluruh cabang dibuka, setiap node terlihat, connector memiliki target benar, dan canvas dapat dinavigasi pada desktop serta mobile.
- npm run typecheck, npm run lint, dan npm run build selesai tanpa error.

## 6. Verification Steps

- Jalankan npm run typecheck, npm run lint, dan npm run build.
- Inspeksi manual route /unit-pendidikan/mts-riadlul-jannah dalam keadaan collapsed dan setelah expand all.
- Verifikasi fullscreen, Escape, pergantian mode garis, minimap, dan navigasi pointer/touch.
- Bandingkan nama, jabatan, jumlah personel, dan arah relasi dengan gambar referensi.

## 7. Risks & Mitigations

- Risiko kontrak data lama rusak: field relasi dibuat opsional dan renderer mempertahankan fallback tier lama.
- Risiko bagan terlalu lebar/tinggi: gunakan row wrapping yang sudah ada, tambahkan penanganan nested row group, dan verifikasi dua viewport.
- Risiko rangkap jabatan terlihat sebagai dua orang berbeda: gunakan ID jabatan terpisah tetapi nama konsisten, dengan catatan rangkap jabatan bila UI mendukung.
- Risiko state layout lama tersimpan setelah struktur berubah: gunakan ID stabil dan pertimbangkan invalidasi state tersimpan jika bentuk tree berubah.