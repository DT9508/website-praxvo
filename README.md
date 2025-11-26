# Praxvo Studio Website

Static marketing website for Praxvo Studio and its Android apps:

- Praxvo Photo Recovery
- Praxvo Voice Changer
- Praxvo Voice Reverse

The site is built with plain HTML, CSS, and minimal JavaScript.

## Structure

- `index.html` – Home
- `apps.html` – All apps listing
- `about.html` – About Praxvo Studio
- `support.html` – Support & contact
- `privacy.html` – Privacy Policy
- `terms.html` – Terms of Use
- `apps/` – Individual app pages
  - `praxvo-photo-recovery.html`
  - `praxvo-voice-changer.html`
  - `praxvo-voice-reverse.html`
- `assets/css/main.css` – Global styles
- `assets/js/main.js` – Navigation and small enhancements
- `assets/img/` – Logos, icons, and screenshots (placeholders to be replaced
  with real assets).

## Running the site

Open `index.html` directly in a browser, or use a simple static server:

```bash
cd "Website Praxvo"
python3 -m http.server 8000
```

Then visit http://localhost:8000 in your browser.
