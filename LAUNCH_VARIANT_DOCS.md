# Landing Page Variant System - Documentation

## Overview
This is a complete variant testing landing page system for **Finish AI**. The page uses URL query parameters to display different copy variants to test which messaging resonates best with different audiences.

## How It Works

### URL Parameters
Base URL: `http://localhost:4200/launch`

Variants via `?v=` query parameter:
- `/launch` → **default** (broad appeal)
- `/launch?v=creator` → **creator** (content creators)
- `/launch?v=dev` → **dev** (developers)
- `/launch?v=founder` → **founder** (entrepreneurs)
- `/launch?v=tiktok` → **tiktok** (social-first audience)

### What Changes Per Variant
✅ Hero headline  
✅ Hero subheading  
✅ 3 problem bullets  
✅ Primary CTA button text  
✅ Page title & meta description (SEO)  

❌ Layout, design, and structure remain identical  
❌ Navigation, footer, and secondary elements stay the same

## Variant Copy Breakdown

### Default
- **Headline:** "Your App. Actually Finished."
- **Subhead:** General productivity + speed angle
- **Bullets:** Auth, data, payments technical focus
- **CTA:** Get a 24-hour Quote

### Creator
- **Headline:** "Ship Your Creator Tool. Faster."
- **Subhead:** Audience building + monetization focus
- **Bullets:** Publishing flows, monetization, onboarding
- **CTA:** Launch Your Creator Tool

### Dev
- **Headline:** "Stop Building. Start Shipping."
- **Subhead:** Engineering + deployment angle
- **Bullets:** CI/CD, APIs, performance
- **CTA:** Ship Production Code

### Founder
- **Headline:** "Launch Your MVP. Close Your Round."
- **Subhead:** Launch speed + fundraising readiness
- **Bullets:** MVP completion, customer deployment, investor traction
- **CTA:** Finish & Launch Your MVP

### TikTok
- **Headline:** "Your Idea. Actually Built."
- **Subhead:** Casual, action-oriented tone
- **Bullets:** Fix broken code, customize no-code, ship this week
- **CTA:** Ship Your Idea Now

## Google Analytics Tracking

### Events Tracked

#### 1. Variant View Event
**Event Name:** `view_landing_variant`  
**Parameter:** `variant` = (creator | dev | founder | tiktok | default)

Fires automatically on page load when the variant is detected.

```typescript
// Example GA4 event
gtag('event', 'view_landing_variant', {
  variant: 'creator'
});
```

#### 2. CTA Click Events
**Event Names:**
- `cta_click_primary` (main green button)
- `cta_click_secondary` (secondary button)
- `cta_click_final` (bottom CTA)

**Parameter:** `variant` = (current variant)

```typescript
// Example GA4 event
gtag('event', 'cta_click_primary', {
  variant: 'creator'
});
```

### GA4 Setup
Add the following custom dimensions in GA4 Console:
1. Create custom dimension: `variant`
2. Scope: Event
3. Events: `view_landing_variant`, `cta_click_primary`, `cta_click_secondary`, `cta_click_final`

### Analytics Dashboard Queries
```
// Traffic by variant
SELECT variant, COUNT(*) as views
FROM events
WHERE event_name = 'view_landing_variant'
GROUP BY variant;

// Conversion by variant
SELECT variant, COUNT(*) as cta_clicks
FROM events
WHERE event_name = 'cta_click_primary'
GROUP BY variant;

// Conversion rate per variant
SELECT 
  variant,
  COUNTIF(event_name = 'cta_click_primary') / COUNTIF(event_name = 'view_landing_variant') as conversion_rate
FROM events
WHERE variant IS NOT NULL
GROUP BY variant;
```

## Testing the Variants

### Local Testing
```bash
# Start the dev server
ng serve

# Navigate to each variant
http://localhost:4200/launch
http://localhost:4200/launch?v=creator
http://localhost:4200/launch?v=dev
http://localhost:4200/launch?v=founder
http://localhost:4200/launch?v=tiktok
```

### Browser Console Test
Open Developer Tools (F12) and run:
```javascript
// Check current variant
console.log('Current variant:', document.querySelector('.variant-badge span').textContent);
```

### QA Checklist
- [ ] Each variant loads correct headline
- [ ] Each variant loads correct subhead
- [ ] All 3 problem bullets display correctly
- [ ] CTA button text matches variant
- [ ] Page title changes per variant
- [ ] Meta description updates per variant
- [ ] GA event fires on page load
- [ ] GA event fires on CTA clicks
- [ ] Unknown variant param falls back to 'default'
- [ ] No variant param falls back to 'default'
- [ ] Animations smooth on all browsers
- [ ] Mobile responsive on all variants
- [ ] Links (How It Works, FAQ) navigate correctly

## Animations & UX

All elements have smooth **entrance animations**:
- Hero headline: fade-in from top (0.2s delay)
- Hero subhead: slide-up (0.3s delay)
- Problem bullets: staggered slide-left (0.1s stagger)
- CTA buttons: slide-up (0.4s delay)
- Social proof cards: scale-in (0.7s-0.9s delay)
- FAQ items: slide-right (1.0s-1.2s delay)

**Hover effects** on all interactive elements:
- CTA buttons: scale up + shadow
- Cards: shadow + border highlight
- FAQ items: slide-right on hover

**Reduced motion support**: Respects `prefers-reduced-motion` system preference

## Files Structure

```
src/components/launch/
├── launch.component.ts       # Variant logic + GA tracking
├── launch.component.html     # Template with all sections
└── launch.component.css      # Animations + styles
```

## Key Code Features

### Variant Selection Logic (TypeScript)
```typescript
selectVariant(variant: string | undefined): void {
  const validVariants: VariantKey[] = ['default', 'creator', 'dev', 'founder', 'tiktok'];
  this.currentVariant = (validVariants.includes(variant as VariantKey) ? variant : 'default') as VariantKey;
  
  // Render copy from object
  const copy = this.variants[this.currentVariant];
  this.heroHeadline = copy.heroHeadline;
  this.heroSubhead = copy.heroSubhead;
  // ... etc
}
```

### GA Tracking (TypeScript)
```typescript
trackVariantView(): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'view_landing_variant', {
      variant: this.currentVariant,
    });
  }
}
```

## Social Media Campaign Setup

### Example URLs for Social Posts

**Twitter/X (Dev audience):**
```
https://yoursite.com/launch?v=dev
Post: "Stop building. Start shipping. 24-72hr production deployments."
```

**TikTok (Creator audience):**
```
https://yoursite.com/launch?v=creator
Post: "Ship your creator tool in days, not months 🚀"
```

**LinkedIn (Founder audience):**
```
https://yoursite.com/launch?v=founder
Post: "MVP stuck? We finish it in 72hrs. Close your round faster."
```

**Instagram (General audience):**
```
https://yoursite.com/launch?v=tiktok
Post: "Turn your app idea into reality"
```

## Extending the System

### Add a New Variant
1. Add variant name to `VariantKey` type:
   ```typescript
   type VariantKey = 'default' | 'creator' | 'dev' | 'founder' | 'tiktok' | 'yourvariant';
   ```

2. Add variant to `variants` object:
   ```typescript
   yourvariant: {
     heroHeadline: "...",
     heroSubhead: "...",
     problemBullets: ["...", "...", "..."],
     ctaText: "...",
     metaDescription: "...",
   }
   ```

3. No HTML/CSS changes needed—new variant auto-appears in logic!

## Performance Notes
- **Zero database queries** → All copy is hardcoded (instant load)
- **Lightweight GA tracking** → Uses standard gtag()
- **CSS animations optimized** → Using `transform` and `opacity` (GPU-accelerated)
- **OnPush change detection** → Component only re-renders when variant changes

## Troubleshooting

### Variant not loading
- Check URL param syntax: `?v=creator` (lowercase)
- Check browser console for errors
- Verify GA tag is loaded on page

### GA events not firing
- Ensure Google Analytics is initialized in main app
- Check `window.gtag` exists: `console.log(window.gtag)`
- Verify GA property ID in script tag

### Animations not smooth
- Check browser supports CSS animations (all modern browsers)
- Verify `launch.component.css` is imported in component
- Test on different devices for performance

## Production Checklist
- [ ] GA4 property set up with custom dimensions
- [ ] UTM parameters added to social links
- [ ] All variant copy proofread
- [ ] Mobile animations tested
- [ ] Fallback for missing GA gracefully handled
- [ ] Analytics dashboard configured for variant tracking
- [ ] Social media links updated with campaign URLs
- [ ] A/B test duration decided (e.g., 2 weeks per variant)
- [ ] Success metrics defined (e.g., 10% CTA conversion = win)

---

**Questions?** Check the inline comments in `launch.component.ts` for detailed explanations of each section.
