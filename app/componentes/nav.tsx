"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAddressCard, FaHome, FaPlusCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Início", icon: FaHome },
  { href: "/sistema/paginas/curriculos", label: "Currículos", icon: FaAddressCard },
  { href: "/sistema/paginas/curriculos/novo", label: "Novo", icon: FaPlusCircle },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3" aria-label="Navegação principal">
      {links.map((link) => {
        const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-cyan-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
              isActive && "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-300 hover:text-slate-950",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
