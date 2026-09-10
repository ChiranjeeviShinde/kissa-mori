import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_BUCKET_ACCESS_SECRET_KEY_ID!,
  },
});

const imageCache = new Map<
  string,
  {
    url: string;
    expiresAt: number;
  }
>();

const SIGNED_URL_TTL = 60 * 60;

async function getImage(key: string) {
  const now = Date.now();

  const cached = imageCache.get(key);

  if (cached && cached.expiresAt > now) {
    return cached.url;
  }

  const command = new GetObjectCommand({
    Bucket: "kissa-mori",
    Key: key,
    ResponseCacheControl: "public, max-age=3600",
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: SIGNED_URL_TTL,
  });

  imageCache.set(key, {
    url,
    expiresAt: now + SIGNED_URL_TTL * 1000 - 60_000,
  });

  return url;
}

export async function getCoffeeImages() {
  const imageKeys = [
    "coffees/c1.jpeg",
    "coffees/c2.jpeg",
    "coffees/c3.jpeg",
    "coffees/c4.jpeg",
    "coffees/c5.jpeg",
  ];

  return Promise.all(imageKeys.map(getImage));
}
