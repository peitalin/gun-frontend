import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors, isThemeDark, BorderRadius3x } from "layout/AppTheme";



const SourceSiteChip = (props: ReactProps) => {

  const { classes, sourceSite, style } = props;

  return (
    <div className={classes.sourceSiteChip} style={style}>
      {sourceSite}
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  sourceSite: string
  style?: any
}

const styles = (theme: Theme) => createStyles({
  sourceSiteChip: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "0.25rem 0.75rem",
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    background: isThemeDark(theme)
      ? Colors.uniswapGrey
      : Colors.slateGreyDark,
    // background: Colors.ultramarineBlueDarkest,
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightestBlack,
    fontSize: "0.9rem",
    borderRadius: BorderRadius,
    fontWeight: 600,
  },
});



export default withStyles(styles)(SourceSiteChip)