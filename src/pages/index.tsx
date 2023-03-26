import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Blob from "../assets/blob";
import TestImg from "../assets/main-test.svg";
import Image from "next/image";
import { AiOutlineArrowDown } from "react-icons/ai";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import QuizCard from "@/components/QuizCard/QuizCard";
import axios from "axios";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useRouter } from "next/router";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

export default function Home() {
  function handleScroll(screenId: any) {
    const element: any = document.getElementById(screenId);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  interface Quiz {
    createdDate: Date;
    description: string;
    quizId: string;
    questions: [];
    title: string;
    userId: string;
    categoryName: string;
  }

  interface Category {
    categoryName: string;
    id: string;
    createdDate: Date;
  }

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getQuizzes = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/Quizzes/GetQuizList?Page=1&PageSize=10`
        )
        .then((resp) => {
          setQuizzes(resp.data.quizzes.records);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getCategories = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/getall`)
        .then((resp) => {
          setCategories(resp.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getQuizzes();
    getCategories();
  }, []);

  const scrollCategoryRef: any = useRef(null);
  const scrollQuizRef: any = useRef(null);

  const handleXScroll = (scrollRef: any, scrollOffset: number) => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollOffset,
        behavior: "smooth",
      });
    }
  };

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
          <div className="flex flex-col order-2 lg:order-1">
            <h1 className="text-base text-center md:text-2xl lg:text-3xl w-full lg:w-5/6 m-auto pb-5">
              Welcome to QuizApp, create and publish your own quizzes. Challenge
              yourself and others. With a wide range of topics to choose from,
              the possibilities are endless. Let the fun begin!
            </h1>
            <div className="w-56 mx-auto mb-auto">
              <Button
                name="Create Quiz"
                color="#7f5af0"
                onClick={() => {
                  router.push("/createquiz");
                }}
              />
            </div>
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
        <div className="flex justify-center mt-4 lg:mt-0" id="screen2">
          <button className="p-2 z-10" onClick={() => handleScroll("screen2")}>
            <AiOutlineArrowDown
              size={36}
              className="animate-bounce z-0 text-[#fffafa] hover:text-gray-300"
            />
          </button>
        </div>
        <div className="min-h-screen pt-6 md:pt-8">
          <div>
            <h1 className="text-3xl md:text-4xl py-4 md:py-6">
              Popular Quizzes
            </h1>
            <div className="flex justify-center items-center md:items-center w-full relative">
              <div
                className="flex space-x-6 pt-2 pb-6 overflow-x-hidden"
                ref={scrollQuizRef}
              >
                {quizzes.map((quiz) => (
                  <Link
                    href={`/quizzes/${quiz.quizId}`}
                    key={quiz.quizId}
                    className="group"
                  >
                    <QuizCard category={quiz.categoryName} name={quiz.title} />
                  </Link>
                ))}
              </div>
              <div className="absolute left-0">
                <button
                  className="rounded-xl px-4 py-16 opacity-70"
                  onClick={() => {
                    handleXScroll(scrollQuizRef,-360);
                  }}
                >
                  <MdArrowBackIos size={24} />
                </button>
              </div>
              <div className="absolute right-0">
                <button
                  className="rounded-xl px-4 py-16 opacity-70"
                  onClick={() => {
                    handleXScroll(scrollQuizRef,360);
                  }}
                >
                  <MdArrowForwardIos size={24} />
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="text-3xl md:text-4xl py-4 md:py-6">Categories</h1>
            <div className="flex justify-center items-center md:items-center w-full relative">
              <div
                className="flex space-x-6 pt-2 pb-6 overflow-x-hidden"
                ref={scrollCategoryRef}
              >
                {categories.map((category) => (
                  <CategoryCard
                    name={category.categoryName}
                    key={category.id}
                  />
                ))}
              </div>
              <div className="absolute left-0">
                <button
                  className="rounded-xl px-4 py-16 opacity-70"
                  onClick={() => {
                    handleXScroll(scrollCategoryRef, -360);
                  }}
                >
                  <MdArrowBackIos size={24} />
                </button>
              </div>
              <div className="absolute right-0">
                <button
                  className="rounded-xl px-4 py-16 opacity-70"
                  onClick={() => {
                    handleXScroll(scrollCategoryRef, 360);
                  }}
                >
                  <MdArrowForwardIos size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
