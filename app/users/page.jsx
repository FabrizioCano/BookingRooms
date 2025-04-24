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
                tr td:nth-child(n + 6),
                tr th:nth-child(n + 6) {
                    border-radius: 0 0.625rem 0.625rem 0;
                }
                tr td:nth-child(1),
                tr th:nth-child(1) {
                    border-radius: 0.625rem 0 0 0.625rem;
                }
            `}</style>

            <link
                href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
                rel="stylesheet"
            />

            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="col-span-12 w-full max-w-7xl">
                    <div className="overflow-auto lg:overflow-visible">
                        <div className="flex lg:justify-between border-b-2 border-primary pb-">
                            <Heading title="All Users" />


                        </div>

                        <table className="table text-main border-separate space-y-6 text-sm w-full">
                            <thead className="bg-primary-dark text-primary">
                                <tr>
                                    <th className="p-3 text-center">Username</th>
                                    <th className="p-3 text-center ">Email</th>
                                    <th className="p-3 text-center ">Roles</th>
                                    <th className="p-3 text-center">Joined</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(({ user, roles }) => (
                                    <tr key={user.$id} className="bg-navbar lg:text-black">
                                        <td className=" text-center p-3 font-medium capitalize ">{user.name}</td>
                                        <td className=" text-center p-3">{user.email}</td>

                                        <td className="text-center p-3 uppercase">
                                            {roles && roles.length > 0 ?
                                                roles.map((role, i) => (
                                                    <span key={i} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 mr-3 rounded-full">{role}</span>
                                                ))
                                                : "No Roles"
                                            }
                                        </td>
                                        <td className=" text-center p-3">
                                            {user.registration.split("T")[0]}
                                        </td>
                                        <td className=" text-center p-3 flex gap-2 justify-center">
                                            <a href="#" className="text-gray-500 hover:text-gray-800">
                                                <i className="material-icons-outlined text-center in-line ">visibility</i>
                                            </a>
                                            <a href="#" className="text-yellow-500 hover:text-yellow-700">
                                                <i className="material-icons-outlined text-center in-line ">edit</i>
                                            </a>
                                            <a href="#" className="text-red-500 hover:text-red-700">
                                                <i className="material-icons-round text-center in-line ">delete_outline</i>
                                            </a>
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
