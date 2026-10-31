import axios from "axios";

/**
 * Mengekstrak pesan error yang informatif dan ramah pengguna dari respon API / Axios.
 * Menangani respon string, object, dan array validasi Pydantic / FastAPI (HTTP 422)
 * sehingga tidak pernah menampilkan teks mentah "[object Object]".
 */
export function extractApiErrorMessage(
  err: unknown,
  fallback: string = "Terjadi kesalahan pada sistem."
): string {
  if (axios.isAxiosError(err)) {
    const detail = err.response?.data?.detail;

    // 1. Respon string langsung (misal HTTP 400, 401, 403, 404, 500)
    if (typeof detail === "string" && detail.trim().length > 0) {
      return detail;
    }

    // 2. Respon array validasi skema Pydantic (HTTP 422 Unprocessable Entity)
    if (Array.isArray(detail) && detail.length > 0) {
      const messages = detail.map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object") {
          const loc = Array.isArray(item.loc)
            ? item.loc.filter((part: unknown) => part !== "body").join(".")
            : "";
          const msg = item.msg || JSON.stringify(item);
          return loc ? `${loc}: ${msg}` : msg;
        }
        return String(item);
      });
      return messages.join("; ");
    }

    // 3. Respon object custom
    if (detail && typeof detail === "object") {
      const customMsg =
        (detail as Record<string, unknown>).message ||
        (detail as Record<string, unknown>).msg;
      if (typeof customMsg === "string") {
        return customMsg;
      }
      return JSON.stringify(detail);
    }

    if (err.response?.data?.message) {
      return String(err.response.data.message);
    }

    if (err.message) {
      return err.message;
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  return fallback;
}

export default extractApiErrorMessage;

