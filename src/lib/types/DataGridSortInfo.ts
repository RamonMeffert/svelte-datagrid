export type SortDirection = 'asc' | 'desc';

export type DataGridSortInfo = {
  column?: symbol,
  direction: SortDirection
}