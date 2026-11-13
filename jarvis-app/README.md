# JARVIS AXIOM — Cloud-ready v3

**Standalone voice-enabled command center** (Overview, Radar, Trade Planner, KPIs, Wealth, Voice, Notes).

## Run on Mac mini
With Node.js 20+ installed, in this folder run `npm start`, then open `http://localhost:10000`. The basic dashboard and voice demo work without any API credentials.

## Deploy to Render (Web Service)
1. Create a **new GitHub repository** for this app (do not use your existing AXIOM scanner repository) and push the contents of this folder.
2. In Render select **New → Web Service**. Connect that GitHub repository, runtime **Node**, build command `npm install --omit=dev`, start command `npm start`, and a Free instance if offered. Or select **New → Blueprint** to use `render.yaml`.
3. Add the environment variables in the Render Dashboard:
   - `GEMINI_API_KEY`: create at https://aistudio.google.com/apikey (provider quotas and billing terms apply). **Do not add this key to the app's HTML or to GitHub.**
   - `JARVIS_ACCESS_CODE`: create your own long, random secret. This protects cloud API requests. Never enter an AI-provider API key into the page; only enter your private JARVIS access code.
   - Optional `GEMINI_MODEL`, default `gemini-2.5-flash`.
4. Deploy, open the HTTPS `onrender.com` URL from Mac mini or iPhone, and use **Add to Home Screen** on iPhone.
5. On the Voice tab, enter your JARVIS access code once per browser tab and click **Unlock AI chat**. Voice conversations use browser speech services. Some iPhone browsers may require text input if speech recognition is unavailable.

**IMPORTANT**: Cloud AI is *not live market data*. The app is demonstration-only until an authorized verified feed is separately connected. No broker connections, automatic trading, external data, shared account sync, or background tasks have been added. Research notes and watchlists use local browser storage and do not sync between iPhone and Mac. A static Render site will not run the `/api/chat` backend; use a **Web Service**.

Render free Web Service instances may sleep between visits and take time to wake. Protect the access code; a public URL can be reached by others. Without an AI-provider key, `/api/status` reports unavailable and voice uses demonstration answers.