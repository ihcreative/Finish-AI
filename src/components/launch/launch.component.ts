import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

interface VariantCopy {
  heroHeadline: string;
  heroSubhead: string;
  problemBullets: string[];
  ctaText: string;
  metaDescription: string;
}

type VariantKey = 'default' | 'creator' | 'dev' | 'founder' | 'tiktok';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css'],
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchComponent implements OnInit {
  currentVariant: VariantKey = 'default';
  heroHeadline = '';
  heroSubhead = '';
  problemBullets: string[] = [];
  ctaText = '';

  variants: Record<VariantKey, VariantCopy> = {
    default: {
      heroHeadline: 'Your App. Actually Finished.',
      heroSubhead:
        'We take AI-built, no-code, or custom apps stuck at 80% and ship them to production, often in 24-72 hours.',
      problemBullets: [
        'Auth is flaky - stabilize login and protect routes.',
        'Data is messy - fix schema, queries, and state.',
        'Payments don\'t ship - make checkout and webhooks work.',
      ],
      ctaText: 'Get a 24-hour Quote',
      metaDescription: 'Ship your app fast. FINISH is the last-mile deployment service.',
    },
    creator: {
      heroHeadline: 'Ship Your Creator Tool. Faster.',
      heroSubhead:
        'Get your creator app polished, monetized, and in your audience\'s hands. No more half-baked launches.',
      problemBullets: [
        'Publishing flows drop creators mid-upload - fix it.',
        'Monetization is broken - enable subscriptions and payouts.',
        'Onboarding is confusing - streamline the first-time user experience.',
      ],
      ctaText: 'Launch Your Creator Tool',
      metaDescription: 'Build creator tools that creators actually finish using. FINISH helps ship fast.',
    },
    dev: {
      heroHeadline: 'Stop Building. Start Shipping.',
      heroSubhead:
        'Your code works locally. We make it production-ready: deploy pipelines, API integrations, performance tuning - done right.',
      problemBullets: [
        'Tests and CI/CD are missing - we build reliable pipelines.',
        'APIs break in production - we stabilize integrations.',
        'Performance is slow - we optimize and deploy.',
      ],
      ctaText: 'Ship Production Code',
      metaDescription: 'Engineering finishing service for developers. From code to deployed in days.',
    },
    founder: {
      heroHeadline: 'Launch Your MVP. Close Your Round.',
      heroSubhead:
        'Every day your app stays unfinished costs you users and investor confidence. We get you to market - fast enough to fundraise.',
      problemBullets: [
        'MVP is stuck at 80% - we finish the last mile.',
        'Paying customers are waiting - deploy now, iterate later.',
        'Investors want to see traction - we help you ship and prove it.',
      ],
      ctaText: 'Finish & Launch Your MVP',
      metaDescription: 'Founder finishing service. MVP deployment in 24-72 hours. Launch faster, fundraise better.',
    },
    tiktok: {
      heroHeadline: 'Your Idea. Actually Built.',
      heroSubhead: 'You have the vision. We ship it. No more waiting for developers or getting stuck halfway through.',
      problemBullets: [
        'You coded something but it\'s broken - we fix it.',
        'You found a no-code tool but it\'s not quite right - we customize it.',
        'You need it live this week - we make it happen.',
      ],
      ctaText: 'Ship Your Idea Now',
      metaDescription: 'Ideas to live products in days. FINISH gets your app shipped.',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const variant = params['v'] as string;
      this.selectVariant(variant);
    });
  }

  selectVariant(variant: string | undefined): void {
    const validVariants: VariantKey[] = ['default', 'creator', 'dev', 'founder', 'tiktok'];
    this.currentVariant = (validVariants.includes(variant as VariantKey) ? variant : 'default') as VariantKey;

    const copy = this.variants[this.currentVariant];
    this.heroHeadline = copy.heroHeadline;
    this.heroSubhead = copy.heroSubhead;
    this.problemBullets = copy.problemBullets;
    this.ctaText = copy.ctaText;

    // Update SEO
    this.titleService.setTitle(`FINISH - ${copy.heroHeadline}`);
    this.metaService.updateTag({
      name: 'description',
      content: copy.metaDescription,
    });

    // Track GA event
    this.trackVariantView();
    this.cdr.markForCheck();
  }

  trackVariantView(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_landing_variant', {
        variant: this.currentVariant,
      });
    }
  }

  trackCTA(action: string): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        variant: this.currentVariant,
      });
    }
  }
}
