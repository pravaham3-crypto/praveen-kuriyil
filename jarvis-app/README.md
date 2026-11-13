# JARVIS AXIOM — Hybrid AI and Read-Only Data Connections

JARVIS is a standalone Render-hosted voice dashboard. It uses **Gemini** when configured, supports optional billed OpenAI, and falls back to the local AXIOM rules engine. Your original scanner, trading dashboard, and finance apps remain separate and unchanged.

## Hosted app

https://jarvis-axiom-voice-pravaham3.onrender.com

Render service: `srv-dbrcsi5g1s2s7384kptg`. Node.js 20+; build `cd jarvis-app && npm install --omit=dev`; start `cd jarvis-app && npm start`.

## Gemini hybrid brain (current)

Add these secrets in **Render Web Service → Environment**, not in GitHub:

- `AI_PROVIDER=gemini`
- `GEMINI_MODEL=gemini-3.5-flash-lite`
- `GEMINI_API_KEY` — your private Google AI Studio API key, subject to free-tier limits and terms.
- `JARVIS_ACCESS_CODE` — your own strong private password, required for AI and the data connectors.

`AI_PROVIDER=gemini` is isolated: **it does not fall back to the paid OpenAI provider** even if an OpenAI key is still configured. Optional: `AI_PROVIDER=openai`, `OPENAI_API_KEY`, `OPENAI_MODEL` with separate API billing. `GET /api/status` reports activation without exposing secrets.

## Recent News Desk and Gemini's current-information limitations

- JARVIS now includes a **Recent News Desk** with user-triggered recent headline retrieval from the public Google News RSS feed. It does not use paid Gemini Google Search grounding, an additional API key, or your trading account.
- Open **Recent News Desk**, enter a query, and fetch dated headlines. This endpoint is `GET /api/research/news?q=<topic>`, protected by the private JARVIS access code and a request limit. Results display headline, publisher, date and a Google News link.
- In Voice Assistant, questions with an explicit recent-news intent automatically fetch up to eight dated headlines (when public RSS is reachable) and supply them as **untrusted source summaries** to Gemini. The response displays source links. This is *not full web search, full-article extraction, or guaranteed current coverage*; feed availability and timestamps must be verified.
- The service limits RSS headlines to 7-day search queries and caches retrieval for five minutes to avoid excessive requests. Retrieval failures must be shown as unavailable; Gemini should not invent current facts.
- **Gemini 3.5 Flash-Lite on the Google free API tier does not include built-in Google Search grounding** according to Google's published pricing. A paid-tier search feature must not be enabled without deliberate approval. Gemini 2.5 Flash-Lite historically offered free grounding, but access to legacy 2.5 models is restricted for newer projects. The RSS route avoids those complications.
- **Market quotes, historical OHLCV, financial filings, earnings calendars, order book data and verified live sector scans are not supplied by this RSS feed.** Use trusted structured financial sources and the AXIOM scanner instead.

## Read-only Data Connections tab

This tab provides three integration adapters. All `/api/integrations/*` GET routes require the `X-JARVIS-Access-Code` header matching `JARVIS_ACCESS_CODE`; there is no browser-exposed GitHub token or external dashboard token. Responses have `Cache-Control: no-store`.

### 1. AXIOM screener — automated, private CSV fetch after setup

The source is the user's **private** `pravaham3-crypto/ai-long-short-scanner` repository, file `snapshots/prebreakout_long.csv` on `main`. JARVIS does **not** edit it.

- Create a GitHub **fine-grained personal access token**, limited to this repository with **Contents: Read-only** and as short an expiry as practical.
- Set `AXIOM_GITHUB_READ_TOKEN` to that secret in the JARVIS Render environment.
- Open JARVIS → Data Connections → **Sync scanner now**, after entering the private JARVIS access code on the Voice Assistant tab.

The result returns the current CSV snapshot with a visible `AsOf` field, status, score, approximate pivot, RVOL and liquidity. The CSV is research output only: no current ticks, chart-defined precise pivot verification, earnings validation, or trade execution. Never publish the source private repository or its access token.

### 2. AXIOM performance dashboard

For direct sync, the source app must publish a **read-only JSON or CSV export endpoint**, accessible from JARVIS Render (and authenticated if necessary). Only then set `AXIOM_KPI_EXPORT_URL` (https://*.chatgpt.site) and, if needed, `AXIOM_KPI_EXPORT_TOKEN` in Render. No endpoint has been verified yet. Otherwise export a CSV/JSON file manually, then import it in JARVIS Data Connections.

### 3. Family Wealth Dashboard — Road to 2034

Source: https://family-wealth-dashboard-public-pravaham3-5020s-projects.vercel.app/

A machine-readable, read-only JSON bridge at `https://family-wealth-dashboard-public-pravaham3-5020s-projects.vercel.app/api/bridge` was verified from Render on 2026-11-13. Its response includes `generatedAt`, `fx`, `mf`, `trading`, and `dashboardState` sections. `WEALTH_EXPORT_URL` is already configured in Render. In JARVIS enter your access code, open **Wealth 2034**, then choose **Refresh sourced wealth data**. Verify the source timestamp and individual holdings independently; this bridge is not a real-time broker connection. The Vercel project is not accessible through the connected Vercel account, so its backend has not been modified.

Until then, export a CSV/JSON file from the wealth dashboard and import it via the JARVIS Data Connections tab. The imported snapshot is displayed with source, row count and date when provided. Imported files stay in browser tab memory; JARVIS does not silently save financial records on the server.

## AI analysis of imported data

Off by default. The user must enable the **Include currently loaded financial data** checkbox. Only a bounded summary (up to 4,500 characters) of loaded snapshots then accompanies user questions to Gemini; do not upload unnecessary identifiers. Users should verify data quality and account balances independently.

## Security and boundaries

- No brokerage keys, IBKR order routing, live execution or automated trades.
- No modifications to AXIOM rules, current scanner schedules, source financial dashboards or their accounts.
- The first seven dashboard sections still show illustrative or scenario values unless explicitly replaced by connected source data; the Data Connections screen is where real imported/synced snapshots are presented.
- API credentials remain server-side. Never paste tokens, private data or access codes into chat or a public repository.
- HTTP exports must be machine-readable JSON or CSV, not HTML or login pages; the server refuses redirect responses and caps body size.
