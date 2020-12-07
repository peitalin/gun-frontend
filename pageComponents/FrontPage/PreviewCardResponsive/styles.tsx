import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Gradient } from "@material-ui/icons";
import { Colors, BorderRadius, Gradients, BoxShadows } from "layout/AppTheme";

export const CARD_MAX_WIDTH_XL = 556;
// Replace hash with html-encoded %23
export const backgroundColor = Colors.uniswapLightNavy;
export const DESCRIPTION_HEIGHT = 112;
// height: "136px", // ensure all cards descriptions are same height


// export const styles = (theme: Theme) => createStyles({
//   rootContainer: {
//     lineHeight: "1rem",
//     position: "relative",
//     display: 'flex',
//     flexDirection: 'column',
//     flexWrap: 'wrap',
//   },
//   card: {
//     borderRadius: `${BorderRadius}px`,
//     backgroundColor: backgroundColor,
//     transition: theme.transitions.create('border', {
//       easing: theme.transitions.easing.easeIn,
//       duration: "200ms",
//     }),
//   },
//   cardRoot: {
//     boxShadow: 'none',
//     height: '100%',
//   },
//   cardMedia: {
//     objectFit: "cover",
//     height: '100%',
//     border: 'none',
//   },
//   cardMediaFit: {
//     objectFit: "cover",
//     height: '100%',
//     border: 'none',
//   },
//   cardActionArea: {
//     height: '100%',
//     width: '100%',
//   },
//   // Need and outer and inner descriptionContainer for wishlist absolutee button
//   descriptionContainerOuter: {
//     position: 'relative', // for wishlist Button position: absolute
//     width: '100%',
//     borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
//   },
//   descriptionContainer: {
//     marginTop: "0.5rem",
//     paddingTop: "0.25rem",
//     margin: '0.5rem',
//     height: DESCRIPTION_HEIGHT, // ensure all cards descriptions are same height
//     position: 'relative', // for wishlist Button position: absolute

//   },
//   category: {
//     textTransform: "uppercase",
//     fontWeight: 500,
//     color: Colors.darkGrey,
//     marginBottom: '0.4rem',
//     lineHeight: '1rem',
//   },
//   title: {
//     fontWeight: 600,
//     color: Colors.charcoal,
//     marginBottom: '0.4rem',
//     lineHeight: '1.25rem',
//     overflowY: 'hidden',
//     minHeight: '2.5rem',
//     maxHeight: '2.5rem',
//     // fix retard long titles
//     textOverflow: 'ellipsis',
//     // whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     width: 'calc(100% - 0.5rem)', // must set width for textOverflow
//   },
//   tagline: {
//     fontSize: '.875rem',
//     color: "#aaa",
//     marginBottom: '0.4rem',
//     lineHeight: '1rem',
//   },
//   priceAbsoluteBottom: {
//     bottom: '0.25rem',
//   },
//   flexRow100Width: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//   },
//   // loading
//   loadingPrice: {
//     color: Colors.grey,
//     backgroundColor: Colors.grey,
//     borderRadius: '1rem',
//   },
//   marginBottom: {
//     marginBottom: '1rem'
//   },
// });

export const styles = (theme: Theme) => createStyles({
  rootContainer: {
    lineHeight: "1rem",
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    boxShadow: BoxShadows.shadow1.boxShadow,
    "&:hover":{
      // boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
      boxShadow: "0 2px 4px 0 rgba(0,0,0,.2), 0 7px 9px 1px rgba(0,0,0,.11)",
      transition: theme.transitions.create('border-shadow', {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    },
    borderRadius: BorderRadius,
  },
  card: {
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
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
    borderRadius: `0px 0px ${BorderRadius}px ${BorderRadius}px`,
    background: Colors.uniswapDarkNavy,
    // background: Gradients.gradientUniswapDark.color1,
  },
  descriptionContainer: {
    marginTop: "0.5rem",
    paddingTop: "0.25rem",
    margin: '0.5rem',
    height: DESCRIPTION_HEIGHT, // ensure all cards descriptions are same height
    // cursor: 'pointer',
    position: 'relative', // for wishlist Button position: absolute

  },
  category: {
    textTransform: "uppercase",
    fontWeight: 500,
    color: Colors.uniswapLighterGrey,
    marginBottom: '0.4rem',
    lineHeight: '1rem',
  },
  title: {
    fontWeight: 600,
    color: Colors.uniswapLightestGrey,
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
  // loading
  loadingPrice: {
    color: Colors.grey,
    backgroundColor: Colors.grey,
    borderRadius: '1rem',
  },
  createdAt: {
    color: Colors.uniswapGrey,
  },
  marginBottom: {
    marginBottom: '1rem'
  },
});