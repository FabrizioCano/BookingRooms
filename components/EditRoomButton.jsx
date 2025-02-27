"use client";

import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

const EditRoomButton = ({ room }) => {
  const router = useRouter();

  if (!room || !room.$id) return null; 

  const handleEdit = () => {
    router.push(`/rooms/edit/${room.$id}`);
  };

  return (
    <button
      onClick={handleEdit}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
    >
      <FaEdit /> Edit
    </button>
  );
};

export default EditRoomButton;
