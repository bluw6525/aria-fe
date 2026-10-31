import { notifications } from "@mantine/notifications";
import React from "react";

export interface NotifyOptions {
  description?: React.ReactNode;
  autoClose?: number | boolean;
  icon?: React.ReactNode;
}

/**
 * Helper notifikasi resmi berbasis @mantine/notifications dengan warna semantik Aria.
 */
export const notify = {
  success: (title: string, options?: NotifyOptions | string) => {
    const message = typeof options === "string" ? options : options?.description;
    const autoClose = typeof options === "object" ? options?.autoClose : undefined;
    notifications.show({
      title,
      message,
      color: "teal",
      autoClose: autoClose ?? 4000,
    });
  },

  error: (title: string, options?: NotifyOptions | string) => {
    const message = typeof options === "string" ? options : options?.description;
    const autoClose = typeof options === "object" ? options?.autoClose : undefined;
    notifications.show({
      title,
      message,
      color: "red",
      autoClose: autoClose ?? 5000,
    });
  },

  warning: (title: string, options?: NotifyOptions | string) => {
    const message = typeof options === "string" ? options : options?.description;
    const autoClose = typeof options === "object" ? options?.autoClose : undefined;
    notifications.show({
      title,
      message,
      color: "yellow",
      autoClose: autoClose ?? 4500,
    });
  },

  info: (title: string, options?: NotifyOptions | string) => {
    const message = typeof options === "string" ? options : options?.description;
    const autoClose = typeof options === "object" ? options?.autoClose : undefined;
    notifications.show({
      title,
      message,
      color: "blue",
      autoClose: autoClose ?? 4000,
    });
  },
};

export { notifications };
export default notify;

