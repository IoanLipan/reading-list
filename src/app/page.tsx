"use client";
import React from "react";
import SearchBar from "../components/SearchBar";
import { searchBooks } from "../searchBooks";
import { Book } from "../types/Book";

const HomePage: React.FC = () => {
  const handleSearch = async (query: string): Promise<void> => {
    if (!query) return;

    try {
      const result: Book[] | null = await searchBooks(query);
      console.log(result);
    } catch (error) {
      console.error("Error during search: ", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Book Finder</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default HomePage;
