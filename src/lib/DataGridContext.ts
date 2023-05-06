import type { Writable } from "svelte/store";
import type { DataGridColumn } from "./types/DataGridColumn.js";
import type { DataGridPageInfo } from "./types/DataGridPage.js";

// Key for context api
export const key = Symbol();

export type DataGridContext<TRow> = {
    columns: Writable<DataGridColumn<TRow>[]>,
    pageInfo: Writable<DataGridPageInfo | null>,
}