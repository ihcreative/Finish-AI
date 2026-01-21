
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeoService } from './app/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    this.seo.updateMeta({
      title: 'FINISH | Turn AI Prototypes into Revenue-Ready Apps',
      description:
        'FINISH helps AI builders turn half-built apps into production-ready products with deployment, payments, and stability handled.',
      image: `${origin}/assets/finish-og.svg`,
      url: origin || '/',
      robots: 'index, follow',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'FINISH',
        'url': origin || '/',
      },
    });
  }
}