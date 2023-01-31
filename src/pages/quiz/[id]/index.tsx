import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { MdTimer } from "react-icons/md";
import QuizOptions from "@/components/QuizOptions/QuizOptions";

function SingleQuiz() {
  const [answers, setAnswers] = useState([
    { label: "Merhaba" },
    { label: "Hello" },
    { label: "Selam" },
    { label: "Salam" },
  ]);

  return (
    <>
      <Head>
        <title>Quiz Name | QuizApp</title>
        <meta
          name="description"
          content="Login to QuizApp and create your own quizzes. Share and challenge the others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen w-full pt-20 md:pt-24">
        <div className="flex flex-col py-0 md:py-4">
          <div className="w-full rounded-full dark:bg-gray-700 flex">
            <div
              className="bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 text-center py-2 p-0.5 leading-none rounded-full"
              style={{ width: "45%" }}
            >
              45%
            </div>
            <MdTimer className="ml-auto mr-3 my-auto text-xl" />
          </div>

          <h1 className="font-semibold text-lg md:text-xl pt-5 pb-3">
            Question 1 <span className="text-gray-500 font-light">/ 10</span>
          </h1>
          <hr className="border-gray-500 py-2" />

          <p className="py-2 text-xl md:text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            corporis?
          </p>

          <QuizOptions answers={answers} />
        </div>
      </main>
    </>
  );
}

export default SingleQuiz;
