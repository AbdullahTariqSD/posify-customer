const SNS = require('../app/utils/sns');
const { snsTopics } = require('../app/config/keys');

const sns = SNS({
  isOffline: false, // Only required for CLI testing, in app it will pick this automaticlally
});

sns
  .publish({
    Message: JSON.stringify({
      name: 'KHIZER',
    }),
    Subject: 'ProductCreate',
    TopicArn: snsTopics.createProduct,
  })
  .promise()
  .then((r) => console.log(r));
