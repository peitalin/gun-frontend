import React from "react";
import { Colors, BorderRadius2x, BoxShadows } from "layout/AppTheme";
// Graphql
import { Store, StorePrivate, UserPrivate, ID } from "typings/gqlTypes";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import clsx from "clsx";
// Material UI
import Typography from "@mui/material/Typography";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
// media query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const StoreOrLoginContainer: React.FC<StoreProps> = (props) => {

  const { classes, children } = props;
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('md'));

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
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.mode === 'dark'
      ? BoxShadows.shadow4.boxShadow
      : 'unset',
    border: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapMediumNavy}`
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
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderTop: theme.palette.mode === 'dark'
      ? `0px solid ${Colors.uniswapMediumNavy}`
      : `0px solid ${Colors.slateGrey}`,
    // margin: '1rem 0rem 0rem 0rem',
    padding: '1rem',
    borderRadius: '0px',
  },
});

export default withStyles(styles)( StoreOrLoginContainer );
