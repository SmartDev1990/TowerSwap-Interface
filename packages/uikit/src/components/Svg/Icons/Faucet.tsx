import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
    <image
      width="24"
      height="24"
      href="https://i.ibb.co/KsC5FGk/faucet.png"
    />
    </Svg>
  );
};

export default Icon;
