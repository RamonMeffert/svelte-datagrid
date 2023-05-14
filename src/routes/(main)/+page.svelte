<script lang="ts">
  import Column from '$lib/components/Column.svelte';
  import DataGrid from '$lib/components/DataGrid.svelte';
  import DataGridSearch from '$lib/components/DataGridSearch.svelte';
  import ListPaginator from '$lib/components/ListPaginator.svelte';
  import ResultInfo from '$lib/components/ResultInfo.svelte';
  import { Product, getData } from '$demo/DummyJson.js';
  import Icon from '$demo/Icon.svelte';
  import CopyIcon from '$demo/CopyIcon.svelte';
  import { HighlightSvelte } from 'svelte-highlight';
  import basicExample from './basic-example.txt?raw';
  import type { CustomFilters } from '$lib/types/DataGridPage.js';

  const copyInstallCodeInitialValue = 'Copy to clipboard';
  let copyInstallCodeText = copyInstallCodeInitialValue;

  function copyInstallCode(e: Event) {
    navigator.clipboard.writeText('npm install svelte-datagrid');
    copyInstallCodeText = 'Copied!';
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      copyInstallCodeText = copyInstallCodeInitialValue;
    }, 1500);
  }
</script>

<section class="masthead">
  <Icon height="4rem" strokeWidth="1px" />
  <hgroup>
    <h1>Svelte Datagrid</h1>
    <p>Type-safe tables!</p>
  </hgroup>

  <div class="cta">
    <div class="install">
      <code>Available soon!</code>
    </div>
    <div class="install" hidden>
      <code>$ npm install svelte-datagrid</code>
      <button on:click={copyInstallCode} data-tooltip={copyInstallCodeText}><CopyIcon /></button>
    </div>
    <a href="/docs" role="button">Documentation</a>
  </div>
</section>

<main class="container">
  <figure>
    <DataGrid source={getData} type={Product} let:data items={5}>
      <DataGridSearch slot="search" />
      <Column {data} header="Product" value={d => d.product_name} />
      <Column {data} header="Manufacturer" value={d => d.manufacturer} />
      <Column
        {data}
        header="Released"
        value={d => d.release_date}
        render={d => new Date(d.release_date).toLocaleDateString()}
      />
      <Column
        {data}
        header="Price"
        value={d => d.price}
        render={d => `€ ${d.price.toFixed(2)}`}
        align="right"
      />
      <ResultInfo slot="resultInfo" />
      <ListPaginator slot="paginator" />
    </DataGrid>
  </figure>

  <HighlightSvelte code={basicExample} />
</main>

<style>
  :global(.sdg-paginator) {
    justify-content: center;
  }

  :global(.sdg-paginator-nav-button) {
    width: unset;
  }

  .masthead {
    text-align: center;
    padding: var(--block-spacing-vertical) 0;
    background: linear-gradient(transparent, rgba(16, 149, 193, 0.1) 75%, transparent),
      radial-gradient(ellipse at center, rgba(16, 149, 193, 0.2), transparent 75%);
  }

  .masthead .cta {
    display: flex;
    gap: var(--spacing);
    justify-content: center;
    align-items: stretch;
  }

  .masthead .install {
    display: flex;
    align-items: stretch;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
  }

  .masthead .install code {
    display: flex;
    align-items: center;
    white-space: nowrap;
    background-color: transparent;
  }

  .masthead .install button {
    margin: 0;
    background-color: transparent;
    border: none;
    color: inherit;
  }

  .masthead .install button :global(svg) {
    display: block;
  }
</style>
