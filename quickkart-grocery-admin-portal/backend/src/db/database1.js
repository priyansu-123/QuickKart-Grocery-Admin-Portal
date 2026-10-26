import pg from "pg"; import dotenv from "dotenv"; dotenv.config(); const {Pool}=pg;
// Pool manages reusable PostgreSQL connections.
export const pool=new Pool({connectionString:process.env.DATABASE_URL});
// Use this helper from controllers when the database is connected.
export const query=async(text,params)=>{const result=await pool.query(text,params);return result.rows};
