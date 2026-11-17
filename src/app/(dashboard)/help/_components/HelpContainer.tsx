"use client";

import React, { useState } from "react";
import { BookOpen, Cpu, AlertTriangle, ShieldAlert } from "lucide-react";
import { Box, Tabs } from "@mantine/core";
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
    label: "Dasar Teori & Algoritma",
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
    <Box maw={896} mx="auto" w="100%" pb={64} style={{ color: "var(--mantine-color-brandSecondary-8)" }}>
      {/* Komponen Tab Bawaan Mantine dengan Styling Khas Pill Asli */}
      <Tabs
        value={activeTab}
        onChange={(val) => setActiveTab(val as TabKey)}
        variant="unstyled"
      >
        <Tabs.List
          style={{
            backgroundColor: "var(--mantine-color-brandSecondary-2)",
            borderRadius: 16,
            padding: 6,
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            borderBottom: "none",
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Tabs.Tab
                key={tab.key}
                value={tab.key}
                leftSection={tab.icon}
                style={{
                  borderRadius: 12,
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 700,
                  transition: "all 150ms ease",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  boxShadow: isActive
                    ? "var(--mantine-color-shadow-xs, 0 1px 3px rgba(0,0,0,0.05))"
                    : "none",
                  color: isActive
                    ? "var(--mantine-color-brandPrimary-8)"
                    : "var(--mantine-color-brandSecondary-6)",
                }}
              >
                {tab.label}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        {/* Panel Konten Modul Bantuan */}
        <Box mt={32}>
          <Tabs.Panel value="guide">
            <GuideSection />
          </Tabs.Panel>
          <Tabs.Panel value="theory">
            <TheorySection />
          </Tabs.Panel>
          <Tabs.Panel value="pollution">
            <PollutionSection />
          </Tabs.Panel>
          <Tabs.Panel value="ispu">
            <IspuStandardSection />
          </Tabs.Panel>
        </Box>
      </Tabs>
    </Box>
  );
}

export default HelpContainer;
