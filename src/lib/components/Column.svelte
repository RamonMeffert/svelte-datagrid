<!-- svelte-ignore unused-export-let -->
<script lang="ts">
  import { key, type DataGridContext } from '$lib/types/DataGridContext.js';
  import type {
    DataGridColumn,
    TextAlignment,
    ValueGetter,
    ValueRenderer,
  } from '$lib/types/DataGridColumn.js';
  import { getContext, onMount } from 'svelte';

  type TRow = $$Generic<object>;

  /** The data attribute is used to infer the datatype of the objects passed
   * into it. */
  export let data: TRow[];

  /** The header for this column. Defaults to the name of the variable selected
   * in the `value` property. */
  export let header: string = '';

  /** The alignment of text in this column. Defaults to the default direction
   * of the user's browser. */
  export let align: TextAlignment | undefined = undefined;

  /** A lambda function to select a value from a row object. */
  export let value: ValueGetter<TRow>;

  /** (Optional) A function to render a string for the contents of this column.
   * Defaults to the string value of the value selected by the `value` property.
   */
  export let render: ValueRenderer<TRow> = (row: TRow) => (value(row) as object).toString();

  /** (Optional) Whether the rendered value should be interpreted as HTML using
   * Svelte's @html directive. */
  export let html: boolean = false;

  /** Whether this column can be sorted by clicking the header. */
  export let sortable: boolean = true;

  /** (Optional) If the class field does not match the database column, you can specify the
   * sort key manually.  */
  export let sortKey: string | undefined = undefined;

  // Retrieve type constructor and column store from context
  const { type, columns } = getContext<DataGridContext<TRow>>(key);

  onMount(() => {
    // Add the current column to the column store
    columns.update(c => {
      // Create a unique identifier
      const id = Symbol();
      // Find the key string based on the `value` selector
      const key = sortKey as keyof TRow ?? getKey();

      // If no header is set, use the key as the header
      if (header === '') {
        header = key.toString();
      }
      // Define the column object
      const col: DataGridColumn<TRow> = { id, key, header, value, render, align, html, sortable };

      // If the columns object has been initialized, add the current column to
      // it. Otherwise, initialize the columns object with the current column as
      // its first value.
      if (c) {
        c[id] = col;
      } else {
        c = { [id]: col };
      }

      return c;
    });
  });

  /**
   * Using the `value` lambda method, determine the key that is used to sort the
   * table on.
   */
  const getKey = () => {
    // Create a new object using the constructor
    const obj = new type();
    // Find the keys
    const keys = Object.keys(obj);
    // Create an object mapping the key to the name of the key itself
    const keyMap = keys.reduce((o, key) => ({ ...o, [key]: key }), {}) as TRow;
    // Use the value function to get the name of the key from the map
    return value(keyMap) as keyof TRow;
  };
</script>

<!-- 
  @component
  The `<Column>` component defines a column in a `<DataGrid>`. The order the
  component is placed in determines the order of the columns in the final
  datagrid.

  **Usage**

  The `<Column>` component must be placed inside a `<DataGrid>` component. It
  must also inherit the `data` property exposed by the parent `<DataGrid>`.

  ```tsx
  <DataGrid type={Class} source={getData} let:data>
    <Component {data} header="Column name" value={d => d.field} />
  </DataGrid>
  ```

  **Properties**

  - `data` **(required)** - The data property exposed by the parent `<DataGrid>`
  - `value` **(required)** - Lambda method to select a value from the row object
  - `header` _(optional)_ - Header for the column. Defaults to the key selected
    by `value`.
  - `render` _(optional)_ - Custom rendering function. Lambda method from the
    row object to a string.
 -->

<slot />
