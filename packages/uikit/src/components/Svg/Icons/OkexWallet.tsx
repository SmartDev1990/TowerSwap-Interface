import { vars } from "@pancakeswap/ui/css/vars.css";
import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 1281 199" {...props}>
      <image width="1281" height="199" href="https://i.ibb.co/Y8nv1rw/Illustration2.png" />
    </Svg>
  );
};

export default Icon;
