import {TODO_CONTENT, VISI_CONTENT} from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  GraduationCap,
  Heart,
  Users,
  Shield,
  HandHeart,
} from "lucide-react";

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const coreValues: CoreValue[] = [
  {
    id: "keislaman",
    title: "Keislaman",
    description:
      "Menjadikan Al-Qur'an dan As-Sunnah sebagai fondasi utama seluruh proses pendidikan dan pengembangan karakter peserta didik.",
    icon: BookOpen,
  },
  {
    id: "ilmu-pengetahuan",
    title: "Ilmu Pengetahuan",
    description:
      "Mendorong semangat belajar dan penguasaan ilmu pengetahuan umum serta keagamaan secara seimbang dan berkualitas.",
    icon: GraduationCap,
  },
  {
    id: "akhlakul-karimah",
    title: "Akhlakul Karimah",
    description:
      "Membentuk peserta didik yang memiliki akhlak mulia, sopan santun, dan perilaku terpuji dalam kehidupan sehari-hari.",
    icon: Heart,
  },
  {
    id: "kedisiplinan",
    title: "Kedisiplinan",
    description:
      "Membangun budaya disiplin waktu, aturan, dan tanggung jawab sebagai bekal kehidupan bermasyarakat.",
    icon: Shield,
  },
  {
    id: "kebersamaan",
    title: "Kebersamaan",
    description:
      "Menumbuhkan semangat kekeluargaan, gotong royong, dan toleransi antar warga madrasah.",
    icon: Users,
  },
  {
    id: "pengabdian",
    title: "Pengabdian kepada Masyarakat",
    description:
      "Menanamkan jiwa pengabdian dan kepedulian sosial agar lulusan dapat bermanfaat bagi lingkungan sekitar.",
    icon: HandHeart,
  },
];

export const nwIdentity = {
  title: "Bernaung dalam Tradisi Pendidikan Nahdlatul Wathan",
  description: TODO_CONTENT,
};

export const foundationInfo = {
  introHeading: "Lembaga Sosial Keagamaan dan Pendidikan Islam",
  history: TODO_CONTENT,
  vision: VISI_CONTENT,
  mission: [TODO_CONTENT, TODO_CONTENT, TODO_CONTENT, TODO_CONTENT],
  organization: [] as { name: string; role: string; image?: string }[],
};
