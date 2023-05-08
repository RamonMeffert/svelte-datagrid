import type { ActionReturn } from "svelte/action";

/**
 * Debounce function for use in a Svelte use: action.
 *
 * @param _node The calling node
 * @param params An object containing the function to debounce and the debounce
 * delay in milliseconds.
 */
export function debounce<F extends () => void>(
  _node: HTMLElement,
  params: { value: any, func: F; delay: number }
): ActionReturn {
  let timeout: ReturnType<typeof setTimeout>;

  return {
    update() {
      clearTimeout(timeout);
      timeout = setTimeout(params.func, params.delay);
    },
    destroy() {
      clearTimeout(timeout);
    }
  };
}
