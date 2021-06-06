import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Gradient } from "@material-ui/icons";
import { Colors, BorderRadius, BorderRadius2x, BoxShadows } from "layout/AppTheme";

export const CARD_MAX_WIDTH_XL = 556;
// Replace hash with html-encoded %23
export const DESCRIPTION_HEIGHT = 112;
// height: "136px", // ensure all cards descriptions are same height


export const styles = (theme: Theme) => createStyles({
  rootContainer: {
    lineHeight: "1rem",
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow3.boxShadow
      : 'unset',
    borderRadius: BorderRadius,
    border: theme.palette.type === 'dark'
      ? 'unset'
      : `1px solid ${theme.colors.slateGrey}`,
  },
  card: {
    borderRadius: `${BorderRadius}px ${BorderRadius}px 2px 2px `,
    backgroundColor: theme.palette.type === 'dark'
      ? theme.colors.uniswapDarkNavy
      : theme.colors.slateGrey,
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
  },
  cardMediaFit: {
    objectFit: "cover",
    height: '100%',
  },
  cardActionArea: {
    height: '100%',
    width: '100%',
  },
  // Need and outer and inner descriptionContainer for watchList absolutee button
  descriptionContainerOuter: {
    position: 'relative', // for watchList Button position: absolute
    cursor: "pointer",
    width: '100%',
    borderRadius: `2px 2px ${BorderRadius}px ${BorderRadius}px`,
    backgroundColor: theme.palette.type === 'dark'
      ? theme.colors.uniswapDarkNavy
      : theme.colors.cream,
  },
  descriptionContainer: {
    // marginTop: "0.5rem",
    margin: '0.75rem',
    height: DESCRIPTION_HEIGHT, // ensure all cards descriptions are same height
    // cursor: 'pointer',
    position: 'relative', // for watchList Button position: absolute
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
  },
  descriptionDetailsFlexItem: {
    bottom: '0.25rem',
  },
  priceDetailsFlexItem: {
    bottom: '0.25rem',
  },
  title: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    overflowY: 'hidden',
    maxHeight: '2.75rem',
    fontSize: '1rem',
    lineHeight: '1.25rem',
  },
  makeModel: {
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: '0.9rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    lineHeight: '1rem',
  },
  actionTag: {
    position: 'absolute',
    bottom: '0.25rem',
    right: '0rem',
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLighterGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    padding: '0.2rem 0.3rem',
  },
  actionType: {
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: '0.825rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
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
    backgroundColor: Colors.grey,
    color: theme.palette.type === 'dark'
      ? theme.colors.uniswapGrey
      : theme.colors.uniswapDarkNavy,
    borderRadius: '1rem',
  },
  createdAt: {
    color: Colors.uniswapGrey,
  },
  marginBottom: {
    marginBottom: '1rem'
  },
  squishLetters: {
    letterSpacing: '-0.25px',
  },
});