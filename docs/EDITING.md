# Keeping Burrito current

## Visual editor

The `.pages.yml` file is ready for Pages CMS. After the owner connects this repository at [Pages CMS](https://pagescms.org), the editor exposes Site settings, Exhibitions, Open calls, Team, Drops, and Journal. Save changes to GitHub and Vercel rebuilds automatically once its Git integration is connected. This is optional: the same files can be edited in GitHub.

## Add an exhibition

Add a record in Exhibitions. Use a stable lowercase hyphenated slug, title, city, year, date, venue, summary, and story paragraphs. Upload a photograph, write an image description, and credit the artist and photographer when known. Add original source URLs, exhibition credits (name and profile URL), partners, and extra gallery images. Keep all list fields present, even if empty. Reorder records to put the latest first.

To feature it on the homepage, set `featuredExhibition` in Site settings to its slug. Use an image for the featured exhibition. Update its status when the event ends; event RSVP is shown only for an upcoming show with an RSVP URL.

## Publish an open call

Create the real submission form first. Add its URL, full brief, fee (including “No fee” where confirmed), rights/usage terms, and deadline with an explicit timezone. Set status to `open` only after checking the form. Use an ISO deadline such as `2027-01-15T23:59:00-05:00` and a human-readable date with timezone. The production check rejects incomplete active calls. Expired links are disabled in the browser and calls move to the closed list on the next build. Mark the call closed and save when it ends so static text stays current too.

The form should collect artist name, contact email, portfolio, work links, work title/medium, short statement, and agreement to the specific exhibition usage terms. Avoid requesting wallet access, private keys, or unrelated personal details. Test the actual confirmation and delivery before announcing the call.

## Team and releases

Maintain the small team list in content/team.json. There is no general artist directory or individual profile system. Artist credits belong inside each exhibition record. Podcast guests link directly to their original profiles.

Drops support a marketplace URL or direct email enquiry. Check availability before adding purchase language. Do not create prices or sales claims from old announcements.

## Journal

Keep original date and byline on historical interviews. Do not silently update old answers to sound current. Add new conversations as new records. Use paragraphs separated by a blank line within each answer.

## Routine publishing check

Review mobile preview, image credits, alt text, dates/timezones, outbound form links, and call status. Keep source links in the content so claims can be checked later. New images belong in `public/images`, not on a temporary social-media host. Existing imported images are already local.

No X API keys are needed. X was used as an editorial source for this migration; the site does not automatically repost or scrape the timeline. Curating new records avoids exposing visitors to feed failures and unreviewed posts.

Team members have a `current` or `previous` status. Mew is listed under Previous team per the owner’s update. Profile images are local WebP files; sources are recorded in team-photo-sources.json. Refresh images deliberately rather than hotlinking X.
