<script lang="ts">
  import { HighlightSvelte, Highlight } from 'svelte-highlight';
  import typescript from 'svelte-highlight/languages/typescript';
  import book from './book.txt?raw';
  import bookList from './book-list.txt?raw';
  import bookTable from './book-table.txt?raw';
  import Heading from '$demo/Heading.svelte';
</script>

<Heading level="h1" content="Setup" />

<p>Bla bla bla</p>

<Heading level="h2" content="Preparation" />

<p>
  To get a type-safe table, we must first make sure we have types. A table can conceptually be
  represented as a collection of objects. In svelte-datagrid, the type of this object needs te be
  represented as a class.
</p>

<Highlight language={typescript} code={book} />

<Heading level="h2" content="A basic example" />

<p>Suppose we have a list of books</p>

<Highlight language={typescript} code={bookList} />

<p>Bla bla create a table</p>

<HighlightSvelte code={bookTable} />
