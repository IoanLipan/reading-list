"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ReadingList from "@/components/ReadingList";
import { searchBooks } from "@/utils/searchBooks";
import { BookType } from "@/types/BookType";

const StatsPage: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [readingList, setReadingList] = useState<BookType[]>([]);
  const [showReadingList, setShowReadingList] = useState<boolean>(false);

  useEffect(() => {
    const savedList = localStorage.getItem("readingList");
    if (savedList) {
      setReadingList(JSON.parse(savedList));
    }
  }, []);

  const handleToggleSave = (book: BookType) => {
    const isBookSaved = readingList.some(
      (savedBook) => savedBook.id === book.id
    );
    const updatedList = isBookSaved
      ? readingList.filter((savedBook) => savedBook.id !== book.id)
      : [...readingList, book];

    setReadingList(updatedList);
    localStorage.setItem("readingList", JSON.stringify(updatedList));
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
    <div className="w-full text-center flex flex-col items-center h-screen">
      <Header
        setShowReadingList={setShowReadingList}
        handleSearch={handleSearch}
      />
      <p>Books read: {readingList.length}</p>
      {showReadingList && (
        <ReadingList
          readingList={readingList}
          onToggleSave={handleToggleSave}
          onClose={() => setShowReadingList(false)}
        />
      )}
    </div>
  );
};

export default StatsPage;
