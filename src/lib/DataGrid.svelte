<script lang="ts">
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

  // Because columns are defined outside of the data grid, we need a store.
  // Columns get this store using the Context API and write their column info
  // to it.
  const columns = writable<DataGridColumn<TRow>[]>([]);

  // Since the paginator is a separate component, we need to be able to tell
  // it how many pages there are, how many pages there are, etc.
  const pageInfo = writable<DataGridPageInfo | null>(null);

  // Define context for the context API.
  setContext<DataGridContext<TRow>>(key, {
    columns,
    pageInfo
  });

  // Data source. Can be a set or a promise.
  export let source: ((page: number, items: number) => Promise<DataGridPage<TRow> | null>) | TRow[];
  export let items: number = 10;

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
      page = await getPage(source, $pageInfo.page, $pageInfo.items); 
    }
  }

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
    const { page: currentPage, items: urlItems } = getPaginationInfoFromUrl(document.location.href);
    page = await getPage(source, currentPage ?? 1, urlItems ?? items);
    if (page) {
      $pageInfo = getPageInfoFromPage(page);
    }
    style = getStyle($columns);
  });
</script>

{@html `<style>${style}</style>`}

<table>
  <thead>
    <tr>
      {#each $columns as column}
        <th>{column.header}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        {#each $columns as column}
          <td>{column.render(row)}</td>
        {/each}
      </tr>
    {/each}
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
