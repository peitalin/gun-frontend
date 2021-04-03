import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import Link from "next/link";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
// import PreviewCardResponsive from "pageComponents/FrontPage/PreviewCardResponsive";
import ProductCardResponsive from "components/ProductCardResponsive";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
import WishlistIcon from "components/WishlistIcon";
import GridPreviewCardLight from "components/GridPreviewCardLight";
// GraphQL Typings
import {
  Product,
  Order_By,
  PromotedListItemsConnection,
} from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import currency from "currency.js";




const PromotionCardsDesktop = (props: ReactProps) => {

  const {
    classes,
    connection,
    cardsPerRow = {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    },
  } = props;

  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"))
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  const promotedItems = (connection?.edges ?? [])
    .map(promotedItem => {
      if (promotedItem?.node?.id?.startsWith("random")) {
        return {
          ...promotedItem,
          node: {
            ...promotedItem?.node,
            product: undefined,
            productId: undefined,
          }
        }
      } else {
        return promotedItem
      }
    })

  return (
    <main className={classes.root}>

      <div className={classes.flexRow}>
        <Typography variant="h3"
          className={clsx(classes.title, classes.maxWidth)}
          gutterBottom
        >
          {props.title || "Featured"}
        </Typography>
      </div>

      <div className={classes.carouselContainer}>
        {
          promotedItems?.map((promotedItem, i) =>
            <div key={promotedItem?.node?.id + `_${i}`}
              className={xsDown ? classes.productCardWrapperXs : classes.productCardWrapper}
            >
              <div className={clsx(
                smDown ? classes.flexItemMobile : classes.flexItem,
                "staggerFadeIn",
                classes.flexItemHover,
              )}>
                <ProductCardResponsive
                  product={promotedItem?.node?.product}
                  cardsPerRow={cardsPerRow}
                  disableLoadingAnimation={true}
                  previewImageEmptyMessage={
                    promotedItem?.node?.product?.id
                      ? <div></div>
                      : <div className={classes.previewImageEmptyMessageText}>
                          {"Buy this slot for 2 days"} <br/>
                          {`${c(promotedItem?.node?.reservePrice ?? 500)}`}
                        </div>
                  }
                />
              </div>
            </div>
          )
        }
      </div>
    </main>
  )
}


/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  connection: PromotedListItemsConnection;
  // sortAscending: boolean; // must be top-level
  // cause Desktop and Mobile share the same queries. Possible clash in variables
  // don't want Desktop's sortAscend: true, while Mobile is false,
  // as both queries will be sent and returned data conflicts
}


/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: '1rem',
  },
  maxWidth: {
    maxWidth: '1160px',
    width: '100%',
  },
  carouselContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '1rem', // balances 1rem margin-right on flexItems
  },
  paddingRight: {
    paddingRight: '1rem',
  },
  productCardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  productCardWrapperXs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingRight: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItemMobile: {
    flexGrow: 1,
    marginBottom: '1rem',
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItem: {
    // marginBottom: '1rem',
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
  previewImageEmptyMessageText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
});


export default withStyles(styles)( PromotionCardsDesktop );







