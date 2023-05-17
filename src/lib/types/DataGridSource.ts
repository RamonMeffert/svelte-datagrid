import type { CustomFilters, DataGridPage, SortDirection } from './DataGridPage.js';

/** Parameters for the `source` method. */
export type DataGridSourceParameters<TRow> = {
  /** The current page number. */
  page: number;
  /** The number of items per page. */
  items: number;
  /** A search query. */
  search?: string;
  /** The sort key. */
  sort?: keyof TRow;
  /** The sort order. */
  order?: SortDirection;
  /** Any extra filters. Will be converted to query parameters as-is. */
  filters?: CustomFilters;
  /** Any extra parameters required by the `source`. */
  params?: { [param: string]: string };
};

/** The data source for the data grid. Can be either an asyncronous function
 * that returns a promise of a {@link DataGridPage<TRow>} or a list of rows. */
export type DataGridSource<TRow> =
  | ((params: DataGridSourceParameters<TRow>) => Promise<DataGridPage<TRow> | null>)
  | TRow[];
