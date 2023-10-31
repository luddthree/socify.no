import { createTables, createUser } from '../../db/index';
import { User } from '~/models/user.model';

export default defineEventHandler(async (event) => {
  let body = JSON.parse(await readRawBody(event) || '{}');
  createTables();

  let newUser: User = body;

  if (newUser.email === undefined || newUser.password === undefined || newUser.name === undefined) {
    return { error: 'email, password, and name are required' };
  }

  try {
    let user = await createUser(newUser);
    return user;
  } catch (error) {
    return { error: 'Username already exists' };
  }
});
