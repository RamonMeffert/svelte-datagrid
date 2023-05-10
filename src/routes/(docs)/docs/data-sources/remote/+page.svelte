<script lang=ts>
  import { HighlightSvelte, Highlight } from 'svelte-highlight';
  import typescript from 'svelte-highlight/languages/typescript';
  import uwu from './func.txt?raw';
</script>

<h1>Remote data</h1>

<p>
  To work with remote data, you need to implement the <code>source</code>
  function. For convenience, you can use the
  <code>DataGridSource&lt;TRow&gt;</code> type to make sure you've implement the
  function correctly.
</p>

<Highlight language={typescript} code={uwu} />