import React from "react";

function Input(props: any) {
  return (
    <>
      <div className="flex flex-col">
        { props.label &&
          <label
            className="text-sm md:text-base px-2 text-white"
            htmlFor={props.name}
          >
            {props.label}
          </label>
        }
        {props.error ? props.error : null}
        <input
          type="text"
          className={`px-4 py-2 w-80 h-12 rounded-xl border outline-none bg-transparent drop-shadow-none`}
          autoComplete="off"
          {...props}
        />
      </div>
    </>
  );
}

export default Input;
