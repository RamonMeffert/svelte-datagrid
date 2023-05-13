<script lang="ts">
  import { key, type DataGridContext } from '$lib/types/DataGridContext.js';
  import { getContext } from 'svelte';

  type TRow = $$Generic;

  /** Term to use when there is only one result. Defaults to 'result'. */
  export let sg = 'result';
  
  /** Term to use when there are zero, or more than one results. Defaults to
   * 'results'. */
  export let pl = 'results';

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
      {$resultInfo.filteredItems.toLocaleString()}
      {$resultInfo.filteredItems === 1 ? sg : pl}
      {#if $resultInfo.filteredItems !== $resultInfo.items}
        (filtered from {$resultInfo.items.toLocaleString()} total {$resultInfo.items === 1 ? sg : pl})
      {/if}
    </small>
  </div>
{/if}
