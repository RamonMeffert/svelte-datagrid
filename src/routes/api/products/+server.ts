import type { Product } from '$lib/demo/DummyJson.js';
import type { RequestHandler } from './$types.js';

export const GET: RequestHandler = async ({ fetch, url }) => {
    // Read query parameters
    const limit = stringToMaybeNumber(url.searchParams.get('limit')) ?? 10;
    const skip = stringToMaybeNumber(url.searchParams.get('skip')) ?? 0;
    const searchQuery = url.searchParams.get('q');
    const sort = url.searchParams.get('sort');
    const order = url.searchParams.get('order');

    const response = await fetch("/fake_data.json");

    // Random wait to simulate real remote data
    const delay = getRandomInt(100, 700);
    await new Promise(r => setTimeout(r, delay));

    if (response.ok) {
        const data: Product[] = await response.json();
        const processedData = filter(data, skip, limit, searchQuery, sort as keyof Product, order as 'desc' | 'asc')
        
        const fullResponse = {
            skip: skip,
            limit: limit,
            total: data.length,
            products: processedData,
        }
        
        return new Response(JSON.stringify(fullResponse));
    }

    return new Response();
};

const filter = (data: Product[], skip = 0, limit = 10, search: string | null, sort: keyof Product | null, order?: 'desc' | 'asc') => {
    // example row to infer data types from
    const ex = data[0];
    
    if (search) {
        data = data.filter(d => d.product_name)
    }

    if (sort && Object.keys(ex).some(key => key === sort)) {
        if (order) {
            if (typeof ex[sort] === 'number') {
                data.sort((a, b) => {
                    const aKey = a[sort] as number;
                    const bKey = b[sort] as number;
                    return order === 'desc' ? bKey - aKey : aKey - bKey});
            } else {
                data.sort((a, b) => compareString(a[sort] as string, b[sort] as string, order === 'desc'))
            }
        }
    }
    
    return data.slice(skip, skip + limit);
}

const compareString = (a: string, b: string, desc = false) => {
    const aa = a.toUpperCase();
    const bb = b.toUpperCase();
    if (aa < bb) {
        return desc ? 1 : -1;
    }
    if (aa > bb) {
        return desc ? -1 : 1;
    }
    return 0;
}

const stringToMaybeNumber = (str: string | null) => {
    if (str) {
        return parseInt(str);
    }
    return undefined;
}

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  