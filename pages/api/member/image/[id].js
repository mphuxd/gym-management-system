import AWS from 'aws-sdk/global';
import S3 from 'aws-sdk/clients/s3';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  try {
    const { user } = await getSession(req, res);
    if (!user) res.status(401).json({ message: 'Unauthorized' });

    if (req.method !== 'POST' && req.method !== 'GET') {
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).json({ message: 'Method not allowed' });
    }

    AWS.config.apiVersions = {
      s3: '2012-10-17',
    };

    AWS.config.update({
      accessKeyId: process.env.MY_AWS_USER_SECRET_ACCESS_ID,
      secretAccessKey: process.env.MY_AWS_USER_SECRET_ACCESS_KEY,
      region: process.env.MY_AWS_CONFIG_REGION,
    });

    const s3 = new S3();

    const { id } = req.query;

    switch (req.method) {
      case 'POST': {
        let imageSrc = req.body;
        imageSrc = imageSrc
          .replaceAll('"', '')
          .replace(/^data:image\/\w+;base64,/, '');
        const image = Buffer.from(imageSrc, 'base64');

        const params = {
          Body: image,
          Key: `${id}.jpg`,
          ContentType: 'image/jpeg',
          Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
        };
        s3.putObject(params, (err) => {
          if (err) throw new Error(err, err.stack);
        });
        return res
          .status(200)
          .json({ message: ' Member image uploaded successfully.' });
      }
      case 'GET': {
        const params = {
          Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
          Key: `${id}.jpg`,
        };
        await s3.headObject(params).promise();
        const url = await s3.getSignedUrlPromise('getObject', params);
        return res.status(200).json({ statusCode: 200, imageUrl: url });
      }
      default:
        break;
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error';
    res.json({ statusCode: 500, message: errorMessage });
  }
  return null;
});
