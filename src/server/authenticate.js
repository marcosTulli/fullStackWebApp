import { v4 as uuid } from 'uuid';
import md5 from 'md5';
import { connectDB } from './connect-db';

const authenticationTokens = [];

async function assemnleUserState(user) {
  const db = await connectDB();
  const tasks = await db.collection('tasks').find({ owner: user.id }).toArray();
  const groups = await db.collection('groups').find({ owner: user.id }).toArray();
  return { tasks, groups, session: { authenticated: 'AUTHENTICATED', id: user.id } };
}

export const authRoute = (app) => {
  app.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;
    console.log('TUKI', username, password);
    const db = await connectDB();
    const collection = db.collection('users');
    const user = await collection.findOne({ name: username });
    if (!user) {
      return res.status(500).send('User not found');
    } else {
      const hash = md5(password);
      const isPasswordCorrect = hash === user.passwordHash;
      if (!isPasswordCorrect) {
        return res.status(500).send('Password incorrect');
      } else {
        const token = uuid();
        authenticationTokens.push({ token, userID: user.id });
        let state = await assemnleUserState(user);
        res.send({ token, state });
      }
    }
  });
};
