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

// Complete package offered
const mockNewCompletePackage = {
  type: 'completo',
  property: '65b17f725dbefe507285b207',
  car: '6545c23e7010457f8a26cc38',
  medicalAssistance: '6581c007feeb428fa84620ff',
  image: 'tests.png',
  discount: 0.6,
};

// Custom package created by the reserve of the user
const mockNewCustomPackageWithAll = {
  type: 'custom',
  property: '65b17f725dbefe507285b207',
  car: '6545c23e7010457f8a26cc38',
  medicalAssistance: '6581c007feeb428fa84620ff',
};

// Custom package created by the reserve of the user
const mockNewCustomPackageWithFew = {
  type: 'custom',
  property: '65b17f725dbefe507285b207',
  car: '',
  medicalAssistance: '',
};

// Package with wrong attributes
const mockNewBadPackage = {
  property: '',
  car: 5,
};

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

describe('POST /api/packages', () => {
  test('should return status 200 at the creation of a complete package', async () => {
    const { status, body } = await request(app).post('/api/packages').send(mockNewCompletePackage);

    expect(status).toBe(200);
    expect(body.message).toBeDefined();
    expect(body.data).toBeDefined();
    expect(body.data).toBeInstanceOf(Object);
    expect(body.data.type).toBe('completo');
    expect(body.error).toBeFalsy();
  });

  test('should return status 200 at the creation of a custom package with all attributes', async () => {
    const { status, body } = await request(app).post('/api/packages').send(mockNewCustomPackageWithAll);

    expect(status).toBe(200);
    expect(body.message).toBeDefined();
    expect(body.data).toBeDefined();
    expect(body.data).toBeInstanceOf(Object);
    expect(body.data.type).toBe('custom');
    expect(body.error).toBeFalsy();
  });

  test('should return status 200 at the creation of custom package with a few attributes', async () => {
    const { status, body } = await request(app).post('/api/packages').send(mockNewCustomPackageWithFew);

    expect(status).toBe(200);
    expect(body.message).toBeDefined();
    expect(body.data).toBeDefined();
    expect(body.data).toBeInstanceOf(Object);
    expect(body.data.type).toBe('custom');
    expect(body.error).toBeFalsy();
  });

  test('should return status 400 if the package is wrong', async () => {
    const { status, body } = await request(app).post('/api/packages').send(mockNewBadPackage);

    expect(status).toBe(400);
    expect(body.message).toBeDefined();
    expect(body.data).toBeDefined();
    expect(body.error).toBeTruthy();
  });
});

describe('PUT /api/packages/{id}', () => {
  test('should return status 200 and the package updated', async () => {
    const firstPackage = packageSeed.at(0);
    const firstPackageEdited = {
      property: '65b17e1012459c3108bc808d',
      car: '6545c23e7010457f8a26cc31',
      medicalAssistance: '6581c007feeb428fa84620dd',
      image: 'updated.png',
    };
    const { status, body } = await request(app)
      .put(`/api/packages/${firstPackage._id}`)
      .send(firstPackageEdited);

    expect(status).toBe(200);
    expect(body.data.property).not.toEqual(firstPackage.property);
    expect(body.data.car).not.toEqual(firstPackage.car);
    expect(body.data.medicalAssistance).not.toEqual(firstPackage.medicalAssistance);
    expect(body.data.car).not.toEqual(firstPackage.nameImage);
    expect(body.error).toBeFalsy();
  });

  test('should return status 400 if the ID is wrong', async () => {
    const wrongId = '123456';
    const { status, body } = await request(app).put(`/api/packages/${wrongId}`).send();

    expect(status).toBe(400);
    expect(body.message).toBeDefined();
    expect(body.data).toEqual(wrongId);
    expect(body.error).toBeTruthy();
  });
});

describe('DELETE /api/packages/{id}', () => {
  test('should return status 200 if the package is deleted', async () => {
    const firstPackage = packageSeed.at(0);
    const { _id: packageToDelete } = firstPackage;
    const { status, body } = await request(app).delete(`/api/packages/${packageToDelete}`).send();

    const packagesLeft = (await Package.find());

    expect(status).toBe(200);
    expect(body.message).toBeDefined();
    expect(body.data).toBeInstanceOf(Object);
    expect(body.error).toBeFalsy();
    // 6 due to the packages created on POST tests
    // Seeds = 4, POST tests = 3 ==> Total = 7
    expect(packagesLeft).toHaveLength(6);
  });

  test('should return status 404 if the package is already deleted or not found', async () => {
    const firstPackageDeleted = packageSeed.at(0);
    const { _id: packageAlreadyDeleted } = firstPackageDeleted;
    const { status, body } = await request(app).delete(`/api/packages/${packageAlreadyDeleted}`).send();

    expect(status).toBe(404);
    expect(body.message).toBeDefined();
    expect(body.data).toBeNull();
    expect(body.error).toBeFalsy();
  });

  test('should return status 400 if the ID is wrong', async () => {
    const wrongId = '123456';
    const { status, body } = await request(app).delete(`/api/packages/${wrongId}`).send();

    expect(status).toBe(400);
    expect(body.message).toBeDefined();
    expect(body.data).toEqual(wrongId);
    expect(body.error).toBeTruthy();
  });
});
