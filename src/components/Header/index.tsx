import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/router";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center w-full fixed top-0 z-30 py-4 md:py-6 px-5 md:px-10 bg-[#16161a] shadow-md">
      <Link href={"/"}>
        <h1 className="text-2xl text-[#fffafa] hover:text-gray-300">QuizApp</h1>
      </Link>
      <div className="relative hidden md:block">
        <input
          type="search"
          className="outline-none border-none px-6 py-2 bg-slate-700 rounded-full duration-200 focus:scale-125 w-96 none"
          autoComplete="off"
          placeholder="Search"
          onFocus={() => {
            setTimeout(() => {
              document.getElementById("search")?.classList.remove("hidden");
            }, 200);
          }}
          onBlur={() => {
            setTimeout(() => {
              document.getElementById("search")?.classList.add("hidden");
            }, 100);
          }}
        />
        <div
          id="search"
          className="absolute top-16 rounded-full z-10 w-full shadow scale-125 max-h-72 overflow-y-auto bg-slate-700 hover:bg-slate-600 hidden"
        >
          <Link href={"/quiz"} className="block px-6 py-2 w-full h-full">
            Quiz
          </Link>
        </div>
      </div>
      <div className="flex gap-5 items-center justify-center">
        {!isAuthenticated && (
          <Link href={"/login"} className="ml-auto">
            <span className="text-xl text-[#fffafa] hover:text-gray-300">
              Log In
            </span>
          </Link>
        )}
        {isAuthenticated && (
          <Link href={"/user"}>
            <div className="h-8 w-8 flex justify-center items-center text-[#fffafa] hover:text-gray-300">
              <AiOutlineUser size={32} />
            </div>
          </Link>
        )}
        {isAuthenticated && (
          <button
            onClick={async () => {
              logout();
              await router.push("/");
            }}
            className="ml-auto text-xl text-[#fffafa] hover:text-gray-300"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
