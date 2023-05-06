import type { DataGridPage, DataGridPageInfo } from "$lib/types/DataGridPage.js";

export const getPage = async <TRow>(
    source: ((page: number, items: number) => Promise<DataGridPage<TRow> | null>) | TRow[],
    page: number,
    items: number,
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
        return await source(page, items);
    }
}

export const getPageInfoFromPage = <TRow>(page: DataGridPage<TRow>) => {
    return {
        page: page.page,
        items: page.items,
        total: page.total
    } satisfies DataGridPageInfo;
}
