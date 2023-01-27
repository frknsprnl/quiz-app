import React from "react";
import UserLayout from "..";
import Image from "next/image";
import UserImg from "@/assets/profile.png";
import CrownImg from "./assets/crown.png";

function Leaderboard() {
  return (
    <UserLayout>
      <div className="flex flex-col items-center h-full py-1 md:py-5 lg:py-0">
        <h1 className="text-2xl text-center">Leaderboard</h1>
        <div className="flex justify-center relative h-40 lg:h-60 w-full mt-20 md:mt-24">
          <div className="z-10">
            <div className="flex flex-col justify-center items-center absolute text-white font-semibold -top-16 md:-top-20 left-0 right-0">
              <span className="font-semibold">1</span>
              <Image
                src={CrownImg}
                alt="crown img"
                className="h-10 md:h-12 w-10 md:w-12"
              />
            </div>
            <div className="h-24 w-24 md:h-28 md:w-28 border-2 rounded-full overflow-hidden">
              <Image
                src={UserImg}
                alt="user img"
                className="h-24 w-24 md:h-28 md:w-28 object-cover"
              />
            </div>
          </div>
          <div className="absolute top-8 mr-36 lg:mr-40 z-0">
            <div className="flex flex-col justify-center items-center absolute text-white font-semibold z-20 -top-8 md:-top-10 left-0 right-0">
              <span className="font-semibold">2</span>
            </div>
            <div className="h-24 w-24 md:h-28 md:w-28 border-2 rounded-full overflow-hidden">
              <Image
                src={UserImg}
                alt="user img"
                className="h-24 w-24 md:h-28 md:w-28 object-cover"
              />
            </div>
          </div>
          <div className="absolute top-10 ml-36 lg:ml-40 -z-10">
            <div className="flex flex-col justify-center items-center absolute text-white font-semibold z-20 -top-8 md:-top-10 left-0 right-0">
              <span className="font-semibold">3</span>
            </div>
            <div className="h-24 w-24 md:h-28 md:w-28 border-2 rounded-full overflow-hidden">
              <Image
                src={UserImg}
                alt="user img"
                className="h-24 w-24 md:h-28 md:w-28 object-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-60 md:h-72 w-80 md:w-96 flex flex-col gap-3 overflow-scroll pr-2">
          <div className="flex justify-center items-center">
            <span className="w-8">4</span>
            <div className="h-16 flex items-center w-full rounded-full bg-slate-700">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <Image src={UserImg} alt="user img" />
              </div>
              <span className="pl-2 md:pl-4">Fatih Sultan Mehmet</span>
              <span className="ml-auto mr-6">999</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <span className="w-8">5</span>
            <div className="h-16 flex items-center w-full rounded-full bg-slate-700">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <Image src={UserImg} alt="user img" />
              </div>
              <span className="pl-2 md:pl-4">Fatih Sultan Mehmet</span>
              <span className="ml-auto mr-6">999</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <span className="w-8">6</span>
            <div className="h-16 flex items-center w-full rounded-full bg-slate-700">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <Image src={UserImg} alt="user img" />
              </div>
              <span className="pl-2 md:pl-4">Fatih Sultan Mehmet</span>
              <span className="ml-auto mr-6">999</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <span className="w-8">7</span>
            <div className="h-16 flex items-center w-full rounded-full bg-slate-700">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <Image src={UserImg} alt="user img" />
              </div>
              <span className="pl-2 md:pl-4">Fatih Sultan Mehmet</span>
              <span className="ml-auto mr-6">999</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <span className="w-8">8</span>
            <div className="h-16 flex items-center w-full rounded-full bg-slate-700">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <Image src={UserImg} alt="user img" />
              </div>
              <span className="pl-2 md:pl-4">Fatih Sultan Mehmet</span>
              <span className="ml-auto mr-6">999</span>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Leaderboard;
