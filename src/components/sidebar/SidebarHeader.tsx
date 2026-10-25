import { Activity, LogOut } from "lucide-react";

interface SidebarHeaderProps {
  isAdmin?: boolean;
  onLogout?: () => void;
}

/**
 * Header Sidebar yang menampilkan logo brand "Aria" (atau "Admin Aria" saat login) dan deskripsi singkat sistem.
 */
export function SidebarHeader({ isAdmin = false, onLogout }: SidebarHeaderProps) {
  return (
    <div className="flex items-center gap-3 pb-6 border-b border-white/10 px-6">
      {/* Icon Brand */}
      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner shrink-0">
        <Activity className="w-6 h-6 text-white" />
      </div>

      {/* Identitas Brand */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <h1 className="text-2xl font-black tracking-tight text-white leading-none truncate">
            {isAdmin ? "Admin Aria" : "Aria"}
          </h1>
          {isAdmin && onLogout && (
            <button
              onClick={onLogout}
              title="Keluar dari sesi admin"
              className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-[11px] font-medium text-sky-200 mt-1 truncate">
          Atmospheric Regression ISPU Application
        </p>
      </div>
    </div>
  );
}

