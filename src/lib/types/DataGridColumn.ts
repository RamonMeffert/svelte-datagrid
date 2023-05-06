export type TextAlignment = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
export type ValueGetter<TRow> = ((d: TRow) => TRow[keyof TRow]);
export type ValueRenderer<TRow> = ((row: TRow) => string);

export type DataGridColumn<TRow> = {
    header: string,
    value: ValueGetter<TRow>,
    render: ValueRenderer<TRow>,
    align?: TextAlignment,
}