"use client";
import React from "react";
import Image from "next/image";
import FavoriteFilled from "../../public/icons/star-filled.svg";
import FavoriteEmpty from "../../public/icons/star-empty.svg";

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
      <div className="w-1/3 my-auto">
        {imageUrl ? (
          <img
            className="book-image"
            src={imageUrl}
            alt={`Cover of ${title}`}
          />
        ) : (
          <img
            className="book-image"
            src="https://via.placeholder.com/150"
            alt="Book Cover"
          />
        )}
      </div>
      <div className="book-info">
        <h3 className="text-lg sm:text-2xl text-primary font-medium">
          {title}
        </h3>
        <p className="sm:text-lg">Authors: {authors?.join(", ") || "N/A"}</p>
        <p className="text-sm">Publisher: {publisher || "N/A"}</p>
        <button
          onClick={onSave}
          className={isSaved ? "saved-class" : "not-saved-class"}
        >
          {isSaved ? (
            <div className="flex items-center gap-2 font-semibold">
              <Image
                src={FavoriteFilled}
                alt="FavoriteButton"
                width={30}
                height={30}
              />
              <p>Remove from List</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-semibold">
              <Image
                src={FavoriteEmpty}
                alt="FavoriteButton"
                width={30}
                height={30}
              />
              <p>Add to Reading List</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Book;
