"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import ReadingList from "../components/ReadingList";
import { searchBooks } from "../searchBooks";
import { BookType } from "@/types/BookType";
import ReadingListIcon from "../../public/icons/reading-list.svg";
import Image from "next/image";

const HomePage: React.FC = () => {
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
      <h1 className="my-5 text-2xl">So many books, so little time!</h1>
      <nav className="flex justify-between items-center gap-2 sm:gap-5 pb-10">
        <button onClick={() => setShowReadingList(true)}>
          <Image
            src={ReadingListIcon}
            alt="Reading List"
            width={25}
            height={25}
          />
        </button>
        <SearchBar onSearch={handleSearch} />
      </nav>
      <BookList
        books={books}
        onToggleSave={handleToggleSave}
        readingList={readingList}
      />
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

export default HomePage;
