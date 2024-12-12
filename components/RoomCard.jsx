import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
    return (
        <div className="flex flex-col justify-between max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700">
            <Image
                src={`/images/rooms/${room.image}`} 
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
                    className="bg-gray-500 text-white px-4 py-2 rounded w-auto text-center hover:bg-gray-700"
                >
                    View Room
                </Link>
            </div>
        </div>
    );
}

export default RoomCard;
