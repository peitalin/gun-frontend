import React from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
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
  },
  dividerLine: {
    flexGrow: 1,
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapMediumGrey}`
      : `1px solid ${Colors.uniswapLightestGrey}`,
    height: '1px',
  },
  dividerText: {
    margin: '0rem 0.5rem',
    color: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapMediumGrey}`
      : `1px solid ${Colors.uniswapLightestGrey}`,
    fontWeight: 400,
    fontSize: '0.875rem',
  },
})


export default withStyles(styles)( Or );

