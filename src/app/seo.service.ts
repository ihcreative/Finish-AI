import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoMeta {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  robots?: string;
  structuredData?: object | null;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc: Document) {}

  setTitle(title: string) {
    if (title) this.title.setTitle(title);
  }

  updateMeta(meta: SeoMeta) {
    if (!meta) return;

    if (meta.title) this.setTitle(meta.title);
    if (meta.description)
      this.meta.updateTag({ name: 'description', content: meta.description });
    if (meta.robots) this.meta.updateTag({ name: 'robots', content: meta.robots });

    // Open Graph
    if (meta.title) this.meta.updateTag({ property: 'og:title', content: meta.title });
    if (meta.description) this.meta.updateTag({ property: 'og:description', content: meta.description });
    if (meta.image) this.meta.updateTag({ property: 'og:image', content: meta.image });
    if (meta.url) this.meta.updateTag({ property: 'og:url', content: meta.url });

    // Twitter
    if (meta.title) this.meta.updateTag({ name: 'twitter:title', content: meta.title });
    if (meta.description) this.meta.updateTag({ name: 'twitter:description', content: meta.description });
    if (meta.image) this.meta.updateTag({ name: 'twitter:image', content: meta.image });

    // canonical
    if (meta.url) this.setCanonical(meta.url);

    // structured data (JSON-LD)
    if (typeof meta.structuredData !== 'undefined') {
      this.setStructuredData(meta.structuredData);
    }
  }

  setCanonical(url: string) {
    if (!url) return;
    let link: HTMLLinkElement | null = this.doc.querySelector("link[rel='canonical']");
    if (link) {
      link.href = url;
    } else {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.doc.head.appendChild(link);
    }
  }

  setStructuredData(data: object | null) {
    const id = 'structured-data-json';
    let el = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (el) {
      if (data === null) {
        el.remove();
        return;
      }
      el.text = JSON.stringify(data);
      return;
    }

    if (data === null) return;

    el = this.doc.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    el.text = JSON.stringify(data);
    this.doc.head.appendChild(el);
  }
}
