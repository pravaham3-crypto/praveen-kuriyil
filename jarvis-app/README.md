# JARVIS AXIOM — General Intelligence v6

This is the independent JARVIS voice dashboard with the cyan audio orb, seven dashboard sections, browser speech, a rules-only AXIOM Core fallback and **optional OpenAI GPT brain** for general conversation, complex financial analysis and everyday questions. It is separate from the existing AXIOM scanners and trading dashboard.

## Hosting

The live Render Web Service uses this project in the GitHub repository `pravaham3-crypto/praveen-kuriyil`, folder `jarvis-app`. Its build command is `cd jarvis-app && npm install --omit=dev` and start command is `cd jarvis-app && npm start`.

## Enable OpenAI GPT (Render → Environment)

- `AI_PROVIDER=openai` (preferred)
- `OPENAI_MODEL=gpt-6.1-sol` (can be changed to another model available to your OpenAI API organization; review its current prices)
- `OPENAI_API_KEY`: private OpenAI API project key from https://platform.openai.com/api-keys
- `JARVIS_ACCESS_CODE`: private, long random passphrase chosen by the user; do not place the passphrase in GitHub or chat messages
- Optional: `OPENAI_WEB_SEARCH=true` enables paid on-demand web searches for clearly current/news requests. Leave off to avoid search charges; web search is not a real-time trading feed. Search providers may incur separate charges.

Never store either secret in HTML, a Git repository, source files, or this README. ChatGPT subscription and OpenAI API billing may be separate. Review costs and limits on platform.openai.com.

After saving environment variables, Render redeploys the service. Open the JARVIS HTTPS URL → Voice Assistant → enter the *JARVIS access code only* → Unlock AI chat. `GET /api/status` tells whether the provider is active without revealing secrets. Messages sent to the AI model are passed through the server and not saved in its own database (`store:false` for OpenAI API requests). The current conversation history is kept in the browser session, not synced across devices.

## What it can and cannot do

General-purpose questions including technology, financial history, science and everyday knowledge, with strong financial-analysis system instructions. Optional paid web search can provide current public sources; by itself it is not a validated stock market feed. The home page's market metrics and pre-breakout tickers are synthetic demonstrations, not verified opportunities. There is no broker/IBKR connection, automatic trading, live AXIOM scan, real-time prices, cloud note sync, or background monitoring. The original scanners and scheduled tasks are untouched.

## Run locally

Node.js 20+ required. Run `npm start`, then open `http://localhost:10000`. Without OpenAI environment variables, the rules-only AXIOM Core continues to respond.