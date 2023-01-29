import React from "react";
import CategoryBG from "@/assets/category-bg.svg";

const CategoryCard: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <>
      <div
        className="h-40 md:h-52 w-full md:w-96 rounded-3xl p-4 flex relative"
        style={{
          background: `url('${CategoryBG.src}') no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <span className="text-5xl mt-auto z-20 drop-shadow-lg shadow-black">
          {name}
        </span>
      </div>
    </>
  );
};

export default CategoryCard;
