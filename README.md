# Svelte Datagrid

> **Warning**  
> This library is a work-in-progress. It is not available on NPM.

An experimental type-safe datagrid library aiming to improve developer
experience over existing libraries while maintaining great performance and
customisability.

## Getting started

> **Note**  
> Full documentation is available on <https://svelte-datagrid.pages.dev/docs>.

A basic table looks like this:

```svelte
<DataGrid type={Book} source={books} let:data>
  <Column {data} header="Title" value={b => b.title} />
  <Column {data} header="Author" value={b => b.author} />
  <Column {data} header="Price" value={b => b.price} />
  <ListPaginator slot="paginator" />
</DataGrid>
```

## Developing

```sh
git clone https://github.com/RamonMeffert/svelte-datagrid.git
cd svelte-datagrid
bun install
bun run dev
```
