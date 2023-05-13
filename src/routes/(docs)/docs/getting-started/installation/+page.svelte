<script lang="ts">
  import Heading from '$demo/Heading.svelte';

  let pm = 'bun';
  const pmCode: { [key: string]: string } = {
    ['bun']: 'bun i svelte-datagrid',
    ['yarn']: 'yarn add svelte-datagrid',
    ['npm']: 'npm install svelte-datagrid',
    ['pnpm']: 'pnpm install svelte-datagrid',
  };
</script>

<Heading level="h1" content="Installation" />

<div class="tabs">
  <button class:current={pm === 'bun'} on:click={() => (pm = 'bun')}>bun</button>
  <button class:current={pm === 'yarn'} on:click={() => (pm = 'yarn')}>yarn</button>
  <button class="sc" class:current={pm === 'npm'} on:click={() => (pm = 'npm')}>npm</button>
  <button class="sc" class:current={pm === 'pnpm'} on:click={() => (pm = 'pnpm')}>pnpm</button>
</div>

<div class="tab-content">
  <pre><code>{pmCode[pm]}</code></pre>
</div>

<style scoped>
  .tabs {
    display: flex;
  }

  .tabs button {
    background: unset;
    border: unset;
    width: unset;
    cursor: pointer;
    border-radius: 0;
    font-variant: small-caps;
    margin: 0;
  }

  .tabs button.current {
    border-bottom: 2px solid var(--primary);
  }
</style>
