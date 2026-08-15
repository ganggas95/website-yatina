## 1. Goal
Menambahkan galeri foto untuk setiap kegiatan atau ekstrakurikuler pada halaman detail kegiatan, dengan setiap item galeri memiliki image, title, dan deskripsi.

## 2. Approach
Perubahan paling kecil dan konsisten dengan arsitektur repo adalah menyimpan galeri sebagai bagian dari data activity yang sudah ada, bukan membuat source baru. UI detail kegiatan di [activity-detail.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/activity/activity-detail.tsx?type=file&root=%252F) sudah menjadi tempat utama presentasi satu kegiatan, jadi section galeri ditambahkan di sana agar berlaku otomatis untuk kegiatan umum maupun ekstrakurikuler yang memakai route detail [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/kegiatan/%5Bslug%5D/page.tsx?type=file&root=%252F). Pendekatan ini menjaga site tetap static, typed, dan mudah dipindah ke CMS nanti karena struktur konten tetap terpisah dari komponen.

## 3. File Changes
- **Modify** [activity.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/types/activity.ts?type=file&root=%252F)
  - Area saat ini: definisi `Activity` berada di sekitar baris 15-26.
  - Tambahkan tipe baru untuk item galeri kegiatan, misalnya `ActivityGalleryItem`, dengan field `image`, `title`, `description`, dan opsional `alt` bila ingin memisahkan alt text dari title.
  - Tambahkan properti `gallery` pada `Activity` sebagai array item galeri.

- **Modify** [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&root=%252F)
  - Area saat ini: daftar activity berada di sekitar baris 4-102.
  - Isi `gallery` untuk setiap kegiatan yang sudah ada: `kegiatan-belajar-mengajar-rutin`, `sholat-dhuha-berjamaah`, `ekstrakurikuler-pramuka`, `tim-sepak-bola-persahabatan-antar-madrasah`, `kunjungan-sosial-desa`, dan `upacara-bendera-senin`.
  - Reuse asset yang sudah ada di `public/images/` bila tersedia; bila foto tambahan belum ada, rencanakan placeholder berbasis asset existing agar build tidak bergantung pada file baru yang belum tersedia.
  - Pastikan setiap item galeri memuat copy Indonesia yang ringkas dan informatif.

- **Modify** [activity-detail.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/activity/activity-detail.tsx?type=file&root=%252F)
  - Area saat ini: hero image ada di sekitar baris 62-71, body content di baris 73-106, CTA kembali di baris 108-116.
  - Tambahkan section galeri setelah body konten dan sebelum CTA kembali agar urutan halaman tetap logis: hero → isi kegiatan → galeri → navigasi.
  - Render grid kartu galeri menggunakan `next/image`, menampilkan image, title, dan description secara eksplisit, bukan hanya overlay hover seperti [gallery-grid.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/gallery/gallery-grid.tsx?type=file&root=%252F).
  - Tambahkan fallback yang tidak mengganggu bila sebuah activity belum punya galeri, misalnya section tidak dirender sama sekali atau menampilkan empty state ringan.

- **Optional modify, hanya bila dibutuhkan untuk metadata** [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/kegiatan/%5Bslug%5D/page.tsx?type=file&root=%252F)
  - Area saat ini: metadata Open Graph memakai `activity.image` di sekitar baris 18-29.
  - Tidak wajib diubah bila hero image tetap jadi representasi utama. Jika ingin lebih konsisten, pastikan item pertama `gallery` mereferensikan hero image agar metadata dan konten visual tidak saling berbeda.

## 4. Implementation Steps
### Task 1: Perluas model data kegiatan
1. Di [activity.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/types/activity.ts?type=file&root=%252F), tambahkan interface item galeri yang memuat `image`, `title`, `description`, dan `alt` opsional.
2. Di file yang sama, tambahkan properti `gallery?: ActivityGalleryItem[]` ke interface `Activity` agar perubahan tetap backward-compatible selama data belum lengkap.

### Task 2: Lengkapi static content untuk tiap kegiatan
1. Di [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&root=%252F), tambahkan `gallery` pada setiap object activity yang sudah dipublikasikan.
2. Untuk tiap `gallery`, isi minimal 1-3 item dengan struktur yang konsisten:
   - `image`: path asset lokal di `public/images/...`
   - `title`: judul singkat foto
   - `description`: deskripsi konteks foto 1-2 kalimat pendek
3. Untuk activity ekstrakurikuler Pramuka dan sepak bola, gunakan naming/copy yang menekankan sesi latihan, kerja sama tim, pembinaan karakter, dan suasana kegiatan lapangan agar selaras dengan copy existing di baris 29-55 file yang sama.
4. Pastikan tidak ada item `gallery` yang merujuk ke asset yang tidak ada, supaya Next build tetap aman.

### Task 3: Tambahkan UI galeri di detail kegiatan
1. Di [activity-detail.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/activity/activity-detail.tsx?type=file&root=%252F), hitung flag seperti `hasGallery = activity.gallery?.length > 0` dekat logika `isContentPlaceholder` di sekitar baris 17-18.
2. Tambahkan section baru setelah blok konten artikel saat ini (setelah baris 106) untuk menampilkan heading seperti “Galeri Kegiatan” atau “Dokumentasi Foto”.
3. Render galeri sebagai grid responsif 1-2 kolom dengan kartu yang memuat:
   - rasio gambar konsisten
   - judul foto sebagai heading kecil
   - deskripsi di bawah judul
   - alt text yang bermakna untuk aksesibilitas
4. Pertahankan styling visual yang sudah dipakai di halaman detail: rounded container, ring, spacing besar, warna primary/accent yang sama, dan komponen `SectionHeading` bila cocok.
5. Pastikan section ini merupakan server-rendered markup biasa tanpa `use client`, sesuai constraint repo.

### Task 4: Rapikan perilaku kosong dan konsistensi konten
1. Putuskan perilaku tanpa galeri di [activity-detail.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/activity/activity-detail.tsx?type=file&root=%252F): paling aman tidak merender section jika `gallery` kosong agar halaman tetap ringkas.
2. Jaga `activity.image` sebagai hero image utama supaya [page.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/app/kegiatan/%5Bslug%5D/page.tsx?type=file&root=%252F) tidak perlu perubahan metadata besar.
3. Jika dipilih, samakan item pertama galeri dengan hero image untuk aktivitas yang hanya punya satu foto agar pengalaman visual konsisten.

## 5. Acceptance Criteria
- Setiap item pada `activities` di [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&root=%252F) memiliki properti `gallery` atau secara eksplisit dibiarkan opsional tanpa menyebabkan type error.
- Tipe `Activity` di [activity.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/types/activity.ts?type=file&root=%252F) mendukung array item galeri yang berisi image, title, dan description.
- Halaman detail `/kegiatan/[slug]` merender section galeri untuk activity yang memiliki `gallery`, menggunakan image, title, dan description yang berasal dari data statis.
- Halaman detail `/kegiatan/[slug]` tetap dapat dirender tanpa error untuk activity yang tidak memiliki `gallery`.
- Galeri Pramuka dan Sepak Bola tampil pada detail activity masing-masing karena keduanya berasal dari data `activities` dengan `section: "ekstrakurikuler"` di [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&root=%252F).
- Tidak ada referensi gambar lokal yang mengarah ke file yang tidak ada di `public/images/`.
- Implementasi tidak menambah dependency baru dan tidak memperkenalkan komponen client-side baru.

## 6. Verification Steps
- Jalankan `npm run typecheck` untuk memastikan perubahan tipe `Activity` dan data `activities` valid.
- Jalankan `npm run lint` untuk memastikan komponen detail baru memenuhi aturan linting React/Next/Tailwind yang berlaku.
- Jalankan `npm run build` untuk memastikan semua route statis, termasuk detail kegiatan, tetap buildable.
- Verifikasi manual pada beberapa halaman detail:
  - `/kegiatan/ekstrakurikuler-pramuka`
  - `/kegiatan/tim-sepak-bola-persahabatan-antar-madrasah`
  - `/kegiatan/sholat-dhuha-berjamaah`
- Pada tiap halaman di atas, pastikan:
  - hero image tetap tampil
  - section galeri muncul di bawah konten
  - setiap kartu menampilkan image, title, dan description
  - layout tetap rapi di mobile dan desktop
- Uji satu activity dengan jumlah foto minimal 1 item untuk memastikan grid tidak rusak.
- Uji satu activity tanpa `gallery` bila properti dibiarkan opsional untuk memastikan section tersembunyi tanpa empty gap.

## 7. Risks & Mitigations
- **Risiko:** Asset foto tambahan belum tersedia untuk semua kegiatan, sementara user meminta galeri per kegiatan.
  - **Mitigasi:** Gunakan foto existing sebagai seed minimal 1 item per activity terlebih dahulu, dan desain tipe `gallery` agar mudah diperluas saat file baru ditambahkan.
- **Risiko:** Menambahkan field wajib `gallery` ke semua activity dapat memaksa perubahan besar di data existing.
  - **Mitigasi:** Jadikan `gallery` opsional pada tipe, lalu isi bertahap pada semua activity aktif di [activities.ts](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/data/activities.ts?type=file&root=%252F).
- **Risiko:** Reuse pola [gallery-grid.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/gallery/gallery-grid.tsx?type=file&root=%252F) secara langsung tidak cocok karena komponen itu client-side dan hanya menonjolkan `alt`, bukan title + description.
  - **Mitigasi:** Buat render server-side sederhana langsung di [activity-detail.tsx](air-file://0r90263oosr3m9hbokp6/Users/nizar/MyProject/website-yatina/src/components/activity/activity-detail.tsx?type=file&root=%252F) atau ekstrak komponen server baru khusus galeri activity bila markup mulai terlalu panjang.
- **Risiko:** Metadata Open Graph dapat berbeda dengan foto yang paling sering terlihat user di galeri.
  - **Mitigasi:** Pertahankan `activity.image` sebagai representasi utama dan, bila perlu, samakan dengan item pertama pada galeri.