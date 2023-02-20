import { useState, useEffect } from "react";
import UserLayout from "..";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Image from "next/image";
import ProfileImg from "@/assets/profile.png";
import { MdStar } from "react-icons/md";
import axios from "axios";

function Profile() {
  interface User {
    biography: string;
    firstName: string;
    lastName: string;
    score: number;
    userName: string;
  }

  const [user, setUser] = useState<User>({
    biography: "",
    firstName: "",
    lastName: "",
    score: 0,
    userName: "",
  });

  const getUserProfile = async (token: string | null) => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getuserprofile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUserProfile(token);
  }, []);

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
            <div className="flex flex-col pt-2">
              <span className="text-2xl md:text-3xl font-semibold mx-auto md:m-0 py-1 md:py-0">
                {user.userName}
              </span>
              <span className="text-gray-500 mx-auto md:m-0 text-base md:text-lg">
                Lv. 26
              </span>
              <div className="mx-auto text-gray-400">{user.biography}</div>
              <span className="text-gray-500 ml-auto text-sm md:text-base mb-2">
                90.000/100.000 XP
              </span>
              <ProgressBar progress={90} />
            </div>
            <div className="flex justify-center mt-8 gap-x-2 md:gap-x-10">
              <div className="flex">
                <div className="p-3 md:p-4 shadow-md mr-1 md:mr-4 rounded-xl mb-auto">
                  <MdStar className="text-lg md:text-2xl lg:text-4xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-2xl"> {user.score} </span>
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
