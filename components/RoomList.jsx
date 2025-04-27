'use client';

import { useState } from "react";
import SearchBar from "./searchBar";
import RoomCard from "./RoomCard";

const SearchRooms = ({ rooms }) => {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(search);
    };

    const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />

            {query && (
                <div className="flex justify-center my-4">
                    
                    <button
                        onClick={() => {
                            setSearch("");
                            setQuery("");
                        }}
                        className="bg-primary-dark hover:bg-text-link-hover text-primary px-4 py-2 rounded-md mb-0"
                    >
                    <span>Back to Rooms</span>
                    </button> 
                </div>
            )}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRooms.map((room, index) => (
                        <RoomCard key={room.id || index} room={room} />
                    ))}


                </div>
            </div>
        </div>
    );
}

export default SearchRooms;
