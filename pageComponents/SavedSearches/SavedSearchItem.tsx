import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
  Gradients,
  BorderRadius,
  BorderRadius2x,
  BorderRadius4x,
  BoxShadows,
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// components
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from "@material-ui/icons/Clear";
import Loading from "components/Loading";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const SavedSearchItem = (props: SavedSearchItemProps) => {

  const {
    classes,
    isHighlighted,
    // searchTerm,
    categorySlug,
    dealerState,
    make,
    model,
    caliber,
  } = props

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={clsx(
      mdDown
        ? classes.savedSearchContainerMobile
        : classes.savedSearchContainerDesktop,
      isHighlighted
        ? classes.savedSearchBorderHighlight
        : classes.savedSearchBorder,
    )}>

      {/* <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Search Term</span>
        <span className={classes.italicText}>"{searchTerm}"</span>
      </div> */}

      {/* <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Category</span>
        <span className={classes.italicText}>{categorySlug ?? "all"}</span>
      </div> */}

      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Make</span>
        <span className={classes.italicText}>{make ?? "-"}</span>
      </div>

      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Model</span>
        <span className={classes.italicText}>{model ?? "-"}</span>
      </div>

      <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Caliber</span>
        <span className={classes.italicText}>{caliber ?? "-"}</span>
      </div>

      {/* <div className={
        mdDown ? classes.savedSearchItemMobile : classes.savedSearchItemDesktop
      }>
        <span className={classes.boldText}>Dealer State</span>
        <span className={classes.italicText}>{dealerState ?? "all"}</span>
      </div> */}


      <div className={classes.savedSearchItem5}>
        {
          props.onClickDelete &&
          <IconButton
            className={classes.closeIcon}
            onClick={props.onClickDelete}
            size={"small"}
            disabled={props.loading}
          >
            {
              props.loading
              ? <Loading/>
              : <ClearIcon/>
            }
          </IconButton>
        }
      </div>
    </div>
  )
}



interface SavedSearchItemProps extends WithStyles<typeof styles> {
  onClickDelete(): void;
  isHighlighted: boolean;
  // searchTerm: string
  categorySlug?: string
  dealerState?: string
  make?: string
  model?: string
  caliber?: string
  disabled?: boolean;
  loading: boolean;
}



const styles = (theme: Theme) => createStyles({
  savedSearchContainerDesktop: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    borderRadius: BorderRadius2x,
    padding: '0.5rem 1rem',
    marginTop: '0.5rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
  },
  savedSearchContainerMobile: {
    position: "relative",
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    borderRadius: BorderRadius2x,
    padding: '0.5rem 2rem 0.5rem 1rem',
    marginTop: '0.5rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
  },
  savedSearchBorder: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapMediumGrey}`
      : `1px solid ${Colors.slateGreyDarkest}`,
  },
  savedSearchBorderHighlight: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.ultramarineBlue}`,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow4.boxShadow,
  },
  savedSearchItemDesktop: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 100,
    minHeight: 45,
    marginRight: '0.5rem',
  },
  savedSearchItemMobile: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minWidth: 80,
    minHeight: 45,
    marginRight: '0.5rem',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  savedSearchItem5: {
    position: 'absolute',
    top: 'calc(50% - 16px)', // iconButton height is 32px, divide by 2
    right: '-1rem',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  boldText: {
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  italicText: {
    fontStyle: 'italic',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  closeIcon: {
    width: 32,
    height: 32,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? Colors.uniswapMediumGrey
        : Colors.slateGreyDarkest,
    },
  },
});


export default withStyles(styles)( SavedSearchItem );
