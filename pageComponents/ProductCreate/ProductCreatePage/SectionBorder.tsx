import React from "react";
import clsx from "clsx";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import Typography from "@mui/material/Typography";
// Icons
import { Colors, BorderRadius2x, BorderRadius, BoxShadows, Gradients } from "layout/AppTheme";
import Link from "next/link";
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



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
  const smDown = useMediaQuery(theme.breakpoints.down('md'));

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
        !smDown
        ? thickPadding ? classes.thickPaddingDesktop : classes.thinPaddingDesktop
        : thickPadding ? classes.thickPaddingMobile : classes.thinPaddingMobile
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
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      // : Gradients.gradientGrey2.background,
      : Colors.cream,
    boxShadow: theme.palette.mode === 'dark'
      ? BoxShadows.shadow4.boxShadow
      : 'unset',
    border: theme.palette.mode === 'dark'
      ? 'unset'
      : `1px solid ${Colors.slateGrey}`,
  },
  thickPaddingDesktop: {
    borderRadius: BorderRadius2x,
    marginBottom: '1rem',
    padding: '2rem',
  },
  thinPaddingDesktop: {
    borderRadius: BorderRadius2x,
    marginBottom: '1rem',
    padding: '0.5rem',
  },
  thickPaddingMobile: {
    // borderRadius: BorderRadius2x,
    padding: '1rem 1rem 1rem 1rem',
    marginBottom: '1rem',
  },
  thinPaddingMobile: {
    padding: '0.5rem 0rem 0.5rem 0rem',
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