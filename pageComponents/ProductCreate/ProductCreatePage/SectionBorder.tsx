import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// Icons
import { Colors, BorderRadius2x, BorderRadius, BoxShadows, Gradients } from "layout/AppTheme";
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
  thickPadding,
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
        classes.sectionBorder,
        thickPadding ? classes.thickPaddingDesktop : classes.thinPaddingDesktop,
        smDown ? classes.sectionBorderMobile : classes.sectionBorderDesktop
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
  thickPadding?: boolean
}

const styles = (theme: Theme) => createStyles({
  sectionBorder: {
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      // : Gradients.gradientGrey2.background,
      : Colors.cream,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow4.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
      ? 'unset'
      : `1px solid ${Colors.slateGrey}`,
  },
  sectionBorderDesktop: {
    borderRadius: BorderRadius2x,
    marginBottom: '1rem',
  },
  thickPaddingDesktop: {
    padding: '2rem',
  },
  thinPaddingDesktop: {
    padding: '0.5rem',
  },
  sectionBorderMobile: {
    borderRadius: BorderRadius2x,
    padding: '1rem 0.75rem 1rem 0.75rem',
    marginBottom: '1rem',
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