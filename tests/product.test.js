const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
const app = require('../server');

const mockDB = require('./mockDB.test');

before(async () => mockDB.connect());

describe('GET /products', () => {
  it('should return status 200', async () => {
    const res = await chai.request(app).get('/products').send();
    expect(res.status).to.equal(200);
  });
});

describe('DELETE /products', () => {
  it('should return status 404', async () => {
    const res = await chai.request(app).delete('/products').send();
    expect(res.status).to.equal(404);
  });
});

describe('POST /products', () => {
  it('should return status 201', async () => {
    const res = await chai.request(app).post('/products').send({ sku: 0, name: 'someItem', price: 125 });
    expect(res.status).to.equal(201);
  });
});

describe('/products/0', () => {
  it('should return status 200 - GET Product 0', async () => {
    const res = await chai.request(app).get('/products/0').send();
    expect(res.status).to.equal(200);
  });
  it('should return JSON Object of the item', async () => {
    const res = await chai.request(app).get('/products/0').send();
    expect(res.body).to.deep.equal({
      quantity: 0, sku: 0, name: 'someItem', price: 1.25,
    });
  });
  it('should return status 200 - Deleting Existing Item 0', async () => {
    const res = await chai.request(app).delete('/products/0').send();
    expect(res.status).to.equal(200);
  });
  it('should return status 404 - Deleting NON-Existing Item 0', async () => {
    const res = await chai.request(app).delete('/products/0').send();
    expect(res.status).to.equal(404);
  });
});

describe('PUT /products/0', () => {
  it('should return status 201', async () => {
    const res = await chai.request(app).post('/products').send({ sku: 0, name: 'someItem', price: 125 });
    expect(res.status).to.equal(201);
  });
  it('should return status 201', async () => {
    const res = await chai.request(app).put('/products/0').send({ sku: 0, name: 'myNewItem', price: 130 });
    expect(res.status).to.equal(200);
  });
  it('should return JSON Object of the new PUT item', async () => {
    const res = await chai.request(app).get('/products/0').send();
    expect(res.body).to.deep.equal({
      quantity: 0, sku: 0, name: 'myNewItem', price: 1.30,
    });
  });
});

describe('Patch /products/0', () => {
  it('should return status 201', async () => {
    const res = await chai.request(app).patch('/products/0').send({ quantity: 1 });
    expect(res.status).to.equal(200);
  });
  it('should return JSON Object of the PATCHed item', async () => {
    const res = await chai.request(app).get('/products/0').send();
    expect(res.body).to.deep.equal({
      quantity: 1, sku: 0, name: 'myNewItem', price: 1.30,
    });
  });
});
