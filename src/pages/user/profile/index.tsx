import { useState, useEffect } from "react";
import UserLayout from "..";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Image from "next/image";
import ProfileImg from "@/assets/profile.png";
import { MdStar, MdUpload } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/UserContext";

function Profile() {
  const { user, setUser, logout } = useAuth();

  const uploadImage = async (image: File | null, token: string | null) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/uploadprofilepicture`,
        { image: image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(async (resp) => {
        toast.success(resp.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserLayout>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="relative mx-auto md:m-0 h-32 md:h-52 w-32 md:w-52 group">
            <Image
              src={user?.profilePictureUrl || ProfileImg}
              priority={true}
              width={1920}
              height={1080}
              alt="profile image"
              className="h-32 md:h-52 w-32 md:w-52  object-cover rounded-full border-2 border-gray-700"
            />
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-hidden">
              <div
                className="h-24 md:h-32 w-24 md:w-32 flex justify-center items-center bg-gray-700 opacity-0 rounded-full group-hover:opacity-80 duration-1000 cursor-pointer"
                onClick={() => {
                  const imageInput = document.getElementById("imageInput");
                  imageInput?.click();
                }}
              >
                <input
                  type="file"
                  id="imageInput"
                  hidden
                  onChange={async (e) => {
                    const token = localStorage.getItem("token");
                    if (e.target.files) {
                      await uploadImage(e.target.files[0], token);
                    }
                  }}
                />
                <MdUpload className="text-white text-lg md:text-2xl lg:text-4xl" />
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-auto px-4 lg:px-8 w-full lg:w-3/4">
            <div className="flex flex-col pt-2">
              <div className="flex">
                <span className="text-2xl md:text-3xl font-semibold mx-auto md:m-0 py-1 md:py-0">
                  {user?.firstName && user?.lastName
                    ? `${user?.firstName} ${user?.lastName}`
                    : user?.userName}
                </span>
                <span className="text-sm md:text-lg text-gray-700 mt-auto">
                  &nbsp;@{user?.firstName && user?.lastName ? user?.userName : ""}
                </span>
              </div>
              <span className="text-gray-500 mx-auto md:m-0 text-base md:text-lg">
                Lv. 26
              </span>
              <div className="mx-auto text-gray-400 text-sm md:text-base py-4 md:py-2">
                {user?.biography}
              </div>
              <span className="text-gray-500 ml-auto text-sm md:text-base mb-2">
                90.000/100.000 XP
              </span>
              <ProgressBar progress={90} />
            </div>
            <div className="flex justify-center mt-8 gap-x-2 md:gap-x-10">
              <div className="flex">
                <div className="p-3 md:p-4 shadow-md mr-1 md:mr-4 rounded-xl mb-auto">
                  <MdStar className="text-white text-lg md:text-2xl lg:text-4xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-2xl"> {user?.score} </span>
                  <span className="text-sm md:text-xl text-gray-500">
                    Score
                  </span>
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
