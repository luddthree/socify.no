import connect, { DatabaseConnection, sql } from "@databases/sqlite"

let db: DatabaseConnection;
let initialized = false;

export const getDatabase = async (path: string) => {
    db = db || connect(path);

    if (!initialized) {
        await db.query(sql`
            CREATE TABLE IF NOT EXISTS bookmarks3 (
                id TEXT PRIMARY KEY,
                url TEXT NOT NULL,
                icon_url TEXT NOT NULL,
                icon_version INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT__DATE,
                updated_at DATETIME NOT NULL
            );

            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username VARCHAR NOT NULL,
                email TEXT,
                password TEXT,
            );

            CREATE TABLE IF NOT EXISTS pages (
                id TEXT PRIMARY KEY,
                name VARCHAR NOT NULL,
                user_id VARCHAR,
            );

        `);
        initialized = true;
    }
    return db;
};