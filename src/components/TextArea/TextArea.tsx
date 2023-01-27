import React from "react";

function TextArea(props: any) {
  return (
    <>
      <textarea
        type="text"
        className={`px-4 py-2 w-full h-12 rounded-xl border outline-none resize-none bg-transparent ${props.className}`}
        style={{height: props.h, width: props.w}}
        autoComplete="off"
        {...props}
      />
    </>
  );
}

export default TextArea;
