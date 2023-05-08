<script lang=ts>
  import { HighlightSvelte, Highlight } from 'svelte-highlight';
  import typescript from 'svelte-highlight/languages/typescript';
  import book from './book.txt?raw';
  import bookList from './book-list.txt?raw';
  import bookTable from './book-table.txt?raw';
</script>

<h1>Setup</h1>

<p>Bla bla bla</p>

<h2>Preparation</h2>

<p>
  To get a type-safe table, we must first make sure we have types. A table can
  conceptually be represented as a collection of objects. In svelte-datagrid,
  the type of this object needs te be represented as a class.
</p>

<Highlight language={typescript} code={book} />

<h2>A basic example</h2>

<p>
  Suppose we have a list of books
</p>

<Highlight language={typescript} code={bookList} />

<p>
  Bla bla create a table
</p>

<HighlightSvelte code={bookTable} />