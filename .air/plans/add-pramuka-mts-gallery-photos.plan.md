## 1. Goal
Menambahkan tiga foto Pramuka baru ke halaman Galeri umum dan ke galeri dokumentasi kegiatan Pramuka, semuanya ditandai dengan kategori/unit MTs.

## 2. Approach
Situs ini sudah memisahkan konten dari UI, jadi perubahan paling tepat adalah memperbarui data statis di [gallery.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/gallery.ts?type=file&root=%252F) dan [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&root=%252F). Halaman Galeri umum sudah merender `galleryImages` dari [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/galeri/page.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A1162%2C%22second%22%3A1221%7D%2C%22lines%22%3A%7B%22first%22%3A41%2C%22second%22%3A42%7D%7D&root=%252F), dan galeri detail kegiatan Pramuka sudah merender `activity.gallery` dari [activity-detail.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/activity/activity-detail.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A4156%2C%22second%22%3A5388%7D%2C%22lines%22%3A%7B%22first%22%3A108%2C%22second%22%3A142%7D%7D&root=%252F), jadi tidak ada kebutuhan perubahan UI.

## 3. File Changes
- Modify [gallery.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/gallery.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A250%2C%22second%22%3A2743%7D%2C%22lines%22%3A%7B%22first%22%3A8%2C%22second%22%3A93%7D%7D&root=%252F)
  - Tambahkan 3 objek `GalleryImage` baru ke `galleryImages` dengan `src` menuju:
    - `/images/pramuka/siswa-mts-ke-jambore.jpeg`
    - `/images/pramuka/pelepasan-jambore.jpeg`
    - `/images/pramuka/kepsek-mts-melepas-jambore.jpeg`
  - Set `category: "MTs"` pada ketiganya agar muncul di filter MTs pada grid yang didefinisikan di [gallery-grid.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/gallery/gallery-grid.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A248%2C%22second%22%3A508%7D%2C%22lines%22%3A%7B%22first%22%3A11%2C%22second%22%3A18%7D%7D&root=%252F).
  - Isi `alt` deskriptif berbahasa Indonesia dan pilih `aspectRatio` yang sesuai dengan orientasi tiap foto.

- Modify [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A2182%2C%22second%22%3A3376%7D%2C%22lines%22%3A%7B%22first%22%3A62%2C%22second%22%3A90%7D%7D&root=%252F)
  - Perbarui entri aktivitas `slug: "ekstrakurikuler-pramuka"` dengan menambahkan 3 item galeri baru ke array `gallery`.
  - Untuk setiap item, gunakan path gambar yang sama dari folder publik, plus `title`, `description`, dan `alt` yang menjelaskan konteks pelepasan/jambore MTs.
  - Pertahankan struktur `ActivityGalleryItem` yang saat ini didefinisikan di [activity.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/types/activity.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A224%2C%22second%22%3A312%7D%2C%22lines%22%3A%7B%22first%22%3A15%2C%22second%22%3A20%7D%7D&root=%252F); tidak perlu skema baru.

## 4. Implementation Steps
### Task 1: Tambahkan foto ke galeri umum
1. Edit [gallery.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/gallery.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A250%2C%22second%22%3A2743%7D%2C%22lines%22%3A%7B%22first%22%3A8%2C%22second%22%3A93%7D%7D&root=%252F) dan append tiga item baru ke `galleryImages`.
2. Beri ID unik setelah `g12` agar konsisten dengan pola saat ini, lalu set `category: "MTs"` supaya foto otomatis ikut filter MTs yang digunakan oleh [gallery-grid.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/gallery/gallery-grid.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A1011%2C%22second%22%3A1126%7D%2C%22lines%22%3A%7B%22first%22%3A38%2C%22second%22%3A40%7D%7D&root=%252F).
3. Gunakan string path lokal `public` secara langsung (`/images/...`) alih-alih helper `galleryImage(...)`, karena tiga foto ini adalah aset nyata, bukan placeholder AI seperti item lama di [gallery.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/gallery.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A30%2C%22second%22%3A249%7D%2C%22lines%22%3A%7B%22first%22%3A3%2C%22second%22%3A6%7D%7D&root=%252F).

### Task 2: Tambahkan foto ke galeri dokumentasi Pramuka
1. Edit entri `ekstrakurikuler-pramuka` di [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A2182%2C%22second%22%3A3376%7D%2C%22lines%22%3A%7B%22first%22%3A62%2C%22second%22%3A90%7D%7D&root=%252F) dan tambahkan tiga `ActivityGalleryItem` baru pada array `gallery`.
2. Tulis copy ringkas berbahasa Indonesia untuk `title`, `description`, dan `alt` yang menegaskan bahwa ini adalah dokumentasi Pramuka MTs menuju/pelepasan jambore.
3. Biarkan halaman program Pramuka tetap memakai [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/ekstrakurikuler/pramuka/page.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A335%2C%22second%22%3A751%7D%2C%22lines%22%3A%7B%22first%22%3A12%2C%22second%22%3A26%7D%7D&root=%252F) tanpa perubahan, karena daftar aktivitas sudah mengambil data dari `getActivitiesByProgram("pramuka")`; galeri detail akan ikut terbarui lewat renderer di [activity-detail.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/activity/activity-detail.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A4156%2C%22second%22%3A5388%7D%2C%22lines%22%3A%7B%22first%22%3A108%2C%22second%22%3A142%7D%7D&root=%252F).

### Task 3: Validasi integrasi data
1. Pastikan ketiga file gambar memang tersedia di folder publik: `public/images/pramuka/kepsek-mts-melepas-jambore.jpeg`, `public/images/pramuka/pelepasan-jambore.jpeg`, dan `public/images/pramuka/siswa-mts-ke-jambore.jpeg`.
2. Jalankan validasi minimal sesuai repo guidance di AGENTS.md: `npm run typecheck` dan `npm run lint` karena perubahan hanya menyentuh data TypeScript.
3. Jika perlu validasi akhir render statis, jalankan `npm run build` untuk memastikan `next/image` menerima path lokal baru tanpa error.

## 5. Acceptance Criteria
- Halaman Galeri di [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/galeri/page.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A1162%2C%22second%22%3A1221%7D%2C%22lines%22%3A%7B%22first%22%3A41%2C%22second%22%3A42%7D%7D&root=%252F) menampilkan tiga foto baru dari folder `/images/pramuka/`.
- Saat filter `MTs` dipilih pada [gallery-grid.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/gallery/gallery-grid.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A248%2C%22second%22%3A508%7D%2C%22lines%22%3A%7B%22first%22%3A11%2C%22second%22%3A18%7D%7D&root=%252F), ketiga foto baru muncul dengan badge kategori `MTs`.
- Entri aktivitas `ekstrakurikuler-pramuka` di [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A2182%2C%22second%22%3A3376%7D%2C%22lines%22%3A%7B%22first%22%3A62%2C%22second%22%3A90%7D%7D&root=%252F) memiliki total 5 item galeri setelah penambahan.
- Halaman detail kegiatan Pramuka yang dirender oleh [activity-detail.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/activity/activity-detail.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A4156%2C%22second%22%3A5388%7D%2C%22lines%22%3A%7B%22first%22%3A108%2C%22second%22%3A142%7D%7D&root=%252F) menampilkan tiga foto baru beserta judul dan deskripsi masing-masing.
- `npm run typecheck` selesai tanpa error tipe baru dari [gallery.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/gallery.ts?type=file&root=%252F) dan [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&root=%252F).
- `npm run lint` selesai tanpa error baru yang berasal dari perubahan data galeri.

## 6. Verification Steps
1. Jalankan `npm run typecheck`.
2. Jalankan `npm run lint`.
3. Jalankan `npm run build` bila ingin validasi render produksi.
4. Buka `/galeri`, pilih filter `MTs`, dan pastikan tiga foto baru tampil dengan alt text yang sesuai.
5. Buka halaman detail kegiatan untuk slug `/kegiatan/ekstrakurikuler-pramuka` dan pastikan bagian “Galeri Kegiatan” bertambah dari 2 item menjadi 5 item.
6. Uji bahwa seluruh gambar baru termuat tanpa 404, karena semua path harus cocok dengan file di `public/images/pramuka/`.

## 7. Risks & Mitigations
- Risiko: Pengguna mengartikan “galery di halaman ekstrakulikuler pramuka” sebagai galeri terpisah di halaman daftar program [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/ekstrakurikuler/pramuka/page.tsx?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A335%2C%22second%22%3A751%7D%2C%22lines%22%3A%7B%22first%22%3A12%2C%22second%22%3A26%7D%7D&root=%252F), padahal implementasi saat ini hanya punya galeri di detail kegiatan. Mitigasi: gunakan penambahan pada `activity.gallery` dulu karena itu jalur yang sudah ada; bila user menginginkan galeri langsung di halaman daftar program, itu perlu rencana UI terpisah.
- Risiko: Orientasi gambar JPEG baru berbeda-beda sehingga layout grid bisa tampak kurang rapi bila `aspectRatio` salah di [gallery.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/gallery.ts?type=file&linesData=%7B%22range%22%3A%7B%22first%22%3A250%2C%22second%22%3A2743%7D%2C%22lines%22%3A%7B%22first%22%3A8%2C%22second%22%3A93%7D%7D&root=%252F). Mitigasi: inspeksi orientasi file sebelum menetapkan `landscape`/`portrait`/`square`.
- Risiko: Copy judul/deskripsi yang terlalu umum membuat foto sulit dibedakan di galeri Pramuka. Mitigasi: gunakan teks yang secara eksplisit membedakan momen “menuju jambore”, “pelepasan”, dan “kepala sekolah melepas peserta jambore”.
