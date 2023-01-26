import React from "react";
import UserLayout from "..";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Image from "next/image";
import ProfileImg from "@/assets/profile.png";
import { MdDoneOutline } from "react-icons/md";

function Profile() {
  return (
    <UserLayout>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="px-4 md:px-0 mx-auto md:m-0">
            <Image
              src={ProfileImg}
              alt="profile image"
              className="h-32 md:h-52 w-32 md:w-52 rounded-full border-2 border-gray-700"
            />
          </div>
          <div className="flex flex-col mx-auto px-4 lg:px-8 w-full lg:w-3/4">
            <div className="flex flex-col py-2">
              <span className="text-2xl md:text-3xl font-semibold mx-auto md:m-0 py-1 md:py-0">
                Fatih Sultan Mehmet
              </span>
              <span className="text-gray-500 mx-auto md:m-0 text-base md:text-lg">
                Lv. 26
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 ml-auto text-sm md:text-base mb-2">
                90.000/100.000 XP
              </span>
              <ProgressBar progress={90} />
              <div className="flex justify-center mt-8 gap-x-2 md:gap-x-10">
                <div className="flex">
                  <div className="p-3 md:p-4 shadow-md mr-1 md:mr-4 rounded-xl mb-auto">
                    <MdDoneOutline className="text-lg md:text-2xl lg:text-4xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg md:text-2xl">14</span>
                    <span className="text-sm md:text-xl text-gray-500">Completed Tests</span>
                  </div>
                </div>
                <div className="flex">
                  <div className="p-3 md:p-4 shadow-md mr-1 md:mr-4 rounded-xl mb-auto">
                    <MdDoneOutline className="text-lg md:text-2xl lg:text-4xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg md:text-2xl">53</span>
                    <span className="text-sm md:text-xl text-gray-500">Created Tests</span>
                  </div>
                </div>
                <div className="flex">
                  <div className="p-3 md:p-4 shadow-md mr-1 md:mr-4 rounded-xl mb-auto">
                    <MdDoneOutline className="text-lg md:text-2xl lg:text-4xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg md:text-2xl">1453</span>
                    <span className="text-sm md:text-xl text-gray-500">Likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Profile;
