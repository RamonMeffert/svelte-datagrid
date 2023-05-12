<script lang="ts">
  import { key, type DataGridContext } from '$lib/types/DataGridContext.js';
  import type { TextAlignment, ValueGetter, ValueRenderer } from '$lib/types/DataGridColumn.js';
  import { getContext, onMount } from 'svelte';

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
      const col = { id: id, key, header, value, render, align };

      if (c) {
        c[id] = col;
      } else {
        c = { [id]: col }
      }
      return c;
    });
  })

  const getKey = () => {
    // Create a new object using the constructor
    const obj = new type();
    // Find the keys
    const keys = Object.keys(obj);
    // Create an object mapping the key to the name of the key itself
    const keyMap = keys.reduce((o, key) => ({ ...o, [key]: key}), {}) as TRow;
    // Use the value function to get the name of the key from the map
    return value(keyMap) as keyof TRow;
  }
</script>

<slot />