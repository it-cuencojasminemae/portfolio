# Deploying to Cloudflare Pages

This portfolio is a fully static Nuxt site. `npm run generate` prerenders every page and
optimizes every image at build time, then Cloudflare Pages serves the files from its CDN.
No server, no database, free plan (unlimited requests and bandwidth).

**Live at:** https://jasminecuenco.pages.dev

| Setting | Value |
|---|---|
| Repository | `it-cuencojasminemae/portfolio` (GitHub) |
| Pages project name | `jasminecuenco` |
| Production branch | `main` |
| Framework preset | `Nuxt.js` |
| Build command | `npm run generate` |
| Build output directory | `.output/public` |
| Node version | `22` (pinned in `.node-version`, plus the `NODE_VERSION` variable) |

---

## What is set up in the repo

| File | Why it's there |
|---|---|
| `nuxt.config.ts` → `nitro.preset: 'static'` | **Important.** Without it, Nuxt detects Cloudflare's build machine and may switch to a server build that skips prerendering, which would leave you with no `index.html`. |
| `nuxt.config.ts` → `image.provider: 'ipx'` | Makes images get resized and converted to WebP during the build and shipped as plain files, so no paid image service is needed. |
| `.node-version` | Tells Cloudflare's build machine to use Node 22. Nuxt 4 needs Node 20 or newer. |
| `public/_headers` | Cloudflare reads this file and adds security headers to every page, plus long-term caching for `/_nuxt/*` (hashed JS/CSS) and `/_ipx/*` (optimized images). |
| `package.json` → `engines` | States the minimum Node version. |

There is deliberately **no** `wrangler.jsonc`/`wrangler.toml`. Pages is configured in the dashboard.

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

Open the URL it prints, click around, then press `Ctrl+C`.

## Step 2: Remove the old Worker (one-time)

The site was first deployed as a Worker (`jasminecuenco.it-cuencojasminemae.workers.dev`).
Delete it first. That frees the `jasminecuenco` name for Pages and stops the Worker from
rebuilding on every push.

1. **Workers & Pages** → click **`jasminecuenco`** (the Worker).
2. **Settings** → scroll to the bottom → **Delete** → type the name to confirm.

## Step 3: Push the repo changes

```powershell
git add -A
```

```powershell
git commit -m "Switch deployment to Cloudflare Pages"
```

```powershell
git push
```

## Step 4: Create the Pages project

1. In the Cloudflare dashboard, open **Workers & Pages**.
2. Click **Create application**.
3. Cloudflare shows the **Workers** setup first. Look for the **Pages** option instead:
   - a **Pages** tab at the top of the Create page, **or**
   - a link near the bottom such as *"Looking to deploy Pages? Get started"*.
4. Choose **Import an existing Git repository** (or **Connect to Git**).
5. Select GitHub account `it-cuencojasminemae` → repository **`portfolio`** → **Begin setup**.
   - If `portfolio` isn't listed, click the link to configure the GitHub app and give it access to that repo.

## Step 5: Configure the build

On **Set up builds and deployments**:

| Field | Enter |
|---|---|
| **Project name** | `jasminecuenco`. This becomes `jasminecuenco.pages.dev` and can't be changed later. If it's taken, Cloudflare adds a suffix (e.g. `jasminecuenco-abc.pages.dev`), so pick a different name if you don't like the result. |
| **Production branch** | `main` |
| **Framework preset** | `Nuxt.js` |
| **Build command** | `npm run generate` *(replace whatever the preset fills in)* |
| **Build output directory** | `.output/public` *(replace whatever the preset fills in)* |
| **Root directory (advanced)** | leave empty |

Under **Environment variables (advanced)** → **Add variable**:

| Variable name | Value | Encrypt? |
|---|---|---|
| `NODE_VERSION` | `22` | No, plain text is fine. It isn't a secret. |

Click **Save and Deploy**. The build takes about 1–3 minutes and should show:

```
[nitro] Prerendered 56 routes
[nitro] Generated public .output/public
Success: Your site was deployed!
```

Then open **https://jasminecuenco.pages.dev**. 🎉

## Step 6: Check the live site

- [ ] Hero photo, project screenshots and certificate images all load
- [ ] The light/dark toggle works
- [ ] The CV and Resume download buttons open the PDFs
- [ ] Certificate PDFs open
- [ ] `mailto:` buttons open an email app
- [ ] It looks right on your phone
- [ ] A made-up URL (e.g. `/does-not-exist`) shows the 404 page

---

## Updating the site later

Every push to `main` redeploys automatically:

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
Pages builds it at `redesign.jasminecuenco.pages.dev`, without touching the live site.

**Undo a bad deploy:** Workers & Pages → `jasminecuenco` (Pages) → **Deployments** → find the
last good deployment → **⋯** → **Rollback to this deployment**.

---

## Optional extras

### Custom domain (~$10–15/year for the domain itself)
1. Buy a domain, e.g. through Cloudflare (**Domains → Register**), which sells at cost.
2. Pages project → **Custom domains** → **Set up a custom domain** → enter it → confirm the DNS
   record. HTTPS is automatic.

### Visitor analytics (free)
Pages project → **Metrics** → enable **Web Analytics**. It's privacy-friendly and cookie-free,
so no consent banner is needed.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build log says the Node version is too old / `Unsupported engine` | Check `NODE_VERSION=22` under Settings → **Variables and Secrets** (Production and Preview), then **Retry deployment**. |
| Deploy succeeds but the page is blank or 404 | The output directory is wrong. Settings → **Build** → set it to `.output/public` exactly, then redeploy. |
| Build ran `nuxt build` instead of `nuxt generate` | Change the build command to `npm run generate`. |
| Site shows only the 404 page, or the log mentions `cloudflare-pages` / `cloudflare-module` presets | `nitro: { preset: 'static' }` is missing from `nuxt.config.ts`. Put it back and push. |
| Images missing | Check that `image.provider` is still `'ipx'` in `nuxt.config.ts` and that the files are committed in `public/`. |
| `npm ci` fails with a lockfile error | Run `npm install` locally, commit the updated `package-lock.json`, and push. |
| Changes don't show up | Hard-refresh (`Ctrl+Shift+R`). Then check Deployments to confirm the latest commit built successfully. |
