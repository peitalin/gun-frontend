import React from "react";
import { Colors, BorderRadius2x, BoxShadows } from "layout/AppTheme";
// Graphql
import { Store, StorePrivate, UserPrivate, ID } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const StoreOrLoginContainer: React.FC<StoreProps> = (props) => {

  const { classes, children } = props;
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={clsx(
      classes.maxWidth,
      !smDown && classes.pagePadding1,
    )}>
      <div className={clsx(
        classes.storeOrLoginInnerContainer,
        smDown ? classes.pagePaddingSm : classes.pagePadding2
      )}>
        {children}
      </div>
    </div>
  )
}

type StoreProps = ReactProps;

interface ReactProps extends WithStyles<typeof styles> {
}


const styles = (theme: Theme) => createStyles({
  storeOrLoginInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: "wrap",
    borderRadius: BorderRadius2x,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow4.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
      ? 'unset'
      : `1px solid ${Colors.slateGrey}`,
  },
  maxWidth: {
    width: '100%',
  },
  pagePadding1: {
    marginBottom: '1rem',
  },
  pagePadding2: {
    padding: '1rem',
  },
  pagePaddingSm: {
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? "unset"
      : `1px solid ${Colors.slateGreyDark}`,
    margin: '1rem 0rem 0rem 0rem',
    padding: '1rem',
    borderRadius: '0px',
  },
});

export default withStyles(styles)( StoreOrLoginContainer );
