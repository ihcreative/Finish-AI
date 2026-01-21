# Quick Start Guide - Launch Variant Landing Page

## ✅ What's Been Built

Your landing page at `/launch` now supports:

✨ **5 Copy Variants** (default, creator, dev, founder, tiktok)  
📊 **Google Analytics Tracking** (variant view + CTA click events)  
🎨 **Smooth Animations** (entrance effects, hover states)  
📱 **Fully Responsive** (mobile, tablet, desktop)  
🔄 **URL-Based Switching** (via `?v=` query parameter)  
⚡ **Zero Database** (all hardcoded, lightning fast)

---

## 🚀 Getting Started (3 Steps)

### Step 1: Verify the Files
Navigate to:
```
src/components/launch/
├── launch.component.ts   ✅
├── launch.component.html ✅
└── launch.component.css  ✅
```

### Step 2: Start the Dev Server
```bash
ng serve
```

### Step 3: Test the Variants
Open your browser and visit:
- `http://localhost:4200/launch` → Default
- `http://localhost:4200/launch?v=creator` → Creator
- `http://localhost:4200/launch?v=dev` → Dev
- `http://localhost:4200/launch?v=founder` → Founder
- `http://localhost:4200/launch?v=tiktok` → TikTok

---

## 🎯 Key Features Explained

### 1. Variant System
Copy **automatically swaps** based on URL parameter:
```
?v=creator  → "Ship Your Creator Tool. Faster."
?v=dev      → "Stop Building. Start Shipping."
?v=founder  → "Launch Your MVP. Close Your Round."
```

No refresh needed. No CMS. Just URL params.

### 2. Analytics Tracking
Every action fires a GA event with variant name:
```
view_landing_variant { variant: "creator" }  ← Auto on load
cta_click_primary { variant: "creator" }     ← On button click
```

**Set up in GA4:**
1. Create custom dimension: `variant`
2. Add tracking code to your main app `index.html`

### 3. Animations
All elements fade in/slide in with staggered delays:
- Hero text: smooth fade-in from top
- Problem bullets: staggered left-slide
- Cards: scale-in with shadow
- Hover: buttons scale + shadow expand

Respects `prefers-reduced-motion` for accessibility.

---

## 📊 Testing Checklist

Run through each variant and verify:

### Default Variant
```
✓ Headline: "Your App. Actually Finished."
✓ Bullets: Auth, data, payments
✓ CTA: "Get a 24-hour Quote"
```

### Creator Variant (`?v=creator`)
```
✓ Headline: "Ship Your Creator Tool. Faster."
✓ Bullets: Publishing flows, monetization, onboarding
✓ CTA: "Launch Your Creator Tool"
```

### Dev Variant (`?v=dev`)
```
✓ Headline: "Stop Building. Start Shipping."
✓ Bullets: CI/CD, APIs, performance
✓ CTA: "Ship Production Code"
```

### Founder Variant (`?v=founder`)
```
✓ Headline: "Launch Your MVP. Close Your Round."
✓ Bullets: MVP completion, customer deployment, investor traction
✓ CTA: "Finish & Launch Your MVP"
```

### TikTok Variant (`?v=tiktok`)
```
✓ Headline: "Your Idea. Actually Built."
✓ Bullets: Fix broken code, customize no-code, ship fast
✓ CTA: "Ship Your Idea Now"
```

### All Variants
```
✓ No variant param → falls back to default
✓ Invalid param (e.g., ?v=xyz) → falls back to default
✓ Social proof cards visible
✓ FAQ section visible
✓ Bottom CTA section visible
✓ Links work (How It Works, FAQ, Intake)
✓ Animations smooth on page load
✓ Mobile responsive (test on ~375px width)
```

---

## 🎨 Copy Customization

**Want to change copy?** Edit `launch.component.ts`:

```typescript
variants: Record<VariantKey, VariantCopy> = {
  creator: {
    heroHeadline: "Your headline here",
    heroSubhead: "Your subhead here",
    problemBullets: ["Bullet 1", "Bullet 2", "Bullet 3"],
    ctaText: "Your CTA text",
    metaDescription: "Your meta desc"
  }
  // ... other variants
}
```

Changes appear instantly on page load.

---

## 📱 Mobile Testing

Variants fully responsive. Test on:
- iPhone 12 (390px)
- iPhone 14 Pro Max (430px)
- iPad (768px)
- Desktop (1920px)

All animations smooth, no jank.

---

## 🔗 Social Campaign URLs

Share these to test each variant:

**Twitter:**
```
https://yoursite.com/launch?v=dev
"Stop building. Start shipping. 24-72hr deployments."
```

**TikTok:**
```
https://yoursite.com/launch?v=tiktok
"Your idea, actually built 🚀"
```

**LinkedIn:**
```
https://yoursite.com/launch?v=founder
"MVP stuck? We finish it. Close your round faster."
```

**Instagram:**
```
https://yoursite.com/launch?v=creator
"Ship your creator tool in days"
```

---

## 📊 GA4 Setup (Required for Analytics)

### 1. Create Custom Dimension in GA4
- Go to **Admin** → **Custom dimensions**
- Click **Create custom dimension**
- Name: `variant`
- Scope: `Event`
- Save

### 2. Add GA4 Tag to `index.html`
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID');
</script>
```

Replace `G-YOUR-ID` with your GA4 measurement ID.

### 3. View Reports
- Go to **Reports** → **Realtime**
- Click on events
- You'll see `view_landing_variant` with `variant` parameter
- Filter by variant name to see per-audience data

---

## ⚙️ Advanced Customization

### Add a New Variant
1. Open `launch.component.ts`
2. Add variant name to `VariantKey` type
3. Add variant object to `variants` map
4. Done! No template changes needed.

```typescript
type VariantKey = 'default' | 'creator' | 'dev' | 'founder' | 'tiktok' | 'yourvariant';

variants: Record<VariantKey, VariantCopy> = {
  yourvariant: {
    heroHeadline: "...",
    // ...
  }
}
```

### Change Animation Speed
Edit `launch.component.css`:
```css
.hero-headline {
  animation: fadeInDown 0.8s ease-out 0.2s both;
  /* Change 0.8s to 0.5s for faster */
}
```

### Disable Animations
Comment out animations in CSS or add to top of file:
```css
* {
  animation: none !important;
}
```

---

## 🐛 Troubleshooting

### Variant not loading?
1. Check URL: `?v=creator` (lowercase)
2. Check browser console: `F12` → Console tab
3. Verify route works: `http://localhost:4200/launch`

### GA events not firing?
1. Check GA tag is in `index.html`
2. Open browser console: `console.log(window.gtag)`
3. Should return a function, not `undefined`

### Animations stuttering?
1. Try different browser (Chrome, Firefox, Safari)
2. Disable browser extensions
3. Check CPU usage (other processes competing)

### Mobile looks broken?
1. Test at exact viewport sizes (DevTools)
2. Ensure Tailwind CSS is compiled
3. Check `launch.component.css` is imported

---

## 📝 Next Steps

1. **Customize copy** - Edit each variant's headline/bullets in TypeScript
2. **Set up GA4** - Add measurement ID to `index.html`
3. **Create social links** - Use variant URLs in your posts
4. **Monitor analytics** - Check conversion per variant after 1 week
5. **Iterate** - Update copy based on performance data

---

## 📖 Full Documentation

See `LAUNCH_VARIANT_DOCS.md` for:
- Detailed GA4 setup
- SQL queries for analytics
- All animation code
- Performance notes
- Production checklist

---

**You're ready to launch! 🚀**

Questions? Check the comments in `launch.component.ts` for code-level docs.
