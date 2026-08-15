import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GraduationCap, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative isolate min-h-[80vh] flex items-center py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(15,81,50,0.08) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(201,169,97,0.15) 0%, transparent 55%)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-xl text-center space-y-7 animate-fade-in">
          <p className="inline-flex items-center rounded-full bg-primary-50 border border-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-700">
            Error 404
          </p>
          <h1 className="font-heading text-6xl sm:text-7xl font-extrabold text-primary-800">
            404
          </h1>
          <div className="space-y-3">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-800">
              Halaman tidak ditemukan
            </h2>
            <p className="text-base leading-7 text-secondary-700">
              Sepertinya halaman yang Anda cari telah dipindahkan, dihapus, atau
              memang tidak pernah ada. Mari kembali ke jalur yang benar.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Button
              href="/"
              size="lg"
              leftIcon={<Home className="h-4 w-4" />}
              className="shadow-md shadow-primary-800/10"
            >
              Kembali ke Beranda
            </Button>
            <Button
              href="/unit-pendidikan"
              variant="outline"
              size="lg"
              leftIcon={<GraduationCap className="h-4 w-4" />}
            >
              Lihat Unit Pendidikan
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
