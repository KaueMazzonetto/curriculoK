import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Footer } from "@/app/componentes/footer";
import { Header } from "@/app/componentes/header";

export const metadata: Metadata = {
  title: "CurrículoK | Gestão de Currículos",
  description: "Sistema web para cadastrar, buscar e gerenciar currículos com Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-950">
        <Header />
        {children}
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
