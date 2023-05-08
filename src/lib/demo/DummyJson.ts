import type { DataGridPage, SortDirection } from '$lib/types/DataGridPage.js';
import { page as pageStore } from '$app/stores';
import { get } from 'svelte/store';
import type { DataGridSource } from '$lib/types/DataGridSource.js';

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

export const getData: DataGridSource<Product> = async (
  page: number,
  items: number,
  search?: string,
  sortColumn?: symbol,
  sortKey?: keyof Product,
  order: SortDirection = 'asc',
) => {
  const url: URL = new URL(get(pageStore).url.origin);
  url.pathname = '/api/products';
  
  if (page >= 1) {
    url.searchParams.set('skip', ((page - 1) * items).toString());
  }
  if (items >= 1) {
    url.searchParams.set('limit', items.toString());
  }
  if (sortKey) {
    url.searchParams.set('sort', sortKey);
    url.searchParams.set('order', order);
  }
  if (search) {
    url.searchParams.set('q', search);
  }

  const response = await fetch(url);

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
        pages: Math.ceil(responseData.total / responseData.limit)
      }
    };
    
    if (search) {
      returnData.search = search;
    }
    
    if (sortColumn) {
      returnData.sort = {
        column: sortColumn,
        direction: order,
      };
    }

    return returnData;
  }
  return null;
};