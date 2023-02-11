import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Blob from "../assets/blob";
import TestImg from "../assets/test.png";
import Image from "next/image";
import { AiOutlineArrowDown } from "react-icons/ai";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import QuizCard from "@/components/QuizCard/QuizCard";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  function handleScroll(screenId: any) {
    const element: any = document.getElementById(screenId);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  interface Quiz {
    createdDate: Date;
    description: string;
    id: string;
    questions: [];
    title: string;
    userId: string;
  }

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const getQuizzes = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quizzes/getall`)
      .then((resp) => {
        setQuizzes(resp.data.quizzes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <>
      <Head>
        <title>Home | QuizApp</title>
        <meta
          name="description"
          content="Unleash your inner quiz creator and build your own quizzes to share with others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="flex flex-col lg:flex-row justify-around py-0 lg:py-12">
          <div className="flex order-2 lg:order-1">
            <h1 className="text-lg text-center md:text-2xl lg:text-3xl w-full lg:w-5/6 m-auto py-2">
              Welcome to QuizApp, create and publish your own quizzes. Challenge
              yourself and others. With a wide range of topics to choose from,
              the possibilities are endless. Let the fun begin!
            </h1>
          </div>
          <div className="flex w-auto lg:w-[36rem] relative justify-center items-center order-1 lg:order-2 mr-0 lg:mr-20">
            <Blob
              color="#fffafa"
              className="h-96 lg:h-[30rem] w-96 lg:w-[30rem] m-auto"
            />
            <Image
              src={TestImg}
              alt="test image"
              className="absolute h-96 lg:h-[36rem] w-96 lg:w-[36rem] m-auto left-0 right-0"
              priority={true}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 md:mt-0" id="screen2">
          <button className="p-2 z-10" onClick={() => handleScroll("screen2")}>
            <AiOutlineArrowDown
              size={36}
              className="animate-bounce z-0 text-[#fffafa] hover:text-gray-300"
            />
          </button>
        </div>
        <div className="min-h-screen pt-6 md:pt-8">
          <div>
            <h1 className="text-3xl md:text-4xl py-4 md:py-8">
              Popular Quizzes
            </h1>
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
              {quizzes.map((quiz) => (
                <Link href={`/quizzes/${quiz.id}`} key={quiz.id}>
                  <QuizCard category="Math" name={quiz.title} />
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="text-3xl md:text-4xl py-4 md:py-6">
              Popular Categories
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-3 md:gap-4">
              <CategoryCard name="Countries" />
              <CategoryCard name="Science" />
              <CategoryCard name="Books" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
