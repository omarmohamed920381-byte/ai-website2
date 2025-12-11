
Site ready to deploy to Vercel / Netlify / Cloudflare
Structure:
- public/ (static site files)
  - index.html
  - style.css
  - script.js
- netlify/functions/chat.js (Netlify function)
- api/chat.js (Vercel function)
- functions/chat.js (Cloudflare Pages function)

Deploy instructions:
Vercel:
- Upload or connect to Git. Set environment variable OMAR_AI_KEY to your OpenAI key.
- Vercel will use /api/chat as the serverless function endpoint.

Netlify:
- Drag & drop the public folder as a site, then add netlify/functions/chat.js in the repo and set OMAR_AI_KEY in Site settings -> Environment.
- Or push the whole project to a repo and connect to Netlify.

Cloudflare Pages:
- Upload ZIP and set OMAR_AI_KEY as a secret (if you prefer to use OpenAI). Optionally you can use Cloudflare AI instead.

