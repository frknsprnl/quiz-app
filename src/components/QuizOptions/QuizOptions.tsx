import { useState } from "react";
import Button from "../Button/Button";

function QuizOptions(props: any) {
  return (
    <form
      className="w-full py-2 md:py-8 flex flex-col gap-4 justify-center items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      {props.answers.map((answer: any, index: any) => (
        <fieldset
          className="w-full md:w-1/2 flex gap-3 py-4 px-6 rounded-full border-2"
          key={index}
        >
          <label htmlFor="">{answer.label}</label>
          <input
            type="radio"
            className="ml-auto rounded-full w-6 h-6"
            name="answer"
            value={answer.label}
            onChange={() => {}}
            {...props}
          />
        </fieldset>
      ))}
      <div className="w-80 pt-0 md:pt-5">
        <Button name="Next" color="#7f5af0" />
      </div>
    </form>
  );
}

export default QuizOptions;
