export type SortDirection = 'asc' | 'desc';
export type CustomFilters = { [key: string]: string | boolean | number };

export type DataGridQuery = {
  page: number;
  items: number;
  search?: string;
  sort?: {
    column: symbol;
    direction: SortDirection;
  };
  filters?: CustomFilters;
};

export type DataGridResult = {
  items: number;
  filteredItems: number;
  pages: number;
};

export type DataGridPage<TData> = DataGridQuery & {
  data: TData[];
  total?: DataGridResult;
};
