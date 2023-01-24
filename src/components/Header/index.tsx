import { useRouter } from "next/router";
import Link from "next/link";

function Header() {
  const {asPath} = useRouter();
  console.log(asPath);
  return (
    <div className="flex justify-between items-center w-full fixed top-0 z-30 py-4 md:py-6 px-5 md:px-10 bg-[#1d1f27]">
      <Link href={"/"}>
        <h1 className="text-2xl">QuizApp</h1>
      </Link>
      { asPath !== "/login" && asPath !== "/register" && asPath !== "/forgotpw" &&
        <Link href={"/login"} className="ml-auto">
          <span className="text-xl text-gray-300 hover:text-gray-400">
            Log In
          </span>
        </Link>
      }
    </div>
  );
}

export default Header;
