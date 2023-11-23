"use client";
import React, { useState } from "react";
import Image from "next/image";
import Search from "../../public/icons/search.svg";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
        className="border border-gray-300 rounded-md p-2 text-black w-[80vw] sm:w-[60vw] outline-none"
      />
      <button type="submit" className="relative right-8">
        <Image src={Search} width={20} height={20} alt="Search" />
      </button>
    </form>
  );
}

export default SearchBar;
