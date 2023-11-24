"use client";
import React from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import ReadingListIcon from "../../public/icons/reading-list.svg";
import StatsIcon from "../../public/icons/stats.svg";
import BackIcon from "../../public/icons/back.svg";
import Link from "next/link";
import { useRouter } from "next/router";

type HeaderProps = {
  setShowReadingList: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (query: string) => Promise<void>;
};

const Header: React.FC<HeaderProps> = ({
  setShowReadingList,
  handleSearch,
}) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <header>
      <h1 className="my-5 text-2xl">So many books, so little time!</h1>
      <nav className="flex justify-between items-center gap-3 sm:gap-5 pb-10 px-4">
        {!isHomePage && <Link href="/">
          <Image src={BackIcon} alt="Back" width={25} height={25} />
        </Link>}
        <button onClick={() => setShowReadingList(true)}>
          <Image
            src={ReadingListIcon}
            alt="Reading List"
            width={25}
            height={25}
          />
        </button>
        <Link href="/statisticsPage">
          <Image src={StatsIcon} alt="Stats" width={25} height={25} />
        </Link>
        { isHomePage && <SearchBar onSearch={handleSearch} /> }
      </nav>
    </header>
  );
};

export default Header;
