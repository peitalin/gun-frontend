import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";


export const CARD_MAX_WIDTH_XL = 420;
export const CARD_MAX_HEIGHT_XL = 280;

export const CARD_MAX_WIDTH = 270;
export const CARD_MAX_HEIGHT = 180;
// export const CARD_MAX_WIDTH = 255;
// export const CARD_MAX_HEIGHT = 170;
// export const CARD_MAX_WIDTH = 240;
// export const CARD_MAX_HEIGHT = 160;

// export const CARD_MIN_WIDTH = 210;
// export const CARD_MIN_HEIGHT = 140;
export const CARD_MIN_WIDTH = 200;
export const CARD_MIN_HEIGHT = 133.333;
// Replace hash with html-encoded %23
export const CARD_CORNER_RADIUS = 4
export const backgroundColor = Colors.cream;


export const styles = (theme: Theme) => createStyles({
  rootContainer: {
    maxWidth: CARD_MAX_WIDTH,
    lineHeight: "1rem",
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    // boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)',
    // "&:hover":{
      // boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
      // boxShadow: "0 2px 4px 0 rgba(0,0,0,.2), 0 7px 9px 1px rgba(0,0,0,.11)",
      // transition: theme.transitions.create('border-shadow', {
      //   easing: theme.transitions.easing.easeIn,
      //   duration: "100ms",
      // }),
    // },
  },
  card: {
    // maxWidth: CARD_MAX_WIDTH,
    // width: `calc(${VW}vw)`,
    // minWidth: CARD_MIN_WIDTH,
    // borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    borderRadius: `${CARD_CORNER_RADIUS}px`,
    backgroundColor: backgroundColor,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  cardRoot: {
    boxShadow: 'none',
    height: '100%',
    // backgroundColor: backgroundColor,
  },
  cardMedia: {
    objectFit: "cover",
    height: '100%',
    border: 'none',
  },
  cardMediaFit: {
    objectFit: "cover",
    height: '100%',
    border: 'none',
  },
  cardActionArea: {
    height: '100%',
    width: '100%',
  },
  // Need and outer and inner descriptionContainer for wishlist absolutee button
  descriptionContainerOuter: {
    position: 'relative', // for wishlist Button position: absolute
    width: '100%',
  },
  descriptionContainer: {
    maxWidth: `calc(${CARD_MAX_WIDTH}px - 0rem)`,
    minWidth: `calc(${CARD_MIN_WIDTH}px - 2rem)`,
    marginTop: "0.5rem",
    paddingTop: "0.25rem",
    margin: '0.5rem',
    minHeight: "136px", // ensure all cards are same height
    height: "136px", // ensure all cards are same height
    cursor: 'pointer',
    position: 'relative', // for wishlist Button position: absolute
  },
  category: {
    textTransform: "uppercase",
    fontWeight: 500,
    color: Colors.darkGrey,
    marginBottom: '0.4rem',
    lineHeight: '1rem',
  },
  title: {
    fontWeight: 600,
    color: Colors.charcoal,
    marginBottom: '0.4rem',
    lineHeight: '1.25rem',
    overflowY: 'hidden',
    minHeight: '2.5rem',
    maxHeight: '2.5rem',
  },
  tagline: {
    fontSize: '.875rem',
    color: "#aaa",
    marginBottom: '0.4rem',
    lineHeight: '1rem',
  },
  priceAbsoluteBottom: {
    bottom: '0.25rem',
  },
  flexRow100Width: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  createdAt: {
    color: Colors.purple,
  },
});