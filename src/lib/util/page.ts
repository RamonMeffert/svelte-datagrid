import type { DataGridPage, DataGridPageInfo } from "$lib/types/DataGridPage.js";
import type { SortDirection } from "$lib/types/DataGridSortInfo.js";
import type { DataGridSource } from "$lib/types/DataGridSource.js";

export const getPage = async <TRow>(
    source: DataGridSource<TRow>,
    page: number,
    items: number,
    sort?: keyof TRow,
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
        return await source(page, items, sort, order);
    }
}

export const getPageInfoFromPage = <TRow>(page: DataGridPage<TRow>) => {
    return {
        page: page.page,
        items: page.items,
        total: page.total
    } satisfies DataGridPageInfo;
}
