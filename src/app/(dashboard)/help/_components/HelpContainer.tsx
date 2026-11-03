"use client";

import React, { useState } from "react";
import { BookOpen, Cpu, AlertTriangle, ShieldAlert } from "lucide-react";
import { Box, Flex } from "@mantine/core";
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
    icon: <BookOpen style={{ width: 16, height: 16 }} />,
  },
  {
    key: "theory",
    label: "Dasar Teori MM-Estimator",
    icon: <Cpu style={{ width: 16, height: 16 }} />,
  },
  {
    key: "pollution",
    label: "Dampak Polusi & Prekursor",
    icon: <AlertTriangle style={{ width: 16, height: 16 }} />,
  },
  {
    key: "ispu",
    label: "Kategori Standar ISPU",
    icon: <ShieldAlert style={{ width: 16, height: 16 }} />,
  },
];

export function HelpContainer() {
  const [activeTab, setActiveTab] = useState<TabKey>("guide");

  return (
    <Box maw={896} mx="auto" w="100%" pb={64} style={{ color: "var(--mantine-color-brandSecondary-8)", display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Tab Navigasi Modul Bantuan */}
      <Flex
        wrap="wrap"
        p={6}
        gap={4}
        style={{
          backgroundColor: "var(--mantine-color-brandSecondary-2)",
          borderRadius: 16,
        }}
      >
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </Flex>

      {/* Konten Tab yang Terpisah per Komponen */}
      {activeTab === "guide" && <GuideSection />}
      {activeTab === "theory" && <TheorySection />}
      {activeTab === "pollution" && <PollutionSection />}
      {activeTab === "ispu" && <IspuStandardSection />}
    </Box>
  );
}

export default HelpContainer;
