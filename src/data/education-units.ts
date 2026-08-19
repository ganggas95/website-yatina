import type {EducationUnit} from "@/types/education";
import {TODO_CONTENT, VISI_CONTENT} from "@/lib/utils";

export const educationUnits: EducationUnit[] = [
    {
        slug: "tk-yatina",
        name: "TK Yatina",
        shortName: "TK",
        level: "TK",
        category: "Pendidikan Anak Usia Dini",
        description:
            "Lembaga pendidikan anak usia dini di bawah naungan Yayasan Titi Samaguna yang menanamkan nilai-nilai keislaman, akhlak mulia, dan kecintaan belajar sejak dini melalui pendekatan bermain yang menyenangkan.",
        image: '/images/tk/tk-1.jpg',
        history: [TODO_CONTENT],
        vision: VISI_CONTENT,
        mission: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        goals: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        programs: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        activities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        facilities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        accreditation: {
            status: TODO_CONTENT,
            grade: TODO_CONTENT,
            year: TODO_CONTENT,
            certificateNumber: TODO_CONTENT,
        },
        contactPerson: TODO_CONTENT,
        whatsapp: TODO_CONTENT,
    },
    {
        slug: "mi-riadlul-jannah",
        name: "MI Riadlul Jannah NW Penjor",
        shortName: "MI",
        level: "MI",
        category: "Madrasah Ibtidaiyah",
        description:
            "Madrasah Ibtidaiyah yang menyelenggarakan pendidikan dasar jenjang MI dengan paduan kurikulum nasional dan pendidikan keagamaan yang kokoh, di bawah naungan Nahdlatul Wathan.",
        image: '/images/mi/mi-1.png',
        history: [
            "Madrasah Ibtidaiyah Riadlul Jannah NW Penjor merupakan Lembaga Pendidikan dasar yang berciri khas Pendidikan agama Islam dengan lama belajar 6 tahun yang terletak di Dusun Penjor Desa Genggelang Kecamatan Gangga Kabupaten Lombok Utara.",
            "Pentingnya Pendidikan bagi generasi muda di wilayah Genggelang, maka para tokok masyarakat dan tokoh agama mengadakan musyawarah untuk membentuk lembaga pendidikan keagamaan di dusun Penjor. Pada Tahun 1994 (Masehi)  disepakati dan dibentuk lembaga Pendidikan yang berbasis keagamaan bernama “MI Riadlul Jannah NW Penjor”.",
            "Sampai sekarang. MI Riadlul Jannah NW Penjor sudah mempunyai Gedung sendiri bantuan dari PUPR. Untuk memperkuat keberadaan MI Riadlul Jannah NW Penjor mengajukan ijin pendirian dengan harapan keberadaan MI Riadlul Jannah NW Penjor secara formal lebih jelas statusnya dalam menjalankan kiprah di dunia Pendidikan.",
            "pada tanggal 25 Juli 1994 terbit piagam terdaftar dari kantor Wilayah Departemen Agama Propinsi Nusa Tenggara Barat sehingga madrasah berhak secara hukum untuk menyelenggarakan Pendidikan dan pengajaran.",
        ],
        vision: VISI_CONTENT,
        mission: [
            "Memperkenalkan ajaran agama untuk menumbuhkan sikap religius.",
            "Melaksanakan kegiatan belajar yang efektif dan efisien.",
            "Mendidik dan mendorong siswa hidup bergotong royong.",
            "Membentuk siswa yang bercalistung.",
            "Membina siswa untuk bersaing pada jenjang berikutnya.",
        ],
        goals: [
            "Menghasilkan lulusan yang unggul, beriman dan bertakwa, berakhlak mulia, cerdas, dan kreatif.",
            "Meraih prestasi akademik maupun non-akademik dengan tuntutan program pembelajaran yang berkualitas sebagai bekal untuk studi lanjut.",
            "Meningkatkan kualitas pendidik dan tenaga kependidikan melalui berbagai program pelatihan ataupun pengembangan diri madrasah.",
            "Meningkatkan ketersediaan sarana dan prasarana madrasah untuk mendukung proses pembelajaran.",
            "Meraih prestasi setiap kegiatan, lomba KSM (Kompetensi Sains Madrasah), AKSIOMA, Pramuka, Porseni, dan lain-lain.",
            "Membentuk karakter Islami dan akhlak mulia melalui keteladanan, pembiasaan nilai-nilai luhur, dan pengintegrasian nilai-nilai spiritual dalam kehidupan sehari-hari.",
            "Membangun kemitraan yang kuat dengan pemerintah, swasta, dan orang tua untuk menciptakan kontinuitas pendidikan bermutu.",
        ],
        programs: [
            "Tahfidz Qur'an ayat-ayat pendek",
            "Kaligrafi Islam",
        ],
        activities: [
            "Penguasaan Komputer Program Word dan Excel",
            "Penguasaan Bahasa Asing (Inggris dan Arab)",
        ],
        facilities: [
            "Lab Komputer",
            "Ruang Kelas",
            "Perpustakaan / Ruang Baca",
            "Ruang BK",
            "Fasilitas MCK",
            "Alat Seni Kaligrafi",
            "Internet"
        ],
        accreditation: {
            status: "Terakreditasi",
            grade: "B",
            year: "2012",
            certificateNumber: "94/BAP-SM/KP/X/2012",
        },
        organization: {
            title: "Struktur Organisasi MI Riadlul Jannah NW Penjor",
            description:
                "Visualisasi susunan personel MI Riadlul Jannah NW Penjor yang dirender per lapisan jabatan agar mudah dibaca di web.",
            tiers: [
                {
                    id: "leadership",
                    title: "Pimpinan",
                    description: "Lapisan pimpinan utama unit pendidikan.",
                    members: [
                        {
                            id: "mi-kepala-madrasah",
                            name: "Mariadi,S.Pd.I",
                            role: "Kepala Madrasah",
                            image: undefined,
                            notes: "",
                        },
                    ],
                },
                {
                    id: "core-staff",
                    title: "Staf Inti",
                    members: [
                        {
                            id: "mi-operator",
                            name: "Khairul Nazrullah",
                            role: "Operator Madrasah",
                        },
                        {
                            id: "mi-bendahara-wali-kelas",
                            name: "Munadi, S.Pd.I",
                            role: "Wali Kelas IV / Bendahara",
                        },
                        {
                            id: "mi-waka-kurikulum",
                            name: "Saiful Wathan",
                            role: "Waka Kurikulum",
                        },
                        {
                            id: "mi-tata-usaha",
                            name: "Medi",
                            role: "Tata Usaha",
                        },
                    ],
                },
                {
                    id: "teaching-staff",
                    title: "Guru & Wali Kelas",
                    members: [
                        {
                            id: "mi-guru-0",
                            name: "Selamet Riadi, S.Pd",
                            role: "Guru Mapel Pancasila",
                        },
                        {
                            id: "mi-guru-1",
                            name: "Taezar Hamdi, S.Pd",
                            role: "Guru Mapel PJOK",
                        },
                        {
                            id: "mi-guru-2",
                            name: "Siarto, S.Pd.I",
                            role: "Wali Kelas III",
                        },
                        {
                            id: "mi-guru-3",
                            name: "Parniwati, S.Pd.I",
                            role: "Wali Kelas I / Guru Mapel PKN",
                        },
                        {
                            id: "mi-guru-4",
                            name: "Duradi, S.Pd.I",
                            role: "Wali Kelas VI / Guru Mapel",
                        },
                        {
                            id: "mi-guru-5",
                            name: "Nurhasanah, S.Kom",
                            role: "Wali Kelas / Guru Mapel",
                        },
                        {
                            id: "mi-guru-6",
                            name: "Satria Wardani, S.Pd.I",
                            role: "Wali Kelas / Guru Mapel",
                        },
                        {
                            id: "mi-guru-7",
                            name: "Zulkifli",
                            role: "Guru Mapel MTK",
                        },
                        {
                            id: "mi-guru-8",
                            name: "Medi",
                            role: "Wali Kelas V",
                        },
                        {
                            id: "mi-guru-9",
                            name: "Suldi Hasan, S.Pd",
                            role: "Guru Mapel",
                        },
                        {
                            id: "mi-guru-10",
                            name: "M. Irfan Jayadi, S.Kom",
                            role: "Guru Mapel",
                        },
                        {
                            id: "mi-guru-11",
                            name: "Rahimatun Wahidah, S.Pd",
                            role: "Guru Mapel",
                        },
                    ],
                },
            ],
        },
        contactPerson: TODO_CONTENT,
        whatsapp: TODO_CONTENT,
    },
    {
        slug: "mts-riadlul-jannah",
        name: "MTs Riadlul Jannah NW Penjor",
        shortName: "MTs",
        level: "MTs",
        category: "Madrasah Tsanawiyah",
        description:
            "Madrasah Tsanawiyah untuk jenjang SMP yang mengembangkan potensi akademik, keagamaan, dan karakter siswa menuju remaja yang berilmu dan berakhlakul karimah.",
        image: "/images/mts/mts-1.png",
        history: [
            "Madrasah Tsanawiyah Riadlul Jannah NW Penjor merupakan Lembaga Pendidikan dasar yang berciri khas Pendidikan agama Islam dengan lama belajar 3 tahun yang terletak di Dusun Penjor Desa Genggelang Kecamatan Gangga Kabupaten Lombok Utara.",
            "Pentingnya Pendidikan bagi generasi muda di wilayah Genggelang pada saata awal berdirinya, maka para tokoh masyarakat dan tokoh agama mengadakan musyawarah untuk membentuk lembaga pendidikan keagamaan di dusun Penjor. Pada Tahun 1989 (Masehi)  disepakati dan dibentuk lembaga Pendidikan yang berbasis keagamaan bernama “MTs. Riadlul Jannah NW Penjor”.",
            "Pada saat awal berdirinya, MTs. Riadlul Jannah NW Penjor mencirikan gedung belajar murni dari dana gotong-royong masyarakat yang berasal dari sekitar lingkungan madrasah. Namun karena terjadinya gempa bumu 7,0 SR., pada bulan agustus tahun 2018, gedung yang dibagun tersebut sudah tidak layat dipakai, sehingga pengurus Yayasan merubuhkan gedung yang. Sehingga bangunan gedung MTs. Riadlul Jannah NW Penjor yang sekarang ini dibangun dari bantuan Pemerintah melalui PUPR dan dari para donatur.",
            "Untuk memperkuat keberadaan MTs. Riadlul Jannah NW Penjor mengajukan ijin pendirian dengan harapan keberadaan MTs. Riadlul Jannah NW Penjor secara formal lebih jelas statusnya dalam menjalankan kiprah di dunia Pendidikan, maka terbitlah Piagam Madrasah pada tanggal 9 Desember 1991, yang mengakui MTs. Riadlul Jannah NW Penjor berdiri pada tanggal 4 Juli 1989 oleh kantor Wilayah Departemen Agama Propinsi Nusa Tenggara.",
            "Selanjutnya untuk lebih meningkatkan kualitas pelayanan dan sesuai dengan aturan yang maka MTs. Riadlul Jannah NW Penjor telah diakreditasi 4 (empat) kali, yaitu pada tahun 2006 dengan nilai C, tahun 2011 dengan nilai B, tahun 2017 dengan nilai A, dan terakhir tahun 2023 dengan nilai B.",
        ],
        vision: VISI_CONTENT,
        mission: [
            "Menyelenggarakan program pendidikan yang Islami yang berorientasi pada peningkatan kualitas iman dan takwa.",
            "Membimbing siswa bisa baca tulis Al-Qur’an.",
            "Membimbing siswa bisa menghafal ayat-ayat pendek Al-Qur’an.",
            "Membimbing siswa bisa berpidato.",
            "Membimbing siswa terampil bekerja dengan komputer.",
            "Menerapkan manajemen partisipasi, sehingga seluruh siswa dapat bermanfaat kepada diri dan orang lain.",
            "Mengadakan bimbingan dan konseling secara berkelanjutan, sehingga terbentuk sikap, kebiasaan, dan karakter positif setiap peserta didik yang mampu diterapkan dalam kehidupan sehari-hari.",
        ],
        goals: [
            "Tujuan umum: Memiliki kegiatan keagamaan dan kepedulian terhadap lingkungan madrasah.",
            "Tujuan umum: Siswa dapat memperoleh nilai-nilai baik pada Ujian Madrasah (UM).",
            "Tujuan umum: Siswa bisa bersaing masuk ke jenjang MA/SMA/SMK favorit.",
            "Tujuan umum: Unggul dalam penerapan ilmu pengetahuan dan teknologi, terutama bidang sains dan matematika.",
            "Tujuan umum: Unggul dalam lomba olahraga, kesenian, dan Pramuka.",
            "Tujuan umum: Unggul dalam kebersihan dan penghijauan lingkungan madrasah.",
            "Tujuan khusus: Madrasah dapat memenuhi 8 Standar Nasional Pendidikan (SNP).",
            "Tujuan khusus: Madrasah mengembangkan Pembelajaran Aktif, Inovatif, Kreatif, Efektif, dan Menyenangkan (PAIKEM) 100% untuk semua mata pelajaran.",
            "Tujuan khusus: Madrasah dapat meningkatkan jumlah siswa 60%.",
            "Tujuan khusus: Madrasah dapat menciptakan lingkungan yang bersih, disiplin, dan religius.",
            "Tujuan khusus: Madrasah dapat mengembangkan kemampuan dan keterampilan di bidang teknologi informasi dan komunikasi.",
            "Tujuan khusus: Madrasah dapat mengembangkan kemampuan dan keterampilan di bidang seni.",
            "Tujuan khusus: Madrasah dapat mewujudkan kepribadian siswa yang berakhlak mulia disertai iman dan takwa kepada Allah SWT.",
            "Tujuan khusus: Madrasah dapat mewujudkan output yang berkualitas.",
        ],
        programs: [
            "Tahfidz Qur'an ayat-ayat pendek",
            "Pembinaan kesenian Islam (hadroh)",
        ],
        activities: [
            "Penguasaan Komputer Program Word dan Excel",
            "Penguasaan Bahasa Asing (Inggris dan Arab)",
            "Pembinaan sepak bola",
            "Pembinaan Pramuka",
        ],
        facilities: [
            "Lab Komputer",
            "Ruang Kelas",
            "Perpustakaan / Ruang Baca",
            "Ruang BK",
            "Fasilitas MCK",
            "Alat-Alat Hadroh",
            "Fasilitas Pramuka",
            "Fasilitas Olahraga",
            "Internet"
        ],
        accreditation: {
            status: "Terakreditasi",
            grade: "B",
            year: "2023",
            certificateNumber: "00271/52000/MTS/2023",
        },
        organization: {
            title: "Struktur Organisasi MTs Riadlul Jannah NW Penjor",
            description:
                "Visualisasi susunan personel MTs Riadlul Jannah NW Penjor yang dirender per lapisan jabatan agar mudah dibaca di web.",
            tiers: [
                {
                    id: "leadership",
                    title: "Pimpinan",
                    description: "Lapisan pimpinan utama madrasah dan unsur komite.",
                    members: [
                        {
                            id: "mts-kepala-madrasah",
                            name: "Saiful Muslim, S.PdI",
                            role: "Kepala Madrasah",
                        },
                        {
                            id: "mts-ketua-komite",
                            name: "Rabin",
                            role: "Ketua Komite Madrasah",
                        },
                    ],
                },
                {
                    id: "administration",
                    title: "Administrasi & Operasional",
//                    description: "Fungsi administrasi, tata usaha, data, dan operasional harian madrasah.",
                    members: [
                        {
                            id: "mts-bendahara",
                            name: "I’Anah, SE.",
                            role: "Bendahara Madrasah",
                        },
                        {
                            id: "mts-kepala-tu",
                            name: "Astriali",
                            role: "Kepala Tata Usaha",
                        },
                        {
                            id: "mts-staf-tu",
                            name: "Ahmad Musliman Hadi, S.HI",
                            role: "Staf Tata Usaha",
                        },
                        {
                            id: "mts-operator-data",
                            name: "Abdul Khabir Makbul",
                            role: "Operator Data",
                        },
                        {
                            id: "mts-penjaga-madrasah",
                            name: "Syurdi, S.Pd.",
                            role: "Penjaga Madrasah",
                        },
                    ],
                },
                {
                    id: "academic-coordinators",
                    title: "Wakabag & Koordinator",
//                    description: "Bidang akademik, kesiswaan, sarpras, humas, layanan BK, dan pustaka.",
                    members: [
                        {
                            id: "mts-wakabag-kurikulum",
                            name: "Neni Supartini, S.Pd.",
                            role: "Wakabag Kurikulum",
                        },
                        {
                            id: "mts-wakabag-kesiswaan",
                            name: "Hayudin, S.Pd.",
                            role: "Wakabag Kesiswaan",
                        },
                        {
                            id: "mts-wakabag-sarpras",
                            name: "Satuhu, S.PdI",
                            role: "Wakabag Sarpras",
                        },
                        {
                            id: "mts-wakabag-humas",
                            name: "H. Syarif Hidayatullah, S.Pd.",
                            role: "Wakabag Humas",
                        },
                        {
                            id: "mts-koordinator-bk",
                            name: "Firman Hadi Yudistira, S.Pd.",
                            role: "Koordinator BK",
                        },
                        {
                            id: "mts-koordinator-pustaka",
                            name: "Mayanti Da’in, S.Pd.",
                            role: "Koordinator Pustaka",
                        },
                    ],
                },
                {
                    id: "wali-kelas",
                    title: "Wali Kelas",
//                    description: "Pembagian wali kelas untuk jenjang VII sampai IX.",
                    members: [
                        {
                            id: "mts-wali-vii-a",
                            name: "Yulia Agustina, S.Pd.",
                            role: "Wali Kelas VII A",
                        },
                        {
                            id: "mts-wali-vii-b",
                            name: "Ari Hidayat, S.Pd.",
                            role: "Wali Kelas VII B",
                        },
                        {
                            id: "mts-wali-viii-a",
                            name: "Purnasari, S.Pd.",
                            role: "Wali Kelas VIII A",
                        },
                        {
                            id: "mts-wali-viii-b",
                            name: "Sulistiani, S.Pd.",
                            role: "Wali Kelas VIII B",
                        },
                        {
                            id: "mts-wali-ix-a",
                            name: "I’Anah, SE.",
                            role: "Wali Kelas IX A",
                        },
                        {
                            id: "mts-wali-ix-b",
                            name: "Mayanti Da’in, S.Pd.",
                            role: "Wali Kelas IX B",
                        },
                        {
                            id: "mts-wali-ix-c",
                            name: "M. Sudiarto, S.PdI",
                            role: "Wali Kelas IX C",
                        },
                    ],
                },
            ],
        },
        contactPerson: '082340589900',
        whatsapp: '082340589900',
    },
    {
        slug: "ma-riadlul-jannah",
        name: "MA Riadlul Jannah NW Penjor",
        shortName: "MA",
        level: "MA",
        category: "Madrasah Aliyah",
        description:
            "Madrasah Aliyah jenjang SMA yang mempersiapkan peserta didik menuju pendidikan tinggi dan kehidupan bermasyarakat dengan fondasi keilmuan serta keislaman yang kuat.",
        image: '/images/ma/ma-1.jpg',
        history: [TODO_CONTENT],
        vision: VISI_CONTENT,
        mission: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        goals: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        programs: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        activities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        facilities: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
        accreditation: {
            status: TODO_CONTENT,
            grade: TODO_CONTENT,
            year: TODO_CONTENT,
            certificateNumber: TODO_CONTENT,
        },
        contactPerson: TODO_CONTENT,
        whatsapp: TODO_CONTENT,
    },
];

export function getEducationUnit(slug: string) {
    return educationUnits.find((u) => u.slug === slug);
}
