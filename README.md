# Sizzurp

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

Aplicação web desenvolvida com **Next.js**, **React** e **TypeScript**, integrando **Stripe** para pagamentos online e login com **Google** via **Better Auth**.  
Estilizada com **Tailwind CSS** e utilizando **Drizzle ORM** para acesso a banco de dados PostgreSQL.

---

## 🚀 Tecnologias
- **Next.js 15** — Framework React com SSR e SSG
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Stripe** (pagamentos)
- **Better Auth** (login com Google OAuth)
- **Drizzle ORM** + PostgreSQL
- **React Hook Form** + **Zod**
- **Radix UI**
- **React Query**

---

## 📦 Instalação
```bash
git clone https://github.com/telleswq/sizzurp.git
cd sizzurp
npm install
```

Crie um arquivo `.env`:
```env
STRIPE_SECRET_KEY=sua_chave
STRIPE_PUBLIC_KEY=sua_chave_publica
STRIPE_WEBHOOK_SECRET=seu_webhook_secret

GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret

DATABASE_URL=postgresql://usuario:senha@host:porta/database

AUTH_SECRET=sua_chave
NEXTAUTH_URL=http://localhost:3000
```

---

## ▶️ Executando
**Desenvolvimento**
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000)

**Produção**
```bash
npm run build
npm run start
```

---

## 💳 Pagamentos com Stripe
- Checkout seguro
- Webhooks para confirmação
- Configuração via `.env`

## 🔐 Login com Google
- OAuth 2.0
- Sessão persistente
- Integração simples

