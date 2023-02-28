import { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import axios from "axios";
import { HiOutlinePlus } from "react-icons/hi";
import toast from "react-hot-toast";

function Options({ ...props }) {
  const { questionId, setStep } = props;
  const initialAnswer = { description: "", isAnswer: false };
  const [answers, setAnswers] = useState([initialAnswer]);

  const updateAnswer = (index: any) => (e: any) => {
    const newArray = answers.map((answer, i) => {
      if (index === i) {
        return { ...answer, [e.target.name]: e.target.value };
      } else {
        return answer;
      }
    });

    setAnswers(newArray);
  };

  const checkAnswer = (index: any) => (e: any) => {
    const newArray = answers.map((answer, i) => {
      if (index === i) {
        return { ...answer, [e.target.name]: true };
      } else {
        return { ...answer, [e.target.name]: false };
      }
    });

    setAnswers(newArray);
  };

  const createOptions = async (token: string) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/options/create`,
        {
          questionId: `${questionId}`,
          options: answers,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((resp) => {
        toast.success(resp.data.message);
        setStep(2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // if any value of description is empty 
    let isDescriptionCheck = answers.some((answer) => {
      return "" == answer.description;
    });
    // if any value of isAnswer is true
    let isAnswerCheck = answers.some((answer) => {
      return true === answer.isAnswer;
    })

    const token = localStorage.getItem("token");
    if (token && !isDescriptionCheck && isAnswerCheck) {
      createOptions(token);
    } else if (isDescriptionCheck) {
      toast.error("Question can't be empty.");
    } else if (!isAnswerCheck) {
      toast.error("You must select an answer.")
    }
  };

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  return (
    <form className="flex flex-col gap-3 py-8">
      <div className="flex flex-col gap-3 mx-auto w-96">
        <fieldset className="w-full py-2 md:py-8 flex flex-col gap-4 justify-center items-center">
          {answers.map((answer, index) => (
            <div
              className={`w-full flex gap-3 py-4 px-6 rounded-full border-2 hover:border-[#7f5af0] duration-500`}
              key={index}
              onClick={(e) => {
                (
                  e.currentTarget.querySelector("input") ?? { checked: false }
                ).checked = true;
              }}
            >
              <input
                type="text"
                name="description"
                className="w-full bg-transparent text-white border-none outline-none"
                autoComplete="off"
                value={answer.description}
                onChange={updateAnswer(index)}
              />
              <input
                type="radio"
                className="form-radio ml-auto rounded-full text-[#7f5af0] w-6 h-6 border-transparent focus:ring-0"
                name="isAnswer"
                onChange={checkAnswer(index)}
              />
            </div>
          ))}
          <div className="w-10 h-10 border-2 rounded-full flex justify-center items-center group hover:border-[#7f5af0] duration-500">
            <HiOutlinePlus
              size={24}
              className="group-hover:text-[#7f5af0] group-hover:cursor-pointer"
              onClick={() => {
                if (answers.length < 4) {
                  setAnswers([...answers, initialAnswer]);
                } else {
                  toast.error("Maximum answer count is 4");
                }
              }}
            />
          </div>
        </fieldset>
      </div>
      <div className="w-56 mx-auto">
        <Button
          name="Next"
          color="#7f5af0"
          type="submit"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
}

export default Options;
