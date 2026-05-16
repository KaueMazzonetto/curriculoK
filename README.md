# CurrículoK

Aplicação web acadêmica para gestão de currículos, construída com Next.js App Router e foco em UX, componentes reutilizáveis e validação rigorosa de formulários.

## Funcionalidades implementadas

- Landing page responsiva com componentes shadcn/ui.
- Header, navegação com estado ativo e footer globais.
- Lista de currículos em cards com filtro em tempo real por nome ou cargo.
- Página dinâmica de detalhes do currículo.
- Cadastro de currículo com persistência mockada em `localStorage`.
- Upload fake de imagem, usando avatar padrão da pasta `public`.
- Validação com esquema Yup e feedback por Sonner.
- Máscaras para CPF, telefone e datas.
- Campos dinâmicos de experiências profissionais e formações acadêmicas com `useFieldArray`.

## Stack

- Next.js 16 com App Router
- Tailwind CSS 4
- shadcn/ui
- React Hook Form
- Yup
- React Input Mask Next
- Sonner
- React Icons

> Observação: neste ambiente de execução, o registry npm externo retornou 403. Para manter o projeto instalável e testável sem rede, as dependências de formulário/máscara foram apontadas para pacotes locais em `vendor/` com a mesma API utilizada nesta etapa.

## Rotas principais

- `/` — landing page
- `/sistema/paginas/curriculos` — lista e busca de currículos
- `/sistema/paginas/curriculos/[id]` — detalhes do currículo
- `/sistema/paginas/curriculos/novo` — cadastro de currículo

## Como executar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Verificações

```bash
npm run lint
npm run build
```
