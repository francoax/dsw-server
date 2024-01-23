// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import Package from '../src/models/package';
import app from '../src/app';
import medicalAssistanceSeed from './seeds/medicalAssistance.seed';
import propertySeed from './seeds/property.seed';
import carSeed from './seeds/car.seed';
import packageSeed from './seeds/package.seed';
import Car from '../src/models/car';
import MedicalAssistance from '../src/models/MedicalAssistance';
import Property from '../src/models/Property';

beforeAll(async () => {
  await Promise.all([
    Package.insertMany(packageSeed),
    Car.insertMany(carSeed),
    Property.insertMany(propertySeed),
    MedicalAssistance.insertMany(medicalAssistanceSeed),
  ]);
});

describe('GET /api/packages', () => {
  test('should return status 200 and the list of packages', async () => {
    const response = await request(app).get('/api/packages').send();

    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveLength(4);
    expect(response.body.error).toBeFalsy();
  });

  test('should return the packages with their properties populated', async () => {
    const response = await request(app).get('/api/packages').send();

    const firstPackage = response.body.data[0];

    expect(firstPackage.car).toBeInstanceOf(Object);
    expect(firstPackage.medicalAssistance).toBeInstanceOf(Object);
    expect(firstPackage.property).toBeInstanceOf(Object);
  });

  test('should return status 404 if there arent packages', async () => {
    await Package.deleteMany();
    const response = await request(app).get('/api/packages').send();

    expect(response.status).toBe(404);
    expect(response.body.data).toHaveLength(0);
    expect(response.body.error).toBeFalsy();

    await Package.insertMany(packageSeed);
  });
});

describe('GET /api/packages/filter', () => {
  test('should return packages completos ?type=completo', async () => {
    const response = await request(app).get('/api/packages?type=completo').send();

    expect(response.status).toBe(200);

    response.body.data.forEach((pack) => {
      expect(pack.type).toBe('completo');
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toHaveLength(1);
    expect(response.body.error).toBeFalsy();
  });
});

describe('GET /api/packages/{id}', () => {
  test('should return status 200 and the package requested with the id sent', async () => {
    const idTest = packageSeed.at(0)._id;
    const response = await request(app).get(`/api/packages/${idTest}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('should return status 400 if the id sent is invalid', async () => {
    const idTest = '123';
    const response = await request(app).get(`/api/packages/${idTest}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBe(idTest);
    expect(response.body.error).toBeTruthy();
  });
});
