# CatCoach public website

A static site with no build dependencies. Contact: zhouss1120@gmail.com.

Production hosting uses Cloudflare Pages in the CatCoach Cloudflare account, project `catcoach`. Deploy only the public HTML, CSS, `assets/`, `_worker.js`, `_routes.json` and `wrangler.toml` files from a staging directory; do not upload source credentials or the iOS project. From `API/`, use the pinned Wrangler CLI:

```sh
node node_modules/wrangler/bin/wrangler.js pages deploy /path/to/public-staging --cwd /path/to/public-staging --project-name catcoach --branch main
```

The production API is available at `https://catcoach-bos.pages.dev/api`. Pages forwards only `/api/*` to `catcoach-api` through its private `CATCOACH_API` service binding; static pages bypass Functions. The model and API secrets remain on the API Worker.

## Publish automatically from GitHub

Create a dedicated repository such as `catcoach-site` and put the contents of this directory at its root, including `.github/` and `.nojekyll`. Never upload the iOS project, `.p8` files or backend secrets to that repository.

To keep the existing public URLs and API binding, set these repository Actions variables and secret:

| Type | Name | Value |
| --- | --- | --- |
| Variable | `CATCOACH_SITE_HOST` | `cloudflare` |
| Variable | `CLOUDFLARE_ACCOUNT_ID` | `2c352cc1157363070b38d4232b274ab4` |
| Secret | `CLOUDFLARE_API_TOKEN` | A token with Pages Edit access for this account |

Pushing `main` runs `cloudflare.yml` and updates `https://catcoach-bos.pages.dev/`. Only the public site files and API service binding are deployed. The model/API secrets stay on the existing Worker; they are not needed in GitHub.

For GitHub Pages hosting instead, leave `CATCOACH_SITE_HOST` unset and select Settings → Pages → GitHub Actions. `pages.yml` deploys the static pages, excluding the Cloudflare API forwarding code. Update the website hosting provider in `privacy.html` and the app's bundled `LegalCopy.privacy`, then set the actual GitHub Pages URL in the app with the command below. The API remains hosted on Cloudflare.

All navigation uses relative `.html` URLs and works under a repository subpath. Public pages:

- `index.html` — landing page, contact email, privacy and terms links
- `privacy.html` — privacy policy
- `terms.html` — terms of service
- `auto-renewal.html` — subscription terms

After deployment, run the main project's `tools/configure_public_site.py --base-url https://catcoach-bos.pages.dev/`. This updates the app's shared public URL configuration and App Store metadata. Do not use an example URL as the real privacy URL.

Preview locally: `python3 -m http.server 8080 --directory website` from the main project root, or run `python3 -m http.server 8080` inside this directory.

## Artwork and current flow (2026-10-25)

All public pages use the approved original A4 window-cat icon. The hero reuses the app’s window scene; the three WebP previews derive from the approved App Store question, roadmap and progress panels. The roadmap preview excludes paid task steps. CatCoach supports iPhone and iPad; local records do not automatically sync. Settings contains membership, reminders and legal links. Individual cat records can be deleted in My Cats; deleting the app removes all local records. Per-round processing is explained beside generation, with an on-device alternative.
