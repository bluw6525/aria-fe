"use client";

import React, { useState } from "react";
import { BookOpen, Cpu, AlertTriangle, ShieldAlert } from "lucide-react";
import { TabButton } from "@/components/TabButton";
import { GuideSection } from "./GuideSection";
import { TheorySection } from "./TheorySection";
import { PollutionSection } from "./PollutionSection";
import { IspuStandardSection } from "./IspuStandardSection";

type TabKey = "guide" | "theory" | "pollution" | "ispu";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  {
    key: "guide",
    label: "Cara Penggunaan",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    key: "theory",
    label: "Dasar Teori MM-Estimator",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    key: "pollution",
    label: "Dampak Polusi & Prekursor",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    key: "ispu",
    label: "Kategori Standar ISPU",
    icon: <ShieldAlert className="w-4 h-4" />,
  },
];

export function HelpContainer() {
  const [activeTab, setActiveTab] = useState<TabKey>("guide");

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 pb-16 text-slate-800">
      {/* Tab Navigasi Modul Bantuan Menggunakan TabButton */}
      <div className="flex flex-wrap p-1.5 bg-slate-200/80 rounded-2xl gap-1">
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>

      {/* Konten Tab yang Terpisah per Komponen */}
      {activeTab === "guide" && <GuideSection />}
      {activeTab === "theory" && <TheorySection />}
      {activeTab === "pollution" && <PollutionSection />}
      {activeTab === "ispu" && <IspuStandardSection />}
    </div>
  );
}

export default HelpContainer;
