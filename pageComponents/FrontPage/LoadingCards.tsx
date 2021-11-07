import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import {
  NewsItem,
} from "typings/gqlTypes"
import clsx from "clsx";
import NewsItemCardResponsive from "components/NewsItemCardResponsive";
import Hidden from 'components/HiddenFix';



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
      [...Array(count).keys()].map(i =>
        <div className={classes.loadingProductCardRoot} key={i}>
          {/* Desktop Loading Cards */}
          <Hidden smDown implementation="css">
            <div className={classes.productImage}>
              <div className={clsx(
                classes.flexItem,
                classes.flexItemHover,
              )}>
                <NewsItemCardResponsive
                  loading={true}
                  newsItem={{ product: productLoading } as any}
                  cardsPerRow={cardsPerRow}
                />
              </div>
            </div>
          </Hidden>
          {/* Mobile Loading Cards */}
          <Hidden mdUp implementation="css">
            <div className={
              !flexWrapItems
                ? classes.descriptionLoadingNoFlexWrap
                : classes.descriptionLoading
            }>
              <NewsItemCardResponsive
                loading={true}
                newsItem={{ product: productLoading } as any}
                cardsPerRow={cardsPerRow}
                xsCardRow={props.xsCardRow}
              />
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
  alignCenter?: boolean;
  flexWrapItems?: boolean;
  xsCardRow?: boolean;
}

/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  rootFlexStart: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rootNoFlexWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rootFlexCenter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: '1rem',
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
  },
  descriptionLoading: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0rem',
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
    paddingBottom: '1rem',
    paddingTop: 0,
  },
});


export default withStyles(styles)( LoadingCards );







