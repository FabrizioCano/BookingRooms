'use client';

import { useEffect, useState } from "react";
import getUserRoles from "../actions/getUserRoles";
import Heading from "@/components/Heading";

const UserManagement = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadData() {
            const usersWithRoles = await getUserRoles();
            setData(usersWithRoles);
        }
        loadData();
    }, []);

    return (
        <>
            <style jsx>{`
                .table {
                    border-spacing: 0 15px;
                }
                i {
                    font-size: 1rem !important;
                }
                .table tr {
                    border-radius: 20px;
                }
                
            `}</style>

            <link
                href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
                rel="stylesheet"
            />

            {/* Removed min-h-screen and bg-white */}
            <div className="flex flex-col items-center justify-start w-full py-10">
                <div className="col-span-12 w-full max-w-7xl">
                    <div className="overflow-auto lg:overflow-visible">
                        <div className="flex lg:justify-between pb-4">
                            <Heading title="All Users" />
                        </div>

                        <table className="table text-main border-separate space-y-6 text-sm w-full mt-6 border-primary-dark rounded-lg shadow-lg">
                            <thead className="bg-primary-dark text-primary ">
                                <tr className="text-white text-sm font-semibold uppercase">
                                    <th className="p-3 text-center">Username</th>
                                    <th className="p-3 text-center">Email</th>
                                    <th className="p-3 text-center">Roles</th>
                                    <th className="p-3 text-center">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(({ user, roles }) => (
                                    <tr key={user.$id} className="bg-navbar lg:text-black">
                                        <td className="text-center p-3 font-medium capitalize">{user.name}</td>
                                        <td className="text-center p-3">{user.email}</td>
                                        <td className="text-center p-3 uppercase">
                                            {roles && roles.length > 0
                                                ? roles.map((role, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 mr-3 rounded-full"
                                                    >
                                                        {role}
                                                    </span>
                                                ))
                                                : "No Roles"}
                                        </td>
                                        <td className="text-center p-3">
                                            {user.registration.split("T")[0]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserManagement;
