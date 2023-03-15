import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import axios from "axios";

function QuizOptions(props: any) {
  const { questions, options, questionNo, setQuestionNo, quizId, quiz } = props;

  const router = useRouter();
  interface Option {
    selectedOptionId: string;
    selectedOptionDescription: undefined | string | null;
  }
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  interface Question {
    questionId: string;
    title: string;
    description: string;
    selectedOptionId: string | null | undefined;
    selectedOptionDescription: string | null | undefined;
  }

  interface Answer {
    quizId: string;
    title: string;
    description: string;
    questions: Question[];
  }
  const [answer, setAnswer] = useState<Answer | undefined>();

  const handleClick = (questionNo: any) => {
    router.push(`/quizzes/${quizId}?question=${questionNo}`);
    document
      .querySelectorAll("input")
      .forEach((input) => (input.checked = false));
  };

  useEffect(() => {
    if (!answer) {
      setAnswer({
        quizId: quiz?.quizId,
        title: quiz?.title,
        description: quiz?.description,
        questions: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  useEffect(() => {
    if (answer)
      setAnswer((prevAnswer: any) => {
        if (!prevAnswer) {
          return {
            questions: [
              {
                questionId: quiz?.questions[questionNo - 1]?.questionId,
                title: quiz?.questions[questionNo - 1]?.title,
                description: quiz?.questions[questionNo - 1]?.description,
                selectedOptionId: selectedOption?.selectedOptionId,
                selectedOptionDescription:
                  selectedOption?.selectedOptionDescription,
              },
            ],
          };
        }

        const questionIndex = prevAnswer.questions.findIndex(
          (q: any) =>
            q.questionId === quiz?.questions[questionNo - 1]?.questionId
        );

        if (questionIndex === -1) {
          return {
            ...prevAnswer,
            questions: [
              ...prevAnswer.questions,
              {
                questionId: quiz?.questions[questionNo - 1]?.questionId,
                title: quiz?.questions[questionNo - 1]?.title,
                description: quiz?.questions[questionNo - 1]?.description,
                selectedOptionId: selectedOption?.selectedOptionId,
                selectedOptionDescription:
                  selectedOption?.selectedOptionDescription,
              },
            ],
          };
        } else {
          const updatedQuestion = {
            ...prevAnswer.questions[questionIndex],
            selectedOptionId: selectedOption?.selectedOptionId,
            selectedOptionDescription:
              selectedOption?.selectedOptionDescription,
          };

          const updatedQuestions = [
            ...prevAnswer.questions.slice(0, questionIndex),
            updatedQuestion,
            ...prevAnswer.questions.slice(questionIndex + 1),
          ];

          return {
            ...prevAnswer,
            questions: updatedQuestions,
          };
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  const finishQuiz = async (answer: any, token: string) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/quizzes/finishquiz`,
        { quiz: answer },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((resp) => {
        toast.success(
          `Correct answer count: ${resp.data.quizResult.correctAnswerCount}`
        );
        toast(`Score: ${resp.data.quizResult.score}`, {
          icon: "🚀",
        });
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <fieldset
      className="w-full py-2 md:py-8 flex flex-col gap-4 justify-center items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      {options.map((option: any, index: any) => (
        <div
          className={`w-full md:w-1/2 flex gap-3 py-4 px-6 rounded-full border-2 hover:border-[#7f5af0] duration-500 ${
            selectedOption?.selectedOptionId === option.optionId
              ? "border-[#7f5af0]"
              : ""
          }`}
          key={index}
          onClick={(e) => {
            const input = e.currentTarget.querySelector("input");
            const inputDesc = e.currentTarget.querySelector(
              `label[for="${option.optionId}"]`
            );
            (input ?? { checked: false }).checked = true;
            if (input !== null)
              setSelectedOption({
                selectedOptionId: input.value,
                selectedOptionDescription: inputDesc?.textContent,
              });
          }}
        >
          <label htmlFor={option.optionId}>{option.description}</label>
          <input
            type="radio"
            className="form-radio ml-auto rounded-full text-[#7f5af0] w-6 h-6 border-transparent  focus:ring-0"
            id={option.optionId}
            name="option"
            onChange={() => {
              setSelectedOption({
                selectedOptionId: option.optionId,
                selectedOptionDescription: option.description,
              });
            }}
            value={option.optionId}
          />
        </div>
      ))}
      <div className="w-80 pt-0 md:pt-5">
        {questions.length !== Number(questionNo) && (
          <Button
            name="Next"
            color="#7f5af0"
            onClick={() => {
              if (
                questions.length > Number(questionNo) &&
                Number(questionNo) > 0
              ) {
                const inputs = document.querySelectorAll("input");
                const checked = Array.from(inputs).some(
                  (input) => input.checked
                );

                if (checked) {
                  handleClick(Number(questionNo) + 1);
                } else {
                  toast.error("You must select an option");
                }
              }
            }}
          />
        )}
        {questions.length === Number(questionNo) && (
          <Button
            name="End Quiz"
            color="#7f5af0"
            onClick={() => {
              if (
                questions.length >= Number(questionNo) &&
                Number(questionNo) > 0
              ) {
                const inputs = document.querySelectorAll("input");
                const checked = Array.from(inputs).some(
                  (input) => input.checked
                );

                if (checked) {
                  const token = localStorage.getItem("token");
                  if (token) {
                    finishQuiz(answer, token);
                  }
                } else {
                  toast.error("You must select an option");
                }
              }
            }}
          />
        )}
      </div>
    </fieldset>
  );
}

export default QuizOptions;
