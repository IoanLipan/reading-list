"use client";
import React from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import ReadingListIcon from "../../public/icons/reading-list.svg";

type HeaderProps = {
  setShowReadingList: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (query: string) => Promise<void>;
};

const Header: React.FC<HeaderProps> = ({ setShowReadingList, handleSearch }) => {
  return (
    <header>
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
    </header>
  );
};

export default Header;