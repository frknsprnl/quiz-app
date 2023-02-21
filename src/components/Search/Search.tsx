import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

function Search() {
  const [search, setSearch] = useState("");

  interface Quiz {
    description: string;
    quizId: string;
    title: string;
  }

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const getSearch = async (page: number, pageSize: number) => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/quizzes/searchquiz?search=${search}&page=${page}&pageSize=${pageSize}`
        )
        .then((resp) => {
          setQuizzes(resp.data.quizzes.records);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (search.length >= 3) {
      getSearch(1, 10);
    } else {
      setQuizzes([]);
    }
  }, [search]);

  return (
    <div className="relative hidden md:block">
      <input
        type="search"
        className="outline-none border-none px-6 py-2 bg-slate-700 rounded-full duration-200 focus:scale-125 w-96 none text-white"
        autoComplete="off"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
          search.length >= 2
            ? document.getElementById("search")?.classList.remove("hidden")
            : null;
        }}
        onFocus={() => {
          search.length >= 2
            ? document.getElementById("search")?.classList.remove("hidden")
            : null;
        }}
        onBlur={() => {
          setTimeout(() => {
            document.getElementById("search")?.classList.add("hidden");
          }, 100);
        }}
      />
      <div
        id="search"
        className="absolute rounded-3xl top-8 -z-10 bg-slate-700 scale-125 h-72 w-full  overflow-y-auto hidden"
      >
        <div className="mt-10 flex flex-col text-sm">
          {search.length === 0 && quizzes.length === 0 && (
            <span className="text-gray-500 mt-2 mx-auto">
              Let&apos;s see what we got here.
            </span>
          )}
          {search.length >= 3 && quizzes.length === 0 && (
            <span className="text-gray-500 mt-2 mx-auto text-sm">
              Sorry! We couldn&apos;t find what you&apos;re looking for.
            </span>
          )}
          {quizzes.map((quiz) => (
            <Link
              href={`/quizzes/${quiz.quizId}`}
              className="block px-6 py-2 w-full h-full hover:bg-slate-800"
              key={quiz.quizId}
            >
              {quiz.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
