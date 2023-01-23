import { MouseEvent } from "react";
import Blob1 from "./assets/blob1";
import Blob2 from "./assets/blob2";
import Blob3 from "./assets/blob3";
import Color from 'color';

const Button: React.FC<{ color: string }> = ({ color, ...props }) => {
  return (
    <>
      <button
        className={`py-3 px-8 relative rounded-full overflow-hidden font-medium`}
        style={{ backgroundColor: color }}
        onMouseOver={(e: MouseEvent) => {
          (e.target as HTMLElement).style.backgroundColor = `${Color(color).darken(0.1)}`;
        }}
        onMouseOut={(e: MouseEvent) => {
          (e.target as HTMLElement).style.backgroundColor = `${color}`;
        }}
      >
        <Blob1 />
        <Blob2 />
        <Blob3 />
        Next
      </button>
    </>
  );
};

export default Button;
