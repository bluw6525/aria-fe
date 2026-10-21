import { ReactNode } from "react";

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
    return (
    <main className="flex-1 overflow-y-auto">
        <div className={`flex-1 min-h-screen bg-[#f3f4f6] flex flex-col px-10 py-8 ${className}`}>
        {children}
        </div>
    </main >
  );
}
