module.exports = (connection, name, schema) => {
  let model;
  try {
    model = connection.model(name, schema);
    return model;
  } catch (err) {
    model = connection.model(name);
    return model;
  }
};
