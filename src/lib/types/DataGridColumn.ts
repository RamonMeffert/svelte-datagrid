export type TextAlignment = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
export type ValueGetter<TRow> = ((d: TRow) => TRow[keyof TRow]);
export type ValueRenderer<TRow> = ((row: TRow) => string);

export type DataGridColumn<TRow> = {
    readonly id: symbol,
    header: string,
    key: keyof TRow,
    value: ValueGetter<TRow>,
    render: ValueRenderer<TRow>,
    align?: TextAlignment,
}
