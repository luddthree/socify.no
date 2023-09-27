import * as Bookmark from '~/server/src/bookmark';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return Bookmark.add(body); 
});



