const mongoose = require('mongoose');
const ExportModel = require('../utils/mongoose-model-export');

const schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      country: { type: String },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = ExportModel(mongoose, 'Customer', schema);
