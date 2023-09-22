require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { connectDB } from './connect-db';
import './initialize-db';

const port = process.env.PORT || 7777;
const app = express();

app.use(cors(), express.json());

export const addNewTask = async (task) => {
  const db = await connectDB();
  const collection = db.collection('tasks');
  await collection.insertOne(task);
};

export const updateTask = async (task) => {
  let { id, group, isComplete, name } = task;
  const db = await connectDB();
  const collection = db.collection('tasks');
  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

app.post('/task/new', async (req, res) => {
  const task = req.body.task;
  await addNewTask(task);
  res.status(200).send(task);
});

app.post('/task/update', async (req, res) => {
  const task = req.body.task;
  await updateTask(task);
  res.status(200).send(task);
});
app.listen(port, console.log('server listening on port', port));
