# Webnox Hub — launch status

Updated: 20 October 2026. Authoritative folder: `D:\Webnox Hub`.
Status: Stage A locally checked. Stage B awaits Netlify signup/login with the Webnox account.
No deployment, email delivery, real AI response, DNS or production launch is verified.

## Structure and preservation

Prepared static site: eight HTML pages including thank-you, shared CSS/JS and logo assets.
No Git repository, framework, dependencies, database or backend.
The old ZIP was not extracted over current files.
Added `.gitignore`, `scripts/prepare-deploy.mjs` and generated `dist/`.
The script only copies approved public files; it does not compile or migrate the site.
Public URLs remain unchanged.

## Implemented

- Confirmed email `webnoxhub@gmail.com`, Karachi location, telephone
  `tel:+923181245603` and WhatsApp `https://wa.me/923181245603`.
  Every footer has contact links; Contact also has phone and WhatsApp rows.
- Service choices include e-commerce development/management and AI integrations.
- Preserved theme, layout, page paths and draft package content.
- Completed menu attributes on Home/Services. Escape closes the mobile menu;
  keyboard focus cycles through it; desktop resizing clears mobile scroll lock.
- Portfolio filters expose `aria-pressed`. Fixed narrow-phone portfolio grid sizing,
  long email wrapping and short-screen menu scrolling.
- Added a no-JavaScript content/menu fallback; reduced-motion preference stops
  canvas animation and smooth scrolling.
- Removed free-call, 24/7, weekly-demo and zero-downtime promises outside draft
  packages. Replaced unsupported popularity/value badges.
- Kept Netlify form metadata, honeypot, required consent and field limits.
- AJAX failure/timeout retains entered fields, reports uncertainty and enables retry.
  Only an accepted HTTP response navigates to thank-you. Local preview sends nothing.
  Native POST remains the no-JavaScript fallback.
- Publishing allowlist excludes internal notes, scripts, config, credentials and unused
  alternate logos. Generated `_headers` supports manual uploads.
- Review robots blocking and `X-Robots-Tag: noindex` remain; neither is access protection.

## Locally verified

- JavaScript syntax passed.
- Eight pages; 207 local references; no missing targets.
- All pages returned HTTP 200 locally. Internal notes, `.env`, source config and
  development scripts were absent from output and their URLs returned 404.
- Browser checked all pages at phone width 320 px and measured desktop width 1280 px.
  Tested cards/forms had no horizontal overflow. Homepage/menu also checked at 390 px.
- Mobile Escape and Work navigation passed after menu animation.
- Portfolio filters: Web 2, SaaS 1, Automation 1, Ecommerce 2, All 6.
- Browser checked required fields, invalid email, required consent, optional budget,
  input limits (name 100, email 254, message 10–5000) and local submission notice.
- No warnings/errors captured in tested tabs.
- Six simulated JavaScript tests passed: local blocking, HTTP failure, network failure,
  accepted response, simultaneous double-click and trimmed message validation.
  Simulated responses do not prove hosted acceptance or delivery.
- Reduced-motion/no-JavaScript code is present; these modes were not separately
  exercised in the browser.

Original changed-file backup:
`C:\Users\hasee\Documents\ChatGPT\Webnox Hub\backup-before-stage-a`.
Verification harness/report: `verify-stage-a.cjs` and `stage-a-checks.json`
in that ChatGPT workspace.

## Netlify preview workflow

Account check reached Log in; user requested the Webnox account, and the signup page
is open at https://app.netlify.com/signup/start.
User completes signup/login privately, selects `webnoxhub@gmail.com` and Free plan.
No credentials were read/stored, and no paid upgrade or automatic recharge enabled.

No Git remote or GitHub CLI is available. A manual static preview is simplest initially;
connect a private GitHub repository for ongoing deployment after account access.
Manual static uploads will NOT deploy future Functions.

```powershell
cd 'D:\Webnox Hub'
node scripts/prepare-deploy.mjs
```

Upload ONLY `D:\Webnox Hub\dist`, never the project root.
For Git with this project as repository root: base blank, build command
`node scripts/prepare-deploy.mjs`, publish `dist`, Node 22 (already configured).

After upload:

1. Forms > Enable form detection; redeploy.
2. Verify `project-inquiry` appears.
3. Add email notification to `webnoxhub@gmail.com`.
4. Submit marker `WEBNOX-PREVIEW-20261020-01` once.
5. Verify the same marker in Forms AND recipient inbox, including spam.
6. Test hosted failures, fields, mobile use and honeypot filtering.
7. Verify hosted security headers and internal-file 404 responses.

[Form setup](https://docs.netlify.com/manage/forms/setup/) ·
[Notifications](https://docs.netlify.com/manage/forms/notifications/)

## Hosting review — 20 October 2026

- Free explicitly permits commercial projects. The announcement's old usage figures
  are superseded by current credit pricing.
  [Commercial use](https://www.netlify.com/blog/introducing-netlify-free-plan/)
- Current credit-based Free: 300 credits/month, hard limit. Exhaustion pauses all team
  projects. Production deploy 15 credits; preview/branch deployment operations zero.
  Traffic still consumes credits: bandwidth 20/GB, requests 2/10,000; compute 10/GB-hour.
  Free has no automatic recharge. Paid plans can enable recharge charges.
  Verify the actual account plan; legacy plans differ.
  [Credits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)
- Forms are free/unlimited on credit-based plans; legacy billing differs.
  [Forms billing](https://docs.netlify.com/manage/forms/usage-and-billing/)
- Function defaults: 1024 MB memory; 60 seconds synchronous, 30 seconds scheduled,
  15 minutes background; 6 MB buffered request/response.
  [Functions](https://docs.netlify.com/build/functions/configuration/)
- Custom domains and automatic HTTPS certificates are supported; actual DNS and
  certificate verification remain necessary.
  [HTTPS](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/)

## Pending before production

- Hosted preview, form detection/persistence, spam controls and email receipt.
- Server-side field validation and durable duplicate-lead prevention are NOT implemented.
  Browser constraints and the pending flag are not reliable server protections.
  A response can be lost after acceptance; do not auto-retry. Do not assume Netlify Forms
  enforces custom business constraints.
- Final privacy notice, retention/deletion decisions and provider-processing review.
  Consent does not establish legal compliance. Google Fonts remains an external request.
- AI provider terms/pricing/data review, secure backend, real API tests, distributed abuse
  controls and visitor-confirmed handoff into the verified form. No AI backend/key added.
- Owner approval of draft prices, deliverables and support terms. Draft status is not
  approval to publish production offers.
- Confirm `webnoxhub.com`, inspect DNS and preserve MX/SPF/DKIM/DMARC; verify root/www
  redirects and HTTPS. No DNS changes made.
- Remove review `Disallow: /` and both generated/configured `X-Robots-Tag: noindex`
  after indexing approval. Thank-you should remain noindex.
