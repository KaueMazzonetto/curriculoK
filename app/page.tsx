"use client";

import { Button } from "@/componentes/ui/button,";
import { Card, CardContent } from "@/components/ui/card,";
import { toast } from "sonner";
import {
  FaFileUpload,
  FaSearch,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

export default function Home() {
  function handleCTA() {
    toast.success("Funcionalidade de envio em breve 🚀");
  }

  return (
    <main className="min-h-screen bg-white">

      {/* NAVBAR */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-lg">CVCheck</h1>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#beneficios" className="hover:text-primary">Benefícios</a>
            <a href="#como-funciona" className="hover:text-primary">Como funciona</a>
          </nav>

          <Button onClick={handleCTA}>Começar</Button>
        </div>
      </header>

      {/* HERO */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Seu currículo pronto para{" "}
          <span className="text-primary">ser aprovado</span>
        </h1>

        <p className="mt-6 text-gray-600 max-w-xl mx-auto">
          Analise seu currículo com inteligência e descubra exatamente o que
          melhorar para conquistar mais entrevistas.
        </p>

        <div className="mt-8">
          <Button size="lg" onClick={handleCTA}>
            Enviar currículo
          </Button>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Benefícios do sistema
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 space-y-3 text-center">
                <FaSearch className="text-2xl mx-auto text-blue-600" />
                <h3 className="font-semibold">Análise detalhada</h3>
                <p className="text-sm text-gray-600">
                  Identifica pontos fracos no seu currículo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3 text-center">
                <FaCheckCircle className="text-2xl mx-auto text-green-600" />
                <h3 className="font-semibold">Correções rápidas</h3>
                <p className="text-sm text-gray-600">
                  Sugestões simples e práticas para melhorar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3 text-center">
                <FaStar className="text-2xl mx-auto text-yellow-500" />
                <h3 className="font-semibold">Mais chances</h3>
                <p className="text-sm text-gray-600">
                  Aumente suas chances de conseguir entrevistas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Como funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <FaFileUpload className="text-3xl mx-auto text-primary" />
              <h3 className="mt-4 font-semibold">1. Envie</h3>
              <p className="text-sm text-gray-600">
                Faça upload do seu currículo.
              </p>
            </div>

            <div>
              <FaSearch className="text-3xl mx-auto text-primary" />
              <h3 className="mt-4 font-semibold">2. Análise</h3>
              <p className="text-sm text-gray-600">
                O sistema analisa automaticamente.
              </p>
            </div>

            <div>
              <FaCheckCircle className="text-3xl mx-auto text-primary" />
              <h3 className="mt-4 font-semibold">3. Melhore</h3>
              <p className="text-sm text-gray-600">
                Receba sugestões e melhore seu CV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">
            O que usuários dizem
          </h2>

          <p className="text-gray-600 italic">
            “Melhorei meu currículo e consegui uma entrevista em poucos dias.
            Muito fácil de usar!”
          </p>

          <span className="block mt-4 font-semibold">
            — Usuário satisfeito
          </span>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">
          Comece agora gratuitamente
        </h2>

        <Button size="lg" className="mt-6" onClick={handleCTA}>
          Analisar currículo
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CVCheck
      </footer>
    </main>
  );
}