import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Gradient } from "@mui/icons-material";
import { Colors, BorderRadius, BorderRadius2x, BoxShadows } from "layout/AppTheme";

export const DESCRIPTION_HEIGHT = 112;
// height: "136px", // ensure all cards descriptions are same height


export const styles = (theme: Theme) => createStyles({
  rootContainer: {
    lineHeight: "1rem",
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    boxShadow: theme.palette.mode === 'dark'
      ? BoxShadows.shadow3.boxShadow
      : 'unset',
    borderRadius: BorderRadius,
    border: theme.palette.mode === 'dark'
      ? 'unset'
      : `1px solid ${theme.colors.slateGrey}`,
  },
  card: {
    borderRadius: `${BorderRadius}px ${BorderRadius}px 2px 2px `,
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.colors.uniswapDarkNavy
      : theme.colors.slateGrey,
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
    backgroundColor: theme.palette.mode === 'dark'
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
  caliberText: {
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: '0.9rem',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    lineHeight: '1rem',
  },
  actionTag: {
    position: 'absolute',
    bottom: '0.25rem',
    right: '0rem',
    border: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapLighterGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    padding: '0.2rem 0.3rem',
  },
  actionType: {
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: '0.825rem',
    color: theme.palette.mode === 'dark'
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
    color: theme.palette.mode === 'dark'
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
  height100: {
    height: '100%',
  },
});