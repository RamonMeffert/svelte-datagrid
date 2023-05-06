<!-- svelte-ignore unused-export-let -->
<script lang="ts">
	import { key, type DataGridContext } from './DataGridContext.js';
	import { getContext } from 'svelte';
	import type { DataGridColumn, TextAlignment, ValueGetter, ValueRenderer } from './types/DataGridColumn.js';
	import type { Writable } from 'svelte/store';

	type TRow = $$Generic;
	type TItem = TRow[keyof TRow];

    // Unused, but required for type safety
	export let data: TRow[];
	export let header: string = '';
    export let align: TextAlignment | undefined = undefined;
	export let value: ValueGetter<TRow>;
	export let render: ValueRenderer<TRow> = (row: TRow) => (value(row) as object).toString();

	const { columns } = getContext<DataGridContext<TRow>>(key);

	columns.update((c) => {
		c.push({ header, value, render, align });
		return c;
	});
</script>
