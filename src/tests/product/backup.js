/**
 * @author - Wokoro Douye Samuel
 */

import sinon from 'sinon';
import { expect } from 'chai';
import axios from 'axios';

import request from '../../config/supertest';
import models from '../../database/models';
import service from '../../service';
import { productInfo } from '../fixtures'

const { Product, Warehouse, WarehouseProducts } = models;
const sandbox = sinon.createSandbox();

describe('Product backup tests POST: /api/v1/products/backup', () => {

  after(async () => {
    sandbox.restore();

    await Product.destroy({ where: {}, force: true });
    await Warehouse.destroy({ where: {}, force: true });
    await WarehouseProducts.destroy({ where: {}, force: true });
  });

  it('should return error when skus field is not provided', async () => {
    const res = await request
      .post('/api/v1/products/backup')
      .send();

    expect(res.status).to.eql(406);
    expect(res.body.status).to.eql('error');
    expect(res.body.validationError).to.eql([
      'skus must be an array with at lease 1 sku value'
    ])
  });

  it('should return error for unsuccessful product retrieval from third party api', async () => {
    await sandbox.stub(axios, 'post').returns({ data: { status: 'Error' } });

    const res = await request
      .post('/api/v1/products/backup')
      .send({ skus: ['johnhenry-bourbonrub'] });

    expect(res.status).to.eql(400);
    expect(res.body.status).to.eql('error');
    expect(res.body.error).to.eql('Error retrieving product information')

    await sandbox.restore();
  });

  it('should return error when product information not found', async () => {
    sandbox.stub(axios, 'post').returns({ data: { status: 'Success', data: [] } });

    const res = await request
      .post('/api/v1/products/backup')
      .send({ skus: ['johnhenry-bourbonrub'] });

    expect(res.status).to.eql(404);
    expect(res.body.status).to.eql('error');
    expect(res.body.error).to.eql('Product information not found')

    sandbox.restore()
  });

  it('should backup data successfully', async () => {
    sandbox.stub(axios, 'post').returns({ data: { status: 'Success', data: productInfo } });

    const res = await request
      .post('/api/v1/products/backup')
      .send({ skus: ['johnhenry-bourbonrub'] });

    expect(res.status).to.eql(200);
    expect(res.body.status).to.eql('success');
    expect(res.body.data).to.eql('Products(s) backed up successfully');

    sandbox.restore()
  });
});
