import type { DataGridColumn } from '$lib/types/DataGridColumn.js';

export const getStyle = <TRow>(columns: { [id: symbol]: DataGridColumn<TRow>}) => {
	const columnStyles: string[] = [];

	for (const [index, key] of Object.getOwnPropertySymbols(columns).entries()) {
		columnStyles.push(getColumnStyle(index + 1, columns[key]));
	}

	return columnStyles.join('');
};

const getColumnStyle = <TRow>(index: number, column: DataGridColumn<TRow>) => {
	const properties: string[] = [];

    if (column.align) {
        properties.push(`text-align: ${column.align}`);
    }

	return [`td:nth-of-type(${index}), th:nth-of-type(${index}) {`, ...properties, '}'].join(' ').replace(/\s+/, ' ').trim();
};
