import React from "react"
import Hidden from "@material-ui/core/Hidden";

const HiddenFix = Hidden as React.ComponentType<HiddenProps>

export interface HiddenProps {
  children?: React.ReactNode;
  implementation?: "js" | "css";
  initialWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  lgDown?: boolean;
  lgUp?: boolean;
  mdDown?: boolean;
  mdUp?: boolean;
  only?: "xs" | "sm" | "md" | "lg" | "xl"
      | Array<"xs" | "sm" | "md" | "lg" | "xl">;
  smDown?: boolean;
  smUp?: boolean;
  xlDown?: boolean;
  xlUp?: boolean;
  xsDown?: boolean;
  xsUp?: boolean;
  //
  className?: any;
}

export default HiddenFix;