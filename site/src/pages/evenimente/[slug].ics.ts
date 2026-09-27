/**
 * Fișier calendar (.ics) pentru fiecare eveniment — butonul „Adaugă în calendar”.
 * Funcționează cu Google Calendar, Apple Calendar și Outlook.
 */
import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { dataIso } from '../../lib/dates';

export async function getStaticPaths() {
  const toate = await getCollection('evenimente', ({ data }) => import.meta.env.DEV || !data.ciorna);
  return toate.map((ev) => ({ params: { slug: ev.id }, props: { ev } }));
}

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

/** Liniile .ics nu au voie să depășească 75 de octeți. */
const pliaza = (linie: string) => {
  const bytes = new TextEncoder().encode(linie);
  if (bytes.length <= 75) return linie;
  const rez: string[] = [];
  let curent = '';
  for (const ch of linie) {
    if (new TextEncoder().encode(curent + ch).length > (rez.length ? 74 : 75)) {
      rez.push(curent);
      curent = ch;
    } else curent += ch;
  }
  rez.push(curent);
  return rez.join('\r\n ');
};

const zi = (d: Date) => dataIso(d).replace(/-/g, '');
const ora = (o: string) => o.replace(':', '').padStart(4, '0') + '00';

export const GET: APIRoute = ({ props, site }) => {
  const { ev } = props as { ev: CollectionEntry<'evenimente'> };
  const d = ev.data;
  const url = new URL(`/evenimente/${ev.id}/`, site).href;

  let start: string;
  let end: string;
  if (d.ora) {
    start = `DTSTART;TZID=Europe/Bucharest:${zi(d.data)}T${ora(d.ora)}`;
    const oraSf = d.oraSfarsit ?? `${String((Number(d.ora.split(':')[0]) + 2) % 24).padStart(2, '0')}:${d.ora.split(':')[1]}`;
    end = `DTEND;TZID=Europe/Bucharest:${zi(d.dataSfarsit ?? d.data)}T${ora(oraSf)}`;
  } else {
    const sf = new Date((d.dataSfarsit ?? d.data).valueOf() + 86_400_000);
    start = `DTSTART;VALUE=DATE:${zi(d.data)}`;
    end = `DTEND;VALUE=DATE:${zi(sf)}`;
  }

  const acum = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const linii = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CBT//basarabenitm.ro//RO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${ev.id}@basarabenitm.ro`,
    `DTSTAMP:${acum}`,
    start,
    end,
    `SUMMARY:${esc(d.titlu)}`,
    `DESCRIPTION:${esc(`${d.descriere}\n\n${url}`)}`,
    `LOCATION:${esc([d.locatie, d.adresa, d.locatie.includes(d.oras) ? '' : d.oras].filter(Boolean).join(', '))}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return new Response(linii.map(pliaza).join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${ev.id}.ics"`,
    },
  });
};
