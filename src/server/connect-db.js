require('dotenv').config();
import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL;
const ORGANIZER_DB = process.env.DB_NAME;
let db = null;

export async function connectDB() {
  if (db) return db;
  let client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true });
  db = client.db(ORGANIZER_DB);
  console.info('Connected to DB', db);
  return db;
}
