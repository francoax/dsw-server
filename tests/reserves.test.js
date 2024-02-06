import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import reserve from '../src/models/reserve';
import reserveSeed from './seeds/reserve.seed';
import propertiesTypesSeeds from './seeds/property-type.seed';
import propertieType from '../src/models/propertieType';
import userSeed from './seeds/user.seed';
import user from '../src/models/user';

const mockNewReserve = {
  _id: new mongoose.Types.ObjectId('6580ce85751be545d7bebad3'),
  date_start: '2022-01-01',
  date_end: '2022-02-11',
  user: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb5'),
  packageReserved: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a1'),
  totalPrice: 1500,
};
const mockWrongReserve = {
  _id: new mongoose.Types.ObjectId('6580ce85751be545d7bebad1'),
  user: new mongoose.Types.ObjectId('65270324a6ecc0ccbf909cb5'),
  packageReserved: new mongoose.Types.ObjectId('652dd48c82681f59fdc830a1'),
};

let tokenUser;

beforeAll(async () => {
  await propertieType.collection.insertMany(propertiesTypesSeeds);
  await reserve.insertMany(reserveSeed);

  await user.collection.insertMany(userSeed);

  const { body: { data: dataUser } } = await request(app).post('/api/users/login').send({ email: 'Bottoni@Gmail.com', password: '12345678' });
  tokenUser = dataUser.token;
});

describe('GET all reserves /api/reserves', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/reserves').set('Authorization', `Bearer ${tokenUser}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
  test('should return all reserves', async () => {
    const response = await request(app).get('/api/reserves').set('Authorization', `Bearer ${tokenUser}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data.length).toBe(2);
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/reserve').set('Authorization', `Bearer ${tokenUser}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET by id /api/reserves/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/reserves/6580ce85751be545d7bebad1').set('Authorization', `Bearer ${tokenUser}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return a reserve that exist', async () => {
    const response = await request(app).get('/api/reserves/6580ce85751be545d7bebad1').set('Authorization', `Bearer ${tokenUser}`).send();
    const gettedRes = response.body.data;
    expect(gettedRes).toBeDefined();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/reserves/6000cc88851be545d7bebad1').set('Authorization', `Bearer ${tokenUser}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeFalsy();
  });
});

describe('DELETE logic by id /api/reserves/:id', () => {
  test('on delete throw good req 200', async () => {
    const response = await request(app)
      .delete('/api/reserves/6580ce85751be545d7bebad2')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status code 404 (reserve not found)', async () => {
    const response = await request(app).delete('/api/reserves/6580ce85751be545d7bebad9')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('POST new reserve /api/reserves/', () => {
  test('should create a reserve with status 201', async () => {
    const response = await request(app).post('/api/reserves/')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send(mockNewReserve);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
  test('should return status 401 if the user is not logged', async () => {
    const response = await request(app).post('/api/reserves/').send(mockWrongReserve);
    expect(response.status).toBe(401);
    expect(response.error).toBeTruthy();
  });
});
describe('get reserves by User /apu/reserves/user', () => {
  test('should return status 200', async () => {
    const response = await request(app)
      .get('/api/reserves/user')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});
