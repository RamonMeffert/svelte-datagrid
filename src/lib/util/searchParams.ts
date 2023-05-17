import type { DataGridSourceParameters } from '$lib/types/DataGridSource.js';

export type ParamNames<TRow> = {
  [Property in keyof Omit<DataGridSourceParameters<TRow>, 'filters' | 'params'>]?: string;
};

export type PaginationSystem = 'page' | 'skip';

export interface FetchUrlOptions<TRow> {
  /** The names to use for the query parameters. */
  searchParamNames?: ParamNames<TRow>,
  /** The type of pagination system used. 
   *
   * When set to 'page', a query parameter `page` is set to the requested page
   * number, and a query parameter `items` is set to the number of items to
   * return. 
   *
   * When set to `skip`, a query parameter `skip` is set to the number of items
   * in the data set to skip, and a query parameter `limit` is set to the number
   * of items to return.  
   */
  pagination?: PaginationSystem,
  /** The default number of items the API endpoint will return when no custom
   * `items` parameter is given. When the default number of items is requested,
   * the parameter will not be included in the url. Useful if you want to keep
   * your URLs clean. */
  defaultNumberOfItems?: number,
}

/**
 *  Helper method that builds a `URL` object based on the parameter object
 * passed to the `source` method of the data grid.
 *
 * @param baseUrl - The base URL to append query parameters to.
 * @param params - The parameter object passed
 * to the `source` method of the data grid
 * @param itemsPerPage - The number of items to render on a page.
 * @param  searchParamNames - A dictionary of alternative
 * names for the query parameters.
 * @param options Extra options for building the
 * URL. 
 * @see {@link DataGridSourceParameters<TRow>} for the parameters object.
 * @see {@link FetchUrlOptions<TRow>} for the options that can be passed.
 * @returns A `URL` object containing the base URL and all necessary
 * query parameters. 
 */
export const buildFetchUrl = <TRow>(
  baseUrl: URL | string,
  params: DataGridSourceParameters<TRow>,
  options?: FetchUrlOptions<TRow>,
): URL => {
  const { page, items, search, sort, order, filters } = params;
  const names: Required<ParamNames<TRow>> = {
    page: 'page',
    items: 'items',
    search: 'search',
    sort: 'sort',
    order: 'order',
  };

  if (options?.pagination === 'skip') {
    names['page'] = 'skip';
    names['items'] = 'limit';
  }

  // Replace parameter names if necessary
  if (options?.searchParamNames) {
    for (const key of Object.keys(options.searchParamNames)) {
      const k = key as keyof ParamNames<TRow>;
      names[k] = options.searchParamNames[k] ?? names[k];
    }
  }

  // Start building the url
  const url = new URL(baseUrl);

  if (page > 1) {
    const v = options?.pagination === 'page' ? ((page - 1) * items).toString() :page.toString();
    url.searchParams.set(names['page'], v);
  }

  if (options?.defaultNumberOfItems && items > options.defaultNumberOfItems) {
    url.searchParams.set(names['items'], items.toString());
  }

  if (search) {
    url.searchParams.set(names['search'], search);
  }

  if (sort) {
    url.searchParams.set(names['sort'], sort);
  }

  if (order && order !== 'asc') {
    url.searchParams.set(names['order'], order);
  }

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      url.searchParams.set(key, value.toString());
    }
  }

  return url;
};
