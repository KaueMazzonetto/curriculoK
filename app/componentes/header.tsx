// components/header.tsx

import Link from "next/link";
import { FileText, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-500/20 p-2">
            <FileText className="h-6 w-6 text-cyan-400" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              ResumeAI
            </h1>

            <p className="text-xs text-slate-400">
              Plataforma de Currículos
            </p>
          </div>
        </div>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Início
          </Link>

          <Link
            href="#"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Modelos
          </Link>

          <Link
            href="#"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Benefícios
          </Link>

          <Link
            href="#"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Contato
          </Link>
        </nav>

        {/* BOTÕES */}
        <div className="hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            className="text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Entrar
          </Button>

          <Button className="rounded-2xl px-6">
            Criar Currículo
          </Button>
        </div>

        {/* MENU MOBILE */}
        <button className="md:hidden">
          <Menu className="h-7 w-7 text-white" />
        </button>
      </div>
    </header>
  );
}