import React from "react";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
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
    borderBottom: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
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

