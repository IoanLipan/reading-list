"use client";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { searchBooks } from "../searchBooks";
import { BookType } from "@/types/BookType";

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);

  const handleSearch = async (query: string): Promise<void> => {
    if (!query) return;

    try {
      const result: BookType[] | null = await searchBooks(query);
      if (result) {
        setBooks(result);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error during search: ", error);
      setBooks([]);
    }
  };

  const handleToggleSave = (book: BookType) => {
    // TODO: Implement logic to add/remove books from the reading list
  };

  return (
    <div className="w-full text-center flex flex-col items-center">
      <h1>Welcome to the Book Finder</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} onToggleSave={handleToggleSave} />
    </div>
  );
};

export default HomePage;
