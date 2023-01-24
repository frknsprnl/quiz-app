import React from "react";

function blob1() {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className={`opacity-20 absolute w-20 -bottom-1 -right-4 animate-wiggle pointer-events-none`}
      >
        <path
          fill="#fff"
          d="M42.8,-32.6C53.6,-31.9,59.3,-16,60.2,0.9C61.1,17.8,57.2,35.5,46.4,40C35.5,44.4,17.8,35.5,4.5,31C-8.8,26.5,-17.5,26.4,-25.5,22C-33.5,17.5,-40.8,8.8,-39.9,0.9C-39.1,-7,-30.1,-14,-22.1,-14.7C-14,-15.3,-7,-9.6,4.5,-14C16,-18.5,31.9,-33.2,42.8,-32.6Z"
          transform="translate(100 100)"
        />
      </svg>
    </>
  );
}

export default blob1;
