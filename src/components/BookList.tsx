"use client";
import { BookType } from "@/types/BookType";
import React from "react";
import Book from "./Book";

interface BookListProps {
  books: BookType[];
  onToggleSave: (book: BookType) => void;
  readingList: BookType[];
}

const BookList: React.FC<BookListProps> = ({ books, onToggleSave, readingList }) => {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  const isBookInReadingList = (book: BookType) => {
    return readingList.some(savedBook => savedBook.id === book.id);
  };

  return (
    <div className="book-list">
      {books.map((book, index) => (
        <Book
          key={book.id}
          id={book.id}
          title={book.title}
          authors={book.authors}
          publisher={book.publisher}
          imageUrl={book.imageUrl}
          onSave={() => onToggleSave(book)}
          isSaved={isBookInReadingList(book)}
        />
      ))}
    </div>
  );
};

export default BookList;
