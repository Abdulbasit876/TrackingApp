import {pool} from '../config/db.js'; // assumes db.js exports your pg client instance
 const createUser = async (username, email, password ) => {
    const query = `
        INSERT INTO users (username, email, hashed_password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at
    `;
    const { rows } = await pool.query(query, [username, email, password]);
    return rows[0];
};
 const getUserByUsername = async (username) => {
    const query = `SELECT * FROM users WHERE username = $1`;
    const { rows } = await pool.query(query, [username]);
    return rows[0] || null;
};
export { createUser, getUserByUsername };
