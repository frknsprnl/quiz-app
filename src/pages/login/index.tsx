import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import Link from "next/link";

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
      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-3 justify-center items-center">
          <h1 className="text-2xl text-center">Hello Again!</h1>
          <span className="text-lg">Welcome back. You`ve been missed.</span>
          <div className="flex flex-col gap-3 w-80">
            <Input name="email" placeholder="E-mail" />
            <Input name="password" placeholder="Password" />
            <Link href="/forgotpw" className="ml-auto text-[#107eeb] hover:text-blue-600">
              Forgot password?
            </Link>
            <Button name="Sign In" color="#107eeb" />
            <span className="text-center">
              Not a member?{" "}
              <Link href="/register" className="text-[#107eeb] hover:text-blue-600">
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
