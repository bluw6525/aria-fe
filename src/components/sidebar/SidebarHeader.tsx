import { Activity } from "lucide-react";

/**
 * Header Sidebar yang menampilkan logo brand "Aria" dan deskripsi singkat sistem.
 */
export function SidebarHeader() {
  return (
    <div className="flex items-center gap-3 pb-6 border-b border-white/10 px-6">
      {/* Icon Brand */}
      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
        <Activity className="w-6 h-6 text-white" />
      </div>

      {/* Identitas Brand */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white leading-none">
          Aria
        </h1>
        <p className="text-[11px] font-medium text-sky-200 mt-1">
          Atmospheric Ozone Estimation System
        </p>
      </div>
    </div>
  );
}

