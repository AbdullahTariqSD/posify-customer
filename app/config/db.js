const mongoose = require('mongoose');
const keys = require('./keys');

let activeConnection = mongoose.connection;
let connection;

exports.db = mongoose;
exports.activeConnection = activeConnection;

exports.createConnection = (url = keys.mongodb) => {
  if (!connection) {
    let conn = mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      poolSize: 50,
    });
    connection = conn;
  } else {
    activeConnection = connection;
  }
};

exports.Model = (name, schema) => {
  let model;
  try {
    model = activeConnection.model(name, schema);
    return model;
  } catch (err) {
    model = activeConnection.model(name);
    return model;
  }
};
