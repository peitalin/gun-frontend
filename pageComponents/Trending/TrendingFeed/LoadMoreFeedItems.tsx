import React from 'react';
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, isThemeDark, BorderRadius2x } from "layout/AppTheme";


export const LoadMoreFeedItems: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props

  return (
    <div className={classes.loadMore}
      onClick={
        props.tab === 0
          ? props.fetchMoreHot
          : props.fetchMoreNew
      }
    >
      {
        props.loading
        ? "loading more..."
        : "load more"
      }
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  tab: number
  loading: boolean
  fetchMoreHot?(): void
  fetchMoreNew?(): void
}

const styles = (theme: Theme) => createStyles({
  loadMore: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: "1rem",
    fontWeight: 500,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    borderRadius: `0px 0px ${BorderRadius2x}px ${BorderRadius2x}px`,
    padding: '1rem',
    width: '100%',
    // border: isThemeDark(theme)
    //   ? `1px solid ${Colors.uniswapLightNavy}`
    //   : `1px solid ${Colors.slateGreyDarker}`,
    borderTop: "0px solid transparent",
    borderLeft: "0px solid transparent",
    borderRight: "0px solid transparent",
    borderBottom: "0px solid transparent",
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    transition:  theme.transitions.create(['background-color'], {
      easing: theme.transitions.easing.easeIn,
      duration: 100,
    }),
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapMediumNavy
        : Colors.slateGrey,
      transition:  theme.transitions.create(['background-color'], {
        easing: theme.transitions.easing.easeIn,
        duration: 100,
      }),
    },
    cursor: 'pointer',
  },
  loadingPlaceholder: {
    height: '50vh',
    borderRadius: `${BorderRadius2x}px`,
    padding: '1rem',
    width: '100%',
    boxShadow: BoxShadows.shadow5.boxShadow,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
  },
})


export default withStyles(styles)( LoadMoreFeedItems );