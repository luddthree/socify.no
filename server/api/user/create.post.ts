import { createTables, createUser } from '../../db/index';

import { User } from '~/models/user.model';

export default defineEventHandler( async (event) => {
    let body =  JSON.parse(await readRawBody(event) || '{}');
    createTables();

    let newUser:User = body;

    if (newUser.email === undefined || newUser.password === undefined || newUser.name === undefined) {
        return {error: 'email, password, and name are required'}
    }

    let user = await createUser(newUser);
    if (user === undefined) {
        return {error: 'user could not be created'}
    }

    return user;
 })