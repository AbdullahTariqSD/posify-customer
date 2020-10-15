const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));
const faker = require('faker');
const CustomersController = require('./index');
const testHelper = require('../../utils/test.helper');
const mongoose = require('mongoose');

beforeEach(testHelper.setupTest);
let newCustomer = {
  firstName: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email(),
  phone: '03338181333',
};
let updCustomer = {
  firstName: faker.name.findName(),
  lastName: faker.name.findName(),
};
let customerProps = ['firstName', 'lastName', 'email', 'phone'];
const getCustomerBody = () => {
  return {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email(),
    phone: '03338181333',
  };
};
const verifyResult = ({ result }) => {
  expect(typeof result).to.equal('object');
  expect(mongoose.Types.ObjectId.isValid(result.data._id)).to.equal(true);
};

describe('Customers', () => {
  let _id = '';
  describe('Create', () => {
    it('should return new customer', async () => {
      const result = await CustomersController.create(newCustomer);
      verifyResult({ result });
      for (const prop of customerProps) {
        expect(newCustomer[prop]).to.equal(result.data[prop]);
      }
      _id = result.data._id;
    });
    it('should return error message of duplicate email', async () => {
      const result = await CustomersController.create(newCustomer);
      expect(typeof result).to.equal('object');
      expect(result.statusCode).to.equal(400);
    });
  });

  describe('Get', () => {
    it('should return customer by id', async () => {
      const result = await CustomersController.getCustomer({ _id });
      verifyResult({ result });
      for (const prop of customerProps) {
        expect(newCustomer[prop]).to.equal(result.data[prop]);
      }
    });
    it('should return array of customers', async () => {
      const result = await CustomersController.all();
      expect(typeof result).to.equal('object');
      expect(result.data.constructor).to.equal(Array);
      for (const customer of result.data) {
        for (const prop of customerProps) {
          expect(prop in customer).to.equal(true);
        }
      }
    });
  });
  describe('Update', () => {
    it('should return updated customer', async () => {
      const result = await CustomersController.updateCustomer({
        _id,
        ...updCustomer,
      });
      verifyResult({ result });
      for (const prop of customerProps) {
        if (prop in updCustomer)
          expect(result.data[prop]).to.equal(updCustomer[prop]);
        else expect(result.data[prop]).to.equal(newCustomer[prop]);
      }
    });
    it('should return error message of customer not found', async () => {
      const result = await CustomersController.updateCustomer({
        _id: '5f86e995a94d01698262c54c',
      });
      expect(typeof result).to.equal('object');
      expect(result.statusCode).to.equal(400);
    });
  });

  describe('Delete', () => {
    it('should return deleted customer', async () => {
      const result = await CustomersController.deleteCustomer({ _id });
      verifyResult({ result });
      for (const prop of customerProps) {
        if (prop in updCustomer)
          expect(result.data[prop]).to.equal(updCustomer[prop]);
        else expect(result.data[prop]).to.equal(newCustomer[prop]);
      }
    });
    it('should return error message of customer not found', async () => {
      const result = await CustomersController.deleteCustomer({ _id });
      expect(typeof result).to.equal('object');
      expect(result.statusCode).to.equal(400);      
    });
  });
});
