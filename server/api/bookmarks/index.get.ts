import * as Bookmark from '~/server/src/bookmark';

export default defineEventHandler(async (event) => {
    const { userId } = getQuery(event) 
    if (userId){
    return Bookmark.list(userId.toString());
    }
});