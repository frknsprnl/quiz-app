import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between items-center w-full fixed top-0 z-30 py-4 md:py-6 px-10 bg-[#1a202c]">
      <Link href={"/"}>
        <h1 className="text-xl md:text-2xl">QuizApp</h1>
      </Link>
      <Link href={"/login"} className="ml-auto">
        <span className="text-xl text-gray-300 hover:text-gray-400">
          Log In
        </span>
      </Link>
    </div>
  );
}

export default Header;
