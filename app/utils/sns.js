const AWS = require('aws-sdk');
const keys = require('../config/keys');

module.exports = ({ isOffline, awsAccessKeyId, awsSecretKey }) => {
  isOffline = typeof isOffline !== 'undefined' ? isOffline : keys.isOffline;

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

  return new AWS.SNS(opts);
};
