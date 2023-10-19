import * as Pages from '~/server/src/pages';

export default defineEventHandler(async (event) => {
    const { userId } = getQuery(event) 
    if (userId){
        return Pages.list(parseInt(userId.toString(), 10));
    }
});