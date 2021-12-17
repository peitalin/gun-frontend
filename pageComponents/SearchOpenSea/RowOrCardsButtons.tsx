import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius3x, BorderRadius4x, Colors } from "layout/AppTheme";
// Typings
import {
} from "typings/gqlTypes";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";
import GridIcon from "@material-ui/icons/ViewModule";




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
    // position: 'absolute',
    // top: '0.5rem',
    // right: '0.5rem',
    // zIndex: 1,
  },
  rowToggleContainerDesktop: {
    // width: '100%',
    padding: '0rem 0.5rem',
    // marginBottom: '0.5rem',
    // marginTop: '-1.4rem',
    // position: 'absolute',
    // top: '0.5rem',
    // right: '0.5rem',
  },
  listOrGridContainer: {
    display: "flex",
    flexDirection: "row",
    // width: '100%',
    // justifyContent: "flex-end",
  },
  listOrGridButtonLeft: {
    height: 50,
    width: 50,
    borderRadius: `${BorderRadius4x}px 0px 0px ${BorderRadius4x}px`,
    background: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.darkWhite}`,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? `${Colors.uniswapMediumNavy}`
        : `${Colors.slateGrey}`,
    },
    borderTop: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderLeft: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  listOrGridButtonRight: {
    height: 50,
    width: 50,
    // borderRadius: BorderRadius4x,
    borderRadius: `0px ${BorderRadius4x}px ${BorderRadius4x}px 0px`,
    background: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.darkWhite}`,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? `${Colors.uniswapMediumNavy}`
        : `${Colors.slateGrey}`,
    },
    borderTop: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRight: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  listOrGridIconSelected: {
    borderRadius: BorderRadius4x,
    fill: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.gradientUniswapBlue1,
  },
  listOrGridIcon: {
    borderRadius: BorderRadius4x,
  },
});

export default withStyles(styles)( RowOrCardsButtons );



