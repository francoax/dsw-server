import request from 'supertest';
import app from '../src/app.js';
import propertyseed from './seeds/property.seed.js';
import propertyTypeseed from './seeds/property-type.seed.js';
import Property from '../src/models/Property.js';
import propertieType from '../src/models/propertieType.js';
import mongoose from 'mongoose';

const mockProperty = {
  capacity: 123,
  address: "Fake street 123",
  pricePerNight: '240',
  propertyType: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf2'),
  location: 'Palermo, AR',
  image: 'testing.png'
};

const mockPropertyBad= {
  capacity: 123,
  address: "Fake street 123",
  pricePerNight: 240,
  propertyType: new mongoose.Types.ObjectId('655cb7f26940c09944cdfdf2'),
  location: 'Bariloche, AR',
}


beforeAll(async () => {
  await propertieType.collection.insertMany(propertyTypeseed);
  await Property.collection.insertMany(propertyseed);
});

describe('GET all properties /api/properties', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/properties').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/property').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return all properties', async () => {
    const response = await request(app).get('/api/properties').send();
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data).toBeDefined();
  });
});

describe('GET one property /api/properties/:id', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/properties/65b17fc9b7b9d7b66f31740c').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return a property that exists ', async () => {
    const response = await request(app).get('/api/properties/65b17fc9b7b9d7b66f31740c').send();
    const property = response.body.data;
    expect(property).toBeDefined();
  });
  test('should return a propertie with their type', async () => {
    const response = await request(app).get('/api/properties/65b17fc9b7b9d7b66f31740c').send();
    expect(response.body.data.propertyType).toBeDefined();
  });
});

describe('POST activity /api/activities/', () => {
  test('should create a property with status 201', async () => {
    const response = await request(app).post('/api/properties/').send(mockProperty);
    expect(response.status).toBe(200);  
    expect(response.error).toBeFalsy();
  });
  test('missing files return 404', async () => {
  const response = await request(app).post('/api/properties/6465286dad795d0bf31704f8').send(mockPropertyBad);
  expect(response.status).toBe(404);
  expect(response.error).toBeTruthy();
  });
});

describe('PUT logic by id api/properties/:id', () => {
  test('on edit throw good request 200', async () => {
    const response = await request(app).put('/api/properties/65b17fc9b7b9d7b66f31740c').send(mockProperty);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('wrong id return the 400', async () => {
    const response = await request(app).put('/api/properties/6465286dad795d0bf31704f').send(mockProperty);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE logic by id api/properties/:id', () => {
  test('on delete throw good request 200', async () => {
    const response = await request(app).delete('/api/properties/65b17f0fa5e9063d56984565');
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('when does not exists return status 404', async () => {
    const response = await request(app).delete('/api/activities/6365286dad795d0bf31704f8');
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('wrong id return the 400', async () => {
    const response = await request(app).delete('/api/properties/6465286dad795d0bf31704f');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});