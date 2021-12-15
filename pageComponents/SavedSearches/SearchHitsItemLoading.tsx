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
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// components
import ProductPreviewThumb from "components/ProductPreviewThumb";
// typings
import {
  SEARCH_HIT_ITEM_HEIGHT
} from "./SearchHitsItem"
// css
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSnackbar } from "notistack"




const SearchHitsItemLoading = (props: SearchHitsItemLoadingProps) => {

  const {
    classes,
  } = props

  const snackbar = useSnackbar()

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));


  return (
    <div className={clsx(
      mdDown
        ? classes.searchHitsContainerMobile
        : classes.searchHitsContainerDesktop,
    )}>

      {
        <div className={clsx(
          classes.link,
          "pulse",
        )}>
          <ProductPreviewThumb
            loadingMessage={"loading"}
            previewItem={undefined}
            width={90}
            height={60}
          />
        </div>
      }


      <div className={clsx(
        mdDown ? classes.savedSearchItemMobileFlexWrap : classes.savedSearchItemDesktop,
      )}>
        <div className={clsx(
          classes.flexItem,
          classes.productTitleColumn
        )}>
          {/* <span className={classes.boldText}>loading...</span> */}
          {/* <div className={classes.link} >
            <span className={classes.italicText}>loading</span>
          </div> */}
        </div>
        <div className={classes.flexItem}>
        </div>
      </div>

    </div>
  )
}



interface SearchHitsItemLoadingProps extends WithStyles<typeof styles> {
}



const styles = (theme: Theme) => createStyles({
  searchHitsContainerDesktop: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    borderRadius: BorderRadius,
    padding: '0.5rem 1rem 0.5rem 0.5rem',
    marginBottom: '0.5rem',
    height: SEARCH_HIT_ITEM_HEIGHT,
    // backgroundColor: isThemeDark(theme)
    //   ? Colors.uniswapMediumNavy
    //   : Colors.slateGrey,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.cream,
  },
  searchHitsContainerMobile: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    borderRadius: BorderRadius,
    padding: '0.5rem 1rem 0.5rem 0.5rem',
    marginBottom: '0.5rem',
    height: 158,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.cream,
  },
  savedSearchItemDesktop: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '0.5rem',
    flexWrap: "wrap",
    width: '100%',
  },
  savedSearchItemMobileFlexWrap: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 80,
    marginRight: '0.5rem',
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  boldText: {
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  productTitleColumn: {
    // width: 150,
    width: '100%',
    minWidth: 200,
    marginBottom: '0.5rem',
  },
  flexItem: {
    flexBasis: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    wordBreak: "break-word",
    minWidth: 200,
  },
  italicText: {
    fontStyle: 'italic',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  fieldText: {
    minWidth: 70,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  link: {
    marginRight: "0.5rem",
    textAlign: "start",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      color: Colors.ultramarineBlue,
    },
  },
});


export default withStyles(styles)( SearchHitsItemLoading );
