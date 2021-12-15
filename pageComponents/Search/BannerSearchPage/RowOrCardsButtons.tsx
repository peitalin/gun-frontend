import React from "react";
import clsx from "clsx";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius3x, Colors } from "layout/AppTheme";
// Typings
import {
} from "typings/gqlTypes";
import IconButton from "@mui/material/IconButton";
import ListIcon from "@mui/icons-material/List";
import GridIcon from "@mui/icons-material/ViewModule";




const RowOrCardsButtons: React.FC<ReactProps> = (props) => {

  const {
    classes,
    rowMode,
    setRowMode,
    isMobile,
  } = props;


  return (
    <div className={
      isMobile ? classes.rowToggleContainerMobile : classes.rowToggleContainerDesktop
    }>
      <div className={classes.listOrGridContainer}>
        <IconButton
          className={classes.listOrGridButtonLeft}
          onClick={() => setRowMode(false)}
          size={"medium"}
        >
          <GridIcon className={
            !rowMode
              ? classes.listOrGridIconSelected
              : classes.listOrGridIcon
          }/>
        </IconButton>
        <IconButton
          className={classes.listOrGridButtonRight}
          onClick={() => setRowMode(true)}
          size={"medium"}
        >
          <ListIcon className={
            rowMode
              ? classes.listOrGridIconSelected
              : classes.listOrGridIcon
          }/>
        </IconButton>
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  rowMode: boolean
  setRowMode(a: boolean): void
  isMobile: boolean
}


export const styles = (theme: Theme) => createStyles({
  rowToggleContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    zIndex: 1,
  },
  rowToggleContainerDesktop: {
    width: '100%',
    padding: '0rem 1rem',
    // marginBottom: '0.5rem',
    // marginTop: '-1.4rem',
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
  },
  listOrGridContainer: {
    display: "flex",
    flexDirection: "row",
    // width: '100%',
    justifyContent: "flex-end",
  },
  listOrGridButtonLeft: {
    height: 48,
    width: 48,
    borderRadius: `${BorderRadius3x}px 0px 0px ${BorderRadius3x}px`,
    background: theme.palette.mode === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.darkWhite}`,
    "&:hover": {
      background: theme.palette.mode === 'dark'
        ? `${Colors.uniswapMediumNavy}`
        : `${Colors.slateGrey}`,
    },
    borderTop: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderLeft: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  listOrGridButtonRight: {
    height: 48,
    width: 48,
    // borderRadius: BorderRadius3x,
    borderRadius: `0px ${BorderRadius3x}px ${BorderRadius3x}px 0px`,
    background: theme.palette.mode === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.darkWhite}`,
    "&:hover": {
      background: theme.palette.mode === 'dark'
        ? `${Colors.uniswapMediumNavy}`
        : `${Colors.slateGrey}`,
    },
    borderTop: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRight: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  listOrGridIconSelected: {
    borderRadius: BorderRadius3x,
    fill: theme.palette.mode === 'dark'
      ? Colors.purple
      : Colors.gradientUniswapBlue1,
  },
  listOrGridIcon: {
    borderRadius: BorderRadius3x,
  },
});

export default withStyles(styles)( RowOrCardsButtons );



