import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load = (() => {
  redirect(302, '/docs/getting-started/introduction');
}) satisfies ServerLoad;
