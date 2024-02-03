import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 220 220" {...props}>
      <image width="220" height="220" href="https://i.ibb.co/dPL6jSq/Logo1.png" />
    </Svg>
  );
};

export default Icon;
