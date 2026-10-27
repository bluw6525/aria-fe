import React from "react";
import { HomeObjectives } from "./HomeObjectives";
import { HomeModules } from "./HomeModules";

export function HomeOverview() {
  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-14">
      {/* 1. Bagian Ringkasan Tujuan Aplikasi */}
      <HomeObjectives />

      {/* 2. Bagian Fitur & Modul Aplikasi */}
      <HomeModules />
    </section>
  );
}

export { HomeObjectives, HomeModules };
