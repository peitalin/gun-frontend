
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import { isThemeDark, Colors } from "layout/AppTheme";


const FilterMobileIcon: React.FC<ReactProps> = (props) => {

  const {
    classes,
    openDrawer,
    setOpenDrawer,
  } = props;

  return (
    <IconButton
      className={clsx(
        classes.filterMobileIconRoot,
        openDrawer ? "hidden" : "fadeInFast",
      )}
      onClick={() => setOpenDrawer(s => !s)}
    >
      <FilterListIcon className={classes.filterIcon}/>
    </IconButton>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  openDrawer: boolean
  setOpenDrawer(b: any): void
}


export const styles = (theme: Theme) => createStyles({
  filterMobileIconRoot: {
    position: "fixed",
    bottom: '3.5rem',
    left: '0.5rem',
    zIndex: 2,
    width: 48,
    height: 48,
    border: isThemeDark(theme)
      ? `2px solid ${Colors.purple}`
      : `2px solid ${Colors.blue}`,
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapNavy
        : Colors.slateGrey,
    },
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
  },
  filterIcon: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    height: '1.5rem',
    weight: '1.5rem',
  },
});

export default withStyles(styles)( FilterMobileIcon );



