import * as Pagebio from '~/server/src/pagebio';

export default defineEventHandler(async (event) => {
    const { userId } = getQuery(event) 
    if (userId){
    return Pagebio.list(userId.toString());
    }
});