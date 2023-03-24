import { useState, useEffect } from "react";
import UserLayout from "..";
import Image from "next/image";
import CrownImg from "./assets/crown.png";
import axios from "axios";

function Leaderboard() {
  interface Board {
    userId: string;
    userName: string;
    userPhotoUrl: string;
    score: string;
  }
  const [board, setBoard] = useState<Board[]>([]);

  const getLeaderboard = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getleaderboard`)
      .then((resp) => {
        console.log(resp.data);
        setBoard(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <UserLayout>
      <div className="flex flex-col items-center h-full py-1 md:py-5 lg:py-0">
        <div className="flex justify-center relative h-52 lg:h-56 w-full mt-20">
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
                src={board[0]?.userPhotoUrl}
                width={1600}
                height={1600}
                priority={true}
                alt="user img"
                className="h-24 w-24 md:h-28 md:w-28 object-cover"
              />
            </div>
            <span className="flex justify-center items-center mt-2">
              {board[0]?.userName}
            </span>
            <span className="flex justify-center items-center">
              {board[0]?.score}
            </span>
          </div>
          <div className="absolute top-8 mr-52 lg:mr-56 z-0">
            <div className="flex flex-col justify-center items-center absolute text-white font-semibold z-20 -top-8 md:-top-10 left-0 right-0">
              <span className="font-semibold">2</span>
            </div>
            <div className="h-20 w-20 md:h-24 md:w-24 border-2 rounded-full overflow-hidden">
              <Image
                src={board[1]?.userPhotoUrl}
                width={1600}
                height={1600}
                priority={true}
                alt="user img"
                className="h-20 w-20 md:h-24 md:w-24 object-cover"
              />
            </div>
            <span className="flex justify-center items-center mt-2">
              {board[1]?.userName}
            </span>
            <span className="flex justify-center items-center">
              {board[1]?.score}
            </span>
          </div>
          <div className="absolute top-12 ml-52 lg:ml-56 -z-10">
            <div className="flex flex-col justify-center items-center absolute text-white font-semibold z-20 -top-8 md:-top-10 left-0 right-1">
              <span className="font-semibold">3</span>
            </div>
            <div className="h-16 w-16 md:h-20 md:w-20 border-2 rounded-full overflow-hidden ml-2.5 md:ml-0">
              <Image
                src={board[2]?.userPhotoUrl}
                width={1600}
                height={1600}
                priority={true}
                alt="user img"
                className="h-16 w-16 md:h-20 md:w-20 object-cover"
              />
            </div>
            <span className="flex justify-center items-center mt-2">
              {board[2]?.userName}
            </span>
            <span className="flex justify-center items-center">
              {board[2]?.score}
            </span>
          </div>
        </div>
        <div className="h-60 md:h-72 w-80 md:w-96 flex flex-col gap-3 overflow-scroll pr-2">
          {board.slice(3).map((user, index) => (
            <div className="flex justify-center items-center" key={index}>
              <span className="w-8">{index + 4}</span>
              <div className="h-16 flex items-center w-full rounded-full bg-slate-700">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={user?.userPhotoUrl}
                    width={1600}
                    height={1600}
                    priority={true}
                    className="w-full h-full"
                    alt="user img"
                  />
                </div>
                <span className="pl-2 md:pl-4">{user?.userName}</span>
                <span className="ml-auto mr-6">{user?.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}

export default Leaderboard;
