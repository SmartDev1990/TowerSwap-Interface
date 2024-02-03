import { vars } from "@pancakeswap/ui/css/vars.css";
import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Logo: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 1300 300" {...props}>
      <image width="1300" height="300" href="https://i.ibb.co/2qB2JZ3/Logo-Text1.png" />
    </Svg>
  );
};

export default Logo;
