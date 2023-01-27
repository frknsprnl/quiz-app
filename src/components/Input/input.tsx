import React from "react";

function Input(props: any) {
  return (
    <>
      <div className="flex flex-col"> 
        <label className="text-sm md:text-base pb-1.5 px-2">{props.label}</label>
        <input
          type="text"
          className={`px-4 py-2 w-80 h-12 rounded-xl border outline-none bg-transparent`}
          autoComplete="off"
          {...props}
        />
      </div>
    </>
  );
}

export default Input;
