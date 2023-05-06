<script lang="ts">
  import type { DataGridPageInfo } from './types/DataGridPage.js';

  import { getContext } from 'svelte';
  import { key, type DataGridContext } from './DataGridContext.js';

  type TRow = $$Generic;

  export let window = 3;

  const { pageInfo } = getContext<DataGridContext<TRow>>(key);

  $: _window = getWindow($pageInfo);

  function getWindow(pageInfo: DataGridPageInfo | null) {
    if (pageInfo) {
      const center = Math.ceil(window / 2);
      const offset = window - center;
      const minCenter = center + offset + 1;
      const maxCenter = (pageInfo.total.pages ?? 0) - center - offset;
      const page = pageInfo.page;
      const displayPage = Math.min(maxCenter, Math.max(minCenter, page));

      const pages = [...Array(window).keys()].map((i) => {
        return displayPage + i - offset;
      });

      if (pages[0] === 3) {
        pages.unshift(2);
      }

      if (pages.at(-1) === pageInfo.total.pages - 2) {
        pages.push(pageInfo.total.pages - 1)
      }

      return {
        pages: pages,
        firstEllipsis: pages[0] >= 3,
        lastEllipsis: pages.at(-1)! <= pageInfo.total.pages - 2
      };
    }
    return {
      pages: [],
      firstEllipsis: false,
      lastEllipsis: false,
    }
  }

  function setPage(page: number) {
    if ($pageInfo) {
      $pageInfo.page = page;
    }
  }
</script>

<!--
    @component
    A paginator that shows a list of page numbers, along with next and previous
    buttons.
-->

<div class="sdg-paginator">
  {#if $pageInfo}
    {@const total = $pageInfo.total.pages}
    {@const current = $pageInfo.page}
    <button class="sdg-paginator-nav-button" disabled={current <= 1} on:click={() => setPage(current - 1)}>Previous</button>
    {#if total > 5}
      <button class:current={current === 1} on:click={() => setPage(1)} class="sdg-paginator-button"
        >1</button
      >
      {#if _window.firstEllipsis}
        <div class="sdg-paginator-ellipsis">&hellip;</div>
      {/if}
      {#each _window.pages as page}
        <button class:current={current === page} on:click={() => setPage(page)} class="sdg-paginator-button"
          >{page}</button
        >
      {/each}
      {#if _window.lastEllipsis}
        <div class="sdg-paginator-ellipsis">&hellip;</div>
      {/if}
      <button class:current={current === total} on:click={() => setPage(total)} class="sdg-paginator-button"
        >{total}</button
      >
    {:else}
      {#each [...Array(total).keys()] as page}
        <button class:current={current === page + 1} on:click={() =>
        setPage(page + 1)} class="sdg-paginator-button"
          >{page + 1}</button
        >
      {/each}
    {/if}
    <button  class="sdg-paginator-nav-button" on:click={() => setPage(current + 1)} disabled={current >= total}>Next</button>
  {:else}
    <button disabled>Previous</button>
    {#each [...Array(window + 4).keys()] as page}
      <div class="sdg-placeholder sdg-paginator-button">
        <span class="sdg-fake-number"></span>
      </div>
    {/each}
    <button disabled>Next</button>
  {/if}
</div>
