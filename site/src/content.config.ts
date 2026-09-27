/**
 * Colecțiile de conținut ale site-ului.
 * Fiecare colecție corespunde unei secțiuni din CMS (public/admin/config.yml).
 * Dacă adaugi un câmp aici, adaugă-l și în config.yml, altfel editorii nu-l văd.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** CMS-ul poate lăsa câmpurile opționale goale ("" sau null) — le tratăm ca lipsă. */
const gol = (v: unknown) => (v === '' || v === null ? undefined : v);
const opt = <T extends z.ZodType>(s: T) => z.preprocess(gol, s.optional());

const listaOpt = <T extends z.ZodType>(s: z.ZodArray<T>) => z.preprocess(gol, s.default([]));

const ora = z
  .string()
  .regex(/^([01]?\d|2[0-3]):[0-5]\d$/, 'Ora trebuie scrisă ca HH:MM, ex. 18:00');

const seo = {
  seoTitlu: opt(z.string()),
  seoDescriere: opt(z.string().max(200)),
};

const evenimente = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/evenimente' }),
  schema: ({ image }) =>
    z.object({
      titlu: z.string(),
      data: z.coerce.date(),
      ora: opt(ora),
      dataSfarsit: opt(z.coerce.date()),
      oraSfarsit: opt(ora),
      locatie: z.string(),
      adresa: opt(z.string()),
      oras: z.string().default('Timișoara'),
      descriere: z.string(),
      imagine: opt(image()),
      imagineAlt: opt(z.string()),
      accent: z.enum(['albastru', 'rosu']).default('albastru'),
      acces: z.string().default('Intrarea liberă'),
      gratuit: z.boolean().default(true),
      linkInscriere: opt(z.url()),
      galerie: listaOpt(z.array(z.object({ imagine: image(), descriere: opt(z.string()) }))),
      ciorna: z.boolean().default(false),
      ...seo,
    }),
});

const noutati = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/noutati' }),
  schema: ({ image }) =>
    z.object({
      titlu: z.string(),
      data: z.coerce.date(),
      tip: z.enum(['articol', 'comunicat']).default('articol'),
      rezumat: z.string(),
      imagineOG: opt(image()),
      fisier: opt(z.string()), // PDF atașat (ex. comunicatul de presă)
      ciorna: z.boolean().default(false),
      ...seo,
    }),
});

const proiecte = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/proiecte' }),
  schema: z.object({
    titlu: z.string(),
    an: z.number().int(),
    stare: z.enum(['trecut', 'in-desfasurare', 'viitor']),
    descriere: z.string(),
    link: opt(z.url()),
    ciorna: z.boolean().default(false),
  }),
});

const testimoniale = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/testimoniale' }),
  schema: ({ image }) =>
    z.object({
      nume: z.string(),
      origine: opt(z.string()),
      citat: z.string().max(280),
      poza: opt(image()),
      accent: z.enum(['albastru', 'rosu', 'galben']).default('albastru'),
      ordine: z.number().default(10),
      // Testimonialul apare pe site DOAR dacă acordul scris a fost primit.
      acordSemnat: z.boolean().default(false),
    }),
});

const beneficiu = z.object({
  titlu: z.string(),
  text: z.string(),
  culoare: z.enum(['albastru', 'galben', 'rosu']).default('albastru'),
  rezervat: z.boolean().default(false),
});

const acasa = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/acasa' }),
  schema: z.object({
    seoTitlu: z.string(),
    seoDescriere: z.string(),
    heroTitlu: z.string(),
    heroText: z.string(),
    beneficiiEticheta: z.string(),
    beneficiiTitlu: z.string(),
    beneficiiText: opt(z.string()),
    beneficii: z.array(beneficiu).min(1).max(4),
    evenimenteTitlu: z.string(),
    testimonialeEticheta: z.string(),
    testimonialeTitlu: z.string(),
    ctaTitlu: z.string(),
    ctaText: z.string(),
  }),
});

const despre = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/despre' }),
  schema: ({ image }) =>
    z.object({
      seoTitlu: z.string(),
      seoDescriere: z.string(),
      eticheta: z.string(),
      titlu: z.string(),
      intro: z.string(),
      poza: opt(image()),
      pozaAlt: opt(z.string()),
      valori: listaOpt(
        z.array(
          z.object({
            titlu: z.string(),
            text: z.string(),
            culoare: z.enum(['albastru', 'galben', 'rosu']).default('albastru'),
          }),
        ),
      ),
    }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({
    titlu: z.string(),
    descriere: z.string(),
    actualizat: z.coerce.date(),
  }),
});

const setari = defineCollection({
  loader: glob({ pattern: 'general.yaml', base: './src/content/setari' }),
  schema: z.object({
    numeOrganizatie: z.string(),
    descriereScurta: z.string(),
    email: z.email(),
    telefon: opt(z.string()),
    adresa: opt(z.string()),
    facebook: opt(z.url()),
    instagram: opt(z.url()),
    grupFacebook: opt(z.url()),
    statistici: z.array(z.object({ valoare: z.string(), eticheta: z.string() })).max(4),
    pasulUrmator: z.object({
      titlu: z.string(),
      text: z.string(),
      buton: z.string(),
      link: z.url(),
    }),
  }),
});

/** Starea traducerii rusești (bifată de CBT în CMS → Versiunea rusă). */
const traduceri = defineCollection({
  loader: glob({ pattern: 'traduceri.yaml', base: './src/content/setari' }),
  schema: z.object({
    acasa: z.boolean().default(false),
    despre: z.boolean().default(false),
  }),
});

const presa = defineCollection({
  loader: glob({ pattern: 'kit.yaml', base: './src/content/presa' }),
  schema: z.object({
    intro: z.string(),
    fisiere: listaOpt(
      z.array(
        z.object({
          titlu: z.string(),
          fisier: z.string(), // cale publică, ex. /presa/logo-cbt.zip
          tip: z.enum(['logo', 'foto', 'document']).default('document'),
        }),
      ),
    ),
  }),
});

export const collections = {
  evenimente,
  noutati,
  proiecte,
  testimoniale,
  acasa,
  despre,
  legal,
  setari,
  traduceri,
  presa,
};
