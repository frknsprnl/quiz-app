import { MouseEvent } from "react";
import Blob1 from "./assets/blob1";
import Blob2 from "./assets/blob2";
import Blob3 from "./assets/blob3";
import Blob4 from "./assets/blob4";
import Color from 'color';

const Button = (props: any) => {
  return (
    <>
      <button
        className={`py-3 px-8 w-full relative rounded-full overflow-hidden font-medium`}
        style={{ backgroundColor: props.color }}
        {...props}
        onMouseOver={(e: MouseEvent) => { 
          (e.target as HTMLElement).style.backgroundColor = `${Color(props.color).darken(0.1)}`;
        }}
        onMouseOut={(e: MouseEvent) => {
          (e.target as HTMLElement).style.backgroundColor = `${props.color}`;
        }}
      >
        <Blob1 />
        <Blob2 />
        <Blob3 />
        <Blob4 />
        {props.name}
      </button>
    </>
  );
};

export default Button;
