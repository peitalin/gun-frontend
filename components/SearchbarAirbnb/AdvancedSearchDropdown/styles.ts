
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  BorderRadius4x,
  BorderRadius3x,
  BorderRadius2x,
  BorderRadius,
  Gradients,
  BoxShadows,
  isThemeDark
} from "layout/AppTheme";




export const styles = (theme: Theme) => createStyles({
  innerColumn: {
    display: "flex",
    padding: '0.5rem',
    width: '100%',
    minWidth: 240,
    marginBottom: '1rem',
  },
  innerColumnFlexCol: {
    flexDirection: "column",
  },
  innerColumnFlexRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonRoot: {
    margin: '0.15rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    // flexGrow: 1,
    flexBasis: '48%',
    "&:hover": {
      "& > span": {
        color: theme.palette.type === 'dark'
          ? Colors.purple
          : Colors.black,
      },
      // border: theme.palette.type === 'dark'
      //   ? `1px solid ${Colors.purple}`
      //   : `1px solid ${Colors.black}`,
      // transition: theme.transitions.create(['color', 'border', 'background'], {
      //   easing: theme.transitions.easing.easeInOut,
      //   duration: "200ms",
      // }),
    }
  },
  activeButton: {
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.black}`,
  },
  buttonSelected: {
    background: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.secondary,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.blue}`,
    color: Colors.cream,
    "& > span": {
      color: Colors.cream,
    },
    "&:hover": {
      "& > span": {
        color: Colors.cream,
      },
      background: theme.palette.type === 'dark'
        ? Colors.purple
        : Colors.blue,
      border: theme.palette.type === 'dark'
        ? `1px solid ${Colors.purple}`
        : `1px solid ${Colors.blue}`,
      // transition: theme.transitions.create(['color', 'border', 'background'], {
      //   easing: theme.transitions.easing.easeInOut,
      //   duration: "200ms",
      // }),
      backgroundPosition: '-75px',
    }
  },
});
