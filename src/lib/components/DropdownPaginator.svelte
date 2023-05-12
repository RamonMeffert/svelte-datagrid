<script lang="ts">
  import { type DataGridContext, key } from '$lib/types/DataGridContext.js';
  import { getContext } from 'svelte';

  type TRow = $$Generic;

  const { query, resultInfo } = getContext<DataGridContext<TRow>>(key);
</script>

<div class="paginator">
  {#if $resultInfo}
    {@const current = $query.page}
    {@const total = $resultInfo.pages}
    <button disabled={current <= 1} on:click={() => ($query.page -= 1)}>Previous</button>
    <select bind:value={$query.page}>
      {#each [...Array($resultInfo.pages).keys()] as page}
        <option value={page + 1}>{page + 1}</option>
      {/each}
    </select>
    <button disabled={current >= total} on:click={() => ($query.page += 1)}>Next</button>
  {/if}
</div>
