import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { MdQuiz, MdRule } from "react-icons/md";
import { RxQuestionMark } from "react-icons/rx";
import Quiz from "@/components/Create/Quiz/CreateQuiz";
import Questions from "@/components/Create/Questions/CreateQuestions";
import Options from "@/components/Create/Options/CreateOptions";
import AuthenticatedRoute from "@/routes/AuthenticatedRoute";

function CreateQuiz() {
  const [step, setStep] = useState(1);
  const [quizId, setQuizId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [questionCount, setQuestionCount] = useState(1);

  return (
    <AuthenticatedRoute>
      <Head>
        <title>Create Quiz | QuizApp</title>
        <meta
          name="description"
          content="Login to QuizApp and create your own quizzes. Share and challenge the others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen w-full flex pt-16 md:pt-20">
        <div className="pt-10 w-full">
          <ol className="flex items-center w-11/12 md:w-3/4 mx-auto">
            <li
              className={`flex w-full items-center text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block duration-1000 ${
                step === 1 ? "after:border-[#7f5af0]" : "after:border-gray-700"
              }`}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${
                  step === 1 ? "bg-[#7f5af0]" : "bg-gray-700"
                } shrink-0 duration-1000`}
              >
                <RxQuestionMark size={24} />
              </span>
            </li>
            <li
              className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block duration-1000 ${
                step === 2 ? "after:border-[#7f5af0]" : "after:border-gray-700"
              }`}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${
                  step === 2 ? "bg-[#7f5af0]" : "bg-gray-700"
                } shrink-0 duration-1000`}
              >
                <MdQuiz size={24} />
              </span>
            </li>
            <li className="flex items-center">
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${
                  step === 3 ? "bg-[#7f5af0]" : "bg-gray-700"
                } shrink-0 duration-1000`}
              >
                <MdRule size={24} />
              </span>
            </li>
          </ol>
          {step === 1 && (
            <Quiz setStep={setStep} setQuizId={setQuizId} />
          )}
          {step === 2 && (
            <Questions
              quizId={quizId}
              questionCount={questionCount}
              setQuestionCount={setQuestionCount}
              setStep={setStep}
              setQuestionId={setQuestionId}
            />
          )}
          {step === 3 && <Options setStep={setStep} questionId={questionId} />}
        </div>
      </main>
    </AuthenticatedRoute>
  );
}

export default CreateQuiz;
