/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/user';
import userSeed from './seeds/user.seed';

beforeAll(async () => {
  await User.collection.insertMany(userSeed);
});

const mockUser = {
  _id: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb5'),
  name: 'John',
  lastname: 'Doe',
  address: 'Fake Street 123',
  email: 'JhonDoe@Gmail.com',
  password: '12345678',
  tel: '12345678',
  role: 'admin',
};

const mockNewUser = {
  _id: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb9'),
  name: 'Juan',
  lastname: 'Pedro',
  address: 'Avenida 555',
  email: 'jotape@mail.com',
  password: '987654321',
  tel: '54114328976',
  role: 'admin',
};

describe('Get logged user /api/users/me', () => {
  test('should return status 200', async () => {
    const authToken = jwt.sign({ userId: '65270324a6ecc0ccbf909cb5' }, 'holi');
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${authToken}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return an user that is logged in', async () => {
    const authToken = jwt.sign({ userId: '65270324a6ecc0ccbf909cb6' }, 'holi');
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${authToken}`)
      .send();
    const user = response.body.data;
    expect(user).toBeDefined();
  });
  test('should return status 401', async () => {
    const response = await request(app).get('/api/users/me').send();
    expect(response.status).toBe(401);
    expect(response.error).toBeTruthy();
  });
});

describe('GET all users /api/users', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/users').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/user').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return all users', async () => {
    const response = await request(app).get('/api/users').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
});

describe('log in user /api/users/login', () => {
  test('should return token with name and role', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: mockUser.email, password: mockUser.password });
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data.token).toBeDefined();
  });
  test('should return status 401', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'fake@mail.com', password: 'fakepassword' });
    expect(response.status).toBe(401);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeFalsy();
  });
});

describe('register new user /api/users/', () => {
  test('should return status 400 (user already exists)', async () => {
    const response = await request(app)
      .post('/api/users/')
      .send(mockUser);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
  test('should create new user', async () => {
    const response = await request(app)
      .post('/api/users/')
      .send(mockNewUser);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
});

describe('edit user /api/users/', () => {
  test('should return user with updated data', async () => {
    const authToken = jwt.sign({ userId: '65270324a6ecc0ccbf909cb5' }, 'holi');
    const response = await request(app)
      .put('/api/users/')
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockNewUser);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
  test('should return status code 404 (user not found)', async () => {
    const authToken = jwt.sign({ userId: '65270324a6ecc0ccbf909ca0' }, 'holi');
    const response = await request(app)
      .put('/api/users/')
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockNewUser);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
  // test('should return status code 400', async () => {
  //   const authToken = jwt.sign({ userId: '65270324a6ecc0ccbf909cb5' }, 'holi');
  //   const response = await request(app)
  //     .put('/api/users/')
  //     .set('Authorization', `Bearer ${authToken}`)
  //     .send({ corruptJson: null, email: 123 });
  //   expect(response.status).toBe(400);
  //   expect(response.error).toBeTruthy();
  // });
});

describe('delete user /api/users/', () => {
  test('should delete user logged in', async () => {
    const authToken = jwt.sign({ userId: '65270324a6ecc0ccbf909cb5' }, 'holi');
    const response = await request(app)
      .delete('/api/users/')
      .set('Authorization', `Bearer ${authToken}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
  test('should delete user passed by parameter', async () => {
    const authToken = jwt.sign({ userId: '65270324a6ecc0ccbf909cb6' }, 'holi');
    const response = await request(app)
      .delete('/api/users/65270324a6ecc0ccbf909cb6')
      .set('Authorization', `Bearer ${authToken}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
  test('should return status code 404 (user not found)', async () => {
    const authToken = jwt.sign({ userId: '65270324a6ecc0ccbf909ca0' }, 'holi');
    const response = await request(app)
      .delete('/api/users/')
      .set('Authorization', `Bearer ${authToken}`)
      .send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});
