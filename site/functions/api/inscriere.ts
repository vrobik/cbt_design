/**
 * POST /api/inscriere — formularul „Devino membru”.
 * Validează, verifică anti-spam și adaugă un rând în tab-ul „Înscrieri” din Google Sheet.
 */
import {
  type Env,
  acumRo,
  citesteFormular,
  emailValid,
  eroare,
  origineValida,
  succes,
  text,
  trimiteLaSheet,
  verificaTurnstile,
} from '../_shared/forms';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!origineValida(request)) return eroare(request, 'Cerere nepermisă.', 403);

  const f = await citesteFormular(request).catch(() => null);
  if (!f) return eroare(request, 'Formularul nu a putut fi citit.');

  // Capcana pentru roboți: câmpul ascuns trebuie să rămână gol. Pretindem succes.
  if (text(f.companie)) return succes(request, '/multumim/');

  const nume = text(f.nume, 120);
  const email = text(f.email, 254).toLowerCase();
  const oras = text(f.oras, 80);
  if (!nume) return eroare(request, 'Spune-ne cum te cheamă.');
  if (!emailValid(email)) return eroare(request, 'Adresa de email nu pare completă — verific-o, te rog.');
  if (!text(f.gdpr)) return eroare(request, 'Bifează acordul ca să te putem contacta.');

  const ip = request.headers.get('CF-Connecting-IP');
  if (!(await verificaTurnstile(env, text(f['cf-turnstile-response'], 2048), ip))) {
    return eroare(request, 'Verificarea anti-spam a eșuat. Reîncarcă pagina și încearcă din nou.');
  }

  try {
    await trimiteLaSheet(env, 'inscriere', {
      data: acumRo(),
      nume,
      email,
      oras,
      consimtamant: 'DA — comunicări legate de activitatea CBT (Politica de confidențialitate)',
      pagina: text(f.pagina, 200) || '/contact/',
    });
  } catch (e) {
    console.error('inscriere:', e);
    return eroare(
      request,
      'Nu am putut salva înscrierea acum. Încearcă din nou peste câteva minute sau scrie-ne pe email.',
      502,
    );
  }

  return succes(request, '/multumim/');
};
