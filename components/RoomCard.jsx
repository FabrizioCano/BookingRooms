import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {

    const bucketId=process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
    const projectId=process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageUrl=`https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

    const imageSrc = room.image ? imageUrl : '/images/no-image.jpg';
    return (
        <div className="flex flex-col justify-between max-w-sm h-full bg-primary border-2 border-primary rounded-lg ">
            <Image
                src={imageSrc} 
                width={500} 
                height={300}
                alt={room.name}
                className="rounded-t-lg"
            />

            <div className="p-5 flex-1">
                <h4 className="text-lg font-semibold">{room.name}</h4>
                <p className="text-sm text-white-600">
                    <span className="font-semibold text-white-800"> Address:</span> {room.address}
                </p>
                <p className="text-sm text-white-600">
                    <span className="font-semibold text-white-800"> Availability: </span>
                    {room.availability}
                </p>
                <p className="text-sm text-white-600">
                    <span className="font-semibold text-white-800"> Price:</span>
                    ${room.price_per_hour}/hour
                </p>
            </div>

            <div className="p-5 flex flex-col items-center justify-center">
                <Link
                    href={`/rooms/${room.$id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-auto text-center hover:bg-blue-600"
                >
                    View Room
                </Link>
            </div>
        </div>
    );
}

export default RoomCard;
