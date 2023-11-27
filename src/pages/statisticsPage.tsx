"use client";
import React from "react";
import { BookType } from "@/types/BookType";

interface StatsPageProps {
  readingList: BookType[];
}

const StatsPage: React.FC<StatsPageProps> = ({ readingList }) => {
  const readingInfo = () => {
    switch (true) {
      case readingList.length === 0:
        return (
          <p>
            Reading is a journey. It doesn&#39;t matter if you are new or old.
          </p>
        );
      case readingList.length < 5:
        return <p>Great! You&#39;re getting started!</p>;
      case readingList.length < 10:
        return <p>You&#39;re on the right track!</p>;
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
    <div>
      <div className="text-xl flex flex-col gap-6 p-5 sm:p-10">
        <h1 className="text-3xl font-bold">Your Reading Statistics</h1>

        <p>You added {readingList.length} books to the list</p>
        {readingInfo()}
        <p>Here are the authors you added: {authorsSaved}</p>
        <p>
          It takes the average reader aproximately {readingList.length * 2}{" "}
          weeks to read all of the books you added!
        </p>
      </div>
    </div>
  );
};

export default StatsPage;
