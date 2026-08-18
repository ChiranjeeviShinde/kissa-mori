// import { S3Client } from "@aws-sdk/client-s3";
// import { GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const s3Client = new S3Client({
//   region: "ap-south-1",
//   credentials: {
//     accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_BUCKET_ACCESS_SECRET_KEY_ID!,
//   },
// });

// const getImage = async (key: string) => {
//   const command = new GetObjectCommand({
//     Bucket: "kissa-mori",
//     Key: key,
//   });

//   const url = await getSignedUrl(s3Client, command);
//   return url;
// };

type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
};

type ItemCardProps = {
  item: Item;
  imageUrl: string;
};

const ItemCard = ({ item, imageUrl }: ItemCardProps) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <img
        src={imageUrl}
        alt={item.name}
        className="h-36 w-full object-cover"
      />

      <div className="flex h-28 justify-between p-4">
        <h3 className="max-w-45 text-lg font-medium leading-tight">
          {item.name}
        </h3>

        <p className="self-end text-xl font-bold text-[#383C39]">
          ${item.price}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
