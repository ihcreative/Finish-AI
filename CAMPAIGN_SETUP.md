# Social Media Campaign Setup Guide

## Campaign URLs by Platform

### Twitter/X (Developers & Tech Audience)
**URL:** `https://yoursite.com/launch?v=dev`

**Post Template:**
```
Stop building. Start shipping.

Your code works locally. We make it production-ready 
in 24-72 hours: deploy pipelines, API integrations, 
performance tuning.

Quote in 24 hours. Ship in days.
[Link: yoursite.com/launch?v=dev]
```

**Expected Audience:** Developers, CTOs, Tech founders
**Best Time to Post:** 9-10 AM EST (when devs check Twitter)
**CTA Target:** cta_click_primary

---

### TikTok (General / Creator Audience)
**URL:** `https://yoursite.com/launch?v=tiktok`

**Video Script (30-60 seconds):**
```
[0-5s] Show frustrated person coding
"You coded something awesome..."

[5-10s] Show broken features
"...but half of it's broken."

[10-20s] Show FINISH branding
"We fix it. Fast."

[20-30s] Show finished product deploying
"Ship this week."

[30-60s] Show launch celebration + CTA
"Your idea, actually built.
Link in bio → ship now"
```

**Expected Audience:** Creators, Non-technical founders, General
**Best Time to Post:** 6-9 PM EST (when TikTok users are active)
**CTA Target:** cta_click_primary
**Hashtags:** #startup #shipping #nocode #buildinpublic

---

### LinkedIn (Founders & Business)
**URL:** `https://yoursite.com/launch?v=founder`

**Post Template:**
```
Launch Your MVP. Close Your Round.

Every day your unfinished app sits in production costs 
you users and investor confidence.

We get you to market in 24-72 hours. Fast enough to fundraise.

✓ MVP stuck at 80%? We finish the last mile.
✓ Customers waiting? Deploy now, iterate later.
✓ Investors asking? We help you prove traction.

Production-ready. Fully tested. Deployed.

[Link: yoursite.com/launch?v=founder]

#Startup #MVP #Fundraising #ShuttingFast
```

**Expected Audience:** Founders, CEOs, Business leaders
**Best Time to Post:** 8-9 AM EST (commute/morning coffee)
**CTA Target:** cta_click_primary
**Post Format:** Text + single hero image

---

### Instagram (Creators & Influencers)
**URL:** `https://yoursite.com/launch?v=creator`

**Post Template:**
```
Caption:
"Ship Your Creator Tool. Faster.

Get your app polished, monetized, and in your 
audience's hands. No more half-baked launches.

✓ Publishing flows dropping users? Fixed.
✓ Monetization broken? Enabled.
✓ Onboarding confusing? Streamlined.

We launch creators. Fast.

Link in bio: yoursite.com/launch?v=creator

#CreatorEconomy #Shipping #SaaS #CreatorTools"

Post: Carousel or video (3 slides)
Slide 1: Creator frustrated with unfinished app
Slide 2: FINISH team working
Slide 3: Happy creator launching with CTA button
```

**Expected Audience:** Content creators, Solo entrepreneurs
**Best Time to Post:** 7-9 PM EST
**CTA Target:** cta_click_primary

---

### Email Campaign
**Subject Lines:**

**For Creators:**
```
Subject: Ship your creator tool in days (not months)
Body: "Your app is 80% done. We finish it. See how → [v=creator]"
```

**For Developers:**
```
Subject: Stop building, start shipping
Body: "Your code works locally. Production-ready in 72 hours. Quote is free → [v=dev]"
```

**For Founders:**
```
Subject: Launch your MVP this week?
Body: "Close your round faster. Get production-ready in 24-72 hours → [v=founder]"
```

---

## Campaign Tracking Setup

### UTM Parameters
Add these to your URLs for additional tracking:

**Twitter Campaign:**
```
https://yoursite.com/launch?v=dev&utm_source=twitter&utm_medium=social&utm_campaign=dev_launch
```

**TikTok Campaign:**
```
https://yoursite.com/launch?v=tiktok&utm_source=tiktok&utm_medium=social&utm_campaign=tiktok_launch
```

**LinkedIn Campaign:**
```
https://yoursite.com/launch?v=founder&utm_source=linkedin&utm_medium=social&utm_campaign=founder_launch
```

**Instagram Campaign:**
```
https://yoursite.com/launch?v=creator&utm_source=instagram&utm_medium=social&utm_campaign=creator_launch
```

### GA4 Custom Report
Create a new report to view:
- **Traffic by variant** (v= parameter)
- **Traffic by source** (utm_source)
- **Conversion by variant**
- **Cost per acquisition by variant** (if paid ads)

---

## A/B Testing Timeline

### Week 1: Default Variant
- Run all channels with `?v=default` or no variant
- Establish baseline metrics
- Monitor analytics

### Week 2-3: Creator Variant
- Run LinkedIn & Instagram with `?v=creator`
- Keep Twitter on default
- Compare conversion rates

### Week 4-5: Dev Variant
- Run Twitter & Dev communities with `?v=dev`
- Run TikTok with `?v=tiktok`
- Compare conversion rates

### Week 6-8: Winner Rotation
- 70% traffic to top-performing variant
- 30% traffic to secondary variant
- Iterate copy based on feedback

---

## Metrics to Track

### Primary Metrics
- **View Conversion Rate** = (CTA clicks / variant views) × 100
- **Audience Quality** = CTA conversion rate by variant
- **Best Performer** = variant with highest conversion rate

### Secondary Metrics
- **Time on Page** = time before CTA click (lower is better)
- **Device Breakdown** = mobile vs desktop conversion
- **Geographic Performance** = variant performance by region

### Success Benchmarks
- **Target CTA Conversion:** 10%+
- **Email Open Rate:** 25%+
- **Social Engagement:** 2%+ click-through

---

## Paid Ads Setup

### Facebook/Instagram Ads
Create 5 ad variations:
1. **Default** - broad appeal messaging
2. **Creator** - "Ship your creator tool"
3. **Dev** - "Production-ready code"
4. **Founder** - "Launch & fundraise"
5. **TikTok** - casual "Your idea, actually built"

Target each ad to matching audience segment with matching landing page variant.

### Google Ads
**Search Ads:**
```
Headline 1: "Ship Your App Fast"
Headline 2: "Production Ready in 72hrs"
Headline 3: "Get a Quote Today"
Landing Page: /launch?v=dev (for dev keywords)
```

**Display Ads:**
Use audience variants for different placements

---

## Monthly Review Checklist

- [ ] Compare variant performance metrics
- [ ] Identify best-converting headline
- [ ] Identify best-converting problem bullet
- [ ] Calculate cost-per-click by variant
- [ ] Update copy based on performance
- [ ] Test new variant (if needed)
- [ ] Share results with team
- [ ] Plan next month's focus

---

## Variant Performance Tracking Template

Copy to spreadsheet:

```
Variant     | Views  | CTA Clicks | Conv Rate | Avg Time | Best Platform | Cost/Acq
Default     | 1,500  | 45        | 3.0%     | 45s     | Email         | $22
Creator     | 2,100  | 210       | 10.0%    | 38s     | Instagram     | $18
Dev         | 3,500  | 350       | 10.0%    | 35s     | Twitter       | $16
Founder     | 1,800  | 162       | 9.0%     | 42s     | LinkedIn      | $19
TikTok      | 900    | 117       | 13.0%    | 32s     | TikTok        | $14
```

Use this to identify winners and iterate.

---

## Questions?

- **How do I get variant URL data in GA4?**
  Check custom dimension "variant" in reports

- **How do I track which social post drove traffic?**
  Use utm_source parameter (Twitter, Instagram, etc.)

- **What if one variant dramatically underperforms?**
  Run for at least 1 week (min 500 views) before judging

- **Can I run all variants simultaneously?**
  Yes! Use geographic targeting or random URL distribution

---

**Ready to test? Start with your strongest audience first (likely "creator" or "dev") and expand from there.**
