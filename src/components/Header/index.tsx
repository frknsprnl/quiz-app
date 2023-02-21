import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Search from "../Search/Search";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center w-full fixed top-0 z-30 py-4 md:py-6 px-5 md:px-10 bg-[#16161a] shadow-md">
      <Link href={"/"}>
        <h1 className="text-2xl text-[#fffafa] hover:text-gray-300">QuizApp</h1>
      </Link>
      <Search />
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
              toast.success("You've been logged out.");
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
