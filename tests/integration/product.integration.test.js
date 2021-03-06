const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
const app = require('../../server');

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

describe('DELETE All /products', () => {
  it('should return status 404', async () => {
    const res = await chai.request(app).delete('/products').send();
    expect(res.status).to.equal(404);
  });
});

describe('POST Multiple Products /products', () => {
  it('should return status 201', async () => {
    let res = await chai.request(app).post('/products').send({ sku: 0, name: 'someItem1', price: 100 });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/products').send({ sku: 1, name: 'someItem1', price: 125 });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/products').send({ sku: 2, name: 'someItem2', price: 125 });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/products').send({ sku: 3, name: 'someItem2', price: 130 });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/products').send({ sku: 4, name: 'someItem3', price: 130 });
    expect(res.status).to.equal(201);
  });
});

describe('/products?price=1.30 Return all Products with Price of 130', () => {
  it('should return status 200 - GET Products with price of 130', async () => {
    const res = await chai.request(app).get('/products?price=1.30').send();
    expect(res.status).to.equal(200);
  });
  it('should return JSON Object of the item(s)', async () => {
    const res = await chai.request(app).get('/products?price=1.30').send();
    expect(res.body).to.deep.equal([
      {
        sku: 3, name: 'someItem2', price: 1.30, quantity: 0,
      },
      {
        sku: 4, name: 'someItem3', price: 1.30, quantity: 0,
      }]);
  });
});

describe('Duplicate Item Post', () => {
  it('Duplicate Item Post', async () => {
    let res = await chai.request(app).post('/products').send({ sku: 10, name: 'someItem', price: 125 });
    expect(res.status).to.equal(201);
    res = await chai.request(app).post('/products').send({ sku: 10, name: 'someItem', price: 125 });
    expect(res.status).to.equal(400);
  });
});

describe('Invalid Endpoint', () => {
  it('Invalid Endpoint', async () => {
    const res = await chai.request(app).post('/product').send({ sku: 10, name: 'someItem', price: 125 });
    expect(res.status).to.equal(404);
  });
});

describe('Invalid PUT /products/0', () => {
  it('should return status 200', async () => {
    const res = await chai.request(app).put('/products/0').send({ sku: 0, name: 'someItem', price: 125 });
    expect(res.status).to.equal(200);
  });
  it('should return status 400', async () => {
    const res = await chai.request(app).put('/products/0').send({ price: 125 });
    expect(res.status).to.equal(400);
  });
});

describe('Invalid Patch\'s /products/0', () => {
  it('should return status 200', async () => {
    const res = await chai.request(app).patch('/products/0').send({ price: 125 });
    expect(res.status).to.equal(200);
  });
  it('should return status 422', async () => {
    const res = await chai.request(app).patch('/products/0').send({ InvalidKey: 125 });
    expect(res.status).to.equal(422);
  });
  it('should return status 404', async () => {
    const res = await chai.request(app).patch('/products/1').send({ InvalidKey: 125 });
    expect(res.status).to.equal(422);
  });
});
