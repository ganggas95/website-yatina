# Checklist SEO Yatina

## Target intent

- Beranda dan Tentang: Yayasan Titi Samaguna, Yatina Penjor, pendidikan Islam Lombok Utara.
- Unit pendidikan: nama dan jenjang TK, MI, MTs, atau MA Riadlul Jannah NW Penjor.
- PPDB: penerimaan peserta didik baru Yatina dan informasi pendaftaran per jenjang.
- Kegiatan dan Prestasi: dokumentasi kegiatan, ekstrakurikuler, serta capaian madrasah.

## Sebelum dan sesudah deployment

- Pastikan domain produksi menggunakan `https://yatinapenjor.sch.id` dan semua URL sitemap merespons 200.
- Periksa title, description, canonical, `og:image`, alt gambar, dan satu H1 pada setiap route utama.
- Buka `/robots.txt` dan `/sitemap.xml`; pastikan sitemap menunjuk ke URL produksi dan tidak memuat URL placeholder.
- Validasi JSON-LD dengan [Rich Results Test](https://search.google.com/test/rich-results) atau Schema Markup Validator.
- Tambahkan properti domain di Google Search Console, verifikasi kepemilikan, kirim `/sitemap.xml`, lalu gunakan URL Inspection untuk beranda, PPDB, satu unit, dan satu kegiatan.
- Lengkapi Google Business Profile secara manual dengan nama legal, alamat, jam layanan, kategori pendidikan, dan tautan situs. Jangan menyimpan kredensial di repository.

Google tidak menjamin rich result atau peringkat; pantau indexing, query, dan error coverage setelah situs dipublikasikan.
