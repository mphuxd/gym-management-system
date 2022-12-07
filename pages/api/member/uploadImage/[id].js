import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    let imageSrc = req.body;
    // const token = await getSession(req, res);

    AWS.config.apiVersions = {
      s3: "2012-10-17",
    };

    // Using IAM Roles
    // AWS.config.region = process.env.AWS_CONFIG_REGION; // Region
    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //   IdentityPoolId: process.env.AWS_CONFIG_IDENTITY_POOL_ID,
    //   Logins: {
    //     "dev-68izmldm0nk4ecox.us.auth0.com": token.idToken,
    //   },
    // });

    // Using AWS Access ID/KEY
    AWS.config.update({
      accessKeyId: process.env.AWS_USER_SECRET_ACCESS_ID,
      secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
      region: process.env.AWS_CONFIG_REGION,
    });

    let s3 = new S3();

    //process base64 into valid blob
    imageSrc = imageSrc.replaceAll('"', "").replace(/^data:image\/\w+;base64,/, "");
    let image = Buffer.from(imageSrc, "base64");

    const params = {
      Body: image,
      Key: `${id}.jpg`,
      ContentType: "image/jpeg",
      Bucket: process.env.AWS_S3_BUCKET_NAME,
    };

    const response = s3.putObject(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });

    return res.end("200");
  } catch (error) {
    console.log(error);
  }
}
