import type { DataGridPage } from '$lib/types/DataGridPage.js';
import type { DataGridSource } from '$lib/types/DataGridSource.js';
import { page as pageStore } from '$app/stores';
import { get } from 'svelte/store';
import { buildFetchUrl, type FetchUrlOptions } from '$lib/util/searchParams.js';

export class Product {
  product_name!: string;
  release_date!: string;
  color!: string;
  price!: number;
  weight!: number;
  height!: number;
  width!: number;
  manufacturer!: string;
}

export const getData: DataGridSource<Product> = async (p) => {
  const url: URL = new URL(get(pageStore).url.origin);
  url.pathname = '/api/products';

  const fetchUrlOptions: FetchUrlOptions<Product> = { 
    defaultNumberOfItems: 15,
    searchParamNames: { search: 'q' },
    pagination: 'skip'
  };

  const fetchUrl = buildFetchUrl(url, p, fetchUrlOptions);

  // change skip and limit because they work differently
  const response = await fetch(fetchUrl);

  if (response.ok) {
    const responseData = await response.json();
    const totalPages = Math.ceil(responseData.total / responseData.limit);

    const returnData: DataGridPage<Product> = {
      data: responseData.products,
      page: Math.floor((responseData.skip / responseData.total) * totalPages) + 1,
      items: responseData.limit,
      total: {
        items: responseData.total,
        filteredItems: responseData.filtered,
        pages: Math.ceil(responseData.total / responseData.limit),
      },
    };

    return returnData;
  }
  return null;
};
