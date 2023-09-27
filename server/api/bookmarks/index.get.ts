import * as Bookmark from '~/server/src/bookmark';

export default defineEventHandler(async (event) => {
    return Bookmark.list();
});