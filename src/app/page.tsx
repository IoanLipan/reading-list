"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { searchBooks } from "../searchBooks";
import { BookType } from "@/types/BookType";

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [readingList, setReadingList] = useState<BookType[]>([]);

  useEffect(() => {
    const savedList = localStorage.getItem('readingList');
    if (savedList) {
      setReadingList(JSON.parse(savedList));
    }
  }, []);

  const handleToggleSave = (book: BookType) => {
    const isBookSaved = readingList.some(savedBook => savedBook.id === book.id);
    const updatedList = isBookSaved
      ? readingList.filter(savedBook => savedBook.id !== book.id)
      : [...readingList, book];

    setReadingList(updatedList);
    localStorage.setItem('readingList', JSON.stringify(updatedList));
  };


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

  return (
    <div className="w-full text-center flex flex-col items-center">
      <h1>Welcome to the Book Finder</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} onToggleSave={handleToggleSave} readingList={readingList} />
    </div>
  );
};

export default HomePage;
