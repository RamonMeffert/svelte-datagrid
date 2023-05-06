<script lang=ts>
  import { getContext } from "svelte";
  import { type DataGridContext, key } from "./DataGridContext.js";

  type TRow = $$Generic;

  const { pageInfo } = getContext<DataGridContext<TRow>>(key);
</script>

<div class=paginator>
  {#if $pageInfo}
  {@const current = $pageInfo.page}
  {@const total = $pageInfo.total.pages}
  <button disabled={current <= 1} on:click={() => {$pageInfo.page -= 1}} >Previous</button>
  <select bind:value={$pageInfo.page}>
    {#each [...Array($pageInfo.total.pages).keys()] as page}
      <option value="{page + 1}">{page + 1}</option>
    {/each}
  </select>
  <button disabled={current >= total} on:click={() => {$pageInfo.page += 1}}>Next</button>
  {/if}
</div>
