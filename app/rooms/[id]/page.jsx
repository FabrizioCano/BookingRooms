import Heading from '@/components/Heading';
import getRoom from '@/app/actions/getRoom';
import Image from 'next/image';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';
import { FaChevronLeft } from 'react-icons/fa';

const RoomPage = async ({ params }) => {
    const { id } = await params;
    const room = await getRoom(id);

    if (!room) {
        return <Heading title='Room not Found' />;
    }

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

    return (
        <>
            <div className="pt-5">
                <Heading title={room.name} />
                <div className="bg-sky-100 rounded-lg p-6 max-w-2xl mx-auto">
                    <Link href="/" className="flex items-center text-dark-800 hover:text-blue-600 mb-4">
                        <FaChevronLeft className="mr-2" />
                        <span>Back to Rooms</span>
                    </Link>

                    <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
                        <Image
                            src={imageUrl}
                            alt={room.name}
                            width={350}
                            height={200}
                            className="w-full sm:w-1/2 h-56 object-cover rounded-lg"
                        />

                        <div className="mt-4 sm:mt-0 sm:w-1/2">
                            <p className="text-gray-600 mb-4">{room.description}</p>

                            <ul className="space-y-2">
                                <li>
                                    <span className="font-semibold text-gray-800">Size:</span> {room.sqft}
                                </li>
                                <li>
                                    <span className="font-semibold text-gray-800">Availability:</span> {room.availability}
                                </li>
                                <li>
                                    <span className="font-semibold text-gray-800">Price:</span> ${room.price}/hour
                                </li>
                                <li>
                                    <span className="font-semibold text-gray-800">Address:</span> {room.address}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6">
                        <BookingForm room={room} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomPage;
