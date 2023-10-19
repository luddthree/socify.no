import * as Pages from '~/server/src/pages';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return Pages.deletePage(body);
});
