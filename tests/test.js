const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
const app = require('../server');
// const Product = require('../models/product.model');

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
    const res = await chai.request(app).post('/products').send({ sku: 3, name: 'test2', price: 2 });
    expect(res.status).to.equal(201);
  });
});
