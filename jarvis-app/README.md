# JARVIS AXIOM Brain v4

Standalone voice-enabled command center. This deployment has **AXIOM Core** (a bounded rules-based knowledge engine) running in the server even without cloud AI credentials. It is **not** a general-purpose LLM.

For genuine open-ended cloud AI, set both `GEMINI_API_KEY` and `JARVIS_ACCESS_CODE` privately in the Render service Environment page and deploy the updated configuration. Never place API keys in GitHub, HTML, or chat. The app accesses Gemini only on the server; entering the private access code in the Voice tab unlocks this optional tier.

On free hosting, the app may be asleep between sessions. Nothing in this version connects to real-time market feeds, IBKR, existing scanner automations or portfolio positions. All displayed sample prices and market-strength values are synthetic. Browser notes/watchlist are local to each device and do not synchronize. Voice recognition and system voices vary by browser.

Run locally with `npm start` (Node 20+) and open http://localhost:10000. Try `/healthz`, `/api/status`, and POST `/api/chat` with JSON `{ "message": "Explain my pre-breakout rules" }`.