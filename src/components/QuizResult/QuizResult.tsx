import React from "react";
import ResultSvg from "@/assets/result.svg";
import Image from "next/image";
import Button from "../Button/Button";
import { useRouter } from "next/router";

function QuizResult(props: any) {
  const { questions, quizResult } = props;

  const router = useRouter();

  return (
    <div className="p-5 flex flex-col md:flex-row w-full">
      <Image
        src={ResultSvg}
        alt="quiz result svg"
        className="h-72 md:h-[32rem] w-72 md:w-[32rem]"
      />
      <div className="flex flex-col items-center gap-5 justify-center w-full mx-auto">
        <span className="text-3xl md:text-4xl text-center">
          {quizResult.correctAnswerCount != 0 &&
            questions.length / 2 < quizResult.correctAnswerCount &&
            "Congratulations! 🚀"}
          {quizResult.correctAnswerCount != 0 &&
            questions.length / 2 >= quizResult.correctAnswerCount &&
            "Well... Not bad. 💖"}
          {quizResult.correctAnswerCount == 0 &&
            "You failed. 💀 But keep trying. 💪"}
        </span>
        <span className="text-lg md:text-2xl">
          Correct Answers : {quizResult?.correctAnswerCount} /{" "}
          {questions.length}
        </span>
        <span className="text-lg md:text-2xl">Score : {quizResult?.score}</span>
        <div className="w-52">
          <Button
            name="Home"
            color="#7f5af0"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
