<script lang="ts">
  /**
   * Formularul de înscriere în comunitate: nume, email, oraș de origine (opțional),
   * consimțământ GDPR. După trimitere → /multumim/ (pagina cu pasul următor).
   *
   * Merge și fără JavaScript: formularul se trimite clasic, iar serverul redirecționează.
   */
  import Input from './Input.svelte';
  import Checkbox from './Checkbox.svelte';
  import Turnstile from './Turnstile.svelte';
  import { emailValid, marcheazaConversie, trimite } from '../../scripts/formulare';

  let nume = $state('');
  let email = $state('');
  let oras = $state('');
  let gdpr = $state(false);
  let token = $state('');
  let eroare = $state<'' | 'nume' | 'email' | 'gdpr'>('');
  let eroareServer = $state('');
  let trimitere = $state(false);
  let ts: ReturnType<typeof Turnstile> | undefined = $state();

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    eroareServer = '';
    if (!nume.trim()) return (eroare = 'nume');
    if (!emailValid(email)) return (eroare = 'email');
    if (!gdpr) return (eroare = 'gdpr');
    eroare = '';

    trimitere = true;
    const rez = await trimite('/api/inscriere', e.currentTarget as HTMLFormElement, {
      'cf-turnstile-response': token,
      pagina: location.pathname,
    });
    if (rez.ok) {
      marcheazaConversie('sign_up');
      location.href = '/multumim/';
      return;
    }
    trimitere = false;
    eroareServer = rez.eroare;
    ts?.reset();
  }
</script>

<form method="post" action="/api/inscriere" novalidate {onsubmit}>
  <Input
    label="Nume și prenume"
    name="nume"
    bind:value={nume}
    placeholder="ex. Ana Munteanu"
    autocomplete="name"
    error={eroare === 'nume' ? 'Spune-ne cum te cheamă.' : ''}
  />
  <Input
    label="Email"
    name="email"
    type="email"
    bind:value={email}
    placeholder="ana@exemplu.ro"
    autocomplete="email"
    error={eroare === 'email' ? 'Adresa de email nu pare completă — verific-o, te rog.' : ''}
  />
  <Input label="Orașul de origine" name="oras" bind:value={oras} placeholder="ex. Cahul" optional />

  <!-- Capcană pentru roboți: oamenii nu văd câmpul ăsta. -->
  <div class="hp" aria-hidden="true">
    <label for="f-companie">Companie</label>
    <input id="f-companie" name="companie" tabindex="-1" autocomplete="off" />
  </div>

  <div class="gdpr">
    <Checkbox
      name="gdpr"
      bind:checked={gdpr}
      error={eroare === 'gdpr' ? 'Bifează acordul ca să te putem contacta.' : ''}
    >
      Sunt de acord ca datele mele să fie folosite pentru comunicări legate de activitatea CBT, conform
      <a href="/politica-de-confidentialitate/">Politicii de Confidențialitate</a>.
    </Checkbox>
  </div>

  <p class="nota">
    Datele tale sunt salvate într-un Google Sheet privat, accesibil doar echipei CBT. Nu le partajăm cu
    terți și le poți șterge oricând printr-un email.
  </p>

  <Turnstile bind:this={ts} bind:token />

  {#if eroareServer}
    <p class="server-err" role="alert">{eroareServer}</p>
  {/if}

  <button
    type="submit"
    class="submit"
    disabled={trimitere}
    data-track="click_inscriere"
    data-track-locatie="formular"
  >
    {trimitere ? 'Se trimite…' : 'Înscrie-te în comunitate'}
  </button>
</form>

<style>
  .gdpr {
    margin: 8px 0 12px;
  }
  .nota {
    font-size: var(--fs-label);
    color: var(--cbt-gri-60);
    margin: 0 0 var(--sp-4);
    line-height: 1.5;
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
    padding: 18px 36px;
    min-height: 48px;
    font-family: var(--font-text);
    font-size: var(--fs-body-lg);
    font-weight: var(--fw-semibold);
    border-radius: var(--radius-pill);
    border: 1.5px solid transparent;
    background: var(--cbt-galben);
    color: var(--cbt-negru);
    box-shadow: var(--shadow-action);
    cursor: pointer;
    transition:
      transform var(--dur) var(--ease),
      box-shadow var(--dur) var(--ease),
      background var(--dur) var(--ease);
  }
  .submit:hover:not(:disabled) {
    background: var(--color-action-hover);
    box-shadow: var(--shadow-action-hover);
    transform: translateY(-1px);
  }
  .submit:disabled {
    opacity: 0.6;
    cursor: progress;
  }
</style>
