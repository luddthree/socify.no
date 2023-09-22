//get the delete bookmark function from the database

import * as Bookmark from '~/server/src/bookmark';
import { getDatabase } from '~/server/src/database';

export default defineEventHandler(async (event) => {
    const { databaseFilePath } = useRuntimeConfig();
    const db = await getDatabase(databaseFilePath);
    const body = await readBody(event);
    return Bookmark.deleteBookmark(db, body);});

    //add the id