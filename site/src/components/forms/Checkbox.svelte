<script lang="ts">
  /** Checkbox — consimțământ / opțiune. Eticheta poate conține linkuri (slot). */
  import type { Snippet } from 'svelte';

  interface Props {
    name: string;
    value?: string;
    checked?: boolean;
    error?: string;
    children: Snippet;
  }
  let { name, value = 'da', checked = $bindable(false), error = '', children }: Props = $props();
  const id = `f-${name}-${value}`;
</script>

<div class="cb">
  <input
    type="checkbox"
    {id}
    {name}
    {value}
    bind:checked
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={error ? `${id}-err` : undefined}
  />
  <label for={id}>{@render children()}</label>
</div>
{#if error}
  <span class="err" id={`${id}-err`}>{error}</span>
{/if}

<style>
  .cb {
    display: flex;
    gap: var(--sp-2);
    align-items: flex-start;
    font-size: var(--fs-small);
  }
  input {
    width: 20px;
    height: 20px;
    margin: 2px 0 0;
    accent-color: var(--cbt-albastru);
    flex-shrink: 0;
  }
  label {
    font-weight: var(--fw-regular);
    line-height: 1.5;
  }
  label :global(a) {
    color: var(--cbt-albastru);
    font-weight: var(--fw-semibold);
  }
  .err {
    color: var(--cbt-rosu);
    font-size: var(--fs-label);
    display: block;
    margin-top: 6px;
  }
</style>
