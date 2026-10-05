# LOOP

**Your data. Your health. Your advantage.**

LOOP is a privacy-first, local-first personal health data platform designed to connect wearable data, normalize it into a personal health model, turn it into useful analytics, and eventually provide AI-guided actions.

## Product direction

```
Wearables
   ↓
Device / API ingestion
   ↓
Private Data Vault
   ↓
Normalized Health Model
   ↓
Analytics Engine
   ↓
AI Coach
   ↓
Actions / Automations
   ↺
```

## Current milestone — 0.1

- Responsive LOOP dashboard
- WHOOP-first connection entry point
- Recovery, sleep, HRV, resting HR and strain overview
- Health trend visualization
- AI Coach interaction using local mock responses
- Device management
- Privacy-first / local-first product positioning
- Foundation for future device connectors

The current frontend is intentionally a prototype. Real device ingestion, encrypted persistence, authentication, synchronization, analytics services and production AI are separate implementation layers.

## Development

```bash
npm install
npm run dev
```

## Principles

1. **The user owns the data.**
2. **Local-first is the default.**
3. **Cloud is optional, not the source of truth.**
4. **Provider integrations are replaceable.**
5. **Health insights should be explainable and transparent.**
