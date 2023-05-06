<script>
  import { getData } from "$lib/demo/DummyJson";
  import Column from "$lib/Column.svelte";
  import DataGrid from "$lib/DataGrid.svelte";
  import ListPaginator from "$lib/ListPaginator.svelte";
  import { HighlightSvelte, LineNumbers } from "svelte-highlight";
  import examples from '$lib/demo/examples';
</script>

<section>
  <hgroup>
    <h1>Svelte Datagrid</h1>
    <p>Blurb</p>
  </hgroup>
  
  <a href="/demo" role=button class=outline>Demo</a>
  <a href="/docs" role=button>Get started</a>  
</section>

<figure>
  <DataGrid source={getData} let:data items={5}>
    <Column {data} value={(d) => d.title} header="Product" />
    <Column {data} value={(d) => d.brand} header="Brand" />
    <Column
      {data}
      value={(d) => d.price}
      header="Price"
      render={(p) => `€ ${p.price.toFixed(2)}`}
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