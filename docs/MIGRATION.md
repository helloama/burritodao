# Migration and source record

Reviewed 2 October 2026 through the user’s Chrome session. The WordPress JSON API and unauthenticated command-line page downloads returned 403; public content was recovered from rendered pages instead.

## Recovered

- Homepage story and artist-led positioning.
- Past Events: Super Burrito 366; Miami: Intertwined; Burrito & the Bean; NYC: Burrito Bazaar; ETH Denver: Art on Tap; Miami: Think Less, Vibe More.
- Six interview Q&A archives: DUSTN (Haley, 11 Oct 2022), Artie Handz (Mew, 21 Sep 2022), Danil Pan (Mew, 23 Feb 2022), Max Kulchinsky (Mew, 5 Feb 2022), Cliff (Mew, 18 Jan 2022), emotionull (19 Aug 2021, conversation with MoFY’s Crypto Joe). New introductions and shorter question wording; responses preserved with typographic normalization. Old tweets, sales embeds, comment forms, and duplicated sidebars omitted.
- Team names preserved as historical contributors; old job titles are not represented as current roles.
- Public contact email, Spotify podcast, and Discord link from the collective’s Linktree. The invite resolves to `https://discord.com/invite/Vmg62sn7J4` and visibly shows Burrito Bar; the site now uses that direct invite.
- Three historical guides recovered from Tips & Tricks: How 2 Mint on OP (30 March 2024), Manifold Walkthrough (16 September 2022), and NFTs: How To Get Involved (29 March 2021). These are explicitly labeled archival, with expired-call context and no implication that old platform instructions remain current.

## New verified modules from X

| Item | Source |
| --- | --- |
| NFT NYC ’26, MTG draft, collect.rip sponsorship, Tanarchy video | https://x.com/BurritoDAO/status/2104652050793718022 |
| Nygilia / Night Walker Paradox 004 at Lume | https://x.com/BurritoDAO/status/2102902425124266253 |
| Desultor at NYC 2026 | https://x.com/BurritoDAO/status/2100236624864879060 |
| MTG proxy preview, emotionull artwork | https://x.com/BurritoDAO/status/2090469155526815979 |
| Dérailler recap, Jet Williams, Max Dona, 11 photographers | https://x.com/BurritoDAO/status/2074659669058998672 |
| Paris photo walk | https://x.com/BurritoDAO/status/2074659687774003294 |
| Paris venue and July 4 date | https://x.com/BurritoDAO/status/2068144142392135724 |
| Paris open-call requirements | https://x.com/BurritoDAO/status/2069197766379659493 |
| Return to Form live release | https://x.com/BurritoDAO/status/1988691363693793452 |
| Return to Form event recap | https://x.com/BurritoDAO/status/1990561901630361604 |
| More than 20 participating artists | https://x.com/BurritoDAO/status/1984989749111910618 |
| Rarible collection URL | https://x.com/BurritoDAO/status/1988691367284130080 |

Posts are curated sources, not a live feed. An earlier Return to Form announcement said November 10; the later live announcement is November 12. The site uses the later source. The November 17 recap describes the preceding Saturday, November 15, 2025.

## Images

Images are stored locally, using media URLs observed directly in posts. Nygilia’s artwork is credited by name and title; Desultor’s photograph is identified as work from the exhibition. Return to Form’s photo shows MP’s “safehouse.” The Paris lead image is an event poster, not a documentary photograph. The card preview is credited to emotionull. Unknown photographer names are not invented.

The six older event photographs were referenced on the old page but were not recovered as usable local assets. Those entries use intentional type-only archive cards; no stock photography is substituted. Additional originals can be added through the editor.

## Redirects and cutover

`vercel.json` maps main legacy pages and six interview slugs to their replacements. Preserve the misspelled original Max Kulchinksy URL as a redirect. The old ETH Denver submission link points to the completed event.

The legacy Articles page is visibly broken and prints WordPress shortcodes. Legacy Art Drops renders no content. Their replacements are rebuilt indexes populated from verified sources.

Before retiring WordPress entirely, retain a host backup/export of its database and uploads. The three recovered minting tutorials are preserved as historical text, not current guidance. Uncrawled category/archive pages and missing media may remain in the old database. Do not delete the old host’s only copy of that material.

## Editorial details to enrich

- Complete participant lists and artist-approved bios for each show.
- Original high-resolution photographs and photographer credits for older events.
- Exact NFT NYC 2026 exhibition day (the recovered September recap confirms completion, not the event day).
- Super Burrito 366 year: original archive says 2023 while its image path is dated 2024; the site explicitly preserves the legacy year rather than silently correcting it.
- Current team roles, current newsletter provider, and next confirmed open call.
- Direct permanent Discord invite if replacing the Linktree short link.

Do not label the closed Paris/NYC calls as open, invent deadline dates, assume a token or governance program, or promise submission fees/rights that have not been supplied.


## October 3 update

- Replaced placeholder branding with the three supplied Burrito logos. Mint #81D8AF comes from the official Linktree page.
- Replaced the artist directory with an 11-person team list from the archived team page. Old artist routes redirect to /team/. Individual artist profiles are intentionally removed.
- Recovered 122 podcast records from https://anchor.fm/s/b534e9b8/podcast/rss.
- Added Oculus: Digital Visions, June 27, 2025, and its original poster from https://luma.com/nftnyc2025.
- Recovered 29 credited artworks from Return to Form’s Rarible item metadata. Images are compressed local previews; artist ownership and original marketplace links remain visible.
- Added Miami and Chicago credits from Burrito’s original X announcements. Corrected Super Burrito 366 to March 5, 2024 using the dated announcement.
- The Luma profile does not expose its other event URLs publicly; no Partiful event was verified. Those records have not been invented.
- CMS configuration is supplied; connecting Pages CMS still requires the owner’s setup.
