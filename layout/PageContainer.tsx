import React from 'react';
import clsx from "clsx"
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Components
import {
  NavBarHeight,
  MainBarHeight,
  NewsBarHeight,
  CategoryBarHeight,
} from "layout/NavBarMain/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const PageContainer: React.FC<ReactProps> = (props) => {

  const {
    classes,
    needsNavbarPadding = false,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <div className={clsx(
      classes.pageOuterContainer,
      isMobile && classes.navbarPaddingTopMobile,
      !isMobile && needsNavbarPadding && classes.navbarPaddingTopDesktop,
    )}>
      <div className={classes.pageInnerContainer}>
        {props.children}
      </div>
    </div>
  )
};



interface ReactProps extends WithStyles<typeof styles> {
  needsNavbarPadding?: boolean
}


const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  pageOuterContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: '320px',
    minHeight: `calc(100vh - 140px)`,
    background: theme.palette.mode === "dark"
      ? theme.gradients.gradientUniswapDark.background
      : theme.gradients.gradientGrey3.background,
    // offset 140px for navbar
  },
  navbarPaddingTopDesktop: {
    paddingTop: MainBarHeight,
  },
  navbarPaddingTopMobile: {
    paddingTop: `${MainBarHeight + CategoryBarHeight}px`,
  },
  pageInnerContainer: {
    position: 'relative',
    minHeight: `calc(100vh - ${NavBarHeight}px)`,
    // offset for navbar
    maxWidth: '100%',
    // marginBottom: "4rem",
  },
});

export default withStyles(styles)( PageContainer );


