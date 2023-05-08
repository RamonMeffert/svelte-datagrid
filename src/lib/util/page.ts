import type { SortDirection } from "$lib/types/DataGridPage.js";
import type { DataGridSource } from "$lib/types/DataGridSource.js";

export const getPage = async <TRow>(
    source: DataGridSource<TRow>,
    page: number,
    items: number,
    search?: string,
    sortColumn?: symbol,
    sortKey?: keyof TRow,
    order: SortDirection = 'asc'
) => {
    if (Array.isArray(source)) {
        return {
            data: source.slice(page * items, (page + 1) * items),
            page: page,
            items: items,
            total: {
                items: source.length,
                pages: Math.ceil(source.length / items),
                filteredItems: Math.ceil(source.length / items),
            }
        }
    } else {
        return await source(page, items, search, sortColumn, sortKey, order);
    }
}
