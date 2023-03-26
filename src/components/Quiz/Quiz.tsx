import React, { useState, useEffect } from "react";
import { MdTimer } from "react-icons/md";
import QuizOptions from "../QuizOptions/QuizOptions";
import toast from "react-hot-toast";

function Quiz(props: any) {
  interface Option {
    description: string;
    optionId: string;
  }

  interface Question {
    description: string;
    options: Option[];
    questionId: string;
    title: string;
  }

  const [question, setQuestion] = useState<Question>({
    description: "",
    options: [
      { description: "", optionId: "" },
      { description: "", optionId: "" },
    ],
    questionId: "",
    title: "",
  });

  const {
    questions,
    questionNo,
    setQuestionNo,
    quizId,
    quiz,
    setQuizResult
  } = props;

  useEffect(() => {
    if (Number(questionNo) > questions.length || Number(questionNo) <= 0) {
      toast.error("You've entered a wrong question number");
    } else {
      setQuestion(questions[questionNo - 1]);
    }
  }, [questions, questionNo, setQuestionNo]);

  return (
    <>
      <div className="flex flex-col py-0 md:py-4 w-full">
        {/* <div className="w-full rounded-full dark:bg-gray-700 flex">
          <div
            className="bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 text-center py-2 p-0.5 leading-none rounded-full"
            style={{ width: "45%" }}
          >
            45%
          </div>
          <MdTimer className="ml-auto mr-3 my-auto text-xl" />
        </div> */}
        <h1 className="font-semibold text-lg md:text-xl pt-5 pb-3">
          Question {questionNo}{" "}
          <span className="text-gray-500 font-light">/ {questions.length}</span>
        </h1>
        <hr className="border-gray-500 py-2" />

        <p className="py-2 text-xl md:text-2xl">{question?.description}</p>
        <QuizOptions
          options={question?.options}
          questionNo={questionNo}
          setQuestionNo={setQuestionNo}
          questions={questions}
          quiz={quiz}
          quizId={quizId}
          setQuizResult={setQuizResult}
        />
      </div>
    </>
  );
}

export default Quiz;
