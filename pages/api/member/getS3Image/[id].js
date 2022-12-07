import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    // const token = await getSession(req, res);

    AWS.config.apiVersions = {
      s3: "2012-10-17",
    };
    // AWS.config.region = process.env.AWS_CONFIG_REGION; // Region
    // // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    // //   IdentityPoolId: process.env.AWS_CONFIG_IDENTITY_POOL_ID,
    // //   Logins: {
    // //     "dev-68izmldm0nk4ecox.us.auth0.com": token.idToken,
    // //   },
    // // });

    AWS.config.update({
      accessKeyId: process.env.AWS_USER_SECRET_ACCESS_ID,
      secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
      region: process.env.AWS_CONFIG_REGION,
    });

    let s3 = new S3();

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${id}.jpg`,
    };

    await s3.headObject(params).promise();
    const url = await s3.getSignedUrlPromise("getObject", params);
    return res.status(200).json({ statusCode: 200, imageUrl: url });
  } catch (error) {
    console.log("Unknown Error: ", error, "Check if object exists.");
    return res.json({ statusCode: error.statusCode, error });
  }
}
