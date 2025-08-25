import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runMigrations = async () => {
  try {
    const dirPath = path.join(__dirname, "../db"); 
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".sql"));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const sql = fs.readFileSync(filePath, "utf-8");
      console.log(`📂 Running migration: ${file}`);
      await pool.query(sql);
      console.log(`✅ Applied: ${file}`);
    }
  } catch (err) {
    console.error("❌ Migration error:", err.message);
  } finally {
    await pool.end();
    console.log("🔒 DB connection closed.");
  }
};
runMigrations();