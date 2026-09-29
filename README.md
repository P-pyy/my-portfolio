# Chrestine Hiangan | Portfolio

A responsive portfolio for Chrestine Hiangan, a Computer Engineer and Full Stack Developer based in Teresa, Rizal, Philippines. The site presents selected projects, technical skills, and contact options in an interactive cyber-noir interface.

## Features

- Animated introduction with profile portrait, role, location, social links, and downloadable resume
- Project showcase with category filters, image galleries, project details, and live-site or source-code links
- Skills grouped into frontend, backend, and tools
- Contact form with input validation and EmailJS delivery
- SPIRIT, an optional AI assistant for questions about Chrestine, her projects, and skills, with interactive project and navigation responses
- Responsive navigation and reduced-motion support

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- AI SDK for streaming SPIRIT assistant responses
- EmailJS for contact form delivery
- Lucide React icons and Vercel Analytics
- pnpm

## Project structure

```text
.
├── app/
│   ├── api/chat/route.ts       AI assistant API route
│   ├── globals.css             Global styles
│   ├── layout.tsx              Root layout, metadata, fonts, and analytics
│   └── page.tsx                Single-page portfolio composition
├── components/
│   ├── ui/button.tsx           Shared button primitive
│   ├── ai-chat.tsx             SPIRIT assistant interface
│   ├── contact-hud.tsx         Contact section visual elements
│   ├── contact-section.tsx     Validated contact form
│   ├── footer-section.tsx      Site footer
│   ├── hero-section.tsx        Intro, resume, and social links
│   ├── hud-chrome.tsx          Reusable HUD visual elements
│   ├── nav-dock.tsx            Section navigation
│   ├── profile-portrait.tsx    Interactive profile image
│   ├── project-card.tsx        Project data and card view
│   ├── project-modal.tsx       Project details and image gallery
│   ├── project-showcase.tsx    Project showcase row
│   ├── projects-section.tsx    Project data, filters, and section
│   ├── scroll-progress.tsx     Page scroll indicator
│   ├── skills-hud.tsx          Skills section visual elements
│   ├── skills-section.tsx      Skills categories and tiles
│   └── social-links.tsx        Social profile links
├── lib/
│   ├── ai-gateway.server.ts    Server-side AI Gateway provider
│   └── utils.ts                Shared utilities
├── public/
│   ├── Hiangan_Chrestine_Resume.pdf
│   └── images/                 Portrait, project screenshots, and tech icons
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## Requirements

- Node.js 20.9 or newer
- pnpm 11.21.0 (the version declared by the project)

## Installation

```sh
git clone https://github.com/P-pyy/my-portfolio.git
cd my-portfolio
pnpm install
```

Integrations are optional for running the portfolio locally. To enable them, create a `.env.local` file in the project root:

```dotenv
# Optional: contact form (EmailJS browser-side public settings)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

To enable SPIRIT, configure the server-side API credential expected by `app/api/chat/route.ts` in `.env.local`. Keep server-side credentials private and do not expose them in client code. EmailJS settings use `NEXT_PUBLIC_` because the browser-based EmailJS client needs them; configure the EmailJS service and template to accept the form fields `from_name`, `from_email`, and `message`.

## Running the application

Start the development server:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other available commands:

```sh
pnpm build
pnpm start
pnpm lint
```

`pnpm start` serves the production build, so run `pnpm build` first.

## How it works

The App Router page in `app/page.tsx` assembles the hero, projects, skills, contact, and footer sections. Interactive section components live in `components/`; project details and galleries are presented in a modal, while the navigation and portfolio content remain on the same page.

The contact form sends messages directly through EmailJS. SPIRIT sends chat requests to `app/api/chat/route.ts`, which streams responses from an AI gateway using Gemini 3.7 Flash. Neither integration is required to build and browse the portfolio, but its corresponding environment variables must be configured to use it.
