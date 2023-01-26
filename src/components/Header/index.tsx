import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

function Header() {
  const { asPath } = useRouter();

  return (
    <div className="flex justify-between items-center w-full fixed top-0 z-30 py-4 md:py-6 px-5 md:px-10 bg-[#1d1f27] shadow-md">
      <Link href={"/"}>
        <h1 className="text-2xl text-[#fffafa] hover:text-gray-300">QuizApp</h1>
      </Link>
      <div className="flex gap-5 items-center justify-center">
        {asPath !== "/login" &&
          asPath !== "/register" &&
          asPath !== "/forgotpw" && (
            <Link href={"/login"} className="ml-auto">
              <span className="text-xl text-[#fffafa] hover:text-gray-300">
                Log In
              </span>
            </Link>
          )}
        <Link href={"/user"}>
          <div className="h-8 w-8 flex justify-center items-center text-[#fffafa] hover:text-gray-300">
            <AiOutlineUser size={32} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
