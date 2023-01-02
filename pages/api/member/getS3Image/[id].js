import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const session = getSession(req, res);
    const { id } = req.query;

    AWS.config.apiVersions = {
      s3: "2012-10-17",
    };

    AWS.config.update({
      accessKeyId: process.env.MY_AWS_USER_SECRET_ACCESS_ID,
      secretAccessKey: process.env.MY_AWS_USER_SECRET_ACCESS_KEY,
      region: process.env.MY_AWS_CONFIG_REGION,
    });

    let s3 = new S3();

    const params = {
      Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
      Key: `${id}.jpg`,
    };

    await s3.headObject(params).promise();
    const url = await s3.getSignedUrlPromise("getObject", params);
    return res.status(200).json({ statusCode: 200, imageUrl: url });
  } catch (error) {
    console.log("Unknown Error: ", error, "Check if object exists.");
    return res.json({ statusCode: error.statusCode, error });
  }
});
