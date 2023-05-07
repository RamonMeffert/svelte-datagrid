import type { DataGridPage } from '$lib/types/DataGridPage.js';
import { page as pageStore } from '$app/stores';
import { get } from 'svelte/store';
import type { SortDirection } from '$lib/types/DataGridSortInfo.js';

export class Product {
  product_name!: string;
  release_date!: string;
  color!: string;
  price!: number;
  weight!: number;
  height!: number;
  width!: number;
  manufacturer!: string;
};

export const getData = async (
  page: number,
  items: number,
  sort: keyof Product | undefined,
  order: SortDirection = 'asc',
): Promise<DataGridPage<Product> | null> => {
  const url: URL = new URL(get(pageStore).url.origin);
  url.pathname = '/api/products';
  
  if (page >= 1) {
    url.searchParams.set('skip', ((page - 1) * items).toString());
  }
  if (items >= 1) {
    url.searchParams.set('limit', items.toString());
  }
  if (sort) {
    url.searchParams.set('sort', sort);
    url.searchParams.set('order', order);
  }

  const response = await fetch(url);

  if (response.ok) {
    const responseData = await response.json();
    const totalPages = Math.ceil(responseData.total / responseData.limit);
    return {
      data: responseData.products,
      page: Math.floor((responseData.skip / responseData.total) * totalPages) + 1,
      items: responseData.limit,
      total: {
        items: responseData.total,
        filteredItems: responseData.total,
        pages: Math.ceil(responseData.total / responseData.limit)
      }
    } satisfies DataGridPage<Product>;
  }
  return null;
};