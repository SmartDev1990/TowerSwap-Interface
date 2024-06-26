import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <image width="24" height="24" href="https://cdn-icons-png.freepik.com/512/50/50518.png" />
    </Svg>
  );
};

export default Icon;
