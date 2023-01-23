import React from "react";
import Image, { StaticImageData } from "next/image";

const CategoryCard: React.FC<{
  name: string;
  leftColor: string;
  rightColor: string;
  categoryImage: StaticImageData;
}> = ({ name, leftColor, rightColor, categoryImage }) => {
  return (
    <>
      <div
        className="h-40 md:h-52 w-full md:w-96 rounded-xl p-4 flex relative"
        style={{
          background: `linear-gradient(to right, ${leftColor}, ${rightColor})`,
        }}
      >
        <span className="text-5xl mt-auto z-20 drop-shadow-lg shadow-black">{name}</span>
        <Image
          className="absolute w-36 lg:w-56 h-32 lg:h-56 my-auto md:-top-20 md:my-0 right-2"
          src={categoryImage}
          alt="category image"
        />
      </div>
    </>
  );
};

export default CategoryCard;
