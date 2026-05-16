import Link from "next/link";
import { FaFileSignature } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Nav } from "@/app/componentes/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 text-white shadow-sm backdrop-blur">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <Link href="/" className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          <span className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
            <FaFileSignature className="h-6 w-6" aria-hidden />
          </span>
          <span>
            <strong className="block text-xl tracking-tight">CurrículoK</strong>
            <span className="text-xs text-slate-400">Sistema de Gestão de Currículos</span>
          </span>
        </Link>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Nav />
          <Button asChild className="h-10 rounded-full bg-cyan-400 px-5 text-slate-950 hover:bg-cyan-300 focus-visible:ring-cyan-200">
            <Link href="/sistema/paginas/curriculos/novo">Cadastrar currículo</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
