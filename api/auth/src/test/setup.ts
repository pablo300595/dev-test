import request from 'supertest';

import { app } from './../app';

declare global {
    var signin: () => Promise<string[]>;
}

beforeAll(async () => {
    process.env['JWT_KEY'] = 'asdf'
});

global.signin = async () => {
    const email = 'test@test.com'
    const password = '12345'

    const response = await request(app)
        .post('/api/login')
        .send({
            email,
            password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
}