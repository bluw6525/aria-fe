"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Estimasi",
        href: "/estimate"
    },
    {
        label: "Latih dan Uji",
        href: "/train-test"
    },
    {
        label: "Bantuan",
        href: "/help"
    },
    {
        label: "Riwayat Perancang",
        href: "/history"
    }
]

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-screen bg-sky-600 p-6 flex flex-col text-white mr-8">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-black">
                    Aria
                </h1>
            </div>

            <nav className="mt-16 flex flex-col gap-4 ">
                {
                    MENU_ITEMS.map((item) => {
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="
                                py-2.5 px-4 rounded-full text-center text-sm font-semibold text-gray-900 bg-gray-200
                                hover:bg-white transition-all shadow-sm
                                "
                            >
                                {item.label}
                            </Link>
                        );
                    })
                }
            </nav>
        </aside>
    );
}