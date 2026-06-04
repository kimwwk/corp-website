# n8n form → email setup

The contact form POSTs JSON to an n8n webhook, which emails the lead to **kimwong.wwk@gmail.com**.

## 1. Get an n8n instance (pick one)

- **n8n Cloud** (easiest): https://n8n.io — free trial, then ~$24/mo
- **Self-host free**: `docker run -it --rm -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n`
  (needs a public URL for the webhook — e.g. Cloudflare Tunnel, or host on a VPS)

## 2. Import the workflow

1. n8n → **Workflows → Import from File** → `assessment-lead-workflow.json`
2. Open the **Email Me** node → attach your **Gmail OAuth credential**
   (n8n walks you through connecting your Google account; or swap the node
   for *Send Email (SMTP)* if you prefer)
3. **Activate** the workflow (toggle top-right)
4. Copy the **Production URL** from the *Form Webhook* node — looks like:
   `https://<your-instance>/webhook/kivov-assessment-lead`

## 3. Point the website at it

Build the site with the env var set:

```bash
NUXT_PUBLIC_N8N_WEBHOOK_URL=https://<your-instance>/webhook/kivov-assessment-lead npm run generate
```

For Cloudflare Pages: add `NUXT_PUBLIC_N8N_WEBHOOK_URL` in
**Settings → Environment variables**, then redeploy.

## 4. Test

Submit the form on `/contact` — you should get the email within seconds.
Until the env var is set, the form shows a friendly fallback asking visitors
to email directly, so nothing breaks while n8n isn't ready.

## Payload reference

```json
{
  "name": "...", "email": "...", "company": "...",
  "companySize": "...", "interest": "...", "timeline": "...",
  "message": "...", "source": "kivov-website", "submittedAt": "ISO-8601"
}
```
