import { Pool, PoolConnection, createPool } from 'mysql2/promise';
import { randomUUID } from 'node:crypto';
import z from 'zod';
import { generateIconURL } from './utils';

interface Page {
  id?: number;
  user_id: number;
  title: string;
  slug: string;
}

interface AddOptions {
  user_id: number
  title: string
  slug: string
}

const pool: Pool = createPool({
  host: 'localhost',
  user: 'ludvik',
  password: 'Password123#@!',
  database: 'linkbase',
  connectionLimit: 10, // Adjust as needed
});

export async function list(user_id:number) {
  const connection: PoolConnection = await pool.getConnection();
  try {
    // @ts-ignore

    const [ rows ]: Page[] = await connection.query('SELECT * FROM pages where user_id=' + user_id);
    return rows;
  } finally {
    connection.release();
  }
}

export async function addpage(options: AddOptions) {
  const params = options;

  const page: Page = {
    user_id: params.user_id,
    title: params.title,
    slug: params.slug,  
  };

  const connection: PoolConnection = await pool.getConnection();
  try {
    connection.execute(
      'INSERT INTO pages (user_id, title, slug) VALUES (?, ?, ?)',
      [
        page.user_id,
        page.title,
        page.slug,
      ]
    );
    return page;
  } finally {
    connection.release();
  }
}

interface DeleteOptions {
  id: number;
}

const deleteOptionsSchema = z.object({
  id: z.number(),
});

export async function deletePage(options: DeleteOptions) {
  const params = deleteOptionsSchema.parse(options);

  const connection: PoolConnection = await pool.getConnection();
  try {
    const [ existingPage] = await connection.query('SELECT id FROM pages WHERE id = ?', [params.id]);
    
    // @ts-ignore
    if (!existingPage[0]) {
      return { message: `page with ID ${params.id} not found.` };
    }

    await connection.execute('DELETE FROM pages WHERE id = ?', [params.id]);

    return { message: `pages with ID ${params.id} has been deleted.` };
  } finally {
    connection.release();
  }
}
