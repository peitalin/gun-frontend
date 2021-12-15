import React from 'react';
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, isThemeDark, BorderRadius } from "layout/AppTheme";

import Tabs from '@mui/material/Tabs';



const AntTabContainer = withStyles((theme: Theme) => createStyles({
  root: {
    // borderBottom: isThemeDark(theme)
    //   ? `1px solid ${Colors.uniswapMediumNavy}`
    //   : `1px solid ${Colors.slateGreyDark}`,
    marginRight: '-1.5rem',
    marginBottom: '0.5rem',
    minHeight: 40,
    maxHeight: 42,
  },
  indicator: {
    backgroundColor: isThemeDark(theme)
      ? Colors.purple
      : Colors.blue,
  },
}))(Tabs);

export default AntTabContainer