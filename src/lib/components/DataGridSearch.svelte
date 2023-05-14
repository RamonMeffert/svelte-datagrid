<script lang="ts">
  import { key, type DataGridContext } from '$lib/types/DataGridContext.js';
  import { debounce } from '$lib/util/debounce.js';
  import { getContext } from 'svelte';

  type TRow = $$Generic;

  /** The placeholder that is shown when the search field is empty. */
  export let placeholder: string = 'Search';

  /** Time (in ms) the user needs to have stopped typing before the search is
   * submitted. */
  export let delay: number = 350;

  let value: string;

  const { query } = getContext<DataGridContext<TRow>>(key);

  const search = () => {
    if (value?.trim()) {
      $query.search = value;
    } else if ($query.search) {
      $query.search = undefined;
    }
  };
</script>

<!-- 
  @component Search bar for a datagrid. Should be placed inside the `<DataGrid>`
  with the slot name specified.

  **Usage**

  ```tsx
    <DataGrid ... />
      <DataGridSearch slot=search />
    </DataGrid>
  ```

  **Properties**

  - `placeholder` _(optional)_ - The placeholder that is shown when the search
    field is empty. Defaults to 'Search'.
  - `delay` _(optional)_ - Debounce time (in ms). The time a user needs to have
    stopped typing before the search is submitted.
 -->

<input
  bind:value
  use:debounce={{ value, func: search, delay: delay }}
  type="search"
  {placeholder}
/>
