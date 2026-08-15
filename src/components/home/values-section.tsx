import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { coreValues } from "@/data/values";
import { cn } from "@/lib/utils";

export function ValuesSection() {
  return (
    <section
      aria-labelledby="values-heading"
      className="py-20 sm:py-28 bg-surface"
    >
      <Container>
        <div className="mx-auto max-w-3xl mb-14 sm:mb-16">
          <SectionHeading
            eyebrow="Nilai Pendidikan"
            title="Enam Pijakan Mendidik Generasi"
            description="Nilai-nilai yang mendasari seluruh proses pendidikan di lingkungan Yayasan Titi Samaguna dalam menyiapkan peserta didik yang paripurna."
            align="center"
          />
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div
                key={value.id}
                className={cn(
                  "group relative p-6 sm:p-8 rounded-2xl bg-white ring-1 ring-primary-100 hover:ring-primary-200 hover:shadow-lg transition-all duration-300",
                  idx % 3 === 1 && "lg:-translate-y-4"
                )}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-primary-50 to-transparent blur-2xl opacity-60 pointer-events-none" />
                <div className="relative space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md shadow-primary-800/10 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary-800">
                    {value.title}
                  </h3>
                  <p className="leading-7 text-secondary-700 text-pretty">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-center text-xs sm:text-sm text-secondary-500 italic">
          Nilai ini bersifat draf awal dan akan disesuaikan kembali setelah mendapatkan data resmi dari pengurus yayasan.
        </p>
      </Container>
    </section>
  );
}
