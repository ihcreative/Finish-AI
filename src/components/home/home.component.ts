import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

interface VariantCopy {
  heroHeadline: string;
  heroSubhead: string;
  problemBullets?: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  variants: Record<string, VariantCopy> = {
    default: {
      heroHeadline: 'Your App. Actually Finished.',
      heroSubhead:
        'We take AI-built, no-code, or custom apps stuck at 80% and ship them to production, often in 24–72 hours.',
      problemBullets: [
        'Auth is flaky — stabilize login and protect routes.',
        'Data is messy — fix schema, queries, and state.',
        'Payments don’t ship — make checkout and webhooks work.',
      ],
    },
    creator: {
      heroHeadline: 'Finish your creator app and launch fast.',
      heroSubhead:
        'We polish creator tools, fix publishing flows, and get your audience paying or subscribing.',
      problemBullets: [
        'Onboarding drops users — tighten flows and states.',
        'Publishing or media uploads fail — stabilize asset pipelines.',
        'Monetization broken — enable paid plans and payouts.',
      ],
    },
    dev: {
      heroHeadline: 'Ship the engineering work that actually matters.',
      heroSubhead:
        'We take messy prototypes or stalled builds and deliver production-ready code and deployments.',
      problemBullets: [
        'Tests and CI are missing — we add reliable pipelines.',
        'Broken integrations — we restore API stability.',
        'Performance bottlenecks — we optimize and reduce latency.',
      ],
    },
    founder: {
      heroHeadline: 'Get your founder MVP into production.',
      heroSubhead:
        'We help founders turn prototypes into reliable, shippable products with a clear launch plan.',
      problemBullets: [
        'Missing core flows — add essential screens and states.',
        'Deployment chaos — set up hosting, envs, and CI.',
        'Unclear scope — we define what “done” means and deliver.',
      ],
    },
    tiktok: {
      heroHeadline: 'Make your app launch-ready — viral-friendly UX.',
      heroSubhead:
        'We fix the rough edges so your social traffic converts, from onboarding to payments.',
      problemBullets: [
        'Onboarding is confusing — reduce dropoff for social traffic.',
        'Sharing and links fail — ensure linkability and deep links.',
        'Slow loads kill retention — speed up critical paths.',
      ],
    },
  };

  variantName = 'default';
  heroHeadline = '';
  heroSubhead = '';
  problemBullets: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    const raw = (this.route.snapshot.queryParamMap.get('v') || 'default').toLowerCase();
    this.variantName = this.variants[raw] ? raw : 'default';
    const v = this.variants[this.variantName];
    this.heroHeadline = v.heroHeadline;
    this.heroSubhead = v.heroSubhead;
    this.problemBullets = v.problemBullets ? v.problemBullets.slice(0, 3) : [];

    // Send analytics view event with variant
    this.sendGAEvent('view_landing_variant', { variant: this.variantName });

    // Set SEO tags. If the path is '/launch' use landing title/description, otherwise home defaults.
    const isLaunch = (this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path === 'launch');
    this.applySEOTags(isLaunch ? 'launch' : 'home');

    // Apply changes for OnPush
    this.cdr.markForCheck();
  }

  private applySEOTags(page: 'home' | 'pricing' | 'launch') {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = (() => {
      if (page === 'pricing') return `${origin}/pricing`;
      if (page === 'launch') return `${origin}/launch`;
      return `${origin}/`;
    })();

    const image = `${origin}/assets/finish-og.svg`;

    const metaMap: Record<string, { title: string; description: string }> = {
      home: {
        title: 'FINISH | Turn AI Prototypes into Revenue-Ready Apps',
        description:
          'FINISH helps AI builders turn half-built apps into production-ready products with deployment, payments, and stability handled.',
      },
      pricing: {
        title: 'FINISH Pricing | Launch Your AI App Faster',
        description: 'Choose a FINISH plan to stabilize, deploy, and monetize your AI app fast. No dev team required.',
      },
      launch: {
        title: 'Launch Your AI App in Days, Not Months | FINISH',
        description: 'Got a half-built AI app? FINISH handles the last mile so you can launch and start charging customers.',
      },
    };

    const chosen = metaMap[page];

    // Title
    this.titleService.setTitle(chosen.title);

    // Basic meta
    this.meta.updateTag({ name: 'description', content: chosen.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: chosen.title });
    this.meta.updateTag({ property: 'og:description', content: chosen.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: 'FINISH' });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: chosen.title });
    this.meta.updateTag({ name: 'twitter:description', content: chosen.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // canonical (replace or add)
    const link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (link) {
      link.href = url;
    } else {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      l.setAttribute('href', url);
      document.head.appendChild(l);
    }
  }

  trackCTA(label = 'cta'): void {
    this.sendGAEvent('cta_click', { variant: this.variantName, label });
  }

  private sendGAEvent(name: string, params: Record<string, any>): void {
    try {
      const w = window as any;
      if (typeof w.gtag === 'function') {
        w.gtag('event', name, params);
      } else if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({ event: name, ...params });
      }
    } catch (e) {
      // swallow errors — analytics is optional
    }
  }
}