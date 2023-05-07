<script lang="ts">
  import type { DataGridSource } from './types/DataGridSource.js';

  import type { DataGridSortInfo, SortDirection } from './types/DataGridSortInfo.js';

  import { debounce } from './util/debounce.js';

  import { getStyle } from './util/style.js';
  import { getPage, getPageInfoFromPage } from './util/page.js';
  import { key, type DataGridContext } from './DataGridContext.js';
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { DataGridPage, DataGridPageInfo } from './types/DataGridPage.js';
  import type { DataGridColumn } from './types/DataGridColumn.js';

  // Type representing a row of data
  type TRow = $$Generic;

  // Data source. Can be a set or a promise.
  export let type: new () => TRow;

  export let source: DataGridSource<TRow>;
  export let items: number = 10;

  // Because columns are defined outside of the data grid, we need a store.
  // Columns get this store using the Context API and write their column info
  // to it.
  const columns = writable<{ [id: symbol]: DataGridColumn<TRow> }>({});

  // Since the paginator is a separate component, we need to be able to tell
  // it how many pages there are, how many pages there are, etc.
  const pageInfo = writable<DataGridPageInfo | null>(null);

  const sortInfo = writable<DataGridSortInfo>({ column: undefined, direction: 'asc' });

  // We know info about the columns
  $: columnsInitialized = Object.getOwnPropertySymbols($columns).length > 0;

  let loading = false;

  // Define context for the context API.
  setContext<DataGridContext<TRow>>(key, {
    type,
    columns,
    pageInfo,
    sortInfo
  });

  // Result from data source. Contains info about pagination
  let page: DataGridPage<TRow> | null = null;

  // View on data present in the current page.
  let data: TRow[];

  // Styles for the table.
  let style: string = '';

  // Data should be reactive
  $: data = page?.data || [];

  // When the page change is requested, go to a different page.
  $: $pageInfo && goToPage();

  async function goToPage() {
    if ($pageInfo) {
      loading = true;
      if ($sortInfo.column) {
        page = await getPage(
          source,
          $pageInfo.page,
          $pageInfo.items,
          $columns[$sortInfo.column].key,
          $sortInfo.direction
        );
      } else {
        page = await getPage(source, $pageInfo.page, $pageInfo.items);
      }
      loading = false;
    }
  }

  sortInfo.subscribe(async (i) => {
    if ($pageInfo && $columns) {
      loading = true;
      if (i.column) {
        page = await getPage(source, $pageInfo.page, $pageInfo.items, $columns[i.column].key, i.direction);
      } else {
        page = await getPage(source, $pageInfo.page, $pageInfo.items);
      }
      loading = false;
    }
  })

  function getPaginationInfoFromUrl(url: string) {
    const params = new URL(url).searchParams;
    const pageParam = params.get('page');
    const page = pageParam ? parseInt(pageParam) : undefined;
    const itemsParam = params.get('items');
    const items = itemsParam ? parseInt(itemsParam) : undefined;
    return { page, items };
  }

  // On pageload, request first data.
  onMount(async () => {
    style = getStyle($columns);
    const { page: currentPage, items: urlItems } = getPaginationInfoFromUrl(document.location.href);
    page = await getPage(source, currentPage ?? 1, urlItems ?? items, undefined);
    if (page) {
      $pageInfo = getPageInfoFromPage(page);
    }
  });

  const setSort = (columnKey: symbol) => {
    sortInfo.update((s) => {
      // If a column is already sorted,
      if (s.column === columnKey) {
        // and if the current direction is ascending,
        if (s.direction === 'asc') {
          // change the direction to descending;
          s.direction = 'desc';
        } else {
          // otherwise, if the direction is already descending, remove the sort.
          s.column = undefined;
        }
        // If no column is being sorted,
      } else {
        // Set the clicked column as sorted.
        s.column = columnKey;
        // and sort it ascending.
        s.direction = 'asc';
      }
      return s;
    });
  };
</script>

<svelte:head>
  {@html `<style>${style}</style>`}
</svelte:head>

<table class=sdg-datagrid class:loading>
  <thead>
    <tr>
      {#if !columnsInitialized}
        <tr><th><div class="sdg-item-placeholder" /></th></tr>
      {:else if columnsInitialized && data.length === 0}
        {#each Object.getOwnPropertySymbols($columns) as _columnKey}
          <th><div class="sdg-item-placeholder" /></th>
        {/each}
      {:else}
        {#each Object.getOwnPropertySymbols($columns) as columnKey}
          {@const column = $columns[columnKey]}
          {@const sort = $sortInfo.column === columnKey ? $sortInfo.direction : ''}
          <th>
            <button on:click={() => setSort(columnKey)} class="sdg-table-head {sort}">
              {column.header}
            </button>
          </th>
        {/each}
      {/if}
    </tr>
  </thead>
  <tbody>
    {#if data.length === 0}
      {#each [...Array(items).keys()] as _row}
        <tr>
          {#if columnsInitialized}
            {#each Object.getOwnPropertySymbols($columns) as _columnKey}
              <td><div class="sdg-item-placeholder" /></td>
            {/each}
          {:else}
            <td><div class="sdg-item-placeholder" /></td>
          {/if}
        </tr>
      {/each}
    {:else}
      {#each data as row}
        <tr>
          {#each Object.getOwnPropertySymbols($columns) as columnKey}
            {@const column = $columns[columnKey]}
            <td>{column.render(row)}</td>
          {/each}
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<!--
    By defining data as a slot prop, we can access it from the defining
    context. This allows for an easy way to communicate the data type to the
    columns, which then allows us to define functions for field access and
    custom rendering on the column itself.

    This is also where the paginator will be rendered.
-->
<slot {data} />
