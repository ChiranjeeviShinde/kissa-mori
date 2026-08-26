import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_BUCKET_ACCESS_SECRET_KEY_ID!,
  },
});

async function getImage(key: string) {
  const command = new GetObjectCommand({
    Bucket: "kissa-mori",
    Key: key,
  });

  return await getSignedUrl(s3Client, command);
}

export async function getCoffeeImages() {
  const imageKeys = [
    "coffees/c1.jpeg",
    "coffees/c2.jpeg",
    "coffees/c3.jpeg",
    "coffees/c4.jpeg",
    "coffees/c5.jpeg",
  ];

  return await Promise.all(imageKeys.map((key) => getImage(key)));
}
