<script lang="ts">
  import { getContext } from 'svelte';
  import { type DataGridContext, key } from './DataGridContext.js';

  type TRow = $$Generic;

  const { resultInfo } = getContext<DataGridContext<TRow>>(key);
</script>

{#if $resultInfo}
  <div class='sdg-result-info'>
    <small>
      {$resultInfo.filteredItems.toLocaleString()} results
      {#if $resultInfo.filteredItems !== $resultInfo.items}
        (filtered from {$resultInfo.items.toLocaleString()} total results)
      {/if}
    </small>
  </div>
{/if}
