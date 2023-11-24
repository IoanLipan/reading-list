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

  const readingInfo = () => {
    switch (true) {
      case readingList.length === 0:
        return (
          <p>Reading is a journey. It doesn't matter if you are new or old.</p>
        );
      case readingList.length < 5:
        return <p>Great! You're getting started!</p>;
      case readingList.length < 10:
        return <p>You're on the right track!</p>;
      case readingList.length < 15:
        return <p>Nice job! Keep it up!</p>;
      default:
        return <p>This will take some time, but it will be worth it!</p>;
    }
  };

  const authorsSaved = readingList
    .map((book) => book.authors)
    .flat()
    .filter((author, index, self) => author && self.indexOf(author) === index)
    .join("| |");

  return (
    <div className="w-full text-center flex flex-col items-center h-screen">
      <Header
        setShowReadingList={setShowReadingList}
        handleSearch={handleSearch}
      />
      <div className="text-xl flex flex-col gap-4 p-5 sm:p-10">

      <p>You added {readingList.length} books to the list</p>
      {readingInfo()}
      <p>Here are the authors you added: {authorsSaved}</p>
      <p>
        It takes the average reader aproximately {readingList.length * 2} weeks
        to read all of the books you added!
      </p>
      </div>
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
