import request from "supertest";
import { app } from './../../app';
import { User } from "../../models/user.model";
import { createConnection, getConnection } from "../../db";

const mockUsers: User[] = [{
    "_id": "5410953eb0e0c0ae25608314",
    "guid": "eab0324c-75ef-49a1-9c49-be2d68f50b96",
    "isActive": true,
    "balance": "$3,585.69",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "blue",
    "name": {
      "first": "Pablo",
      "last": "Valenzuela"
    },
    "company": "delta",
    "email": "pablo123@delta.net",
    "password": "23derd*334",
    "phone": "+1 (936) 451-3590",
    "address": "121 National Drive, Cotopaxi, Michigan, 8240"
}];

beforeAll(async () => {
    await createConnection();
    getConnection().get('users').push(...mockUsers).write();
});

it('should not return users to unauthorized users', async () => {
    const result = await request(app)
      .get('/api/users')
    
    const errors = result.body['message'];

    expect(errors.message === 'No token provided');
    expect(result.status === 401);
});

it('should get users for authorized users', async() => {
    const result = await request(app)
        .post('/api/login')
        .send({
        email: 'pablo123@delta.net',
        password: '23derd*334', 
    });

    const token = result.body['session']['jwt'];
    
    return request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
})

it('should get current user', async() => {
    const result = await request(app)
        .post('/api/login')
        .send({
        email: 'pablo123@delta.net',
        password: '23derd*334', 
    });

    const token = result.body['session']['jwt'];
    
    return request(app)
        .get('/api/current-user')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
})


