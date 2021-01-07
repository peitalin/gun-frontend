import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import PreviewCardResponsive from "./PreviewCardResponsive";
import Hidden from 'components/HiddenFix';
import DescriptionLoading from "pageComponents/FrontPage/PreviewCardResponsive/DescriptionLoading";



const LoadingCards = (props: ReactProps) => {

  const {
    classes,
    count = 8,
    cardsPerRow = {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    },
    xsCardRow = true,
    flexWrapItems = true,
    alignCenter = false,
  } = props;

  const productLoading = {
    name: "",
    tagline: "",
  }

  return (
    <div className={
      !flexWrapItems
        ? classes.rootNoFlexWrap
        : alignCenter
          ? classes.rootFlexCenter
          : classes.rootFlexStart
    }>
    {
      [...Array(count).keys()]
      .map(i =>
        <div className={classes.loadingProductCardRoot} key={i}>
          {/* Desktop Loading Cards */}
          <Hidden xsDown implementation="css">
            <div className={classes.productImage}>
              <div className={clsx(
                classes.flexItem,
                classes.flexItemHover,
              )}>
                <PreviewCardResponsive
                  product={productLoading as any}
                  cardsPerRow={cardsPerRow}
                />
              </div>
            </div>
          </Hidden>
          {/* Mobile Loading Cards */}
          <Hidden smUp implementation="css">
            <div className={
              !flexWrapItems
                ? classes.descriptionLoadingNoFlexWrap
                : classes.descriptionLoading
            }>
              {
                xsCardRow
                ? <DescriptionLoading
                    isMobile
                    style={{
                      width: `calc(${100}vw - ${1+1}rem)`,
                      maxWidth: 415, // Mobile size loading placeholders
                    }}
                    height={'100%'}
                  />
                : <PreviewCardResponsive
                    product={productLoading as any}
                    cardsPerRow={cardsPerRow}
                    xsCardRow={xsCardRow}
                  />
              }
            </div>
          </Hidden>
        </div>
      )
    }
    </div>
  )
}



/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  count?: number;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  xsCardRow?: boolean;
  alignCenter?: boolean;
  flexWrapItems?: boolean;
}

/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  rootFlexStart: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '4px',
  },
  rootNoFlexWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '4px',
  },
  rootFlexCenter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px',
  },
  paddingRight: {
    paddingRight: '1rem',
  },
  productImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '1rem',
  },
  flexItem: {
    width: '100%',
    // borderBottom: "1px solid #f7f7f7",
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItemHover: {
    "&:hover": {
      // borderBottom: `1px solid ${Colors.purple}`, // purple
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  loadingProductCardRoot: {
    marginBottom: '1rem',
  },
  descriptionLoading: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    paddingTop: 0,
  },
  descriptionLoadingNoFlexWrap: {
    // difference is marginsLeft and right 0.5rem
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0.5rem',
    marginLeft: '0.5rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    paddingTop: 0,
  },
});


export default withStyles(styles)( LoadingCards );







