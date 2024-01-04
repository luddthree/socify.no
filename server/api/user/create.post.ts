import * as Bookmark from '~/server/src/user';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return Bookmark.add(body); 
});
