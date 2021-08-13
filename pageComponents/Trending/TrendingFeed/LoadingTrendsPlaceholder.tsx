import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, BorderRadius2x } from "layout/AppTheme";


export const LoadingTrendsPlaceholder: React.FC<ReactProps> = (props) => {

  const {
    classes,
    show,
  } = props

  if (show) {
    return <div className={classes.loadingPlaceholder}/>
  } else {
    return <div className={classes.hiddenPlaceholder}/>
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  show: boolean
}

const styles = (theme: Theme) => createStyles({
  loadingPlaceholder: {
    height: '100%',
    minHeight: 280,
    width: '100%',
    borderRadius: `${BorderRadius2x}px ${BorderRadius2x}px 0px 0px`,
    padding: '1rem',
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
  },
  hiddenPlaceholder: {
    display: 'hidden',
  },
})


export default withStyles(styles)( LoadingTrendsPlaceholder );