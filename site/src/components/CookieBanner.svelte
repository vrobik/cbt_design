<script lang="ts">
  /**
   * Banner de consimțământ cookie-uri (GDPR). „Accept” și „Refuz” au aceeași greutate.
   * GA4 se încarcă doar după „Accept”. Se redeschide din subsol („Setări cookie-uri”).
   */
  import { onMount } from 'svelte';
  import { citesteConsimtamant, salveazaConsimtamant, type Consimtamant } from '../scripts/analytics';

  let vizibil = $state(false);

  onMount(() => {
    vizibil = citesteConsimtamant() === null;
    const deschide = (e: Event) => {
      if ((e.target as Element | null)?.closest('[data-deschide-cookie]')) vizibil = true;
    };
    document.addEventListener('click', deschide);
    return () => document.removeEventListener('click', deschide);
  });

  function alege(v: Consimtamant) {
    salveazaConsimtamant(v);
    vizibil = false;
  }
</script>

{#if vizibil}
  <div class="wrap">
    <div class="banner" role="region" aria-label="Consimțământ cookie-uri">
      <p>
        Folosim cookie-uri pentru statistici anonime (Google Analytics). Le poți accepta sau refuza —
        site-ul funcționează la fel. <a href="/politica-cookie/">Detalii</a>
      </p>
      <div class="actions">
        <button type="button" class="btn btn--primary" onclick={() => alege('acceptat')}>Accept</button>
        <button type="button" class="btn btn--secondary" onclick={() => alege('refuzat')}>Refuz</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .wrap {
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 16px;
    display: flex;
    justify-content: center;
    z-index: 50;
    pointer-events: none;
  }
  @media (min-width: 820px) {
    .wrap {
      left: 24px;
      right: 24px;
      bottom: 24px;
    }
  }
  .banner {
    pointer-events: auto;
    background: var(--cbt-alb);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: var(--sp-4);
    box-shadow: var(--shadow-pop);
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-3);
    align-items: center;
    justify-content: space-between;
    max-width: 720px;
    width: 100%;
  }
  p {
    font-size: var(--fs-small);
    max-width: 46ch;
    margin: 0;
    color: var(--cbt-gri-90);
    line-height: 1.5;
  }
  .actions {
    display: flex;
    gap: var(--sp-3);
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-text);
    font-weight: var(--fw-semibold);
    font-size: var(--fs-small);
    padding: 10px 20px;
    min-height: 44px;
    border-radius: var(--radius-pill);
    border: 1.5px solid transparent;
    cursor: pointer;
    transition: background var(--dur) var(--ease), border-color var(--dur) var(--ease);
  }
  .btn--primary {
    background: var(--cbt-galben);
    color: var(--cbt-negru);
    box-shadow: var(--shadow-action);
  }
  .btn--primary:hover {
    background: var(--color-action-hover);
  }
  .btn--secondary {
    background: transparent;
    color: var(--cbt-negru);
    border-color: var(--cbt-gri-30);
  }
  .btn--secondary:hover {
    border-color: var(--cbt-negru);
  }
</style>
