import React from "react";
import Link from "next/link";
import {
  Layers,
  Gauge,
  HelpCircle,
  History,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface ModuleItem {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  icon: LucideIcon;
}

const MODULES: ModuleItem[] = [
  {
    title: "Modul Estimasi Kualitas Udara",
    description:
      "Melakukan estimasi nilai konsentrasi O₃ dan kategori ISPU SPKU berdasarkan data polutan CO dan NO₂ Sentinel-5P melalui input nilai manual maupun unggah berkas data.",
    href: "/estimate",
    actionLabel: "Buka Estimasi",
    icon: Gauge,
  },
  {
    title: "Modul Bantuan & Teori",
    description:
      "Penyedia informasi pendukung mencakup panduan penggunaan aplikasi, dasar teori metode estimasi regresi, serta tabel klasifikasi ISPU (Permen LHK No. 14 Tahun 2020).",
    href: "/help",
    actionLabel: "Buka Panduan",
    icon: HelpCircle,
  },
  {
    title: "Modul Riwayat Perancang",
    description:
      "Menyajikan informasi identitas pengembang aplikasi, program studi Teknik Informatika Universitas Tarumanagara, dan catatan perancangan sistem.",
    href: "/history",
    actionLabel: "Buka Riwayat",
    icon: History,
  },
];

export function ModuleCard({
  title,
  description,
  href,
  actionLabel,
  icon: Icon,
}: ModuleItem) {
  return (
    <Link
      href={href}
      className="group p-5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-sky-400 hover:bg-sky-50/30 transition-all flex flex-col justify-between"
    >
      <div className="flex flex-col gap-2.5">
        <div className="p-2 rounded-lg bg-sky-600 text-white shadow-xs w-fit">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-sky-600 group-hover:gap-2 transition-all">
        <span>{actionLabel}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

export function HomeModules() {
  return (
    <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs flex flex-col gap-6">
      {/* Header Bagian Modul */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Fitur & Modul Aplikasi
            </h2>
            <p className="text-xs text-slate-500">
              Panduan ringkas fitur dan modul yang dapat diakses pengguna di dalam sistem
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
          Navigasi Antarmuka
        </span>
      </div>

      {/* Grid Kartu Modul */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MODULES.map((item) => (
          <ModuleCard
            key={item.href}
            title={item.title}
            description={item.description}
            href={item.href}
            actionLabel={item.actionLabel}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}
