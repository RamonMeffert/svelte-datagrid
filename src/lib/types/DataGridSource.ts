import type { CustomFilters, DataGridPage, SortDirection } from './DataGridPage.js';

export type DataGridSource<TRow> =
  | ((
      page: number,
      items: number,
      search?: string,
      sortKey?: keyof TRow,
      order?: SortDirection,
      filters?: CustomFilters,
      params?: { [param: string]: string },
    ) => Promise<DataGridPage<TRow> | null>)
  | TRow[];
