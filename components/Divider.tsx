import React from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors, fontFam } from "layout/AppTheme";


const Divider = (props: ReactProps) => {
  const { classes } = props;
  return (
    <div className={classes.dividerContainer} style={props.style}>
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
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    height: '1px',
    width: '100%'
  },
  dividerText: {
    margin: '0rem 1rem',
    color: '#aaa',
    fontWeight: 400,
    fontSize: '0.9rem',
    fontStyle: "italic",
    fontFamily: fontFam,
  },
})


export default withStyles(styles)( Divider );

