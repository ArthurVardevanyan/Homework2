const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
const app = require('../../server');

const mockDB = require('./mockDB.test');

before(async () => mockDB.connect());

describe('GET /users', () => {
  it('should return status 200', async () => {
    const res = await chai.request(app).get('/users').send();
    expect(res.status).to.equal(200);
  });
});

describe('DELETE /users', () => {
  it('should return status 404', async () => {
    const res = await chai.request(app).delete('/users').send();
    expect(res.status).to.equal(404);
  });
});

describe('GET /users/0', () => {
  it('should return status 404', async () => {
    const res = await chai.request(app).get('/users/0').send();
    expect(res.status).to.equal(404);
  });
});

describe('POST /users', () => {
  it('should return status 201', async () => {
    const res = await chai.request(app).post('/users').send({
      ssn: '000-00-0000', firstName: 'firstName', lastName: 'lastName', age: 0, address: 'someAddress', phone: '000-000-0000',
    });
    expect(res.status).to.equal(201);
  });
});

describe('/users/000-00-0000', () => {
  it('should return status 200 - GET User 000-00-0000', async () => {
    const res = await chai.request(app).get('/users/000-00-0000').send();
    expect(res.status).to.equal(200);
  });
  it('should return JSON Object of the User', async () => {
    const res = await chai.request(app).get('/users/000-00-0000').send();
    expect(res.body).to.deep.equal({
      ssn: '000-00-0000', firstName: 'firstName', lastName: 'lastName', age: 0, address: 'someAddress', phone: '000-000-0000',
    });
  });
  it('should return status 200 - Deleting Existing User 000-00-0000', async () => {
    const res = await chai.request(app).delete('/users/000-00-0000').send();
    expect(res.status).to.equal(200);
  });
  it('should return status 404 - Deleting NON-Existing User 000-00-0000', async () => {
    const res = await chai.request(app).delete('/users/000-00-0000').send();
    expect(res.status).to.equal(404);
  });
});

describe('PUT /users/000-00-0000', () => {
  it('should return status 201', async () => {
    const res = await chai.request(app).post('/users').send({
      ssn: '000-00-0000', firstName: 'firstName', lastName: 'lastName', age: 0, address: 'someAddress', phone: '000-000-0000',
    });
    expect(res.status).to.equal(201);
  });
  it('should return status 201', async () => {
    const res = await chai.request(app).put('/users/000-00-0000').send({
      ssn: '000-00-0000', firstName: 'newFirstName', lastName: 'newLastName', age: 0, address: 'newAddress', phone: '000-000-0000',
    });
    expect(res.status).to.equal(200);
  });
  it('should return JSON Object of the new PUT item', async () => {
    const res = await chai.request(app).get('/users/000-00-0000').send();
    expect(res.body).to.deep.equal({
      ssn: '000-00-0000', firstName: 'newFirstName', lastName: 'newLastName', age: 0, address: 'newAddress', phone: '000-000-0000',
    });
  });
});

describe('Patch /users/000-00-0000', () => {
  it('should return status 201', async () => {
    const res = await chai.request(app).patch('/users/000-00-0000').send({ age: 1 });
    expect(res.status).to.equal(200);
  });
  it('should return JSON Object of the PATCHed item', async () => {
    const res = await chai.request(app).get('/users/000-00-0000').send();
    expect(res.body).to.deep.equal({
      ssn: '000-00-0000', firstName: 'newFirstName', lastName: 'newLastName', age: 1, address: 'newAddress', phone: '000-000-0000',
    });
  });
});

describe('DELETE All /users', () => {
  it('should return status 404', async () => {
    const res = await chai.request(app).delete('/users').send();
    expect(res.status).to.equal(404);
  });
});

describe('POST Multiple users /users', () => {
  it('should return status 201', async () => {
    let res = await chai.request(app).post('/users').send({
      ssn: '000-00-0000', firstName: 'newFirstName', lastName: 'newLastName', age: 1,
    });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/users').send({
      ssn: '000-00-0001', firstName: 'newFirstName', lastName: 'newLastName', age: 2,
    });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/users').send({
      ssn: '000-00-0002', firstName: 'newFirstName', lastName: 'newLastName', age: 2,
    });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/users').send({
      ssn: '000-00-0003', firstName: 'newFirstName', lastName: 'newLastName', age: 3,
    });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/users').send({
      ssn: '000-00-0004', firstName: 'newFirstName', lastName: 'newLastName', age: 3,
    });
    expect(res.status).to.equal(201);
  });
});

describe('/users?age=2 Return all users with age of 2', () => {
  it('should return status 200 - GET users with age of 2', async () => {
    const res = await chai.request(app).get('/users?age=2').send();
    expect(res.status).to.equal(200);
  });
  it('should return JSON Object of the item(s)', async () => {
    const res = await chai.request(app).get('/users?age=2').send();
    expect(res.body).to.deep.equal([
      {
        ssn: '000-00-0001', firstName: 'newFirstName', lastName: 'newLastName', age: 2,
      },
      {
        ssn: '000-00-0002', firstName: 'newFirstName', lastName: 'newLastName', age: 2,
      }]);
  });
});

describe('Duplicate User Post', () => {
  it('Duplicate User Post', async () => {
    let res = await chai.request(app).post('/users').send({
      ssn: '000-00-0011', firstName: 'newFirstName', lastName: 'newLastName', age: 2,
    });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/users').send({
      ssn: '000-00-0011', firstName: 'newFirstName', lastName: 'newLastName', age: 2,
    });
    expect(res.status).to.equal(400);
  });
});

describe('Invalid Endpoint', () => {
  it('Invalid Endpoint', async () => {
    const res = await chai.request(app).post('/user').send({
      ssn: '000-00-0011', firstName: 'newFirstName', lastName: 'newLastName', age: 2,
    });
    expect(res.status).to.equal(404);
  });
});

describe('Invalid PUT /users/0', () => {
  it('should return status 200', async () => {
    const res = await chai.request(app).put('/users/000-00-0011').send({
      ssn: '000-00-0011', firstName: 'newFirstName', lastName: 'newLastName', age: 2,
    });
    expect(res.status).to.equal(200);
  });
  it('should return status 400', async () => {
    const res = await chai.request(app).put('/users/000-00-0011').send({ lastName: 'newLastName', age: 2 });
    expect(res.status).to.equal(400);
  });
});

describe('Invalid Patch\'s /users/000-00-0011', () => {
  it('should return status 200', async () => {
    const res = await chai.request(app).patch('/users/000-00-0011').send({ age: 125 });
    expect(res.status).to.equal(200);
  });
  it('should return status 422', async () => {
    const res = await chai.request(app).patch('/users/000-00-0011').send({ InvalidKey: 125 });
    expect(res.status).to.equal(422);
  });
  it('should return status 404', async () => {
    const res = await chai.request(app).patch('/users/000-00-0012').send({ InvalidKey: 125 });
    expect(res.status).to.equal(404);
  });
});
