import { DatabaseConnection, sql } from '@databases/sqlite';
import {randomUUID} from 'node:crypto';
import z, { date } from 'zod';
import {generateIconURL} from './utils'

interface Bookmark {
    id: string;
    url: string;
    icon_url: string; 
    icon_version: number;
    createdAt: Date;
    updatedAt: Date;
}

interface AddOptions {
    url: string;
}

const addOptionsSchema = z.object({
    url: z.string().url(),
});

export async function list(db: DatabaseConnection) {
    return db.query(sql`SELECT * FROM bookmarks3`);
}

export async function add(db: DatabaseConnection, options: AddOptions) {
    const params = addOptionsSchema.parse(options);

    const bookmark: Bookmark = {
        id: randomUUID(),

        url: params.url,
        icon_url: generateIconURL(params.url),  
        icon_version: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    await db.query(sql`INSERT INTO bookmarks3 (
        id,
        url,
        icon_url,
        icon_version,
        created_at,
        updated_at
    ) VALUES (
        ${bookmark.id},
        ${bookmark.url},
        ${bookmark.icon_url},
        ${bookmark.icon_version},
        ${bookmark.createdAt},
        ${bookmark.updatedAt}
    );`);

    return bookmark;
}   

interface DeleteOptions { 
    id: string;
}

const deleteOptionsSchema = z.object({
    id: z.string(),
});

export async function deleteBookmark(db: DatabaseConnection, options: DeleteOptions) {
    const params = deleteOptionsSchema.parse(options);

    // Validate that the bookmark with the given ID exists before deleting
    const existingBookmark = await db.query(sql`SELECT id FROM bookmarks3 WHERE id = ${params.id}`);
    
    if (!existingBookmark[0]) {
        throw new Error(`Bookmark with ID ${params.id} not found.`);
    }

    // If the bookmark exists, delete it
    await db.query(sql`DELETE FROM bookmarks3 WHERE id = ${params.id}`);

    // Return a success message or any other relevant information
    return { message: `Bookmark with ID ${params.id} has been deleted.` };
}