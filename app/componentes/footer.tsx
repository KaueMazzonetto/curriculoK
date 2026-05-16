import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-6">
        <p>© 2026 CurrículoK. Interface acadêmica para gestão de currículos.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="inline-flex items-center gap-2 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600" href="/sistema/paginas/curriculos">
            Currículos
          </Link>
          <a className="inline-flex items-center gap-2 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600" href="https://github.com" target="_blank" rel="noreferrer">
            <FaGithub aria-hidden /> GitHub
          </a>
          <a className="inline-flex items-center gap-2 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin aria-hidden /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
