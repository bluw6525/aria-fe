"use client";

import React from "react";
import { Stack } from "@mantine/core";
import { HomeObjectives } from "./HomeObjectives";
import { HomeModules } from "./HomeModules";

export function HomeOverview() {
  return (
    <Stack gap={32} maw={1024} mx="auto" w="100%" pb={56}>
      {/* 1. Bagian Ringkasan Tujuan Aplikasi */}
      <HomeObjectives />

      {/* 2. Bagian Fitur & Modul Aplikasi */}
      <HomeModules />
    </Stack>
  );
}

export default HomeOverview;
