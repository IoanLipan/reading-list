import React from "react";
import { AppProps } from "next/app";
import Layout from "@/app/layout";
import Header from "@/components/Header";
import ReadingList from "@/components/ReadingList";
import { searchBooks } from "@/utils/searchBooks";
import { useState, useEffect } from "react";
import { BookType } from "@/types/BookType";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
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
    <Layout>
      <Header
        setShowReadingList={setShowReadingList}
        handleSearch={handleSearch}
      />
      <Component
        {...pageProps}
        books={books}
        onToggleSave={handleToggleSave}
        readingList={readingList}
        showReadingList={showReadingList}
        setShowReadingList={setShowReadingList}
        handleSearch={handleSearch}
      />
      {showReadingList && (
        <ReadingList
          readingList={readingList}
          onToggleSave={handleToggleSave}
          onClose={() => setShowReadingList(false)}
        />
      )}
    </Layout>
  );
};

export default MyApp;
