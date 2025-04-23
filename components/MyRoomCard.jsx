import Link from "next/link";
import { FaEye } from "react-icons/fa";
import DeleteRoomButton from "./DeleteRoomButton";
import EditRoomButton from "./EditRoomButton";
import checkAuth from "@/app/actions/checkAuth";
const MyRoomCard = async ({ room }) => {
    const { user } = await checkAuth();
    const isAdmin = user.roles.includes('admin');
    return (
        <>
            <div
                className="bg-main shadow-lg rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-center"
            >
                <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{room.name}</h4>
                </div>
                <div
                    className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0"
                >
                    <Link
                        href={`/rooms/${room.$id}`}
                        className="bg-primary-dark text-primary px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-text-link-hover"
                    >
                        <FaEye className="inline mr-2"></FaEye> View
                    </Link>
                    {isAdmin && (
                        <>
                            <EditRoomButton room={room}></EditRoomButton>
                            <DeleteRoomButton roomId={room.$id}></DeleteRoomButton>
                        </>
                    )}


                </div>
            </div>
        </>
    );
}

export default MyRoomCard;