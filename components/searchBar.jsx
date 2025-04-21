'use client';

import { FaSearch } from "react-icons/fa";

export default function SearchBar({ search, setSearch, onSearch }) {
  return (
    <form onSubmit={onSearch} className="flex justify-center my-6 space-x-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search room by name"
        className="border p-2 rounded-md w-64"
      />
      <button
        type="submit"
        className="bg-primary-light hover:bg-text-text-link-hover text-main px-4 py-2 rounded-md"
      >
        <FaSearch />
      </button>
    </form>
  );
}
