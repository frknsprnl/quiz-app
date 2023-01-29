import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import QuizLandingImg from "@/assets/quiz-landing.png";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/router";

function QuizLanding() {
  const router = useRouter();

  const handleClick = (e: any, quizId: any) => {
    e.preventDefault();
    router.push(`/quiz/${quizId}`);
  };

  return (
    <>
      <Head>
        <title>Quiz | QuizApp</title>
        <meta
          name="description"
          content="Login to QuizApp and create your own quizzes. Share and challenge the others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen w-full flex justify-center pt-16 md:pt-20">
        <div className="flex flex-col md:flex-row w-full pt-6">
          <div className="flex flex-col flex-1 justify-center items-center md:order-1 order-2">
            <h1 className="py-2 text-3xl">Quiz name</h1>
            <span className="py-5 text-lg w-full md:w-96 text-[#94a1b2] text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              tempore porro provident impedit quas harum dolor, sapiente
              inventore delectus similique sunt aperiam suscipit modi amet velit
              commodi reprehenderit deserunt soluta.
            </span>
            <div className="w-64 md:w-80 py-5">
              <Button
                name="Start quiz"
                color="#7f5af0"
                onClick={(e:any) => {handleClick(e, 1)}}
              />
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center order-1 md:order-2">
            <Image
              src={QuizLandingImg}
              alt="quiz-landing img"
              className="h-52 w-52 md:h-96 md:w-96"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default QuizLanding;
