# ChatFun — Modern Messaging Platform

A modern, full-featured messaging platform built with **Next.js (App Router) + TypeScript + TailwindCSS + shadcn/ui**, using **Clerk** for authentication, **Convex** for serverless data, and **Stream Chat/Video** for real-time messaging and video calls.

## Live Demo

[https://chatfun.hugoedmoundo.fun](https://chatfun.hugoedmoundo.fun)

## Features

- **Real-time Messaging** — Instant 1-on-1 and group chat with typing indicators, read receipts, and file sharing
- **HD Video Calls** — One-click video calls with screen sharing via Stream Video (WebRTC)
- **Channels** — Broadcast channels with hybrid discussion threads (like Telegram)
- **Group Chats** — Rich group conversations with admin controls and member management
- **Liquid Glass UI** — Telegram-inspired frosted glass design with smooth animations
- **Authentication** — Secure login with email, Google, or GitHub via Clerk
- **Privacy First** — End-to-end encryption, SOC 2 compliant infrastructure
- **Lightning Fast** — Built on Next.js, Convex real-time DB, and Stream SDK

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | React framework with SSR |
| **React 19** + TypeScript | UI library |
| **TailwindCSS v4** + shadcn/ui | Styling & components |
| **Clerk** | Authentication & user management |
| **Convex** | Serverless backend + real-time database |
| **Stream Chat** | Real-time messaging infrastructure |
| **Stream Video** | WebRTC video calling SDK |

## Getting Started

```bash
git clone <repo-url>
cd chatfun
npm install

# Set up environment variables (see .env.local)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── page.tsx         # Landing page
│   ├── (signed-in)/     # Authenticated routes (dashboard, channels)
│   └── docs/            # Documentation (12+ pages)
├── components/          # React components
│   ├── landing/         # Landing page components
│   ├── channel/         # Channel feature components
│   └── ui/              # shadcn/ui components
├── convex/              # Convex backend (schema + serverless functions)
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries (Stream clients)
└── actions/             # Next.js Server Actions
```

## Documentation

Full documentation is available at `/docs`:

- [Overview](/docs)
- [Getting Started](/docs/getting-started)
- [Messaging](/docs/messaging)
- [Groups](/docs/groups)
- [Channels](/docs/channels-docs)
- [Video Calls](/docs/video-calls)
- [Privacy & Security](/docs/privacy)
- [Architecture](/docs/architecture)
- [API Reference](/docs/api)
- [Deployment](/docs/deployment)
- [Contributing](/docs/contributing)
- [FAQ](/docs/faq)

## Scripts

```bash
npm run dev       # Next.js + Convex dev servers
npm run build     # Production build
npm start         # Start production server
npm run lint      # ESLint
```

## Environment Variables

Create a `.env.local` file with your API keys:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_****
CLERK_SECRET_KEY=sk_****
NEXT_PUBLIC_STREAM_API_KEY=XXXX
STREAM_API_SECRET_KEY=YYYY
STREAM_APP_ID=1234567
CONVEX_DEPLOYMENT=dev:local
```

## Deployment

Deploy to Vercel (frontend) + Convex Cloud (backend):

```bash
npx convex deploy
# Then connect your repo to Vercel and add environment variables
```
