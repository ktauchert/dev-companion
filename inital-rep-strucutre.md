sdlc-companion/
│
├── apps/
│   ├── web/                    # Next.js
│   └── api/                    # NestJS
│
├── packages/
│   ├── shared/                 # Shared types / utilities
│   ├── database/               # Drizzle schema & DB access
│   ├── auth/                   # Auth abstraction
│   ├── ai/                     # LLM provider abstraction
│   ├── architecture/           # Architecture domain
│   ├── ideation/               # Ideation domain
│   ├── planning/               # Planning domain
│   ├── documents/              # Document & versioning domain
│   └── validation/             # Shared validation / schemas
│
├── infrastructure/
│   ├── docker/
│   ├── render/
│   └── scripts/
│
├── docs/
│   ├── adr/
│   ├── architecture/
│   └── planning/
│
├── .github/
│   └── workflows/
│
├── PROJECT-PLAN.md
├── ROADMAP.md
├── TECH-STACK.md
├── ARCHITECTURE.md
├── DOMAIN-MODULES.md
├── MONOREPO-STRUCTURE.md
├── DEVELOPMENT.md
├── CONTRIBUTING.md
├── README.md
├── package.json
├── package-lock.json
└── docker-compose.yml
