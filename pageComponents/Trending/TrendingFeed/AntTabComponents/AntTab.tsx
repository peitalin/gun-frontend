import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark, BorderRadius } from "layout/AppTheme";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';




const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 60,
      // fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      '&:hover': {
        color: isThemeDark(theme) ? Colors.lightPurple : Colors.lightBlue,
        opacity: 1,
      },
      '&$selected': {
        color: isThemeDark(theme) ? Colors.purple : Colors.blue,
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: isThemeDark(theme) ? Colors.lightPurple : Colors.lightBlue,
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label?: string
  value?: number;
  onChange?: (event: React.ChangeEvent<{}>, newValue: number) => void;
}


export default AntTab