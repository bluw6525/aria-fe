import React from "react";
import type { OutlierDetectionResponse } from "../_types";

interface OutlierResultCardProps {
  result: OutlierDetectionResponse;
}

export function OutlierResultCard({ result }: OutlierResultCardProps) {
  const leverageOutliers = result.leverage?.outlier_indices || [];
  const dffitsOutliers = result.dffits?.outlier_indices || [];
  const bothOutliers = result.both?.outlier_indices || [];

  return (
    <div className="flex flex-col gap-2.5 pb-2">
      <h3 className="text-base font-bold text-slate-900">
        Outlier pada data latih
      </h3>

      <div className="flex flex-col divide-y divide-slate-200/70 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 overflow-hidden">
        {/* Leverage Value */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3">
          <span className="font-bold text-slate-900 w-36 shrink-0">
            Leverage Value
          </span>
          <span className="leading-relaxed text-slate-800">
            {leverageOutliers.length > 0 ? (
              <>
                data ke{" "}
                <span className="font-semibold text-slate-950">
                  {leverageOutliers.join(", ")}
                </span>
              </>
            ) : (
              <span className="text-slate-400 italic">
                Tidak terdeteksi pencilan leverage
              </span>
            )}
          </span>
        </div>

        {/* DFFITS */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3">
          <span className="font-bold text-slate-900 w-36 shrink-0">
            DFFITS
          </span>
          <span className="leading-relaxed text-slate-800">
            {dffitsOutliers.length > 0 ? (
              <>
                data ke{" "}
                <span className="font-semibold text-slate-950">
                  {dffitsOutliers.join(", ")}
                </span>
              </>
            ) : (
              <span className="text-slate-400 italic">
                Tidak terdeteksi pencilan DFFITS
              </span>
            )}
          </span>
        </div>

        {/* Both (Irisan) */}
        {bothOutliers.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3">
            <span className="font-bold text-slate-900 w-36 shrink-0">
              Both (Irisan)
            </span>
            <span className="leading-relaxed text-slate-800">
              data ke{" "}
              <span className="font-semibold text-slate-950">
                {bothOutliers.join(", ")}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
