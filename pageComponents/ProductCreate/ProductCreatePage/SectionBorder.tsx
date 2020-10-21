import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// Icons
import { Colors, BorderRadius2x, BorderRadius, BoxShadows } from "layout/AppTheme";
import Link from "next/link";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const SectionBorder: React.FC<ReactProps> = ({
  classes,
  disableForm,
  onSubmit,
  type,
  style,
  children
}) => {

  // CSS media queries
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  if (type === "form") {
    return (
      <form
        onSubmit={onSubmit}
        id={'on-submit-form'}
        className={clsx(
          smDown ? classes.formOuterContainerSm : classes.formOuterContainer,
        )}
      >
        {
          disableForm &&
          <div className={classes.coverGrey}/>
        }
        {children}
      </form>
    )
  }

  return (
    <div
      className={clsx(
        smDown ? classes.sectionBorderSm : classes.sectionBorder
      )}
      style={style}
    >
      {children}
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  onSubmit?(e?: React.FormEvent<HTMLFormElement>): void;
  disableForm?: boolean;
  type?: "form" | "div";
  style?: any;
}

const styles = (theme: Theme) => createStyles({
  sectionBorder: {
    // border: `1px solid ${Colors.mediumLightGrey}`,
    borderRadius: BorderRadius2x,
    padding: '2rem',
    marginBottom: '1rem',
    background: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  sectionBorderSm: {
    borderRadius: '0px',
    padding: '1rem',
    marginBottom: '0rem',
    background: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  formOuterContainer: {
    // background: "transparent",
    // border: `1px solid ${Colors.lightGrey}`,
    borderRadius: BorderRadius2x,
    // padding: '2rem',
    position: 'relative', // needed for coverGrey, position: absolute
  },
  formOuterContainerSm: {
    // background: "transparent",
    borderRadius: BorderRadius2x,
    padding: '1rem 0rem 1rem 0rem',
    position: 'relative', // needed for coverGrey, position: absolute
  },
  coverGrey: {
    height: '100%',
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: "#222",
    borderRadius: BorderRadius,
  },
});


export default withStyles(styles)( SectionBorder );