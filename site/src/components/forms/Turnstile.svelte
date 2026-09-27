<script lang="ts">
  /**
   * Cloudflare Turnstile — verificare anti-spam. În majoritatea cazurilor e invizibilă;
   * apare doar dacă Cloudflare are dubii. Dacă nu e configurată cheia, nu face nimic.
   */
  import { onMount } from 'svelte';
  import { TURNSTILE_KEY, incarcaTurnstile } from '../../scripts/formulare';

  let { token = $bindable('') }: { token?: string } = $props();
  let el: HTMLDivElement;
  let widgetId: string | undefined;

  export function reset() {
    token = '';
    if (widgetId !== undefined) window.turnstile?.reset(widgetId);
  }

  onMount(() => {
    if (!TURNSTILE_KEY) return;
    let anulat = false;
    incarcaTurnstile()
      .then((ts) => {
        if (anulat) return;
        widgetId = ts.render(el, {
          sitekey: TURNSTILE_KEY,
          appearance: 'interaction-only',
          language: 'ro',
          callback: (t: string) => (token = t),
          'expired-callback': () => (token = ''),
          'error-callback': () => (token = ''),
        });
      })
      .catch(() => {
        /* Dacă Turnstile nu se încarcă, serverul va refuza trimiterea cu un mesaj clar. */
      });
    return () => {
      anulat = true;
      if (widgetId !== undefined) window.turnstile?.remove(widgetId);
    };
  });
</script>

<div bind:this={el} class="ts"></div>

<style>
  .ts:empty {
    display: none;
  }
  .ts {
    margin-bottom: var(--sp-3);
  }
</style>
