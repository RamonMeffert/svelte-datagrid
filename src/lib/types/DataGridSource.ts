import type { DataGridPage, SortDirection } from './DataGridPage.js';

export type DataGridSource<TRow> =
  | ((
      page: number,
      items: number,
      search?: string,
      sortColumn?: symbol,
      sortKey?: keyof TRow,
      order?: SortDirection,
    ) => Promise<DataGridPage<TRow> | null>)
  | TRow[];
