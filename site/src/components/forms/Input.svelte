<script lang="ts">
  /** Input — câmp cu etichetă, bordură 2px, focus albastru, eroare roșie. */
  interface Props {
    label: string;
    name: string;
    value?: string;
    type?: string;
    optional?: boolean;
    error?: string;
    placeholder?: string;
    autocomplete?: HTMLInputElement['autocomplete'];
    hint?: string;
  }
  let {
    label,
    name,
    value = $bindable(''),
    type = 'text',
    optional = false,
    error = '',
    placeholder,
    autocomplete,
    hint,
  }: Props = $props();
  const id = `f-${name}`;
</script>

<div class="field">
  <label for={id}>
    {label}{#if optional}<span class="opt">(opțional)</span>{/if}
  </label>
  <input
    {id}
    {name}
    {type}
    {placeholder}
    {autocomplete}
    bind:value
    required={!optional}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
    class:err={!!error}
  />
  {#if error}
    <span class="msg msg--err" id={`${id}-err`}>{error}</span>
  {:else if hint}
    <span class="msg" id={`${id}-hint`}>{hint}</span>
  {/if}
</div>

<style>
  .field {
    margin-bottom: var(--sp-4);
  }
  label {
    display: block;
    font-weight: var(--fw-semibold);
    font-size: var(--fs-small);
    margin-bottom: var(--sp-2);
  }
  .opt {
    margin-left: 0.3em;
    font-weight: var(--fw-regular);
    color: var(--cbt-gri-60);
  }
  input {
    width: 100%;
    padding: 14px 16px;
    min-height: 48px;
    font-family: var(--font-text);
    font-size: var(--fs-body);
    color: var(--cbt-gri-90);
    background: var(--cbt-alb);
    border: 2px solid var(--cbt-gri-30);
    border-radius: var(--radius-sm);
    outline: none;
    transition: border-color var(--dur-fast) var(--ease);
  }
  input:focus {
    border-color: var(--cbt-albastru);
  }
  input.err {
    border-color: var(--cbt-rosu);
  }
  .msg {
    color: var(--cbt-gri-60);
    font-size: var(--fs-label);
    margin-top: var(--sp-1);
    display: block;
  }
  .msg--err {
    color: var(--cbt-rosu);
  }
</style>
