import Link from "next/link";
import { FaChartLine, FaCheckCircle, FaFilter, FaShieldAlt, FaUserTie } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    icon: FaUserTie,
    title: "Currículos centralizados",
    description: "Organize candidatos, experiências, formações e habilidades em uma interface única e objetiva.",
  },
  {
    icon: FaFilter,
    title: "Busca em tempo real",
    description: "Encontre rapidamente talentos por nome ou cargo desejado sem recarregar a página.",
  },
  {
    icon: FaShieldAlt,
    title: "Dados validados",
    description: "Formulários com Yup, máscaras e feedback visual reduzem erros no cadastro.",
  },
];

export default function Home() {
  return (
    <main className="bg-[radial-gradient(circle_at_top_left,#cffafe,transparent_32%),linear-gradient(180deg,#f8fafc,#ecfeff_55%,#ffffff)]">
      <section className="container mx-auto grid min-h-[calc(100vh-12rem)] items-center gap-10 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-6 lg:py-24">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-900 shadow-sm">
            <FaChartLine aria-hidden /> UX clean para recrutamento
          </span>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Remodele a gestão de currículos com uma experiência rápida, clara e responsiva.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              O CurrículoK permite cadastrar perfis profissionais, validar dados importantes e navegar por currículos mockados com foco em produtividade e legibilidade.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-full bg-slate-950 px-7 text-white hover:bg-slate-800 focus-visible:ring-cyan-600">
              <Link href="/sistema/paginas/curriculos/novo">Cadastrar currículo</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-cyan-300 px-7 text-cyan-950 hover:bg-cyan-50 focus-visible:ring-cyan-600">
              <Link href="/sistema/paginas/curriculos">Ver currículos</Link>
            </Button>
          </div>

          <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            {["App Router", "shadcn/ui", "React Hook Form"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-2xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-200">
                <FaCheckCircle className="text-emerald-500" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-cyan-100 bg-white/90 shadow-2xl shadow-cyan-950/10">
          <CardHeader>
            <CardTitle className="text-2xl">Painel do recrutador</CardTitle>
            <CardDescription>Resumo visual da operação de currículos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm text-slate-300">Currículos ativos</p>
                <strong className="mt-3 block text-4xl">24</strong>
              </div>
              <div className="rounded-3xl bg-cyan-400 p-5 text-slate-950">
                <p className="text-sm font-medium">Validados hoje</p>
                <strong className="mt-3 block text-4xl">08</strong>
              </div>
            </div>
            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              {["Desenvolvedora Front-end", "Analista de Dados", "Product Designer"].map((role) => (
                <div key={role} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                  <span className="font-medium text-slate-800">{role}</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">disponível</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 pb-20 md:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} className="border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <CardHeader>
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <CardTitle>{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
