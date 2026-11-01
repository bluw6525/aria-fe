"use client";

import { ReactNode } from "react";
import { Box } from "@mantine/core";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Box
      component="main"
      style={{
        flex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        backgroundColor: "var(--background)",
        padding: "32px 40px",
      }}
    >
      {children}
    </Box>
  );
}

export default PageContainer;
