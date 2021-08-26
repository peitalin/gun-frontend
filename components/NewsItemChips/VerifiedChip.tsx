import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors, isThemeDark, BorderRadius3x } from "layout/AppTheme";
import ShieldIcon from "components/Icons/Shield";



const VerifiedChip = (props: ReactProps) => {

  const { classes, style } = props;

  return (
    <div className={classes.verifiedChip} style={style}>
      <ShieldIcon
        foregroundColor={Colors.cream}
        backgroundColor={Colors.ultramarineBlue}
        height={18}
        width={18}
      />
      {
        props.title &&
        <span className={clsx(classes.title, props.className)}>
          {props.title}
        </span>
      }
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  style?: any
  title?: string
  className?: any;
}

const styles = (theme: Theme) => createStyles({
  verifiedChip: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "0.25rem 0.75rem",
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    background: Colors.ultramarineBlue,
    // background: isThemeDark(theme)
    //   ? Colors.uniswapGrey
    //   : Colors.slateGreyDark,
    // background: Colors.ultramarineBlueDarkest,
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightestBlack,
    fontSize: "0.9rem",
    borderRadius: BorderRadius,
    fontWeight: 600,
  },
  title: {
    marginLeft: "0.25rem",
    fontSize: '0.8rem',
    color: Colors.cream,
  },
});



export default withStyles(styles)(VerifiedChip)