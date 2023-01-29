import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import Link from "next/link";
import blobTop from "@/assets/blob-top.png";
import blobBottom from "@/assets/blob-bottom.png";
import Image from "next/image";

function Login() {
  return (
    <>
      <Head>
        <title>Login | QuizApp</title>
        <meta
          name="description"
          content="Login to QuizApp and create your own quizzes. Share and challenge the others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen w-full flex justify-center items-center">
        <Image
          src={blobTop}
          alt="blob image"
          className="absolute top-10 md:top-20 right-0 -z-40"
        />
        <Image
          src={blobBottom}
          alt="blob image"
          className="absolute bottom-0 left-0 -z-40"
        />
        <div className="flex flex-col gap-3 justify-center items-center p-5 rounded-xl bg-[#16161a]">
          <h1 className="text-2xl text-center">Hello Again!</h1>
          <span className="text-lg">Welcome back. You`ve been missed.</span>
          <div className="flex flex-col gap-3 w-80">
            <Input name="email" placeholder="E-mail" />
            <Input name="password" placeholder="Password" />
            <Link
              href="/forgotpw"
              className="ml-auto text-[#7f5af0] hover:text-violet-700"
            >
              Forgot password?
            </Link>
            <Button name="Sign In" color="#7f5af0" />
            <span className="text-center">
              Not a member?{" "}
              <Link
                href="/register"
                className="text-[#7f5af0] hover:text-violet-700"
              >
                Register Now
              </Link>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
