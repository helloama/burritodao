# Burrito — For artists. By artists.

An art-first, static Astro website for the Burrito collective. Built for Vercel, with local images, accessible navigation, a filterable exhibition archive, and six recovered artist interviews.

## Develop

Use Node 24. Run `npm ci`, then `npm run dev`. Production: `npm run build && npm run check`. Preview: `npm run preview`.

## Edit content without changing layouts

All exhibitions, artist profiles, drops, interviews, open calls, and global links live in `content/*.json`. `.pages.yml` provides a visual editing interface through [Pages CMS](https://pagescms.org). The repository owner must connect the GitHub repository to Pages CMS to activate that interface. No CMS account or permissions have been created by the build.

See [the editing guide](docs/EDITING.md), [design and information architecture](docs/DESIGN.md), and [migration/source notes](docs/MIGRATION.md).

## Deploy to Vercel

Import `helloama/burritodao`. Framework: Astro. Build: `npm run build && npm run check`. Output: `dist`. Node: 24.x. No environment variables or server adapter are needed. `vercel.json` supplies redirects and headers. Vercel’s Git integration rebuilds after content edits are committed.

Inspect the Vercel URL before assigning burritodao.com. Keep existing email/MX records when changing website DNS. Canonical URLs and the sitemap use burritodao.com; use redirects for any secondary domain you own.

## Contact and submissions

Contact prepares an email draft; it does not silently submit or store enquiries. Open calls link to a real external submission form only when an editor supplies one and marks the call open. Historical calls remain closed. There is no invented current exhibition, fake newsletter signup, wallet connection, or checkout.

## Validation

`npm run check` checks built pages for missing local links/images, invalid content relationships, duplicate slugs, missing metadata, missing image descriptions, and unsafe/incomplete active-call data. The build must finish first.
