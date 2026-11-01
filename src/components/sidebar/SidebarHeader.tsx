"use client";

import { Activity, LogOut } from "lucide-react";
import { Box, Flex, Text, Title, ActionIcon } from "@mantine/core";

interface SidebarHeaderProps {
  isAdmin?: boolean;
  onLogout?: () => void;
}

/**
 * Header Sidebar yang menampilkan logo brand "Aria" (atau "Admin Aria" saat login) dan deskripsi singkat sistem.
 */
export function SidebarHeader({ isAdmin = false, onLogout }: SidebarHeaderProps) {
  return (
    <Flex
      align="center"
      gap={12}
      pb={24}
      px={24}
      style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
    >
      {/* Icon Brand - Menyamakan warna background, blur, dan icon dengan SidebarItem */}
      <Box
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          flexShrink: 0,
        }}
      >
        <Activity style={{ width: 22, height: 22, color: "#bae6fd" }} />
      </Box>

      {/* Identitas Brand */}
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Flex align="center" justify="space-between" gap={4}>
          <Title
            order={1}
            size="h3"
            fw={900}
            c="white"
            style={{
              letterSpacing: "-0.03em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {isAdmin ? "Admin Aria" : "Aria"}
          </Title>
          {isAdmin && onLogout && (
            <ActionIcon
              variant="subtle"
              color="white"
              size="sm"
              onClick={onLogout}
              title="Keluar dari sesi admin"
            >
              <LogOut style={{ width: 16, height: 16 }} />
            </ActionIcon>
          )}
        </Flex>
        <Text
          size="xs"
          fw={500}
          c="brandPrimary.2"
          mt={4}
          style={{
            fontSize: "11px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Atmospheric Regression ISPU Application
        </Text>
      </Box>
    </Flex>
  );
}

export default SidebarHeader;
