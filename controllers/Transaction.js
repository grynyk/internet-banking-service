import { Pool } from 'pg';
import dotenv from 'dotenv';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const tx = async callback => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN')
        try {
            await callback(client)
            client.query('COMMIT')
        } catch (e) {
            client.query('ROLLBACK')
        }
    } finally {
        client.release()
    }
}

export default tx;