"use client";
import { BookType } from "@/types/BookType";
import React from "react";
import Book from "./Book";

interface BookListProps {
  books: BookType[];
  onToggleSave: (book: BookType) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onToggleSave }) => {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book, index) => (
        <Book
          key={index}
          title={book.title}
          authors={book.authors}
          publisher={book.publisher}
          imageUrl={book.imageUrl}
          onSave={() => onToggleSave(book)}
          isSaved={false/* logic to determine if the book is saved */}
        />
      ))}
    </div>
  );
};

export default BookList;
