const AWS = require('aws-sdk');
const keys = require('../config/keys');

module.exports = ({ isOffline, awsAccessKeyId, awsSecretKey, isSqs }) => {
  isOffline = typeof isOffline !== 'undefined' ? isOffline : keys.isOffline;
  isSqs = typeof isOffline !== 'undefined' ? isSqs : false;

  let opts = {
    region: keys.aws.region,
  };

  if (isOffline) {
    opts = {
      ...opts,
      endpoint: keys.aws.offlineEndpoint,
    };
  } else if (awsAccessKeyId && awsSecretKey) {
    opts = {
      ...opts,
      accessKeyId: awsAccessKeyId,
      secretKey: awsSecretKey,
    };
  }

  return isSqs ? new AWS.SQS(opts) : new AWS.SNS(opts);
};
