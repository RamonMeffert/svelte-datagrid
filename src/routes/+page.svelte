<script lang="ts">
  import Column from '$lib/Column.svelte';
  import DataGrid from '$lib/DataGrid.svelte';
  import ListPaginator from '$lib/ListPaginator.svelte';
  import { HighlightSvelte } from 'svelte-highlight';
  import examples from '$lib/demo/examples.js';
  import { Product, getData } from '$lib/demo/DummyJson.js';
</script>

<section>
  <hgroup>
    <h1>Svelte Datagrid</h1>
    <p>Type-safe tables!</p>
  </hgroup>

  <a href="/demo" role="button" class="outline">Demo</a>
  <a href="/docs" role="button">Get started</a>
</section>

<figure>
  <DataGrid source={getData} type={Product} let:data items={5}>
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
    <ListPaginator />
  </DataGrid>
</figure>

<HighlightSvelte code={examples.home.basic} />

<style>
  :global(.sdg-paginator) {
    justify-content: center;
  }

  :global(.sdg-paginator-nav-button) {
    width: unset;
  }
</style>
