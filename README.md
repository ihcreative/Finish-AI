<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1woY-icaxDr7XmNN_b7FdXSIHMXTH98dF

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## SEO usage

- **Global defaults**: `SeoService` is wired in `AppComponent` to set site-wide title, description, Open Graph, Twitter card and basic JSON-LD.
- **Per-page meta**: Import `SeoService` and call `seo.updateMeta({ title, description, image, url, structuredData })` in a component's `ngOnInit()` to override defaults for that route.

Files:
- `src/app/seo.service.ts`: global SEO helper
- `src/app.component.ts`: sets defaults on app init
- Example: `src/components/pricing/pricing.component.ts` shows per-page usage
