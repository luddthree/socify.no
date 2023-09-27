import * as Bookmark from '~/server/src/bookmark';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return Bookmark.deleteBookmark(body);
});

//add the id