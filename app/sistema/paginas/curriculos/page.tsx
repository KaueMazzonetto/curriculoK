"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaBriefcase, FaSearch, FaUserPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Curriculo } from "@/lib/curriculos";
import { getCurriculos } from "@/lib/curriculo-storage";

export default function ListaCurriculosPage() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    queueMicrotask(() => setCurriculos(getCurriculos()));
  }, []);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return curriculos;
    }

    return curriculos.filter((curriculo) =>
      [curriculo.nome, curriculo.cargoDesejado].some((campo) => campo.toLowerCase().includes(termo)),
    );
  }, [busca, curriculos]);

  return (
    <main className="container mx-auto flex-1 px-4 py-10 md:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-800">
            <FaBriefcase aria-hidden /> Banco de talentos
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">Lista de currículos</h1>
          <p className="max-w-2xl text-slate-600">
            Filtre automaticamente por nome ou cargo desejado enquanto digita e acesse os detalhes completos do candidato.
          </p>
        </div>
        <Button asChild className="h-11 rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800 focus-visible:ring-cyan-600">
          <Link href="/sistema/paginas/curriculos/novo">
            <FaUserPlus aria-hidden /> Novo currículo
          </Link>
        </Button>
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-cyan-500">
        <FaSearch className="text-slate-400" aria-hidden />
        <input
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Buscar por nome ou cargo..."
          className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
          aria-label="Buscar currículos por nome ou cargo"
        />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtrados.map((curriculo) => (
          <Card key={curriculo.id} className="border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <CardHeader className="gap-4">
              <div className="flex items-start gap-4">
                <Image
                  src={curriculo.imagem}
                  alt={`Foto de ${curriculo.nome}`}
                  width={72}
                  height={72}
                  className="rounded-3xl border border-slate-200 bg-slate-100"
                />
                <div>
                  <CardTitle className="text-xl">{curriculo.nome}</CardTitle>
                  <CardDescription className="mt-1 font-medium text-cyan-700">{curriculo.cargoDesejado}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="line-clamp-4 text-sm leading-6 text-slate-600">{curriculo.resumo}</p>
              <div className="flex flex-wrap gap-2">
                {curriculo.habilidades.slice(0, 3).map((habilidade) => (
                  <span key={habilidade} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {habilidade}
                  </span>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full rounded-full border-cyan-300 text-cyan-900 hover:bg-cyan-50 focus-visible:ring-cyan-600">
                <Link href={`/sistema/paginas/curriculos/${curriculo.id}`}>Ver detalhes</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          Nenhum currículo encontrado para “{busca}”.
        </div>
      )}
    </main>
  );
}
