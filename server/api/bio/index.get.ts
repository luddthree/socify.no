import * as Bio from '~/server/src/bio';

export default defineEventHandler(async (event) => {
    const { userId } = getQuery(event) 
    if (userId){
    return Bio.list(userId.toString());
    }
});