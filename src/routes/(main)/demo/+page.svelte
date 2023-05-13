<script lang="ts">
  import { Product, getData } from '$demo/DummyJson.js';
  import Column from '$lib/components/Column.svelte';
  import DataGrid from '$lib/components/DataGrid.svelte';
  import ListPaginator from '$lib/components/ListPaginator.svelte';
  import Highlight from 'svelte-highlight';
  import typescript from 'svelte-highlight/languages/typescript';

  const remoteDataExample = `const getData = async (page, items) => {
  const url = new URL('https://dummyjson.com/products');
}`;
</script>

<header class="container">
  <h1>Demo</h1>
  <aside>
    <nav>
      <ul>
        <li><a href="#local-data">Local data</a></li>
        <li><a href="#remote-data">Remote data</a></li>
      </ul>
    </nav>
  </aside>
</header>
<main class="container">
  <section id="local-data">
    <hgroup>
      <h2>Local data</h2>
      <p>Arrays!</p>
    </hgroup>
    <p>Explanation</p>
  </section>

  <section id="remote-data">
    <hgroup>
      <h2>Serverside data</h2>
      <p>Bla bla bla</p>
    </hgroup>
    <p>Explanation</p>
    <Highlight language={typescript} code={remoteDataExample} />

    <figure>
      <DataGrid source={getData} type={Product} let:data>
        <Column {data} value={d => d.product_name} header="Product" />
        <Column {data} value={d => d.manufacturer} header="Brand" />
        <Column {data} value={d => d.release_date} header="Released" />
        <Column
          {data}
          value={d => d.price}
          header="Price"
          render={p => `€ ${p.price.toFixed(2)}`}
          align="right"
        />
        <ListPaginator />
      </DataGrid>
    </figure>
  </section>
</main>
