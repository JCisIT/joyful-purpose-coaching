# Joyful Purpose Coaching

Astra Fox's website. Plain HTML, CSS and a little JavaScript. No framework.

## Change something

- **Page wording**: `src/pages/` (one file per page).
- **Header, footer, menu links**: `build.mjs`.
- **Colors, fonts, layout**: `site-assets/css/site.css`.
- **Photos**: `site-assets/img/`.

## Preview it

```bash
node build.mjs
```

This writes the finished site to `dist/`. Open `dist/index.html`, or serve the folder.

## How it goes live

Every push to `main` builds and publishes to GitHub Pages through `.github/workflows/deploy.yml`. Live at `www.joyfulpurposecoaching.com`; the app is at `app.joyfulpurposecoaching.com`. DNS is managed in Squarespace Domains.

## What it connects to

- **Booking**: Calendly pop-ups (`calendly.com/astrafox/...`).
- **Client Login**: the Cosmic Weather app (`cosmic-weather` repo).
- **Contact form**: saves to the `contact_messages` table in the `cosmic-weather` Supabase project. Visitors can send; only admins can read.
- **Shop**: product buttons open the Squarespace store at its built-in address (`cobalt-spinach-m52l.squarespace.com`), which keeps working after the domain moves. Replace these links before cancelling Squarespace.

## Still to do

1. Email Astra when a contact message arrives (they are only stored for now).
2. Move the shop off Squarespace (Stripe payment links).
3. Cancel the Squarespace website plan once the shop has moved (keep the domain registration).

`mockups/` holds the early design options and is not part of the live site.
