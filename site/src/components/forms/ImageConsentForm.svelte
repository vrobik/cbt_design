<script lang="ts">
  /**
   * Acord de utilizare a imaginii — pentru persoanele din testimoniale și din galeriile foto.
   * Răspunsurile ajung în tab-ul „Acorduri imagine” din Google Sheet-ul CBT,
   * cu data și ora exactă (dovada acordului).
   */
  import Input from './Input.svelte';
  import Checkbox from './Checkbox.svelte';
  import Turnstile from './Turnstile.svelte';
  import { emailValid, marcheazaConversie, trimite } from '../../scripts/formulare';

  const utilizari = [
    { v: 'foto-evenimente', t: 'Fotografii și video de la evenimentele CBT, publicate pe site și pe rețelele sociale CBT' },
    { v: 'testimonial', t: 'Testimonial pe site, cu numele și poza mea' },
    { v: 'presa', t: 'Materiale de presă și press kit (poze de arhivă)' },
  ];

  let nume = $state('');
  let email = $state('');
  let telefon = $state('');
  let minor = $state('');
  let context = $state('');
  let alese = $state<Record<string, boolean>>(Object.fromEntries(utilizari.map((u) => [u.v, false])));
  let declaratie = $state(false);
  let token = $state('');
  let erori = $state<Record<string, string>>({});
  let eroareServer = $state('');
  let trimitere = $state(false);
  let ts: ReturnType<typeof Turnstile> | undefined = $state();

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    eroareServer = '';
    const er: Record<string, string> = {};
    if (!nume.trim()) er.nume = 'Scrie numele complet.';
    if (!emailValid(email)) er.email = 'Adresa de email nu pare completă — verific-o, te rog.';
    if (!Object.values(alese).some(Boolean)) er.utilizari = 'Alege cel puțin o utilizare.';
    if (!declaratie) er.declaratie = 'Bifează declarația ca acordul să fie valid.';
    erori = er;
    if (Object.keys(er).length) return;

    trimitere = true;
    const rez = await trimite('/api/acord-imagine', e.currentTarget as HTMLFormElement, {
      'cf-turnstile-response': token,
    });
    if (rez.ok) {
      marcheazaConversie('acord_imagine');
      location.href = '/acord-imagine/multumim/';
      return;
    }
    trimitere = false;
    eroareServer = rez.eroare;
    ts?.reset();
  }
</script>

<form method="post" action="/api/acord-imagine" novalidate {onsubmit}>
  <Input label="Nume și prenume" name="nume" bind:value={nume} autocomplete="name" error={erori.nume} />
  <Input label="Email" name="email" type="email" bind:value={email} autocomplete="email" error={erori.email} />
  <Input label="Telefon" name="telefon" type="tel" bind:value={telefon} autocomplete="tel" optional />
  <Input
    label="Numele copilului"
    name="minor"
    bind:value={minor}
    optional
    hint="Completează doar dacă dai acordul ca părinte sau tutore pentru un minor."
  />
  <Input
    label="Eveniment sau material"
    name="context"
    bind:value={context}
    optional
    placeholder="ex. Seara de colinde 2026, testimonial pe site"
  />

  <fieldset class="uses">
    <legend>Sunt de acord ca CBT să folosească imaginea mea pentru:</legend>
    {#each utilizari as u (u.v)}
      <div class="use">
        <Checkbox name="utilizari" value={u.v} bind:checked={alese[u.v]}>{u.t}</Checkbox>
      </div>
    {/each}
    {#if erori.utilizari}<span class="err">{erori.utilizari}</span>{/if}
  </fieldset>

  <div class="hp" aria-hidden="true">
    <label for="f-companie">Companie</label>
    <input id="f-companie" name="companie" tabindex="-1" autocomplete="off" />
  </div>

  <div class="decl">
    <Checkbox name="declaratie" bind:checked={declaratie} error={erori.declaratie}>
      Declar că sunt persoana din imagini (sau părintele/tutorele legal al minorului), că acordul este
      gratuit și că îl pot retrage oricând printr-un email către CBT. Am citit
      <a href="/politica-de-confidentialitate/">Politica de Confidențialitate</a>.
    </Checkbox>
  </div>

  <Turnstile bind:this={ts} bind:token />

  {#if eroareServer}
    <p class="server-err" role="alert">{eroareServer}</p>
  {/if}

  <button type="submit" class="submit" disabled={trimitere}>
    {trimitere ? 'Se trimite…' : 'Trimite acordul'}
  </button>
</form>

<style>
  .uses {
    border: 0;
    padding: 0;
    margin: 0 0 var(--sp-4);
  }
  legend {
    font-weight: var(--fw-semibold);
    font-size: var(--fs-small);
    margin-bottom: var(--sp-2);
    padding: 0;
  }
  .use {
    margin-bottom: 10px;
  }
  .decl {
    background: var(--cbt-albastru-10);
    border-radius: var(--radius-md);
    padding: var(--sp-3);
    margin-bottom: var(--sp-4);
  }
  .err {
    color: var(--cbt-rosu);
    font-size: var(--fs-label);
    display: block;
  }
  .hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .server-err {
    background: #fdeced;
    color: var(--cbt-rosu-inchis);
    border-radius: var(--radius-sm);
    padding: 12px 14px;
    font-size: var(--fs-small);
    margin: 0 0 var(--sp-3);
  }
  .submit {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 30px;
    min-height: 48px;
    font-family: var(--font-text);
    font-size: var(--fs-body);
    font-weight: var(--fw-semibold);
    border-radius: var(--radius-pill);
    border: 1.5px solid transparent;
    background: var(--cbt-albastru);
    color: var(--cbt-alb);
    box-shadow: 0 2px 10px rgba(47, 68, 138, 0.25);
    cursor: pointer;
    transition: background var(--dur) var(--ease), transform var(--dur) var(--ease);
  }
  .submit:hover:not(:disabled) {
    background: var(--cbt-albastru-inchis);
    transform: translateY(-1px);
  }
  .submit:disabled {
    opacity: 0.6;
    cursor: progress;
  }
</style>
