<script lang="ts">
  import Column from '$lib/Column.svelte';
  import DataGrid from '$lib/DataGrid.svelte';
  import ListPaginator from '$lib/ListPaginator.svelte';
  import { HighlightSvelte } from 'svelte-highlight';
  import { Product, getData } from '$lib/demo/DummyJson.js';
  import DataGridSearch from '$lib/DataGridSearch.svelte';
  import ResultInfo from '$lib/ResultInfo.svelte';
  import basicExample from './basic-example.txt?raw';
</script>

<section>
  <hgroup>
    <h1>Svelte Datagrid</h1>
    <p>Type-safe tables!</p>
  </hgroup>

  <a href="/docs" role="button">Get started</a>
  <a href="/demo" role="button" class="outline">Demo</a>
</section>

<figure>
  <DataGrid source={getData} type={Product} let:data items={5}>
    <DataGridSearch slot=search />
    <Column {data} header="Product" value={(d) => d.product_name} />
    <Column {data} header="Manufacturer" value={(d) => d.manufacturer} />
    <Column {data}
      header="Released"
      value={(d) => d.release_date}
      render={(d) => new Date(d.release_date).toLocaleDateString()}
    />
    <Column {data}
      header="Price"
      value={(d) => d.price}
      render={(d) => `€ ${d.price.toFixed(2)}`}
      align="right"
    />
    <ResultInfo slot=resultInfo />
    <ListPaginator slot=paginator />
  </DataGrid>
</figure>

<HighlightSvelte code={basicExample} />

<style>
  :global(.sdg-paginator) {
    justify-content: center;
  }

  :global(.sdg-paginator-nav-button) {
    width: unset;
  }
</style>
