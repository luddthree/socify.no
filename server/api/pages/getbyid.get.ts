import * as Pages from '~/server/src/pages';

export default defineEventHandler(async (event) => {
    const { Id } = getQuery(event) 
    if (Id){
        return Pages.getbyid(parseInt(Id.toString(), 10));
    }
});