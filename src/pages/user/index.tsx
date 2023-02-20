import { useEffect, useRef } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { MdOutlineLeaderboard } from "react-icons/md";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Image from "next/image";
import ProfileImg from "@/assets/profile.png";
import Link from "next/link";
import Router from "next/router";
import AuthenticatedRoute from "@/routes/AuthenticatedRoute";

type UserLayoutProps = {
  children: React.ReactNode;
};

function UserLayout({ children }: UserLayoutProps) {
  useEffect(() => {
    const { pathname } = Router;

    if (pathname === "/user") {
      Router.push("/user/profile");
    }
  }, []);

  return (
    <AuthenticatedRoute>
      <Head>
        <title>User | QuizApp</title>
        <meta
          name="description"
          content="Login to QuizApp and create your own quizzes. Share and challenge the others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen px-[1.2rem] md:px-0 pb-0 overflow-y-hidden">
        <div
          className="block md:flex"
          style={{ height: "calc(100% - 5rem)", marginTop: "5rem" }}
        >
          <div className="flex flex-row md:flex-col gap-6 md:w-20 lg:w-72 shadow-md md:relative rounded-xl inset-x-0 fixed bottom-0 bg-[#16161a]">
            <Link
              href={"/user/leaderboard"}
              className="flex px-0 justify-center lg:justify-start lg:px-10 items-center gap-3 py-2 mx-auto md:mt-auto w-full hover:bg-slate-700 rounded-xl"
            >
              <MdOutlineLeaderboard size={36} className="text-white" />
              <span className="text-lg hidden lg:flex">Leaderboard</span>
            </Link>
            <Link
              href={"/user/contact"}
              className="flex px-0 justify-center lg:justify-start lg:px-10 items-center gap-3 py-2 mx-auto w-full hover:bg-slate-700 rounded-xl"
            >
              <MdOutlineHeadsetMic size={36} className="text-white" />
              <span className="text-lg hidden lg:flex">Contact</span>
            </Link>
            <button
              className="flex px-0 justify-center lg:justify-start lg:px-10 items-center gap-0 lg:gap-3 py-2 mx-auto md:mb-auto w-full hover:bg-slate-700 rounded-xl"
              id="dropdown-parent"
              onClick={(e) => {
                const dropdown = document.getElementById("dropdown");
                const dropdownParent = e.currentTarget;

                if (dropdown?.classList.contains("hidden")) {
                  dropdown?.classList.remove("hidden");
                  dropdownParent?.classList.add("bg-slate-700");
                } else {
                  dropdown?.classList.add("hidden");
                  dropdownParent?.classList.remove("bg-slate-700");
                }
              }}
            >
              <MdOutlineEdit size={36} className="text-white" />
              <div className="relative">
                <span className="text-lg hidden lg:flex">Edit</span>
                <div
                  className="absolute -top-36 -right-20 md:left-6 md:-top-8 lg:-top-5 lg:left-40 mt-2 w-48 h-auto rounded shadow-md hidden z-40"
                  id="dropdown"
                >
                  <Link
                    href={"/user/edit/password"}
                    className="flex px-0 justify-center lg:justify-start lg:px-10 items-center gap-3 py-2 mx-auto md:mb-auto w-full bg-[#16161a] hover:bg-slate-700 rounded-xl text-lg z-40"
                    onClick={(e) => {
                      e.currentTarget
                        ? ""
                        : document
                            .getElementById("dropdown")
                            ?.classList.add("hidden");
                    }}
                  >
                    Password
                  </Link>
                  <Link
                    href={"/user/edit/profile"}
                    className="flex px-0 justify-center lg:justify-start lg:px-10 items-center gap-3 py-2 mx-auto md:mb-auto w-full bg-[#16161a] hover:bg-slate-700 rounded-xl text-lg z-40"
                    onClick={(e) => {
                      e.currentTarget
                        ? ""
                        : document
                            .getElementById("dropdown")
                            ?.classList.add("hidden");
                    }}
                  >
                    Profile
                  </Link>
                </div>
              </div>
            </button>
            <Link
              href="/user/profile"
              className="flex px-0 justify-center lg:justify-start lg:px-8 items-center gap-3 py-2 md:pb-8 w-full mt-auto group"
            >
              <Image
                src={ProfileImg}
                alt="userLayout img"
                className="h-14 md:h-16 w-14 md:w-16 rounded-full p-2 group-hover:bg-slate-700 object-cover"
              />
              <span className="text-lg hidden lg:flex group-hover:text-gray-300">
                Fatih S. M.
              </span>
            </Link>
          </div>
          <div className="md:p-6 lg:p-10 w-full">{children}</div>
        </div>
      </main>
    </AuthenticatedRoute>
  );
}

export default UserLayout;
