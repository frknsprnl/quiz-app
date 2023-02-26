import React from "react";
import Image from "next/image";
import ProfileImg from "@/assets/profile.png";

const CategoryCard: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <>
      <div className="h-64 w-full md:w-56 rounded-3xl pt-4 px-4 flex justify-center items-center flex-col flex-shrink-0">
        <div className="h-48 w-48 rounded-3xl overflow-hidden">
          <Image
            src={ProfileImg}
            alt="category image"
            className="h-52 w-52"
          />
        </div>
        <span className="text-xl mt-auto z-20 drop-shadow-lg shadow-black text-center">
          {name}
        </span>
      </div>
    </>
  );
};

export default CategoryCard;
