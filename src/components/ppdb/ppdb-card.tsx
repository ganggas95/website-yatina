import { PPDBCTA } from "@/components/ui/ppdb-cta";
import { WhatsAppCTA } from "@/components/ui/whatsapp-cta";
import type { PPDBInfo } from "@/data/ppdb";
import { TODO_CONTENT } from "@/lib/utils";
import {
    CalendarDays,
    CheckCircle2,
    Coins,
    FileCheck2,
    MessageCircle,
    UserCircle,
} from "lucide-react";

const styleVariant = [
  "from-primary-50 to-white",
  "from-accent-50 to-white",
  "from-secondary-50 to-white",
  "from-primary-50/60 to-white",
];
const accentVariant = [
  "bg-primary-600",
  "bg-accent-500",
  "bg-secondary-600",
  "bg-primary-700",
];

export function PPDBCard({
  info,
  index = 0,
}: {
  info: PPDBInfo;
  index?: number;
}) {
  const ri = info.registrationInfo === TODO_CONTENT;
  const sched = info.schedule === TODO_CONTENT;
  const fees = info.fees === TODO_CONTENT;
  const cp = info.contactPerson === TODO_CONTENT;
  const wa = info.whatsapp === TODO_CONTENT;

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white ring-1 ring-primary-100 shadow-sm hover:shadow-xl hover:ring-primary-200 transition-all duration-500">
      <div
        className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accentVariant[index % accentVariant.length]} via-white to-transparent`}
      />
      <div
        className={`p-6 sm:p-8 bg-gradient-to-br ${styleVariant[index % styleVariant.length]}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white font-heading text-lg font-bold shadow ${accentVariant[index % accentVariant.length]}`}
            >
              {info.level}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
                PPDB {info.level}
              </p>
              <h3 className="font-heading text-xl font-bold text-primary-800 leading-snug">
                {info.unitName}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-4 w-4 text-primary-600" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-600">
              Informasi Pendaftaran
            </h4>
          </div>
          <p
            className={`leading-7 text-sm text-secondary-700 ${ri ? "italic text-secondary-500" : ""}`}
          >
            {ri
              ? "Informasi alur dan tahapan pendaftaran akan diumumkan segera."
              : info.registrationInfo}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary-600" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-600">
              Persyaratan
            </h4>
          </div>
          <ul className="space-y-2">
            {info.requirements.map((req, idx) => {
              const ph = req === TODO_CONTENT;
              return (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 ${ph ? "text-secondary-300" : "text-primary-600"}`}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                  <span
                    className={`leading-6 text-secondary-700 ${ph ? "italic text-secondary-500" : ""}`}
                  >
                    {ph ? `Persyaratan ke-${idx + 1} akan diumumkan.` : req}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-2xl ring-1 ring-primary-100 bg-white p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary-500">
              <CalendarDays className="h-3.5 w-3.5" />
              Jadwal
            </div>
            <p
              className={`text-sm leading-6 font-semibold text-primary-800 ${sched ? "italic text-secondary-500 font-normal" : ""}`}
            >
              {sched ? "Akan diumumkan" : info.schedule}
            </p>
          </div>
          <div className="rounded-2xl ring-1 ring-primary-100 bg-white p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary-500">
              <Coins className="h-3.5 w-3.5" />
              Biaya
            </div>
            <p
              className={`text-sm leading-6 font-semibold text-primary-800 ${fees ? "italic text-secondary-500 font-normal" : ""}`}
            >
              {fees ? "Informasi biaya akan diumumkan" : info.fees}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-white ring-1 ring-primary-100 p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary-600 ring-1 ring-primary-100">
                <UserCircle className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
                  Contact Person
                </p>
                <p
                  className={`font-semibold text-primary-800 ${cp ? "italic text-secondary-500 font-normal" : ""}`}
                >
                  {cp ? "Akan diumumkan" : info.contactPerson}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-accent-600 ring-1 ring-primary-100">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
                  WhatsApp
                </p>
                <p
                  className={`font-semibold text-primary-800 ${wa ? "italic text-secondary-500 font-normal" : ""}`}
                >
                  {wa ? "Nomor akan diumumkan" : info.whatsapp}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <PPDBCTA
              label={`PPDB ${info.level}`}
              size="sm"
              className="w-full"
            />
            {wa ? (
              <WhatsAppCTA
                label="Hubungi Panitia Pusat"
                size="sm"
                variant="whatsapp"
                className="w-full"
              />
            ) : (
              <WhatsAppCTA
                label={`Chat Panitia ${info.level}`}
                size="sm"
                variant="whatsapp"
                phoneNumber={info.whatsapp}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
