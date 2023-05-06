<script lang="ts">
  import DataGrid from '$lib/DataGrid.svelte';
  import Column from '$lib/Column.svelte';
  import ListPaginator from '$lib/ListPaginator.svelte';
  import DropdownPaginator from '$lib/DropdownPaginator.svelte';
  import { getData } from '$lib/demo/DummyJson.js';
  import Highlight from 'svelte-highlight';
  import typescript from 'svelte-highlight/languages/typescript';

  const remoteDataExample = `const getData = async (page, items) => {
  const url = new URL('https://dummyjson.com/products');
}`;
</script>

<header class="container">
  <hgroup>
    <h1>svelte-datagrid</h1>
    <p>Developer-friendly and blazing fast 🔥</p>
  </hgroup>
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
      <DataGrid source={getData} let:data>
        <Column {data} value={(d) => d.title} header="Product" />
        <Column {data} value={(d) => d.brand} header="Brand" />
        <Column {data} value={(d) => d.category} header="Category" />
        <Column
          {data}
          value={(d) => d.price}
          header="Price"
          render={(p) => `€ ${p.price.toFixed(2)}`}
          align="right"
        />
        <Column {data} value={(d) => d.discountPercentage} header="Discount" align="right" />
        <ListPaginator />
      </DataGrid>
    </figure>
  </section>
</main>
