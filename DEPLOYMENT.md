# Deploying to Cloudflare (Workers static assets)

This portfolio is a fully static Nuxt site. `npm run generate` prerenders every page and
optimizes every image at build time, then Cloudflare serves the files from its CDN as
**static assets on Workers**. No server code runs, there's no database, and it's on the free plan
(static asset requests are free and unlimited).

| Setting | Value |
|---|---|
| Repository | `it-cuencojasminemae/portfolio` (GitHub) |
| Project / Worker name | `jasminecuenco` (must match `name` in `wrangler.jsonc`) |
| Production branch | `main` |
| Build command | `npm run generate` |
| Deploy command | `npx wrangler deploy` |
| Static files folder | `.output/public` (set in `wrangler.jsonc`) |
| Node version | `22` (pinned in `.node-version`) |

---

## What is already set up in the repo

| File | Why it's there |
|---|---|
| `wrangler.jsonc` | Tells `wrangler deploy` to upload `.output/public` as static assets under the name `jasminecuenco`, and to serve `404.html` for unknown URLs. |
| `nuxt.config.ts` → `nitro.preset: 'static'` | **Important.** Without it, Nuxt detects Cloudflare's build machine and switches to a server build that skips prerendering, which would leave you with no `index.html`. |
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
git commit -m "Set up Cloudflare deployment"
```

```powershell
git push origin main
```

If Git asks you to sign in, use the GitHub sign-in window it opens. Afterwards, check
https://github.com/it-cuencojasminemae/portfolio to confirm `DEPLOYMENT.md` and `.node-version` are there.

## Step 3: Create a Cloudflare account

1. Go to https://dash.cloudflare.com/sign-up and sign up (free, no card needed).
2. Verify your email.

## Step 4: Create the app and connect GitHub

1. In the Cloudflare dashboard, open **Workers & Pages** from the left sidebar
   (under **Compute** in newer layouts).
2. Click **Create application**.
3. Under **Select a method**, choose **Import a repository** (Continue with GitHub).
4. If asked, connect GitHub: choose your account `it-cuencojasminemae` → **Only select
   repositories** → `portfolio` → **Install & Authorize**.
5. Under **Select a repository**, pick `it-cuencojasminemae/portfolio` → **Next**.

## Step 5: Set up your application

On the **Set up your application** page:

| Field | Enter |
|---|---|
| **Project name** | `jasminecuenco`. **This must match `"name"` in `wrangler.jsonc`.** If you choose another name, change it in `wrangler.jsonc` too, then commit and push before deploying. |
| **Build command** | `npm run generate` *(replace the default `npm run build`)* |
| **Deploy command** | `npx wrangler deploy` *(keep the default)* |
| **Preview command** | keep the default |
| **Enable Preview builds** | on (each non-`main` branch gets its own preview URL) |

If there's an **Advanced settings** section:
- **Path / Root directory**: leave as `/`.
- **Build variables**: add `NODE_VERSION` = `22`. This is a backup for `.node-version`.

Click **Deploy**.

## Step 6: Watch the first build

The build log streams on screen and takes about 1–3 minutes. A successful run includes lines like:

```
[nitro] Prerendered 56 routes
[nitro] Generated public .output/public
✨ Read ... files from the assets directory .../.output/public
Uploaded jasminecuenco
Deployed jasminecuenco triggers
  https://jasminecuenco.<your-subdomain>.workers.dev
```

Open that `workers.dev` link. Your portfolio is live. 🎉 You can also find it later under
Workers & Pages → `jasminecuenco` → **Settings → Domains & Routes**.

> **Using Pages instead?** If you go through the Pages flow ("Looking to deploy Pages?"
> link on the Create page), use build command `npm run generate`, output directory
> `.output/public`, and `NODE_VERSION=22`, with no deploy command. Your URL would be
> `<name>.pages.dev`. Both work. This guide follows the Workers flow because it's what
> Cloudflare shows by default.

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
Cloudflare builds it as a preview version with its own URL (shown in the build log and on
the GitHub commit), without touching the live site.

**Undo a bad deploy:** Workers & Pages → `jasminecuenco` → **Deployments** → find the last
good version → **⋯** → **Rollback** / **Deploy this version**.

---

## Optional extras (all free unless noted)

### Custom domain (~$10–15/year for the domain itself)
1. Buy a domain, e.g. through Cloudflare (**Domain Registration → Register Domains**), which
   sells at cost, or from any registrar.
2. Workers & Pages → `jasminecuenco` → **Settings → Domains & Routes** → **Add → Custom domain**
   → enter it. The domain has to be added to your Cloudflare account first (free plan). HTTPS is automatic.

### Visitor analytics
Cloudflare dashboard → **Analytics & Logs → Web Analytics** → **Add a site** → enter your
URL. It's privacy-friendly and cookie-free, so no consent banner is needed.

### Social link previews
When you have your final URL, you can add an `ogImage` (an absolute URL to a preview image)
to `useSeoMeta` in `app/pages/index.vue`, so links shared on LinkedIn or Messenger show a picture.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build log says the Node version is too old / `Unsupported engine` | Add `NODE_VERSION` = `22` under Settings → Build → **Build variables and secrets**, then retry the build. |
| Build fails with a Worker **name mismatch** | The dashboard project name and `"name"` in `wrangler.jsonc` differ. Make them the same, then commit and push. |
| `wrangler deploy` says the assets directory doesn't exist | The build command is still `npm run build`. Change it to `npm run generate` under Settings → Build. |
| Site shows only the 404 page, or the log mentions `cloudflare-module` | `nitro: { preset: 'static' }` is missing from `nuxt.config.ts`. Put it back and push. |
| Images missing on the live site | Check that `image.provider` is still `'ipx'` in `nuxt.config.ts`, and that the image files are committed in `public/`. |
| `npm ci` fails with a lockfile error | Run `npm install` locally, commit the updated `package-lock.json`, and push. |
| Changes don't show up | Hard-refresh (`Ctrl+Shift+R`). Then check Deployments to confirm the latest commit built successfully. |
