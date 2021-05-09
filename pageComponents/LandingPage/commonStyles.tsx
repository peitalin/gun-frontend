import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { isThemeDark, Colors, Gradients, BorderRadius3x } from "layout/AppTheme";


const marginWidth = 0.5

export const commonStyles = (theme: Theme) => ({
  border1: {
    borderRadius: BorderRadius3x,
    margin: `${marginWidth}rem`,
    marginBottom: '0rem',
    width: `calc(100% - ${2*marginWidth}rem)`,
    backgroundColor: isThemeDark(theme)
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.slateGrey}`,
  },
  border2: {
    borderRadius: BorderRadius3x,
    margin: `${marginWidth}rem`,
    marginBottom: '0rem',
    width: `calc(100% - ${2*marginWidth}rem)`,
    backgroundColor: isThemeDark(theme)
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
      // : `linear-gradient(180deg , ${Colors.slateGrey} 30%, rgba(255, 255, 255, 0.4) 60%, rgba(5, 5, 5, 0) 90%)`,
  },
  borderLast: {
    borderRadius: BorderRadius3x,
    margin: `${marginWidth}rem`,
    marginBottom: `${marginWidth}rem`,
    width: `calc(100% - ${2*marginWidth}rem)`,
    backgroundColor: isThemeDark(theme)
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.slateGrey}`,
      // : `linear-gradient(180deg , ${Colors.slateGrey} 30%, rgba(255, 255, 255, 0.4) 60%, rgba(5, 5, 5, 0) 90%)`,
  },
})


