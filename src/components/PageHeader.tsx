interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({
  title = "Aria - Sentinel-5P Ozone Monitoring",
  subtitle,
  className = "",
}: PageHeaderProps) {
  return (
    <header className={`w-full mb-8 text-center ${className}`}>
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-500 font-medium">
          {subtitle}
        </p>
      )}
      {/* Garis Pembatas Header Solid */}
      <div className="w-full max-w-4xl mx-auto h-[1.5px] bg-slate-300 mt-4" />
    </header>
  );
}
