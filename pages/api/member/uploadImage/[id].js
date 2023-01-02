import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);
    if (!user) res.status(401).json({ message: "Unauthorized" });

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { id } = req.query;
    let imageSrc = req.body;
    // const token = getSession(req, res);

    AWS.config.apiVersions = {
      s3: "2012-10-17",
    };

    // Using IAM Roles
    // AWS.config.region = process.env.MY_AWS_CONFIG_REGION; // Region
    // AWS.config.credentials = new MY_AWS.CognitoIdentityCredentials({
    //   IdentityPoolId: process.env.MY_AWS_CONFIG_IDENTITY_POOL_ID,
    //   Logins: {
    //     "dev-68izmldm0nk4ecox.us.auth0.com": token.idToken,
    //   },
    // });

    // Using AWS Access ID/KEY
    AWS.config.update({
      accessKeyId: process.env.MY_AWS_USER_SECRET_ACCESS_ID,
      secretAccessKey: process.env.MY_AWS_USER_SECRET_ACCESS_KEY,
      region: process.env.MY_AWS_CONFIG_REGION,
    });

    let s3 = new S3();

    //process base64 into valid blob
    imageSrc = imageSrc.replaceAll('"', "").replace(/^data:image\/\w+;base64,/, "");
    let image = Buffer.from(imageSrc, "base64");

    const params = {
      Body: image,
      Key: `${id}.jpg`,
      ContentType: "image/jpeg",
      Bucket: process.env.MY_AWS_S3_BUCKET_NAME,
    };

    const response = s3.putObject(params, function (err, data) {
      if (err) throw new Error(err, err.stack);
    });

    res.status(200).json({ message: " Member image uploaded successfully." });
  } catch (error) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
});
