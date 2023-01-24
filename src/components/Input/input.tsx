import React from "react";

function Input(props: any) {
  return (
    <>
      <input
        type="text"
        className={`px-4 py-2 w-80 h-12 rounded-xl border outline-none bg-transparent`}
        autoComplete="off"
        {...props}
      />
    </>
  );
}

export default Input;
