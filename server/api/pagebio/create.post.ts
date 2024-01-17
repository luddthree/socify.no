import * as Pagebio from '~/server/src/pagebio';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return Pagebio.add(body); 
});
