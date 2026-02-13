import { useEffect } from 'react';

const SITE_NAME = 'Bitless';
const BASE_URL = 'https://www.bitless.app';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
}

function upsertMeta(attribute: 'name' | 'property', value: string, content: string) {
  let tag = document.head.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let tag = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', url);
}

export function Seo({ title, description, path = '/', keywords }: SeoProps) {
  useEffect(() => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${BASE_URL}${cleanPath}`;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
    if (keywords) {
      upsertMeta('name', 'keywords', keywords);
    }

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', `${BASE_URL}/og-image.png`);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', `${BASE_URL}/og-image.png`);

    upsertCanonical(url);
  }, [title, description, path, keywords]);

  return null;
}
