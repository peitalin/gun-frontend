// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, BorderRadius, BorderRadius2x } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  trendFeedLayoutRoot: {
    padding: '1rem',
  },
  trendFeed: {
    display: 'flex',
    width: '100%',
    flexDirection: "row",
    borderRadius: BorderRadius,
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  trendFeedFlex60: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "60%",
    overflow: "hidden",
    borderRadius: BorderRadius2x,
  },
  title: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: '60%',
  },
  tabContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  newsItemRow: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    flexGrow: 1,
    width: '100%',
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: "0px solid transparent",
    // boxShadow: isThemeDark(theme)
    //   ? BoxShadows.shadow1.boxShadow
    //   : 'unset',
  },
  newsItemRowFirst: {
    borderRadius: `${BorderRadius2x}px ${BorderRadius2x}px ${0}px ${0}px`,
    overflow: "hidden",
  },
  newsItemRowLast: {
    // borderRadius: `0px 0px ${BorderRadius2x}px ${BorderRadius2x}px`,
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    overflow: "hidden",
  },
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
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderTop: 'unset',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
    transition:  theme.transitions.create(['background-color'], {
      easing: theme.transitions.easing.easeIn,
      duration: 100,
    }),
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapMediumNavy
        : Colors.slateGreyDark,
      transition:  theme.transitions.create(['background-color'], {
        easing: theme.transitions.easing.easeIn,
        duration: 100,
      }),
    },
    cursor: 'pointer',
  },
})
