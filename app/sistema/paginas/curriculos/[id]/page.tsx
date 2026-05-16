"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEnvelope, FaGraduationCap, FaIdCard, FaPhone, FaTools } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Curriculo } from "@/lib/curriculos";
import { findCurriculo } from "@/lib/curriculo-storage";

export default function DetalhesCurriculoPage() {
  const params = useParams<{ id: string }>();
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const encontrado = findCurriculo(params.id);
      setCurriculo(encontrado ?? null);
      setLoaded(true);
    });
  }, [params.id]);

  if (loaded && !curriculo) {
    return (
      <main className="container mx-auto flex-1 px-4 py-10 md:px-6">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h1 className="text-2xl font-bold text-slate-950">Currículo não encontrado</h1>
          <p className="mt-2 text-slate-600">O registro pode ter sido removido ou ainda não existe no localStorage.</p>
          <Button asChild className="mt-6 rounded-full bg-slate-950 text-white hover:bg-slate-800">
            <Link href="/sistema/paginas/curriculos">Voltar para lista</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!curriculo) {
    return <main className="container mx-auto flex-1 px-4 py-10 md:px-6">Carregando...</main>;
  }

  return (
    <main className="container mx-auto flex-1 px-4 py-10 md:px-6">
      <Button asChild variant="ghost" className="mb-6 rounded-full hover:bg-cyan-50 focus-visible:ring-cyan-600">
        <Link href="/sistema/paginas/curriculos">
          <FaArrowLeft aria-hidden /> Voltar
        </Link>
      </Button>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <Image
              src={curriculo.imagem}
              alt={`Foto de ${curriculo.nome}`}
              width={160}
              height={160}
              className="mx-auto rounded-[2rem] border border-slate-200 bg-slate-100"
              priority
            />
            <h1 className="mt-5 text-3xl font-bold text-slate-950">{curriculo.nome}</h1>
            <p className="mt-2 text-lg font-semibold text-cyan-700">{curriculo.cargoDesejado}</p>
            <p className="mt-5 text-left leading-7 text-slate-600">{curriculo.resumo}</p>
            <div className="mt-6 grid gap-3 text-left text-sm text-slate-600">
              <span className="flex items-center gap-2"><FaEnvelope className="text-cyan-700" aria-hidden /> {curriculo.email}</span>
              <span className="flex items-center gap-2"><FaPhone className="text-cyan-700" aria-hidden /> {curriculo.telefone}</span>
              <span className="flex items-center gap-2"><FaIdCard className="text-cyan-700" aria-hidden /> {curriculo.cpf}</span>
            </div>
            <Button
              className="mt-6 w-full rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 focus-visible:ring-cyan-600"
              onClick={() => toast.success("Ação mockada concluída", { description: `${curriculo.nome} foi marcado como favorito.` })}
            >
              Favoritar candidato
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Experiências profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {curriculo.experiencias.map((experiencia, index) => (
                <article key={`${experiencia.empresa}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="font-bold text-slate-950">{experiencia.cargo}</h2>
                  <p className="text-sm font-medium text-cyan-700">{experiencia.empresa} • {experiencia.inicio} — {experiencia.fim}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{experiencia.descricao}</p>
                </article>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FaGraduationCap className="text-cyan-700" aria-hidden /> Formações acadêmicas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {curriculo.formacoes.map((formacao, index) => (
                <article key={`${formacao.instituicao}-${index}`} className="rounded-3xl border border-slate-200 p-5">
                  <h2 className="font-bold text-slate-950">{formacao.curso}</h2>
                  <p className="mt-1 text-sm text-slate-600">{formacao.instituicao}</p>
                  <p className="mt-2 text-xs font-semibold text-cyan-700">{formacao.inicio} — {formacao.fim}</p>
                </article>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FaTools className="text-cyan-700" aria-hidden /> Habilidades</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {curriculo.habilidades.map((habilidade) => (
                <span key={habilidade} className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-900">
                  {habilidade}
                </span>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
