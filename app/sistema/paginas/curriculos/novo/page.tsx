"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitErrorHandler, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask-next";
import { toast } from "sonner";
import { FaArrowLeft, FaCamera, FaGraduationCap, FaPlus, FaSave, FaTrash, FaUserTie } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createCurriculoId, Curriculo } from "@/lib/curriculos";
import { saveCurriculo } from "@/lib/curriculo-storage";

const experienciaSchema = yup.object({
  empresa: yup.string().required("Informe a empresa da experiência."),
  cargo: yup.string().required("Informe o cargo ocupado."),
  inicio: yup.string().required("Informe a data inicial.").min(7, "A data inicial deve estar no formato MM/AAAA."),
  fim: yup.string().required("Informe a data final ou Atual.").min(4, "Informe uma data final válida."),
  descricao: yup.string().required("Descreva a experiência profissional.").min(20, "A descrição da experiência deve ter pelo menos 20 caracteres."),
});

const formacaoSchema = yup.object({
  instituicao: yup.string().required("Informe a instituição de ensino."),
  curso: yup.string().required("Informe o curso."),
  inicio: yup.string().required("Informe a data inicial.").min(7, "A data inicial deve estar no formato MM/AAAA."),
  fim: yup.string().required("Informe a data final.").min(7, "A data final deve estar no formato MM/AAAA."),
});

const schema = yup.object({
  nome: yup.string().required("Informe o nome do candidato.").min(3, "O nome deve ter pelo menos 3 caracteres."),
  cargoDesejado: yup.string().required("Informe o cargo desejado.").min(3, "O cargo desejado deve ter pelo menos 3 caracteres."),
  email: yup.string().required("Informe o e-mail.").email("Informe um e-mail válido."),
  telefone: yup.string().required("Informe o telefone.").min(14, "Informe um telefone completo."),
  cpf: yup.string().required("Informe o CPF.").matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Informe um CPF no formato 000.000.000-00."),
  resumo: yup.string().required("Informe o resumo profissional.").min(30, "O resumo profissional deve ter pelo menos 30 caracteres."),
  habilidades: yup.string().required("Informe pelo menos uma habilidade.").min(3, "Informe habilidades separadas por vírgula."),
  experiencias: yup.array().of(experienciaSchema).min(1, "Adicione pelo menos uma experiência profissional.").required(),
  formacoes: yup.array().of(formacaoSchema).min(1, "Adicione pelo menos uma formação acadêmica.").required(),
});

type CurriculoFormValues = {
  nome: string;
  cargoDesejado: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  habilidades: string;
  experiencias: Curriculo["experiencias"];
  formacoes: Curriculo["formacoes"];
};

const emptyExperience = {
  empresa: "",
  cargo: "",
  inicio: "",
  fim: "",
  descricao: "",
};

const emptyEducation = {
  instituicao: "",
  curso: "",
  inicio: "",
  fim: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm font-medium text-red-600">{message}</p>;
}

function inputClass(hasError?: boolean) {
  return `mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 ${
    hasError ? "border-red-300" : "border-slate-200"
  }`;
}

export default function NovoCurriculoPage() {
  const router = useRouter();
  const [imageName, setImageName] = useState("Nenhuma imagem selecionada");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CurriculoFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      cargoDesejado: "",
      email: "",
      telefone: "",
      cpf: "",
      resumo: "",
      habilidades: "",
      experiencias: [emptyExperience],
      formacoes: [emptyEducation],
    },
  });

  const experiencias = useFieldArray({ control, name: "experiencias" });
  const formacoes = useFieldArray({ control, name: "formacoes" });

  const onSubmit: SubmitHandler<CurriculoFormValues> = (data) => {
    const curriculo: Curriculo = {
      id: createCurriculoId(data.nome),
      nome: data.nome,
      cargoDesejado: data.cargoDesejado,
      email: data.email,
      telefone: data.telefone,
      cpf: data.cpf,
      resumo: data.resumo,
      experiencias: data.experiencias,
      formacoes: data.formacoes,
      habilidades: data.habilidades.split(",").map((item) => item.trim()).filter(Boolean),
      imagem: "/candidatos/default.svg",
      criadoEm: new Date().toISOString().slice(0, 10),
    };

    saveCurriculo(curriculo);
    toast.success("Currículo salvo com sucesso", {
      description: `${data.nome} foi cadastrado com upload fake de imagem (${imageName}).`,
    });
    router.push(`/sistema/paginas/curriculos/${curriculo.id}`);
  };

  const onInvalid: SubmitErrorHandler<CurriculoFormValues> = (formErrors) => {
    const firstError =
      formErrors.nome?.message ||
      formErrors.cargoDesejado?.message ||
      formErrors.email?.message ||
      formErrors.telefone?.message ||
      formErrors.cpf?.message ||
      formErrors.resumo?.message ||
      formErrors.habilidades?.message ||
      formErrors.experiencias?.root?.message ||
      formErrors.experiencias?.[0]?.empresa?.message ||
      formErrors.experiencias?.[0]?.descricao?.message ||
      formErrors.formacoes?.root?.message ||
      formErrors.formacoes?.[0]?.instituicao?.message ||
      "Revise os campos destacados antes de salvar.";

    toast.error("Erro de validação", { description: firstError });
  };

  return (
    <main className="container mx-auto flex-1 px-4 py-10 md:px-6">
      <Button asChild variant="ghost" className="mb-6 rounded-full hover:bg-cyan-50 focus-visible:ring-cyan-600">
        <Link href="/sistema/paginas/curriculos">
          <FaArrowLeft aria-hidden /> Voltar
        </Link>
      </Button>

      <div className="mb-8 max-w-3xl space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-800">
          <FaUserTie aria-hidden /> Cadastro completo
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">Novo currículo</h1>
        <p className="text-slate-600">
          Preencha os dados do candidato. Experiências profissionais e formações acadêmicas são campos dinâmicos com validação individual.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6" noValidate>
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Dados pessoais</CardTitle>
            <CardDescription>Campos obrigatórios, máscaras e upload fake de imagem.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Nome
              <input {...register("nome")} className={inputClass(Boolean(errors.nome))} placeholder="Ex.: Maria Oliveira" />
              <FieldError message={errors.nome?.message} />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Cargo desejado
              <input {...register("cargoDesejado")} className={inputClass(Boolean(errors.cargoDesejado))} placeholder="Ex.: Desenvolvedora Full Stack" />
              <FieldError message={errors.cargoDesejado?.message} />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              E-mail
              <input {...register("email")} className={inputClass(Boolean(errors.email))} placeholder="nome@email.com" type="email" />
              <FieldError message={errors.email?.message} />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Telefone
              <Controller
                control={control}
                name="telefone"
                render={({ field }) => (
                  <InputMask {...field} mask="(99) 99999-9999" className={inputClass(Boolean(errors.telefone))} placeholder="(00) 00000-0000" />
                )}
              />
              <FieldError message={errors.telefone?.message} />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              CPF
              <Controller
                control={control}
                name="cpf"
                render={({ field }) => (
                  <InputMask {...field} mask="999.999.999-99" className={inputClass(Boolean(errors.cpf))} placeholder="000.000.000-00" />
                )}
              />
              <FieldError message={errors.cpf?.message} />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Imagem do candidato
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
                <FaCamera className="text-cyan-700" aria-hidden />
                <span className="text-sm font-normal text-slate-600">{imageName}</span>
              </span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  const fileName = event.target.files?.[0]?.name ?? "Nenhuma imagem selecionada";
                  setImageName(fileName);
                  toast.info("Upload fake de imagem", { description: `${fileName} foi selecionada apenas para simulação.` });
                }}
              />
            </label>
            <label className="text-sm font-semibold text-slate-700 md:col-span-2">
              Resumo profissional
              <textarea {...register("resumo")} rows={5} className={inputClass(Boolean(errors.resumo))} placeholder="Descreva o perfil, principais conquistas e objetivos profissionais." />
              <FieldError message={errors.resumo?.message} />
            </label>
            <label className="text-sm font-semibold text-slate-700 md:col-span-2">
              Habilidades
              <input {...register("habilidades")} className={inputClass(Boolean(errors.habilidades))} placeholder="React, SQL, Comunicação, Liderança" />
              <FieldError message={errors.habilidades?.message} />
            </label>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="gap-4 md:flex md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Experiências profissionais</CardTitle>
              <CardDescription>Adicione ou remova experiências com useFieldArray.</CardDescription>
            </div>
            <Button type="button" variant="outline" className="rounded-full border-cyan-300 text-cyan-900 hover:bg-cyan-50" onClick={() => experiencias.append(emptyExperience)}>
              <FaPlus aria-hidden /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            {experiencias.fields.map((field, index) => (
              <div key={field.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-bold text-slate-950">Experiência {index + 1}</h2>
                  <Button type="button" variant="destructive" size="sm" className="rounded-full" disabled={experiencias.fields.length === 1} onClick={() => experiencias.remove(index)}>
                    <FaTrash aria-hidden /> Remover
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Empresa
                    <input {...register(`experiencias.${index}.empresa`)} className={inputClass(Boolean(errors.experiencias?.[index]?.empresa))} />
                    <FieldError message={errors.experiencias?.[index]?.empresa?.message} />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Cargo
                    <input {...register(`experiencias.${index}.cargo`)} className={inputClass(Boolean(errors.experiencias?.[index]?.cargo))} />
                    <FieldError message={errors.experiencias?.[index]?.cargo?.message} />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Início
                    <Controller control={control} name={`experiencias.${index}.inicio`} render={({ field }) => <InputMask {...field} mask="99/9999" className={inputClass(Boolean(errors.experiencias?.[index]?.inicio))} placeholder="MM/AAAA" />} />
                    <FieldError message={errors.experiencias?.[index]?.inicio?.message} />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Fim
                    <input {...register(`experiencias.${index}.fim`)} className={inputClass(Boolean(errors.experiencias?.[index]?.fim))} placeholder="MM/AAAA ou Atual" />
                    <FieldError message={errors.experiencias?.[index]?.fim?.message} />
                  </label>
                  <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                    Descrição
                    <textarea {...register(`experiencias.${index}.descricao`)} rows={3} className={inputClass(Boolean(errors.experiencias?.[index]?.descricao))} />
                    <FieldError message={errors.experiencias?.[index]?.descricao?.message} />
                  </label>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="gap-4 md:flex md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2"><FaGraduationCap className="text-cyan-700" aria-hidden /> Formações acadêmicas</CardTitle>
              <CardDescription>Campo dinâmico validado pelo esquema do Yup.</CardDescription>
            </div>
            <Button type="button" variant="outline" className="rounded-full border-cyan-300 text-cyan-900 hover:bg-cyan-50" onClick={() => formacoes.append(emptyEducation)}>
              <FaPlus aria-hidden /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            {formacoes.fields.map((field, index) => (
              <div key={field.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-bold text-slate-950">Formação {index + 1}</h2>
                  <Button type="button" variant="destructive" size="sm" className="rounded-full" disabled={formacoes.fields.length === 1} onClick={() => formacoes.remove(index)}>
                    <FaTrash aria-hidden /> Remover
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Instituição
                    <input {...register(`formacoes.${index}.instituicao`)} className={inputClass(Boolean(errors.formacoes?.[index]?.instituicao))} />
                    <FieldError message={errors.formacoes?.[index]?.instituicao?.message} />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Curso
                    <input {...register(`formacoes.${index}.curso`)} className={inputClass(Boolean(errors.formacoes?.[index]?.curso))} />
                    <FieldError message={errors.formacoes?.[index]?.curso?.message} />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Início
                    <Controller control={control} name={`formacoes.${index}.inicio`} render={({ field }) => <InputMask {...field} mask="99/9999" className={inputClass(Boolean(errors.formacoes?.[index]?.inicio))} placeholder="MM/AAAA" />} />
                    <FieldError message={errors.formacoes?.[index]?.inicio?.message} />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Fim
                    <Controller control={control} name={`formacoes.${index}.fim`} render={({ field }) => <InputMask {...field} mask="99/9999" className={inputClass(Boolean(errors.formacoes?.[index]?.fim))} placeholder="MM/AAAA" />} />
                    <FieldError message={errors.formacoes?.[index]?.fim?.message} />
                  </label>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">O botão fica desabilitado enquanto o formulário estiver inválido ou enviando.</p>
          <Button type="submit" disabled={!isValid || isSubmitting} className="h-11 rounded-full bg-cyan-500 px-7 text-slate-950 hover:bg-cyan-400 focus-visible:ring-cyan-600 disabled:cursor-not-allowed disabled:opacity-50">
            <FaSave aria-hidden /> {isSubmitting ? "Salvando..." : "Salvar currículo"}
          </Button>
        </div>
      </form>
    </main>
  );
}
