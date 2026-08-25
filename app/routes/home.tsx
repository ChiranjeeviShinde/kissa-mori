import type { Route } from "./+types/home";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import CoffeeShop from "../../components/CoffeeShop";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kissa Mori" },
    { name: "description", content: "Welcome to Kissa Mori Café!" },
  ];
}

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

  return await getSignedUrl(s3Client, command, { expiresIn: 1000 });
}

export async function loader() {
  const imageUrl = await getImage("coffee.jpg");
  const imageUrl2 = await getImage("coffee2.jpg");

  return {
    imageUrl,
    imageUrl2,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { imageUrl, imageUrl2 } = loaderData;

  return <CoffeeShop imageUrl={imageUrl} imageUrl2={imageUrl2} />;
}
