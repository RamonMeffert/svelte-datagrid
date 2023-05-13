<script lang="ts">
  import { getPage } from '$lib/util/page.js';
  import { getStyle } from '$lib/util/style.js';
  import { key, type DataGridContext } from '$lib/types/DataGridContext.js';
  import type { DataGridPage, DataGridQuery, DataGridResult } from '$lib/types/DataGridPage.js';
  import type { DataGridColumn } from '$lib/types/DataGridColumn.js';
  import type { DataGridSource } from '$lib/types/DataGridSource.js';
  import { onDestroy, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { BROWSER } from 'esm-env';

  // Type representing a row of data
  type TRow = $$Generic;

  /* ===== Component parameters ============================================= */

  /** Expects a constructor for a class representing one row of data. */
  export let type: new () => TRow;

  /** The data source. Can be an array or a promise resolving to a DataGridPage object. */
  export let source: DataGridSource<TRow>;

  /** The number of items to show on a page. Defaults to 10. */
  export let items: number = 10;

  /* ===== Stores and Context API =========================================== */

  // Because columns are defined outside of the data grid, we need a store.
  // Columns get this store using the Context API and write their column info
  // to it.
  const columns = writable<{ [id: symbol]: DataGridColumn<TRow> } | undefined>(undefined);

  // Since the paginator is a separate component, we need to be able to tell
  // it how many pages there are, how many pages there are, etc. We use a store
  // for that.
  const query = writable<DataGridQuery>({
    page: 1,
    items: items,
  });

  const resultInfo = writable<DataGridResult | undefined>();

  // Define context for the context Api.sort.
  setContext<DataGridContext<TRow>>(key, {
    type,
    columns,
    query,
    resultInfo,
  });

  /* ===== Internal variables =============================================== */

  let initializing = true;
  let loading = false;

  // Result from data source. Contains info about pagination
  let page: DataGridPage<TRow> | null = null;

  // View on data present in the current page.
  let data: TRow[];

  // Styles for the table.
  let style: string = '';

  /* ===== Reactive variables =============================================== */

  // Data should be reactive
  $: data = page?.data || [];

  $: style = $columns ? getStyle($columns) : '';

  // When the page changes, update the data
  const unsubscribePageInfo = query.subscribe(update);

  /* ===== Functions ======================================================== */

  async function update() {
    if (BROWSER) {
      loading = true;

      const sortKey = $columns && $query.sort ? $columns?.[$query.sort?.column].key : undefined;

      page = await getPage(
        source,
        $query.page ?? 1,
        $query.items ?? items,
        $query.search,
        $query.sort?.column,
        sortKey,
        $query.sort?.direction,
      );

      resultInfo.update(ri => {
        if (page?.total) {
          ri = page.total;
        }

        return ri;
      });

      initializing = false;
      loading = false;
    }
  }

  /**
   * Read query parameters to set pagination and search
   *
   * @param url
   */
  function getPaginationInfoFromUrl(url: string) {
    const params = new URL(url).searchParams;

    const pageParam = params.get('page');
    const page = pageParam ? parseInt(pageParam) : undefined;

    const itemsParam = params.get('items');
    const items = itemsParam ? parseInt(itemsParam) : undefined;

    const searchParam = params.get('search');
    const search = searchParam ?? undefined;

    return { page, items, search };
  }

  const setSort = (columnKey: symbol) => {
    query.update(pi => {
      if (pi) {
        // If a column is already sorted,
        if (pi?.sort?.column === columnKey) {
          // and if the current direction is ascending,
          if (pi.sort.direction === 'asc') {
            // change the direction to descending;
            pi.sort.direction = 'desc';
          } else {
            // otherwise, if the direction is already descending, remove the sort.
            pi.sort = undefined;
          }
          // If no column is being sorted,
        } else {
          // Set the clicked column as sorted.
          pi.sort = {
            column: columnKey,
            direction: 'asc',
          };
        }
      }

      return pi;
    });
  };

  /* ===== Component lifetime functions====================================== */

  // On pageload, request first data.
  onMount(async () => {
    const {
      page: urlPage,
      items: urlItems,
      search,
    } = getPaginationInfoFromUrl(document.location.href);

    // Update all fields of pageInfo store at once to reduce number of calls
    // to update()
    query.update(pi => {
      pi.items = urlItems ?? items;
      pi.page = urlPage ?? 1;
      if (search) {
        pi.search = search;
      }

      return pi;
    });
  });

  onDestroy(() => {
    unsubscribePageInfo();
  });
</script>

<!--
  @component
  Type-safe datagrid component.

  **Usage**

  ```tsx
  <DataGrid type={Class} source={getData} items={10} let:data>
    // Place <Column>s here
  </DataGrid>
  ```

  **Properties**

  - `type` **(required)** Class constructor
  - `source` **(required)** The data source for the grid. Can be a list of
    objects or a async method implementing the `DataSource<TRow>` type.
  - `items` _(optional)_ The number of items to show on a page. Defaults to 10.

  **Slots**

  The slots are positioned like this:

  ```tsx
  <slot name=search />
  <DataGrid />
  <slot name=resultInfo />
  <slot name=paginator />
  ```

  - `search` - Location for a search bar.
  - `resultInfo` - Location for metadata.
  - `paginator` - Location for a paginator.
 -->

<svelte:head>
  {@html `<style>${style}</style>`}
</svelte:head>

<slot name="search" />

<table class="sdg-datagrid" class:loading>
  <thead>
    <tr>
      {#if !$columns}
        <!--
          We don't have information on the columns, so render a one-column
          placeholder header.
        -->
        <tr><th><div class="sdg-item-placeholder" /></th></tr>
      {:else}
        <!--
          We know everything we need to know about the columns, so render the
          column headers.
        -->
        {#each Object.getOwnPropertySymbols($columns) as columnKey}
          {@const column = $columns[columnKey]}
          {@const sort = $query.sort?.column === columnKey ? $query.sort.direction : ''}
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
    {#if !initializing && $columns}
      {@const columnKeys = Object.getOwnPropertySymbols($columns)}
      <!-- We have everything we need, render normally -->
      {#if data.length === 0}
        <tr>
          <td colspan={columnKeys.length}>
            <div class="sdg-no-data">No data.</div>
          </td>
        </tr>
      {:else}
        {#each data as row}
          <tr>
            {#each columnKeys as columnKey}
              {@const column = $columns[columnKey]}
              {#if column.html}
                {@const htmlToRender = column.render(row)}
                <td>{@html htmlToRender}</td>
              {:else}
                <td>{column.render(row)}</td>
              {/if}
            {/each}
          </tr>
        {/each}
      {/if}
    {:else if initializing && $columns}
      <!--
        We don't have data, but we know which columns there are. Do render
        columns, but set a placeholder item as content.
      -->
      {#each [...Array(items).keys()] as _row}
        <tr>
          {#each Object.getOwnPropertySymbols($columns) as _columnKey}
            <td><div class="sdg-item-placeholder" /></td>
          {/each}
        </tr>
      {/each}
    {:else}
      <!--
        We might have data, but we don't know which columns there are. Render a
        one-column placeholder until we receive information about the columns.
      -->
      {#each [...Array(items).keys()] as _row}
        <tr><td><div class="sdg-item-placeholder" /></td></tr>
      {/each}
    {/if}
  </tbody>
</table>

<slot name="resultInfo" />

<slot name="paginator" />

<!--
    By defining data as a slot prop, we can access it from the defining
    context. This allows for an easy way to communicate the data type to the
    columns, which then allows us to define functions for field access and
    custom rendering on the column itself.
-->
<slot {data} />
