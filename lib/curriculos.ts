export type Experiencia = {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  descricao: string;
};

export type Formacao = {
  instituicao: string;
  curso: string;
  inicio: string;
  fim: string;
};

export type Curriculo = {
  id: string;
  nome: string;
  cargoDesejado: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
  habilidades: string[];
  imagem: string;
  criadoEm: string;
};

export const STORAGE_KEY = "curriculoK.curriculos";

export const curriculosMock: Curriculo[] = [
  {
    id: "ana-souza",
    nome: "Ana Souza",
    cargoDesejado: "Desenvolvedora Front-end",
    email: "ana.souza@email.com",
    telefone: "(11) 98888-1010",
    cpf: "123.456.789-09",
    resumo:
      "Profissional de front-end com foco em interfaces acessíveis, componentes reutilizáveis e experiência sólida com React, Next.js e design systems.",
    experiencias: [
      {
        empresa: "Nexa Digital",
        cargo: "Desenvolvedora React",
        inicio: "02/2022",
        fim: "Atual",
        descricao:
          "Construção de dashboards responsivos, revisão de acessibilidade e integração com APIs REST para times de produto.",
      },
      {
        empresa: "Studio Web",
        cargo: "Estagiária Front-end",
        inicio: "01/2020",
        fim: "01/2022",
        descricao:
          "Apoio na criação de landing pages, manutenção de componentes e documentação de padrões visuais.",
      },
    ],
    formacoes: [
      {
        instituicao: "FIAP",
        curso: "Análise e Desenvolvimento de Sistemas",
        inicio: "02/2019",
        fim: "12/2021",
      },
    ],
    habilidades: ["React", "Next.js", "Tailwind CSS", "Acessibilidade"],
    imagem: "/candidatos/ana.svg",
    criadoEm: "2026-04-10",
  },
  {
    id: "bruno-lima",
    nome: "Bruno Lima",
    cargoDesejado: "Analista de Dados",
    email: "bruno.lima@email.com",
    telefone: "(21) 97777-2020",
    cpf: "987.654.321-00",
    resumo:
      "Analista de dados orientado a negócios, com experiência em modelagem, visualização de indicadores e automação de relatórios executivos.",
    experiencias: [
      {
        empresa: "Insight BI",
        cargo: "Analista de Dados Pleno",
        inicio: "03/2021",
        fim: "Atual",
        descricao:
          "Criação de pipelines analíticos, painéis de performance e rotinas de qualidade de dados para áreas comerciais.",
      },
    ],
    formacoes: [
      {
        instituicao: "Universidade Federal do Rio de Janeiro",
        curso: "Estatística",
        inicio: "02/2016",
        fim: "12/2020",
      },
    ],
    habilidades: ["SQL", "Power BI", "Python", "Storytelling"],
    imagem: "/candidatos/bruno.svg",
    criadoEm: "2026-03-28",
  },
  {
    id: "carla-mendes",
    nome: "Carla Mendes",
    cargoDesejado: "Product Designer",
    email: "carla.mendes@email.com",
    telefone: "(31) 96666-3030",
    cpf: "456.789.123-45",
    resumo:
      "Designer de produto especialista em pesquisa com usuários, prototipação de alta fidelidade e facilitação de processos colaborativos.",
    experiencias: [
      {
        empresa: "Human Apps",
        cargo: "Product Designer",
        inicio: "06/2020",
        fim: "Atual",
        descricao:
          "Condução de discovery, testes de usabilidade e evolução de bibliotecas de componentes para produtos SaaS.",
      },
    ],
    formacoes: [
      {
        instituicao: "PUC Minas",
        curso: "Design Gráfico",
        inicio: "02/2015",
        fim: "12/2018",
      },
    ],
    habilidades: ["Figma", "UX Research", "Design System", "Prototipação"],
    imagem: "/candidatos/carla.svg",
    criadoEm: "2026-02-15",
  },
];

export function createCurriculoId(nome: string) {
  const slug = nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug || "curriculo"}-${Date.now().toString(36)}`;
}
