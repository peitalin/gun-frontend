import React from "react";
import clsx from "clsx";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius, Colors } from "layout/AppTheme";
// Material UI
import Typography from "@mui/material/Typography";


const Row = ({ fieldName, fieldValue, styleValue, styleName, classes }: ReactProps) => (
  <div className={classes.orderTitleRow}>
    <div className={clsx(classes.orderCol, classes.smallCol)}>
      <Typography variant="subtitle2" className={classes.orderHeader}
        style={styleName}
      >
        {fieldName}
      </Typography>
    </div>
    <div className={clsx(classes.orderCol, classes.largeCol)}>
      <Typography variant="subtitle2" className={classes.orderText}
        style={styleValue}
      >
        {fieldValue}
      </Typography>
    </div>
  </div>
)

interface ReactProps extends WithStyles<typeof styles> {
  fieldName: String;
  fieldValue: String;
  styleName?: any;
  styleValue?: any;
}

const styles = (theme: Theme) => createStyles({
  orderTitleRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginBottom: '0.25rem',
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    "&:hover": {
      background: theme.palette.mode === 'dark'
        ? alpha(Colors.lightBlue, 0.3)
        : alpha(Colors.lightBlue, 0.3),
    },
    borderRadius: `${BorderRadius}px`,
  },
  orderHeader: {
    lineHeight: '1.25rem',
    textAlign: "end",
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  orderText: {
    lineHeight: '1.25rem',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  orderCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    padding: '0.5rem',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  smallCol: {
    flexBasis: '25%',
    alignItems: 'flex-end',
    borderRadius: `${BorderRadius}px 0px 0px ${BorderRadius}px`,
    // border: `1px solid ${fade(Colors.purple, 0.5)}`,
  },
  largeCol: {
    flexBasis: '75%',
    alignItems: 'flex-start',
    paddingRight: '1rem',
    borderRadius: `0px ${BorderRadius}px ${BorderRadius}px 0px`,
  },
});

export default withStyles(styles)( Row );

