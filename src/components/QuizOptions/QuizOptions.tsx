import { useState } from "react";
import Button from "../Button/Button";

function QuizOptions(props: any) {
  return (
    <fieldset
      className="w-full py-2 md:py-8 flex flex-col gap-4 justify-center items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      {props.answers.map((answer: any, index: any) => (
        <div
          className={`w-full md:w-1/2 flex gap-3 py-4 px-6 rounded-full border-2 hover:border-[#7f5af0] duration-500`}
          key={index}
          onClick={(e) => {
            (
              e.currentTarget.querySelector("input") ?? { checked: false }
            ).checked = true;
          }}
        >
          <label htmlFor="">{answer.label}</label>
          <input
            type="radio"
            className="form-radio ml-auto rounded-full text-[#7f5af0] w-6 h-6 border-transparent  focus:ring-0"
            name="answer"
            value={answer.label}
          />
        </div>
      ))}
      <div className="w-80 pt-0 md:pt-5">
        <Button name="Next" color="#7f5af0" />
      </div>
    </fieldset>
  );
}

export default QuizOptions;
