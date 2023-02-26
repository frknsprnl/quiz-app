import React from "react";
import { MdPlayArrow } from "react-icons/md";
import CategoryBG from "@/assets/card-bg.svg";

const QuizCard: React.FC<{
  name: string;
  category: string;
}> = ({ name, category }) => {
  return (
    <div
      className="h-40 w-full md:w-96 p-5 bg-white rounded-xl flex flex-col group"
      style={{
        background: `url('${CategoryBG.src}') no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-2xl md:text-4xl">{category}</h1>
      <h1 className="text-lg md:text-2xl mt-4 text-center">{name}</h1>
    </div>
  );
};

export default QuizCard;
