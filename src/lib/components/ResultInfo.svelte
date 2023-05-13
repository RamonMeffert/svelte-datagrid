<script lang="ts">
  import { key, type DataGridContext } from '$lib/types/DataGridContext.js';
  import { getContext } from 'svelte';

  type TRow = $$Generic;

  const { resultInfo } = getContext<DataGridContext<TRow>>(key);
</script>

<!--
  @component
  An element showing some metadata about the current results, such as the number
  of total results and the number of filtered results.
  
  **Usage**

  ```tsx
  <DataGrid ... >
    <ResultInfo slot=resultInfo />
  </DataGrid>
  ```

-->

{#if $resultInfo}
  <div class="sdg-result-info">
    <small>
      {$resultInfo.filteredItems.toLocaleString()} results
      {#if $resultInfo.filteredItems !== $resultInfo.items}
        (filtered from {$resultInfo.items.toLocaleString()} total results)
      {/if}
    </small>
  </div>
{/if}
