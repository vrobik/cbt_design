/**
 * POST /api/acord-imagine — acordul de utilizare a imaginii.
 * Adaugă un rând în tab-ul „Acorduri imagine” din Google Sheet (cu data și ora = dovada acordului).
 */
import {
  type Env,
  acumRo,
  citesteFormular,
  emailValid,
  eroare,
  lista,
  origineValida,
  succes,
  text,
  trimiteLaSheet,
  verificaTurnstile,
} from '../_shared/forms';

const UTILIZARI: Record<string, string> = {
  'foto-evenimente': 'Foto/video de la evenimente (site + rețele sociale CBT)',
  testimonial: 'Testimonial pe site cu nume și poză',
  presa: 'Materiale de presă / press kit',
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!origineValida(request)) return eroare(request, 'Cerere nepermisă.', 403);

  const f = await citesteFormular(request).catch(() => null);
  if (!f) return eroare(request, 'Formularul nu a putut fi citit.');
  if (text(f.companie)) return succes(request, '/acord-imagine/multumim/');

  const nume = text(f.nume, 120);
  const email = text(f.email, 254).toLowerCase();
  const utilizari = lista(f.utilizari).filter((u) => u in UTILIZARI);
  if (!nume) return eroare(request, 'Scrie numele complet.');
  if (!emailValid(email)) return eroare(request, 'Adresa de email nu pare completă — verific-o, te rog.');
  if (utilizari.length === 0) return eroare(request, 'Alege cel puțin o utilizare.');
  if (!text(f.declaratie)) return eroare(request, 'Bifează declarația ca acordul să fie valid.');

  const ip = request.headers.get('CF-Connecting-IP');
  if (!(await verificaTurnstile(env, text(f['cf-turnstile-response'], 2048), ip))) {
    return eroare(request, 'Verificarea anti-spam a eșuat. Reîncarcă pagina și încearcă din nou.');
  }

  try {
    await trimiteLaSheet(env, 'acord-imagine', {
      data: acumRo(),
      nume,
      email,
      telefon: text(f.telefon, 40),
      minor: text(f.minor, 120),
      context: text(f.context, 300),
      utilizari: utilizari.map((u) => UTILIZARI[u]).join('; '),
      declaratie: 'DA — persoana din imagini sau părinte/tutore; acord gratuit, revocabil prin email',
    });
  } catch (e) {
    console.error('acord-imagine:', e);
    return eroare(request, 'Nu am putut salva acordul acum. Încearcă din nou peste câteva minute.', 502);
  }

  return succes(request, '/acord-imagine/multumim/');
};
