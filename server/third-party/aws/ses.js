import AWS from 'aws-sdk';

const sesInstance = new AWS.SES({
  region: 'us-east-1'
});

export const sendTemplatedEmail = (
  templateId,
  fromEmail,
  toEmail,
  templateData
) =>
  new Promise((resolve, reject) => {
    sesInstance.sendTemplatedEmail(
      {
        Destination: {
          ToAddresses: [toEmail]
        },
        Source: fromEmail,
        Template: templateId,
        TemplateData: JSON.stringify(templateData)
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
