# JARVIS AXIOM — paid Realtime voice trial

JARVIS's cloud-hosted **Live Voice** panel now supports a real, bidirectional conversation in its own animated orb via OpenAI Realtime WebRTC (model `gpt-realtime-2.1-mini`, voice `marin`). This runs on **separately billed OpenAI API credits**, not the ChatGPT Plus subscription.

## First-time setup (small prepaid test)

1. Add the smallest amount of prepaid OpenAI API credit you are comfortable with at https://platform.openai.com/settings/organization/billing/overview. Configure a dedicated project, set a low project budget/alerts, and turn **auto-recharge OFF** to reduce the chance of additional purchases.
2. Generate a *project-scoped* API key at https://platform.openai.com/api-keys. In the JARVIS Render service Environment, update `OPENAI_API_KEY` securely, without pasting it into ChatGPT, HTML, code, or GitHub.
3. Set `JARVIS_VOICE_ENABLED=true`, `JARVIS_VOICE_WEB_SEARCH=true`. The existing `JARVIS_ACCESS_CODE` is required to start a session or use the search tool. **The separate `AI_PROVIDER` value does not control Realtime voice.**
4. Visit https://jarvis-axiom-voice-pravaham3.onrender.com, refresh, enter the private JARVIS access code, and tap **Start 2-minute conversation** (or the orb). Allow microphone access; keep the page open. Tap **End conversation** to disconnect.
5. Ask a general test question, followed by a current-price example such as 'Check Nike running shoes at Sports Corner Qatar and quote current prices with sources.' The assistant should use its `search_web` tool and show source links if any are found; it must not invent current prices.

## Trial safety measures

- Browser stops Realtime WebRTC after 120 seconds; maximum 4 new sessions per IP address per UTC day, kept in ephemeral server memory.
- Up to 6 web searches per IP per UTC day. Searches call the Responses API with `gpt-4.1-mini` and OpenAI `web_search` tool, which adds API charges.
- Sessions are created only on an authenticated, deliberate browser click. The long-lived API key stays in Render.
- **Not a hard spending cap:** counters reset if the Render service restarts; closing the browser or losing the network can complicate immediate hangup; other applications sharing the same project key can incur charges. Use OpenAI's billing dashboard and project budget settings for spending oversight.
- The voice page needs the foreground microphone on iOS; it cannot continue listening indefinitely when the phone locks or the browser is suspended.
- No IBKR order placement, AXIOM rule changes, scheduling changes, or financial record edits occur here. Trading/wealth connections remain read-only unless explicitly changed later.

## Pricing and usage

Current published price for `gpt-realtime-2.1-mini` is $10 per million audio input tokens and $20 per million audio output tokens. Public web search is priced per call plus input tokens; actual cost depends on conversation length, audio turns, and tool usage. Consult https://developers.openai.com/api/docs/pricing before funding. A $5 prepaid test is a *trial amount*, not a monthly subscription or unlimited allowance.

---
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

- JARVIS now includes a **Recent News Desk** with user-triggered recent headline retrieval from public RSS feeds. It attempts query-specific Google News, then Bing News, then relevance-filtered BBC topic headlines as a limited fallback. It does not use paid Gemini Google Search grounding, an additional API key, or your trading account.
- Open **Recent News Desk**, enter a query, and fetch dated headlines. This endpoint is `GET /api/research/news?q=<topic>`, protected by the private JARVIS access code and a request limit. Results display headline, publisher, date and a Google News link.
- In Voice Assistant, questions with an explicit recent-news intent automatically fetch up to eight dated headlines (when public RSS is reachable) and supply them as **untrusted source summaries** to Gemini. The response displays source links. This is *not full web search, full-article extraction, or guaranteed current coverage*; feed availability and timestamps must be verified.
- The service limits RSS headlines to 7-day search queries and caches retrieval for five minutes to avoid excessive requests. Retrieval failures must be shown as unavailable; Gemini should not invent current facts.
- **Gemini 3.5 Flash-Lite on the Google free API tier does not include built-in Google Search grounding** according to Google's published pricing. A paid-tier search feature must not be enabled without deliberate approval. Gemini 2.5 Flash-Lite historically offered free grounding, but access to legacy 2.5 models is restricted for newer projects. The RSS route avoids those complications.
- **Market quotes, historical OHLCV, financial filings, earnings calendars, order book data and verified live sector scans are not supplied by this RSS feed.** Use trusted structured financial sources and the AXIOM scanner instead.

## ChatGPT Plus Brain — primary AI command center

The **ChatGPT Plus Brain** tab and main Overview button are a manual, transparent handoff to `https://chatgpt.com/`. ChatGPT Plus is a subscription to the ChatGPT product; it is **not** a credential for a third-party application's OpenAI API. To avoid extra OpenAI API usage, use ChatGPT in its own app/browser for general questions, independent web research, AXIOM scan analysis, and Wealth 2034 planning.

The user chooses one of four workflow prompts (**General JARVIS**, **Run AXIOM scan**, **Analyze trading KPIs**, or **Review Wealth 2034**) and clicks **Copy request**; then **Open ChatGPT** and paste the request. This does not auto-send a website conversation, private key, financial snapshot, or model request into ChatGPT. The existing GitHub, market data, IBKR, or other connected apps available in the ChatGPT conversation are separate from the Render backend.

This is an explicit user-driven handoff, not embedded ChatGPT, automatic Plus-to-API billing conversion, a live remote ChatGPT connector, or a promise of unrestricted real-time quotes. Existing AXIOM scanner rules, automations, IBKR positions, and dashboard records are not changed by the handoff.

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
