// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";


export const styles = (theme: Theme) => createStyles({
  root: {
    margin: "0rem 0rem",
    // paddingRight: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    // paddingLeft: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    marginBottom: '1rem',
    width: '100%',
    position: "relative",
  },
  flexRowLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: '0.5rem', // subtract 1rem for carousel buttons: 1rem on both sides
    fontWeight: 600,
    marginBottom: "0.5rem",
    marginTop: "1rem",
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItem: {
    borderRadius: `${BorderRadius}px`,
    position: 'relative',
  },
  flexItemHoverNull: {
    "&:hover": {
      borderBottom: `2px solid ${Colors.lightGrey}`,
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  paginateButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minWidth: {
    minWidth: 'calc(100vw - 2rem)',
  },
  divider: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  // dividerFeaturedProduct: {
  //   border: `2px solid ${Colors.lightGrey}`,
  // },
  sellAllIcon: {
    width: '1rem',
  },
  seeAllLinkContainer: {
    marginRight: '0.25rem',
    marginTop: '0.25rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  seeAllLinkBorder: {
    fontSize: '0.8rem',
    color: Colors.blue,
    // borderBottom: `2px solid ${Colors.charcoal}`,
    borderBottom: isThemeDark(theme)
      ? `2px solid ${Colors.uniswapMediumNavy}`
      : `2px solid ${Colors.slateGrey}`,
    // borderRadius: '2px',
    paddingLeft: '0.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: theme.transitions.create(['border', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '800ms',
    }),
    "&:hover": {
      color: Colors.secondaryBright,
      borderBottom: `2px solid ${Colors.secondaryBright}`,
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
});