import mysql from 'mysql2/promise';
import { User } from '../../models/user.model';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'ludvik',
    password: 'Password123#@!',
    database: 'linkbase',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export const createTables = async () => {

    pool.query(`
        CREATE TABLE IF NOT EXISTS user (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        );`);

    pool.query(`
        CREATE TABLE IF NOT EXISTS pages (
            id INT NOT NULL AUTO_INCREMENT,
            user_id INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES user(id)
        );`);

    pool.query(`
    CREATE TABLE IF NOT EXISTS bookmarks (
        id VARCHAR(255) PRIMARY KEY,
        url TEXT NOT NULL,
        icon_url TEXT NOT NULL,
        icon_version INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL
        );`);
}

export const createUser = async (user: User) => {
    const [rows, fields] = await pool.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
    return rows;
}

export const getUser = async (email: string) => {
    const [rows, fields] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows;
}

export const updateUser = async (id: number, name: string, email: string, password: string) => {
    const [rows, fields] = await pool.query('UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id]);
    return rows;
}

export const deleteUser = async (id: number) => {
    const [rows, fields] = await pool.query('DELETE FROM user WHERE id = ?', [id]);
    return rows;
}

export const login = async (email: string, password: string) => {
    const [rows, fields] = await pool.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
    return rows;
}