import type { CustomFilters, SortDirection } from '$lib/types/DataGridPage.js';
import type { DataGridSource } from '$lib/types/DataGridSource.js';

export const getPage = async <TRow>(
  source: DataGridSource<TRow>,
  page: number,
  items: number,
  search?: string,
  sortColumn?: symbol,
  sortKey?: keyof TRow,
  order: SortDirection = 'asc',
  filters?: CustomFilters,
  params?: { [param: string]: string },
) => {
  if (Array.isArray(source)) {
    return {
      data: source.slice(page * items, (page + 1) * items),
      page: page,
      items: items,
      total: {
        items: source.length,
        pages: Math.ceil(source.length / items),
        filteredItems: source.length,
      },
    };
  } else {
    const result = await source(page, items, search, sortKey, order, filters, params);

    if (result) {
      // Re-add properties we need, but the user shouldn't have to deal with
      if (search) {
        result.search = search;
      }

      if (sortColumn) {
        result.sort = {
          column: sortColumn,
          direction: order
        }
      }

      if (filters) {
        result.filters = filters;
      }

      return result;
    }

    return null;
  }
};
