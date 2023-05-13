<script lang="ts">
  import { Highlight } from 'svelte-highlight';
  import typescript from 'svelte-highlight/languages/typescript';
  import Heading from '$demo/Heading.svelte';
  import dataGridSource from './dataGridSource.txt?raw';
  import dataGridPage from './dataGridPage.txt?raw';
  import booksDataGridSource from './booksDataGridSource.txt?raw';
  import booksUrl1 from './booksUrl1.txt?raw';
  import booksUrl2 from './booksUrl2.txt?raw';
</script>

<Heading level="h1" content="Remote data" />

<p>
  To work with remote data, you need to implement the <code>source</code>
  function. For convenience, you can use the
  <code>DataGridSource&lt;TRow&gt;</code> type to make sure you've implement the function correctly.
</p>

<Highlight language={typescript} code={dataGridSource} />

<p>
  This function returns a promise that resolves to a
  <code>DataGridPage&lt;TRow&gt;</code> or <code>null</code> if the request fails. The
  <code>DataGridPage&lt;TRow&gt;</code> type looks like this:
</p>

<Highlight language={typescript} code={dataGridPage} />

<Heading level="h2" content="Example" />

<p>
  The most common source for remote data is an API. In this example, we will look at a REST API.
  We'll use the <code>Book</code> type we've been using again, and assume we're querying a library for
  the books they have available.
</p>

<Heading level="h3" content="Our fake library endpoint" />

<p>
  We'll build our <code>DataSource</code> function piece-by-piece. We start by looking at our REST
  endpoint. We'll say the base URL is
  <code>https://api.library.fake/v1/</code> and our endpoint is located at
  <code>/books</code>. The library has documented their REST API well, so we know that we can filter
  the result using URL query parameters:
</p>

<table>
  <thead>
    <tr><th>Parameter</th><th>Result</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>N/A</td>
      <td>Returns a list of 20 books, sorted by author.</td>
    </tr>
    <tr>
      <td><code>?limit=10</code></td>
      <td>Limits the number of results to 10.</td>
    </tr>
    <tr>
      <td><code>?skip=20</code></td>
      <td>Skips the first 20 results.</td>
    </tr>
    <tr>
      <td><code>?q=[QUERY]</code></td>
      <td>Searches for the string <code>[QUERY]</code> in the author and title fields.</td>
    </tr>
    <tr>
      <td><code>?sort=[COLUMN]</code></td>
      <td>Sorts the books by <code>[COLUMN]</code> in ascending order.</td>
    </tr>
    <tr>
      <td><code>?order=desc</code></td>
      <td>Sorts the books by <code>[QUERY]</code> in descending order.</td>
    </tr>
  </tbody>
</table>

<p>
  By combining these parameters, we can search through the books the library offers fairly
  thoroughly. All we have to do is translate the parameters provided by svelte-datagrid to the
  library's query parameters.
</p>

<Heading level="h3" content="Building our data source function" />

<p>
  We'll start by creating a function and typing it using our
  <code>DataGridSource&lt;TRow&gt;</code> type.
</p>

<Highlight language={typescript} code={booksDataGridSource} />

<p>
  Next, well start constructing our endpoint URL. The easiest way to make sure query parameters are
  added correctly is by using the <code>URL</code> class, so we'll create a <code>URL</code> object first:
</p>

<Highlight language={typescript} code={booksUrl1} />

<Heading level="h4" content="Pagination" />

<p>
  We'll look at adding pagination support next. Our library doesn't explicitly use pages, so we'll
  need to translate our <code>page</code> and
  <code>items</code> variables to the format they expect. They want to know how many items from the
  result set to skip, which we can easily calculate using the page number and the number of items on
  a page. The <code>limit</code>
  query parameter works the same as our <code>item</code> parameter, so we can use it directly.
  Then, we'll add the necesary query parameters to the
  <code>URL</code> object.
</p>

<Highlight language={typescript} code={booksUrl2} />
