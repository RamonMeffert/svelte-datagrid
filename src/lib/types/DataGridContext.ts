import type { DataGridColumn } from '$lib/types/DataGridColumn.js';
import type { DataGridQuery, DataGridResult } from '$lib/types/DataGridPage.js';
import type { Writable } from 'svelte/store';

// Key for context api
export const key = Symbol();

export type DataGridContext<TRow> = {
  type: new () => TRow;
  columns: Writable<{ [id: symbol]: DataGridColumn<TRow> } | undefined>;
  query: Writable<DataGridQuery>;
  resultInfo: Writable<DataGridResult | undefined>;
};
