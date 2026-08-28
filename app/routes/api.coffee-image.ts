import { getCoffeeImages } from "../utils/s3.server";

export async function loader() {
  const images = await getCoffeeImages();

  return Response.json({ images });
}
