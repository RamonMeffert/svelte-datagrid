import type { DataGridPage } from './DataGridPage.js';
import type { SortDirection } from './DataGridSortInfo.js';

export type DataGridSource<TRow> =
  | ((
      page: number,
      items: number,
      sort?: keyof TRow,
      order?: SortDirection
    ) => Promise<DataGridPage<TRow> | null>)
  | TRow[];
