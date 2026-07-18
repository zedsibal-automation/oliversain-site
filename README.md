# Oliver Sain — AI Automation Specialist Website

A single-page, static, conversion-focused site. Plain HTML/CSS/JS — no build step required.

## Structure
```
index.html      → all page content and section markup
style.css       → design system (colors, type, layout, animation)
script.js       → sticky nav, scroll-spy, mobile menu, reveal animations, form handling
assets/
  headshot.jpg  → About section photo
```

## Before you launch

1. **Calendly** — open `index.html`, find `#calendly-embed` in the `#contact` section, and replace the placeholder `<div class="calendly-placeholder">` block with your real Calendly inline embed code (get it from calendly.com → your event type → Share → Add to Website → Inline Embed). Then add the Calendly widget script right before `</body>`:
   ```html
   <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
   ```

2. **Contact form** — the form currently has `data-netlify="true"`, which works automatically **only if hosted on Netlify**. Since this project is deployed on **Cloudflare Pages**, do one of the following instead:
   - **Easiest:** sign up for [Formspree](https://formspree.io) (free tier available), then set the form's `action` to your Formspree endpoint and remove `data-netlify="true"`.
   - **More control:** write a [Cloudflare Pages Function](https://developers.cloudflare.com/pages/functions/) at `/functions/api/contact.js` that emails submissions to oliversain1217@gmail.com (e.g. via Resend, SendGrid, or Mailchannels), and point the form's `action` at `/api/contact`.
   - Either way, update the `fetch`/submit logic in `script.js` (see the comment inside the `submit` handler) to match your chosen endpoint.

3. **Favicon / social image** — optional, but add a `favicon.ico` and an Open Graph image for nicer link previews.

## Deploying to Cloudflare Pages

1. Push this folder to a new GitHub repository.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, select the repo.
3. Build settings: **Framework preset: None**, **Build command: (leave blank)**, **Build output directory: /**.
4. Deploy. Your site will be live at `https://<project-name>.pages.dev` (e.g. `oliversain.pages.dev`).
5. Every push to the connected branch redeploys automatically.

## Notes
- Colors, type, and section order follow the project brief exactly.
- Respects `prefers-reduced-motion` for users who disable animation.
- Scroll-spy and smooth-scroll are handled without any external library.
