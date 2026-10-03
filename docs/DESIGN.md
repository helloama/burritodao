# Design and strategy

## Information architecture

| Page | Role | Main action |
| --- | --- | --- |
| Home | A living introduction to the work and people | See the latest exhibition |
| Exhibitions | City/year archive and individual show pages | Explore a show |
| Open calls | Active opportunities, briefs, and closed-call archive | Submit work when a verified call is open |
| Team | The people behind the collective | Follow the team |
| Drops & objects | Digital collections and physical products | Visit the release or enquire |
| Journal | Artist interviews and podcast | Read/listen |
| About | Story, approach, and historical contributors | Meet/work with the collective |
| Contact / partner | Event, exhibition, and collaboration enquiries | Prepare an email |

Detail pages are generated from content. Privacy and a helpful 404 complete the shell. The current homepage promotes a completed exhibition as “latest,” never as currently running.

## Homepage wireframe

1. Quiet identity strip, wordmark, navigation, Submit work.
2. Two-column hero: “For artists. By artists.” alongside a fully credited exhibition image. Mobile stacks text and art. Primary action: See the latest exhibition; secondary: Submit work.
3. Cities: a compact signal of the collective’s physical reach.
4. Three recent exhibition cards: NYC 2026, Dérailler Paris, Return to Form.
5. Short collective statement: “We met through art. We stayed for the people.”
6. A compact invitation to meet the team.
7. Open-call panel with honest status and community route when no call is open.
8. Artist-made objects: MTG proxy cards, linked to release detail.
9. Partnership invitation.
10. Community footer: Discord, X, podcast, contact.

## Headline options

- For artists. By artists. (Selected; preserve the recognizable brand line.)
- Art brings us together. We make room for it.
- Good art. Good people. A place to meet.

## Visual direction

Soft paper #F5F8F3, deep green ink #102B20, green #176743, and Burrito’s Linktree mint #81D8AF. Large Helvetica/Arial headlines, narrow tracking, small uppercase wayfinding and captions. No remote font request. Supplied Burrito wordmark and globe logos, with occasional burrito language; the work has visual priority.

Editorial hierarchy on the homepage, quiet grids for browsing, full artwork proportions on detail pages. Artwork is contained rather than arbitrarily cropped. No mock art is presented as an artist’s work. Earlier shows without recovered images use explicit typographic archive cards.

Small hover movements only; no autoplay or scrolling hijacks. Reduced-motion support, visible focus, semantic headings, a skip link, real labels, mobile menu with Escape handling, and large controls.

## Core copy

Hero: “Art brings us together. We make room for it. Exhibitions, releases, and good reasons to meet.”

About: “Four friends met through art online. Burrito grew from there. We bring artists together to show work, share ideas, and make things happen—in galleries, on screens, and around the same table.”

What we do: “We curate shows. Put art into the world. Hand artists the mic. And bring people into the room.”

Open calls: “Got something to share? Each call has its own brief. Check the details, send your work, and meet us there.”

Partners: “A space for a show. An idea for a collaboration. A room full of artists. We’d love to hear about it.”

## Build components

- Shared navigation/mobile menu, quiet footer, metadata, skip link.
- Page intro, editorial hero, section header, CTA and status badge.
- Exhibition card, city/year filter, show detail, image gallery, artist credits, partner list.
- Artist card/profile, related-show links, journal link.
- Open-call card with brief, deadline/timezone, format, rights, fees, source, and submission URL. Closed calls are archives, never fake active forms.
- Submission form pattern for the chosen provider: name, email, artist URL, work links, title/medium, short statement, technical specifications, and explicit agreement to the call’s usage terms. Request only what is needed; provide confirmation and an error/retry state. Do not require a wallet to submit.
- Drop/product card and detail, marketplace link or availability enquiry.
- Interview index/detail and podcast block.
- Event RSVP action, rendered only for upcoming exhibitions with a real URL.
- Email-draft enquiry form with validation and clipboard fallback.
- Discord/X community panel. A future newsletter module needs a real provider, consent text, working confirmation, and unsubscribe handling before publication.
