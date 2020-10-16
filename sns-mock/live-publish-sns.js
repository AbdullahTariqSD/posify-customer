const SNS = require('../app/utils/sns');
const { snsTopics, aws } = require('../app/config/keys');

const sns = SNS({
  isOffline: false, // Only required for CLI testing, in app it will pick this automaticlally
  awsAccessKeyId: aws.accessKeyId,
  awsSecretKey: aws.secretKey,
});

sns
  .publish({
    Message: JSON.stringify({
      name: 'KHIZER',
    }),
    Subject: 'ProductCreate',
    TopicArn: snsTopics.customerCreated,
  })
  .promise()
  .then((r) => console.log(r));
