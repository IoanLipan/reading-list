"use client";
import React from "react";
import BookList from "@/components/BookList";
import { BookType } from "@/types/BookType";

interface HomePageProps {
  books: BookType[];
  onToggleSave: (book: BookType) => void;
  readingList: BookType[];
}

const HomePage: React.FC<HomePageProps> = ({
  books,
  onToggleSave,
  readingList,
}) => {
  return (
    <div>
      <BookList
        books={books}
        onToggleSave={onToggleSave}
        readingList={readingList}
      />
    </div>
  );
};

export default HomePage;
