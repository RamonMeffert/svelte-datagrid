import type { DataGridPage } from "$lib/types/DataGridPage.js";

export type DummyJsonProduct = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

export const getData = async (page: number, items: number): Promise<DataGridPage<DummyJsonProduct> | null> => {
    const url = new URL('https://dummyjson.com/products');
    if (page > 1) {
        url.searchParams.set('skip', ((page - 1) * items).toString());
    }
    if (items > 1) {
        url.searchParams.set('limit', items.toString());
    }
    const response = await fetch(url);

    if (response.ok) {
        const responseData = await response.json();
        const totalPages = Math.ceil(responseData.total / responseData.limit);
        return {
            data: responseData.products,
            page: Math.floor(responseData.skip / responseData.total * totalPages) + 1,
            items: responseData.limit,
            total: {
                items: responseData.total,
                filteredItems: responseData.total,
                pages: Math.ceil(responseData.total / responseData.limit)
            }
        } satisfies DataGridPage<DummyJsonProduct>;
    }
    return null;
};