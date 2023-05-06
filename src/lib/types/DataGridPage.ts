export type DataGridPageInfo = {
    page: number;
    items: number;
    total: {
        items: number;
        filteredItems: number;
        pages: number;
    };
};

export type DataGridPage<TData> = DataGridPageInfo & {
    data: TData[];
};
