# Aman Kumar Jha — Neobrutalism Portfolio

A modern, high-contrast neobrutalist developer portfolio built with Next.js, TypeScript, Framer Motion, and Tailwind CSS. Integrated with a serverless guestbook and dynamic tech writings.

---

## ⚡ Core Philosophy & Focus

I build at the intersection of Artificial Intelligence and software engineering. I design AI-driven systems focused on intelligent automation, real-world execution, and scalable product thinking.

I leverage autonomous coding agents to accelerate development and rapid experimentation, while retaining full ownership of architecture, design, and implementation decisions.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS & Vanilla CSS (Neobrutalism UI style: hard offset shadows, high-contrast thick borders, flat vibrant fills)
- **Database**: Neon (PostgreSQL Serverless)
- **Animations**: Framer Motion
- **Type Safety**: TypeScript
- **Deployment**: Vercel ready

---

## 🌟 Key Features

1. **Neobrutalist Design System**: Standard borders (`3px solid #1a1a1a`) and solid flat shadows (`5px 5px 0px #1a1a1a`) giving a tactile, physical feel to cards and interactive items.
2. **Dynamic Blogs route**: Static site generated (SSG) pre-rendered articles under `/blogs/[slug]` featuring inline code snippets and clean typographic layouts.
3. **Live Guestbook**: Real-time message board using Next.js Server Actions connecting to a serverless Postgres database with automatic client-side polling.
4. **Scattered Social Cards**: Interactive, physics-inspired scattered cards on desktop and mobile that hover, tilt, and animate on touch.
5. **Custom Cursor**: Custom canvas mouse tracker with context-aware icon changes when hovering over links and buttons.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Its-amanjha/My-portfolio.git
cd My-portfolio
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Neon Database connection string
DATABASE_URL=your_postgres_connection_string
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Build for Production
```bash
npm run build
```
This will compile the application and pre-render all static paths including the dynamic blogs.
