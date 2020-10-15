const mongoose = require('mongoose');
const keys = require('../config/keys');
const models = require('../models');

exports.setupTest = () => {
  mongoose.connect(keys.mongodbTest);
  return exports.clearDb();
};

exports.clearDb = () => {
  mongoose.connect(keys.mongodbTest);
  return Promise.all(Object.values(models).map((model) => model().remove({})));
};
