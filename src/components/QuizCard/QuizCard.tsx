import React from "react";
import CategoryBG from "@/assets/card-bg.svg";

const QuizCard: React.FC<{
  name: string;
  category: string;
}> = ({ name, category }) => {
  return (
    <div
      className="h-36 w-52 md:w-80 rounded-3xl pt-4 px-4 flex justify-center items-center flex-col flex-shrink-0 hover:scale-110 duration-500"
      style={{
        background: `url('${CategoryBG.src}') no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-2xl md:text-3xl flex-1 text-center">{category}</h1>
      <h1 className="text-lg mt-4 flex-1 text-center">{name}</h1>
    </div>
  );
};

export default QuizCard;
