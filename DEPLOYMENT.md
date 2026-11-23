# Deploying to Cloudflare Pages

This portfolio is a fully static Nuxt site. `npm run generate` prerenders every page and
optimizes every image at build time, then Cloudflare Pages serves the files from its CDN.
No server, no database, free plan.

| Setting | Value |
|---|---|
| Repository | `it-cuencojasminemae/portfolio` (GitHub) |
| Production branch | `main` |
| Build command | `npm run generate` |
| Build output directory | `.output/public` |
| Node version | `22` (pinned in `.node-version`) |

---

## What is already set up in the repo

| File | Why it's there |
|---|---|
| `.node-version` | Tells Cloudflare's build machine to use Node 22. Nuxt 4 needs Node 20 or newer. |
| `public/_headers` | Cloudflare reads this file and adds security headers to every page, plus long-term caching for `/_nuxt/*` (hashed JS/CSS) and `/_ipx/*` (optimized images). |
| `nuxt.config.ts` → `image.provider: 'ipx'` | Makes images get resized and converted to WebP during the build and shipped as plain files, so no paid image service is needed. |
| `package.json` → `engines` | States the minimum Node version. |
| `.gitignore` → `.wrangler` | Keeps Cloudflare CLI cache files out of git, in case you ever use it. |

---

## Step 1: Test the production build locally (optional, ~1 minute)

Stop `npm run dev` first if it's running, since both use the `.nuxt` folder.

```powershell
npm run generate
```

It should end with `You can now deploy .output/public to any static hosting`. To see the
finished site exactly as Cloudflare will serve it:

```powershell
npx serve .output/public
```

Open the URL it prints (usually http://localhost:3000), click around, then press `Ctrl+C`.

## Step 2: Commit and push the deployment setup

From this folder (`D:\Programming Files\My Portfolio\portfolio`):

```powershell
git add -A
```

```powershell
git commit -m "Set up Cloudflare Pages deployment"
```

```powershell
git push origin main
```

If Git asks you to sign in, use the GitHub sign-in window it opens. Afterwards, check
https://github.com/it-cuencojasminemae/portfolio to confirm `DEPLOYMENT.md` and `.node-version` are there.

## Step 3: Create a Cloudflare account

1. Go to https://dash.cloudflare.com/sign-up and sign up (free, no card needed).
2. Verify your email.

## Step 4: Create the Pages project and connect GitHub

1. In the Cloudflare dashboard, open **Workers & Pages** from the left sidebar
   (under **Compute** in newer layouts).
2. Click **Create application**.
3. Choose the **Pages** tab, then **Import an existing Git repository** (it may be labelled
   **Connect to Git**).
   - Cloudflare now promotes Workers first. If you only see Worker options, look for a
     link like *"Looking to deploy Pages? Get started"* at the bottom of the page.
4. Click **Connect GitHub**. A GitHub window opens:
   - Choose your account `it-cuencojasminemae`.
   - Choose **Only select repositories**, pick `portfolio`, and click **Install & Authorize**.
5. Back in Cloudflare, select the `portfolio` repository and click **Begin setup**.

## Step 5: Configure the build

Fill in the **Set up builds and deployments** page:

| Field | Enter |
|---|---|
| **Project name** | Something like `jasmine-cuenco`. This becomes your free URL, `jasmine-cuenco.pages.dev`, and can't be changed later. If the name is taken, Cloudflare adds a random suffix. |
| **Production branch** | `main` |
| **Framework preset** | `Nuxt.js` |
| **Build command** | `npm run generate` *(replace whatever the preset fills in)* |
| **Build output directory** | `.output/public` *(replace whatever the preset fills in)* |
| **Root directory (advanced)** | leave empty (the repo root is the Nuxt project) |

Open **Environment variables (advanced)** and add:

| Variable name | Value |
|---|---|
| `NODE_VERSION` | `22` |

This duplicates `.node-version` on purpose, as a backup.

Click **Save and Deploy**.

## Step 6: Watch the first build

The build log streams on screen and takes about 1–3 minutes. A successful run ends with lines like:

```
Prerendered 56 routes
Generated public .output/public
Success: Your site was deployed!
```

Click the `https://<project-name>.pages.dev` link. Your portfolio is live. 🎉

## Step 7: Check the live site

- [ ] Hero photo, project screenshots and certificate images all load
- [ ] The light/dark toggle works
- [ ] The CV and Resume download buttons open the PDFs
- [ ] Certificate PDFs open
- [ ] `mailto:` buttons open an email app
- [ ] It looks right on your phone
- [ ] A made-up URL (e.g. `/does-not-exist`) shows the 404 page
- [ ] Headers are applied: in Chrome, open DevTools → Network → reload → click the page
      request → *Response Headers* should include `x-frame-options: DENY`

---

## Updating the site later

Every push to `main` deploys automatically:

```powershell
git add -A
```

```powershell
git commit -m "Update projects section"
```

```powershell
git push
```

The new version is live about 2 minutes later. Most content lives in `app/data/portfolio.ts`.

**Preview before going live:** push to any other branch (e.g. `git push origin redesign`) and
Cloudflare builds it at its own preview URL, like `redesign.jasmine-cuenco.pages.dev`,
without touching the live site.

**Undo a bad deploy:** Workers & Pages → your project → **Deployments** → find the last
good deployment → **⋯** → **Rollback to this deployment**.

---

## Optional extras (all free unless noted)

### Custom domain (~$10–15/year for the domain itself)
1. Buy a domain, e.g. through Cloudflare (**Domain Registration → Register Domains**), which
   sells at cost, or from any registrar.
2. Your Pages project → **Custom domains** → **Set up a custom domain** → enter it → follow the DNS prompts.
   If the domain is on Cloudflare, it's one click. HTTPS is automatic.

### Visitor analytics
Your Pages project → **Metrics** → enable **Web Analytics**. It's privacy-friendly and
cookie-free, so no consent banner is needed.

### Social link previews
When you have your final URL, you can add an `ogImage` (an absolute URL to a preview image)
to `useSeoMeta` in `app/pages/index.vue`, so links shared on LinkedIn or Messenger show a picture.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build log says the Node version is too old / `Unsupported engine` | Make sure `NODE_VERSION=22` is set under Settings → Variables and Secrets (for **Production** and **Preview**), then **Retry deployment**. |
| Deploy succeeds but the page is blank or 404 | The output directory is wrong. In Settings → Build → Build configuration, set it to `.output/public` exactly, then redeploy. |
| Build ran `nuxt build` instead of `nuxt generate` | The build command was left as the preset default. Change it to `npm run generate`. |
| Images missing on the live site | Check that `image.provider` is still `'ipx'` in `nuxt.config.ts`, and that the image files are committed in `public/`. |
| `npm ci` fails with a lockfile error | Run `npm install` locally, commit the updated `package-lock.json`, and push. |
| Changes don't show up | Hard-refresh (`Ctrl+Shift+R`). Then check Deployments to confirm the latest commit built successfully. |
