'use strict';
const { createConnection } = require('./app/config/db');
const send = require('./app/utils/response');
const CustomersController = require('./app/controllers/customers');
const { formatBody } = require('./app/utils/helpers');

const countCustomers = async (event, context) => {
  createConnection();
  console.log('NODE_ENV', process.env.IS_OFFLINE);
  let response = await CustomersController.count();
  return send(response);
};

const getAllCustomers = async (event, context) => {
  createConnection();
  let response = await CustomersController.all();
  return send(response);
};
const sns_check = async (event, context) => {
  createConnection();
  let response = await CustomersController.sns_check();
  return true;
};
const sqs_check = async (event, context) => {
  createConnection();
  let response = await CustomersController.sqs_check();
  return true;
};
const getCustomer = async (event, context) => {
  createConnection();
  console.log('event.Record', event.pathParameters);
  let response = await CustomersController.getCustomer(event.pathParameters);
  return send(response);
};

const createCustomer = async (event, context) => {
  createConnection();
  const request = formatBody(event);
  console.log('event.Record', request);
  let response = await CustomersController.create(
    request.source == 'sns'
      ? JSON.parse(request.body.Sns.Message)
      : request.body
  );
  return send(response);
};
const deleteCustomer = async (event, context) => {
  createConnection();
  console.log('event.Record', event.pathParameters);
  let response = await CustomersController.deleteCustomer(event.pathParameters);
  return send(response);
};
const updateCustomer = async (event, context) => {
  createConnection();
  const request = formatBody(event);
  console.log('event.Record', event.pathParameters);
  let response = await CustomersController.updateCustomer({
    ...event.pathParameters,
    ...request.body,
  });
  return send(response);
};


module.exports = {
  count: countCustomers,
  all: getAllCustomers,
  create: createCustomer,
  delete: deleteCustomer,
  update: updateCustomer,
  getCustomer,
  sqs_check,
  sns_check,
};
