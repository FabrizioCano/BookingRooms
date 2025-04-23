import { FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import getUserInfo from "../actions/getUserInfo";

const UserInfo = async () => {
  const user = await getUserInfo();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    });
  };

  if (!user) {
    return (
      <div className="pt-10 text-center text-xl font-semibold text-red-600">
        User Info not found
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center pt-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center text-3xl font-bold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">Joined {formatDate(user.registration)}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <FaEnvelope className="text-blue-500" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <FaPhone className="text-blue-500" />
            <span>{user.phone || "Not provided"}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <FaCalendarAlt className="text-blue-500" />
            <span>Joined on {formatDate(user.registration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
