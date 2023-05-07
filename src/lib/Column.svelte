<script lang="ts">
  import { key, type DataGridContext } from './DataGridContext.js';
  import { getContext, onMount } from 'svelte';
  import type { TextAlignment, ValueGetter, ValueRenderer } from './types/DataGridColumn.js';

  type TRow = $$Generic<object>;

  export let data: TRow[];
  export let header: string = '';
  export let align: TextAlignment | undefined = undefined;
  export let value: ValueGetter<TRow>;
  export let render: ValueRenderer<TRow> = (row: TRow) => (value(row) as object).toString();

  const { type, columns } = getContext<DataGridContext<TRow>>(key);

  onMount(() => {
    columns.update((c) => {
      const id = Symbol();
      const key = getKey();
      c[id] = { id: id, key, header, value, render, align };
      return c;
    });
  })

  const getKey = () => {
    // Create a new object using the constructor
    const obj = new type();
    // Find the keys
    const keys = Object.keys(obj);
    // Create an object mapping the key to the name of the key
    const keyMap = keys.reduce((o, key) => ({ ...o, [key]: key}), {}) as TRow;
    // Use the value function to get the name of the key from the map
    return value(keyMap) as keyof TRow;
  }
</script>

<slot />