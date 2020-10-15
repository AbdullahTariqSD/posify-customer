exports.formatBody = (event) => {
  let source = event.Records ? 'sns' : 'http';
  let body = event.Records ? event.Records[0] : event.body;
  try {
    if(typeof body === 'string') body = JSON.parse(body);
  } catch (err) {}
  return { source, body };
};
