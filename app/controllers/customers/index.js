const { Customer } = require('../../models');
const { customerSchema, customerUpdSchema } = require('../../utils/validator');

const mongoose = require('mongoose');

const all = async () => {
  try {
    const customers = await Customer.find({});
    return { data: customers };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: err.message };
  }
};

const getCustomer = async ({ _id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return { statusCode: 400, message: 'Invalid ObjectId' };
    const customers = await Customer.find({ _id });
    if (customers && customers.length > 0) return { data: customers[0] };
    return { message: 'No record found.' };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: err.message };
  }
};

const count = async () => {
  try {
    const customerCount = await Customer.count({});
    return { data: { count: customerCount } };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: err.message };
  }
};

const create = async (body) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      country,
    } = body;
    let duplicateCustomers = await Customer.find({ email });
    if (duplicateCustomers.length > 0) {
      return {
        statusCode: 400,
        message: 'Customer with the same email address already exist',
      };
    }
    await customerSchema.validateAsync({ firstName, lastName, phone, email });
    let newCustomer = new Customer({
      firstName,
      lastName,
      phone,
      email,
      address: {
        addressLine1,
        addressLine2,
        city,
        country,
      },
    });
    let data = await newCustomer.save();
    return { statusCode: 200, data };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: err.message };
  }
};

const deleteCustomer = async ({ _id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return { statusCode: 400, message: 'Invalid ObjectId' };
    let { value } = await Customer.findOneAndDelete(
      { _id },
      { rawResult: true }
    );
    if (value) {
      return { statusCode: 200, data: value };
    }

    return { statusCode: 400, message: 'No record found.' };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: err };
  }
};
const updateCustomer = async ({ _id, ...updCustomer }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return { statusCode: 400, message: 'Invalid ObjectId' };
    await customerUpdSchema.validateAsync(updCustomer);
    if ('email' in updCustomer)
      return { statusCode: 400, message: 'Email cannot be updated' };
    let value = await Customer.findOneAndUpdate({ _id }, updCustomer, {
      new: true,
    });
    if (value) return { statusCode: 200, data: value };
    return { statusCode: 400, message: 'No record found.' };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: err.message };
  }
};

module.exports = {
  all,
  count,
  create,
  deleteCustomer,
  updateCustomer,
  getCustomer,
};
