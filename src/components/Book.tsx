"use client";
import React from "react";

interface BookProps {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  imageUrl: string;
  onSave: () => void;
  isSaved: boolean;
}

const Book: React.FC<BookProps> = ({
  id,
  title,
  authors,
  publisher,
  imageUrl,
  onSave,
  isSaved,
}) => {
  return (
    <div className="book">
      <div className="book-image">
        {imageUrl ? (
          <img src={imageUrl} alt={`Cover of ${title}`} />
        ) : (
          <img src="https://via.placeholder.com/150" />
        )}
      </div>
      <h3>{title}</h3>
      <p>Authors: {authors?.join(", ") || "N/A"}</p>
      <p>Publisher: {publisher || "N/A"}</p>
      <button
        onClick={onSave}
        className={isSaved ? "saved-class" : "not-saved-class"}
      >
        {isSaved ? "In Reading List" : "Add to Reading List"}
      </button>
    </div>
  );
};

export default Book;
