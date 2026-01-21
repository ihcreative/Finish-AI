import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../app/seo.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${origin}/pricing`;
    const image = `${origin}/assets/finish-og.svg`;

    this.seo.updateMeta({
      title: 'FINISH Pricing | Launch Your AI App Faster',
      description: 'Choose a FINISH plan to stabilize, deploy, and monetize your AI app fast. No dev team required.',
      image,
      url,
      robots: 'index, follow',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'FINISH Pricing',
        'url': url,
        'description': 'Choose a FINISH plan to stabilize, deploy, and monetize your AI app fast. No dev team required.'
      },
    });
  }
}
