export async function getImageFromRequest(
  request: Request,
  getImages: () => Promise<string[]>,
) {
  const url = new URL(request.url);
  const imageIndex = Number(url.searchParams.get("image") ?? 0);

  const images = await getImages();

  if (images.length === 0) {
    return "";
  }

  return images[imageIndex % images.length];
}
