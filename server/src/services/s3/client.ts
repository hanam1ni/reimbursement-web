import { S3 } from "@aws-sdk/client-s3";
import "dotenv/config";

export const client = new S3({
  endpoint: "https://sgp1.digitaloceanspaces.com",
  region: "sgp1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY as string,
    secretAccessKey: process.env.SPACES_SECRET as string,
  },
});
