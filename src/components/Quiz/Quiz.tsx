import React from "react";
import { MdTimer } from "react-icons/md";
import QuizOptions from "../QuizOptions/QuizOptions";

function Quiz() {
  const answers = [
    { label: "recipe" },
    { label: "tape" },
    { label: "everyone" },
    { label: "everyone" },
  ];
  return (
    <>
      <div className="flex flex-col py-0 md:py-4 w-full">
        <div className="w-full rounded-full dark:bg-gray-700 flex">
          <div
            className="bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 text-center py-2 p-0.5 leading-none rounded-full"
            style={{ width: "45%" }}
          >
            45%
          </div>
          <MdTimer className="ml-auto mr-3 my-auto text-xl" />
        </div>

        <h1 className="font-semibold text-lg md:text-xl pt-5 pb-3">
          Question 1 <span className="text-gray-500 font-light">/ 10</span>
        </h1>
        <hr className="border-gray-500 py-2" />

        <p className="py-2 text-xl md:text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
          corporis?
        </p>

        <QuizOptions answers={answers} />
      </div>
    </>
  );
}

export default Quiz;
