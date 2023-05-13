<script lang="ts">
  import Heading from '$demo/Heading.svelte';
</script>

<Heading level="h1" content="Pagination" />

<p>This library offers two different types of pagination.</p>

<Heading level="h2" content="List-style pagination" />

<p>
  Pages are represented by a list of page numbers. The first and last page number are always
  visible. The current page number is also visible, along with some page numbers that come before
  and after it. Users can also use previous and next buttons to quickly navigate.
</p>

<!-- TODO: Add example of list-style pagination -->
<pre><code>Add example</code></pre>

<Heading level="h2" content="Dropdown-style pagination" />

<p>
  Page numbers are presented in a drop-down selector. When the users picks and item from the
  selector, the page is updated. Users can also use previous and next buttons to quickly navigate.
</p>

<!-- TODO: Add example of dropdown-style pagination -->
<pre><code>Add example</code></pre>
