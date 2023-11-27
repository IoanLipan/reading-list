"use client";
import React, { useState } from "react";
import Image from "next/image";
import Search from "../../public/icons/search.svg";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
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
        className="relative left-4 border border-gray-300 rounded-md p-2 text-black w-[70vw] sm:w-[50vw] outline-none"
      />
      <button type="submit" className="relative right-4">
        <Image src={Search} width={20} height={20} alt="Search" />
      </button>
    </form>
  );
};

export default SearchBar;
