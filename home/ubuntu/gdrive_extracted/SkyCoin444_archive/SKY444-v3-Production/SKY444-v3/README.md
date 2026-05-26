# SKY444 — Web3 Super-App v3.0.0

> **Built by** Skyler Blue Spillers — **IITRL LLC** (Innovative Information Technology Resolutions)
> **Stack:** FastAPI · React 18 · Vite · TypeScript · PostgreSQL · Redis · Nginx · Docker

SKY444 is a production-grade **Web3 super-app** that unifies a custom Proof-of-Work blockchain with 24 integrated mini-applications covering DeFi, social networking, gaming, governance, creator economy, and enterprise tooling — all wrapped in a fully responsive, PWA-enabled, touch-optimized interface.

---

## Feature Matrix

| Domain | Modules |
| :----- | :------ |
| **Wallet** | Dashboard, Send/Receive, Block Explorer, Profile |
| **DeFi** | Mining (real PoW), Staking (tiered APY), Swap (AMM), Cross-chain Bridge, Investment Portfolio, Token Burn, ICO |
| **Social** | ShadowChat (end-to-end), Videos, Live Streaming, Creator Economy, Daily Quests |
| **Business** | SkyForge (payroll-as-a-service), Payroll, IT Portal, DAO Governance, Charity Hub |
| **Market** | NFT Marketplace, Casino (provably fair), Dark Market |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                          Users (any device)                       │
│   iPhone · Android · iPad · MacBook · Windows · Linux desktop     │
└──────────────────────────────────────────────────────────────────┘
                                 │
                    HTTPS (with HSTS, CSP headers)
                                 │
                    ┌─────────── ▼ ───────────┐
                    │   Nginx Reverse Proxy    │   :80 / :443
                    │  (gzip, rate-limit, TLS) │
                    └─────────── │ ───────────┘
                    ┌─────────── ┴ ───────────────────────┐
                    │                                      │
          ┌─────────▼─────────┐              ┌─────────────▼────────┐
          │ Frontend (Nginx)  │              │  FastAPI Backend     │
          │ React + Vite SPA  │              │  + PoW Blockchain    │
          │ PWA + Service SW  │              │  + WebSocket server  │
          └───────────────────┘              └──────┬───────┬───────┘
                                                    │       │
                                          ┌─────────▼─┐  ┌──▼────────┐
                                          │ PostgreSQL │  │   Redis   │
                                          │  16-alpine │  │  7-alpine │
                                          └────────────┘  └───────────┘
```

## Quick Start

### Local Development (no Docker)

```bash
# 1. Backend
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# 2. Frontend (separate terminal)
cd frontend
pnpm install
pnpm run dev            # http://localhost:3000
```

### Production Stack (Docker Compose)

```bash
cp .env.example .env
# edit .env — set POSTGRES_PASSWORD and JWT_SECRET
openssl rand -hex 32                 # use output for JWT_SECRET

docker compose up --build -d

# View logs
docker compose logs -f

# Access
open http://localhost                # full stack behind Nginx
```

---

## Responsive UI / UX Algorithm

SKY444 implements a **mobile-first, progressive-enhancement** algorithm that adapts fluidly to every form factor:

| Breakpoint | Target | Layout strategy |
| :--------- | :----- | :-------------- |
| `< 768px`  | Phones (iOS/Android) | Hamburger drawer + **bottom tab bar** (5 primary destinations per iOS HIG / Material) |
| `768–1023px` | Small tablets / iPad mini | Collapsed icon-only sidebar + 2-column content grid |
| `1024–1279px` | iPad Pro / small laptops | Full 240 px sidebar + auto-fit grid ≥ 260 px |
| `1280–1535px` | Laptops | Full sidebar + 32 px content padding |
| `≥ 1536px` | Desktops / wide monitors | Max-width 1680 px container, 40 px padding |

Platform-specific polish:

- **iOS Safari**: `viewport-fit=cover` + `env(safe-area-inset-*)` for notch, Dynamic Island, and home indicator
- **Android Chrome**: Theme color, installable PWA manifest, maskable icons
- **iPad**: `(hover: none) and (pointer: coarse)` query bumps touch targets to 48 px
- **High-DPI / Retina**: hairline borders, crisp SVG icons
- **Reduced motion**: respects `prefers-reduced-motion: reduce`
- **Print**: dedicated print stylesheet hides nav, inverts to white background

Typography uses a **fluid modular scale** (`clamp(min, base + vw, max)`) so text never shrinks too small on mobile nor balloons on 4K displays.

Inputs use `font-size: 16px` to prevent iOS auto-zoom on focus; buttons have `touch-action: manipulation` to eliminate the 300 ms tap delay.

---

## Blockchain Core

- **Consensus**: Proof-of-Work with adaptive difficulty (retargets every 10 blocks)
- **Block time**: ~30 s target
- **Total supply**: 444,000,000 SKY444 (fixed)
- **Address format**: `SKY` + 40-char hex (Base-58 variant)
- **Signing**: RSA-2048 (upgradeable to Ed25519)
- **Merkle trees** for transaction inclusion proofs
- **Mempool** with fee-based prioritization

---

## DevOps & Security

- **Multi-stage Docker builds** — backend ≈ 180 MB, frontend ≈ 40 MB
- **Non-root container user** for backend (defense in depth)
- **Rate limiting** at Nginx (20 rps default, 5 rps auth, 2 rps mining)
- **Security headers**: HSTS, X-Frame-Options, CSP-ready, Referrer-Policy
- **Health checks** on every service with Docker restart policies
- **PostgreSQL** with `pgcrypto`, `citext`, `pg_trgm` extensions + audit log table
- **Redis** LRU-capped at 256 MB for session + WebSocket pub/sub
- **GitHub Actions CI**: lint, type-check, build, Docker smoke-test

---

## Directory Layout

```
SKY444-v3/
├── backend/                   # FastAPI + PoW blockchain
│   ├── main.py                # 40+ REST endpoints + WebSocket
│   ├── blockchain.py          # PoW consensus + chain state
│   ├── wallet.py              # RSA key management
│   ├── transaction.py         # TX model + signing
│   ├── block.py               # Block header + Merkle root
│   ├── db/init.sql            # PostgreSQL schema
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                  # React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/             # 24 fully-wired pages
│   │   ├── components/
│   │   │   └── Layout.tsx     # Responsive shell
│   │   ├── services/api.ts    # 50+ API wrappers + WS helpers
│   │   ├── index.css          # PhD-level design system
│   │   └── index.tsx
│   ├── public/                # manifest, icons, SW
│   ├── index.html
│   ├── Dockerfile
│   └── vite.config.ts
├── nginx/                     # Reverse proxy config
├── .github/workflows/ci.yml   # CI pipeline
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## License

© 2026 IITRL LLC · All rights reserved.
