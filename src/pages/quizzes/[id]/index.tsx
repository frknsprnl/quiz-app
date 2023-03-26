import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import QuizLandingImg from "@/assets/quiz-landing.png";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/router";
import Quiz from "@/components/Quiz/Quiz";
import axios from "axios";
import AuthenticatedRoute from "@/routes/AuthenticatedRoute";
import QuizResult from "@/components/QuizResult/QuizResult";

function QuizLanding() {
  const router = useRouter();
  const quizId = router.query["id"];
  const [questionNo, setQuestionNo] = useState(router.query["question"]);
  const [questions, setQuestions] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    setQuestionNo(router.query["question"]);
  }, [router]);

  interface Quiz {
    categoryName: string;
    description: string;
    id: string;
    questions: [];
    title: string;
  }
  const [quiz, setQuiz] = useState<Quiz>();

  const handleClick = (questionNo: any) => {
    router.push(`/quizzes/${quizId}?question=${questionNo}`);
  };

  const startQuiz = async (
    quizId: string | string[] | undefined,
    token: string
  ) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/quizzes/startquiz?quizId=${quizId}`,
        "",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((resp) => {
        setQuiz(resp.data.quiz);
        setQuestions(resp.data.quiz.questions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (router.query["id"]) {
      const token = localStorage.getItem("token");
      if (token) startQuiz(quizId, token);
    }
  }, [quizId, router]);

  return (
    <AuthenticatedRoute>
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
          {!questionNo && (
            <>
              <div className="flex flex-col flex-1 justify-center items-center md:order-1 order-2">
                <h1 className="absolute top-32 left-20 text-3xl">
                  Category:
                  <span className="text-gray-500"> {quiz?.categoryName} </span>
                </h1>
                <h1 className="py-2 text-3xl">{quiz?.title}</h1>
                <span className="py-5 text-lg w-full md:w-96 text-[#94a1b2] text-center">
                  {quiz?.description}
                </span>
                <div className="w-64 md:w-80 py-5">
                  <Button
                    name="Start quiz"
                    color="#7f5af0"
                    onClick={() => {
                      handleClick(!questionNo ? 1 : Number(questionNo) + 1);
                      const token = localStorage.getItem("token");
                      if (token) {
                        startQuiz(quizId, token);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center order-1 md:order-2">
                <Image
                  src={QuizLandingImg}
                  alt="quiz-landing img"
                  className="h-52 w-52 md:h-96 md:w-96"
                  priority={true}
                />
              </div>
            </>
          )}
          {questionNo && !quizResult && (
            <Quiz
              questions={questions}
              questionNo={questionNo}
              setQuestionNo={setQuestionNo}
              quiz={quiz}
              quizId={quizId}
              setQuizResult={setQuizResult}
            />
          )}
          {quizResult && (
            <QuizResult questions={questions} quizResult={quizResult} />
          )}
        </div>
      </main>
    </AuthenticatedRoute>
  );
}

export default QuizLanding;
