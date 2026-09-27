/**
 * Date structurate schema.org (JSON-LD). Google le folosește pentru rezultate
 * îmbogățite: evenimente cu dată și loc, organizația în Knowledge Panel.
 */
import type { CollectionEntry } from 'astro:content';
import { dataOraIso } from './dates';

export const SITE_NAME = 'Comunitatea Basarabenilor din Timișoara';

export function absolut(path: string, site: URL | undefined): string {
  return new URL(path, site ?? 'https://basarabenitm.ro').href;
}

type Setari = CollectionEntry<'setari'>['data'];

export function organizatie(s: Setari, site: URL | undefined, logo: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: s.numeOrganizatie,
    alternateName: 'CBT',
    url: absolut('/', site),
    logo: absolut(logo, site),
    email: s.email,
    ...(s.telefon ? { telephone: s.telefon } : {}),
    description: s.descriereScurta,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Timișoara',
      addressRegion: 'Timiș',
      addressCountry: 'RO',
      ...(s.adresa ? { streetAddress: s.adresa } : {}),
    },
    sameAs: [s.facebook, s.instagram].filter(Boolean),
  };
}

export function eveniment(
  ev: CollectionEntry<'evenimente'>,
  site: URL | undefined,
  imagini: string[],
) {
  const d = ev.data;
  const url = absolut(`/evenimente/${ev.id}/`, site);
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: d.titlu,
    description: d.seoDescriere ?? d.descriere,
    startDate: dataOraIso(d.data, d.ora),
    ...(d.dataSfarsit || d.oraSfarsit
      ? { endDate: dataOraIso(d.dataSfarsit ?? d.data, d.oraSfarsit) }
      : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: d.locatie,
      address: {
        '@type': 'PostalAddress',
        ...(d.adresa ? { streetAddress: d.adresa } : {}),
        addressLocality: d.oras,
        addressCountry: 'RO',
      },
    },
    image: imagini.map((i) => absolut(i, site)),
    url,
    organizer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absolut('/', site),
    },
    ...(d.gratuit
      ? {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'RON',
            availability: 'https://schema.org/InStock',
            url: d.linkInscriere ?? url,
          },
          isAccessibleForFree: true,
        }
      : {}),
  };
}

export function articol(
  art: CollectionEntry<'noutati'>,
  site: URL | undefined,
  imagine: string,
  logo: string,
) {
  const d = art.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: d.titlu,
    description: d.seoDescriere ?? d.rezumat,
    datePublished: dataOraIso(d.data),
    image: [absolut(imagine, site)],
    mainEntityOfPage: absolut(`/noutati/${art.id}/`, site),
    author: { '@type': 'Organization', name: SITE_NAME, url: absolut('/', site) },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: absolut(logo, site) },
    },
  };
}
