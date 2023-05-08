import type { Writable } from "svelte/store";
import type { DataGridColumn } from "./types/DataGridColumn.js";
import type { DataGridQuery, DataGridResult } from "./types/DataGridPage.js";

// Key for context api
export const key = Symbol();

export type DataGridContext<TRow> = {
    type: new() => TRow,
    columns: Writable<{ [id: symbol]: DataGridColumn<TRow>} | undefined>,
    query: Writable<DataGridQuery>,
    resultInfo: Writable<DataGridResult | undefined>,
}