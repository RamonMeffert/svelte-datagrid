import type { Writable } from "svelte/store";
import type { DataGridColumn } from "./types/DataGridColumn.js";
import type { DataGridPageInfo } from "./types/DataGridPage.js";
import type { DataGridSortInfo } from "./types/DataGridSortInfo.js";

// Key for context api
export const key = Symbol();

export type DataGridContext<TRow> = {
    type: new() => TRow,
    columns: Writable<{ [id: symbol]: DataGridColumn<TRow>}>,
    pageInfo: Writable<DataGridPageInfo | null>,
    sortInfo: Writable<DataGridSortInfo>,
}