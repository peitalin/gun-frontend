import React from "react";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { Colors } from "layout/AppTheme";


const Or = (props: ReactProps) => {
  const { classes } = props;
  return (
    <div className={classes.dividerContainer} style={props.style}>
      <div className={classes.dividerLine} style={props.lineStyle}>
      </div>
      <div className={classes.dividerText} style={props.fontStyle}>
        { props.title ? props.title : 'or' }
      </div>
      <div className={classes.dividerLine} style={props.lineStyle}>
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  fontStyle?: any;
  lineStyle?: any;
  title?: string;
}


const styles = (theme: Theme) => createStyles({
  dividerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0rem 1rem',
  },
  dividerLine: {
    flexGrow: 1,
    borderBottom: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    height: '1px',
  },
  dividerText: {
    margin: '0rem 0.5rem',
    color: theme.palette.mode === 'dark'
      ? `${Colors.uniswapLightestGrey}`
      : `${Colors.slateGreyDarkest}`,
    fontWeight: 400,
    fontSize: '0.875rem',
  },
})


export default withStyles(styles)( Or );

