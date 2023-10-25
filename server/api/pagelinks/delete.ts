import * as Bookmark from '~/server/src/pagelinks';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return Bookmark.deleteBookmark(body);
});
