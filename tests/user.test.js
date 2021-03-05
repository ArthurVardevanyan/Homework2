const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
const app = require('../server');

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

describe('POST /users', () => {
  it('should return status 201', async () => {
    const res = await chai.request(app).post('/users').send({
      ssn: '000-00-0000', firstName: 'firstName', lastName: 'lastName', age: 0, address: 'someAddress', phone: '000-000-0000',
    });
    expect(res.status).to.equal(201);
  });
});

describe('/users/0', () => {
  it('should return status 200 - GET User 0', async () => {
    const res = await chai.request(app).get('/users/000-00-0000').send();
    expect(res.status).to.equal(200);
  });
  it('should return JSON Object of the item', async () => {
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
