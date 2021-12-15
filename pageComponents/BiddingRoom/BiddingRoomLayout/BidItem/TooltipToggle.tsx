import React from 'react';
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
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
import Tooltip from "@mui/material/Tooltip";


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