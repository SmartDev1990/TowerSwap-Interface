import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M42.66 42A2.07 2.07 0 0 1 41 39.89V7a2 2 0 0 0-2-2H10.11A2.07 2.07 0 0 1 8 3.34 2 2 0 0 1 10 1h31a4 4 0 0 1 4 4v35a2 2 0 0 1-2.34 2Z"
      fill="#f6c79e"
    />
    <rect x={2} y={8} width={36} height={40} rx={4} ry={4} fill="#ea802a" />
  </Svg>
  );
};

export default Icon;
