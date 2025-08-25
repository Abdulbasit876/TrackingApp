import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();
  const pool= new Pool({
        connectionString: process.env.COCKROACHDB_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
const conectDb = async () => {
  
    try {
       await pool.connect();
        console.log('Connected to CockroachDB successfully');
    } catch (error) {
        throw new Error('Failed to connect to CockroachDB: ' + error.message);
    }
}
export default conectDb;
export { pool};