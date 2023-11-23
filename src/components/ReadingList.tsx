"use client";
import React from "react";
import { BookType } from "@/types/BookType";
import Book from "./Book";

interface ReadingListProps {
  readingList: BookType[];
  onToggleSave: (book: BookType) => void;
  onClose: () => void;
}

const ReadingList: React.FC<ReadingListProps> = ({
  readingList,
  onToggleSave,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Reading List</h2>
          <button onClick={onClose}>X</button>
        </div>
        {readingList.length === 0 ? (
          <p>No books in your reading list.</p>
        ) : (
          readingList.map((book) => (
            <Book
              key={book.id}
              onSave={() => onToggleSave(book)}
              isSaved={true}
              id={book.id}
              title={book.title}
              authors={book.authors}
              publisher={book.publisher}
              imageUrl={book.imageUrl}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReadingList;
