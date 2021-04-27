import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Styles
import {
  Colors,
  BoxShadows,
  BorderRadius2x,
  BorderRadius3x,
  BorderRadius,
  Gradients,
  isThemeDark,
} from "layout/AppTheme";
import Tooltip from "@material-ui/core/Tooltip";


const TooltipToggle = ({ placement, title, disabled, children }) => {
  if (disabled) {
    return <>{children}</>
  } else {
    return (
      <Tooltip placement={placement} title={title}>
        {children}
      </Tooltip>
    )
  }
}



export default TooltipToggle;