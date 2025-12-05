import { Pool } from "pg";
import config from ".";
const pool = new Pool({
  connectionString: `${config.connection_str}`,
});
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(20) NOT NULL ,
        role TEXT NOT NULL
        )
        `);
};
export default initDB;
