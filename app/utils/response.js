const HttpStatus = require('http-status-codes');

const generateMessage = (code) => {
  let message = commonMessages.hasOwnProperty(code)
    ? commonMessages[code]
    : null;
  return message;
};

const commonMessages = {
  200: 'Request processed successfully.',
  201: 'New entry has been created.',
  400: 'The request by the client was not processed, as the server could not understand what the client is asking for.',
  401: 'The client is not allowed to access resources, and should re-request with the required credentials.',
  403: 'The client is not allowed access the resource.',
  404: 'The requested resource is not available.',
  500: 'Request can not be processed due to unexpected internal server error.',
  503: 'Server is down or unavailable to receive and process the request',
};

module.exports = ({ data, statusCode = 200, message = null }) => {
  let statusCodeText = HttpStatus.getStatusText(statusCode);
  const responseMsg = generateMessage(statusCode);
  message =
    message !== null ? message : responseMsg ? responseMsg : statusCodeText;
  let result = {
    success: false,
    responseStatus: statusCodeText.toUpperCase().split(' ').join('_'),
    message: message,
  };
  if (statusCode >= 200 && statusCode < 400) {
    result.success = true;
  }
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ ...result, data }),
  };
};
