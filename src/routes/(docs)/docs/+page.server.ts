import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
    redirect(307, '/docs/getting-started/introduction');
};
