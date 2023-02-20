import React from "react";

function TextArea(props: any) {
  return (
    <div className="flex flex-col w-full">
      {props.label && (
        <label
          className={`text-sm md:text-base ${props.error ? "" : "pb-1.5"} px-2 text-white`}
          htmlFor={props.name}
        >
          {props.label}
        </label>
      )}
      {props.error ? props.error : null}
      <textarea
        type="text"
        className={`px-4 py-2 w-full h-12 rounded-xl border outline-none resize-none bg-transparent ${props.className}`}
        style={{ height: props.h, width: props.w }}
        autoComplete="off"
        {...props}
      />
    </div>
  );
}

export default TextArea;
