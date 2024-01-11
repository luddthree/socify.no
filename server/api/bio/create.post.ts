import * as Bio from '~/server/src/bio';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return Bio.add(body); 
});
