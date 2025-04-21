import Heading from "@/components/Heading";
import getUserInfo from "../actions/getUserInfo";

const UserInfo = async () => {
    const user = await getUserInfo();

    const formatDate = (dateString) => {
        const options = { month: 'short' };
        const date = new Date(dateString);
        const month = date.toLocaleDateString('en-US', options, { timeZone: 'UTC' });

        const day = date.getUTCDate();

        const timeOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        const time = date.toLocaleString('en-US', timeOptions, { timeZone: 'UTC' });

        return `${month} ${day} at ${time}`;
    };

    return (
        <div className="pt-5">
            {user === null ? (
                <Heading title="User Info not found" />
            ) : (
                <div className="bg-primary-light rounded-lg p-6 max-w-2xl mx-auto shadow border">
                    <Heading title="User Profile" />

                    <div className="bg-main px-4 py-5 sm:p-0 mt-4 rounded-md">
                        <dl className="">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold text-main">Username</dt>
                                <dd className="mt-1 text-sm text-main sm:mt-0 sm:col-span-2 text-center">{user.name}</dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold text-main">Email address</dt>
                                <dd className="mt-1 text-sm text-main sm:mt-0 sm:col-span-2 text-center">{user.email}</dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold text-main">Phone number</dt>
                                <dd className="mt-1 text-sm text-main sm:mt-0 sm:col-span-2 text-center">
                                    {user.phone?user.phone:"Not provided"}

                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-bold text-main">Join date</dt>
                                <dd className="mt-1 text-sm text-main sm:mt-0 sm:col-span-2 text-center">{formatDate(user.registration)}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
