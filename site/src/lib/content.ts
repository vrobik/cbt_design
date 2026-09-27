import { getCollection, getEntry } from 'astro:content';
import { esteViitor } from './dates';

/** Ciornele se văd în `npm run dev`, dar nu apar pe site-ul publicat. */
const publicat = ({ data }: { data: { ciorna?: boolean } }) => import.meta.env.DEV || !data.ciorna;

export async function evenimente() {
  const toate = (await getCollection('evenimente', publicat)).map((e) => ({
    ...e,
    viitor: esteViitor(e.data.data, e.data.dataSfarsit),
  }));
  // Cele care urmează: cel mai apropiat primul. Cele trecute: cel mai recent primul.
  const viitoare = toate
    .filter((e) => e.viitor)
    .sort((a, b) => a.data.data.valueOf() - b.data.data.valueOf());
  const trecute = toate
    .filter((e) => !e.viitor)
    .sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
  return { toate, viitoare, trecute };
}

export async function noutati() {
  return (await getCollection('noutati', publicat)).sort(
    (a, b) => b.data.data.valueOf() - a.data.data.valueOf(),
  );
}

const ordineStare = { viitor: 0, 'in-desfasurare': 1, trecut: 2 } as const;

export async function proiecte() {
  return (await getCollection('proiecte', publicat)).sort(
    (a, b) => ordineStare[a.data.stare] - ordineStare[b.data.stare] || b.data.an - a.data.an,
  );
}

/**
 * Pe site-ul publicat apar DOAR testimonialele cu acordul scris bifat.
 * În `npm run dev` se văd toate, ca să poți vedea cum arată secțiunea.
 */
export async function testimoniale() {
  return (await getCollection('testimoniale', ({ data }) => import.meta.env.DEV || data.acordSemnat)).sort(
    (a, b) => a.data.ordine - b.data.ordine,
  );
}

export async function setari() {
  const s = await getEntry('setari', 'general');
  if (!s) throw new Error('Lipsește src/content/setari/general.yaml');
  return s.data;
}

export async function pressKit() {
  const k = await getEntry('presa', 'kit');
  if (!k) throw new Error('Lipsește src/content/presa/kit.yaml');
  return k.data;
}
