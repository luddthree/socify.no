import * as Pages from '~/server/src/pages';

export default defineEventHandler(async (event) => {
    const { title } = getQuery(event) 
    if (title){
        return Pages.gettitle(title.toString());
    }
});