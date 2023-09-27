import { Pool, PoolConnection, createPool } from 'mysql2/promise';
import { randomUUID } from 'node:crypto';
import z from 'zod';
import { generateIconURL } from './utils';

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

const pool: Pool = createPool({
  host: 'localhost',
  user: 'ludvik',
  password: 'Password123#@!',
  database: 'linkbase',
  connectionLimit: 10, // Adjust as needed
});

export async function list() {
  const connection: PoolConnection = await pool.getConnection();
  try {
    // @ts-ignore
    const [ rows ]: Bookmark[] = await connection.query('SELECT * FROM bookmarks');
    return rows;
  } finally {
    connection.release();
  }
}

export async function add(options: AddOptions) {
  const params = addOptionsSchema.parse(options);

  const bookmark: Bookmark = {
    id: randomUUID(),
    url: params.url,
    icon_url: generateIconURL(params.url),
    icon_version: Math.floor(Date.now() / 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const connection: PoolConnection = await pool.getConnection();
  try {
    await connection.execute(
      'INSERT INTO bookmarks (id, url, icon_url, icon_version, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [
        bookmark.id,
        bookmark.url,
        bookmark.icon_url,
        bookmark.icon_version,
        bookmark.createdAt,
        bookmark.updatedAt,
      ]
    );
    return bookmark;
  } finally {
    connection.release();
  }
}

interface DeleteOptions {
  id: string;
}

const deleteOptionsSchema = z.object({
  id: z.string(),
});

export async function deleteBookmark(options: DeleteOptions) {
  const params = deleteOptionsSchema.parse(options);

  const connection: PoolConnection = await pool.getConnection();
  try {
    const [ existingBookmark ] = await connection.query('SELECT id FROM bookmarks WHERE id = ?', [params.id]);
    
    // @ts-ignore
    if (!existingBookmark[0]) {
      return { message: `Bookmark with ID ${params.id} not found.` };
    }

    await connection.execute('DELETE FROM bookmarks WHERE id = ?', [params.id]);

    return { message: `Bookmark with ID ${params.id} has been deleted.` };
  } finally {
    connection.release();
  }
}
