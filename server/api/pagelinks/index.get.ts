import * as Bookmark from '~/server/src/pagelinks';

export default defineEventHandler(async (event) => {
    const { pageId } = getQuery(event) 
    if (pageId){
    return Bookmark.list(pageId.toString());
    }
});