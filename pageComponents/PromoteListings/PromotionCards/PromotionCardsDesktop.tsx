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
  UserPrivate,
  PromotedListItemsConnection,
  PromotedListItem,
  Role,
} from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import currency from "currency.js";
import { useSnackbar } from "notistack";




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

  const snackbar = useSnackbar();
  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"))
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  const promotedItemsEdges = (connection?.edges ?? [])
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
          promotedItemsEdges?.map((promotedItemEdge, i) => {
            return (
              <div key={promotedItemEdge?.node?.id + `_${i}`}
                className={xsDown ? classes.productCardWrapperXs : classes.productCardWrapper}
              >
                <div className={clsx(
                  smDown ? classes.flexItemMobile : classes.flexItem,
                  !promotedItemEdge.node?.isAvailableForPurchase && classes.grayedOut,
                  "staggerFadeIn",
                  classes.flexItemHover,
                )}>
                  <ProductCardResponsive
                    product={
                      // random generated products won't have productId
                      // and will have isRandomFiller === true
                      !promotedItemEdge?.node?.isRandomFiller
                        ? promotedItemEdge?.node?.product
                        : undefined
                    }
                    cardsPerRow={cardsPerRow}
                    onClick={async(e) => {
                      if (!promotedItemEdge?.node?.isAvailableForPurchase) {
                        snackbar.enqueueSnackbar(
                          "Slot has yet to be marked for sale by admins.",
                          { variant: "info" }
                        )
                        return
                      }
                      if (
                        !promotedItemEdge?.node?.isAvailableForPurchase
                        && props.user?.userRole !== Role.PLATFORM_ADMIN
                      ) {
                        snackbar.enqueueSnackbar(
                          "Slot reserved for admins",
                          { variant: "info" }
                        )
                        return
                      }
                      props.onClick(e)
                      if (props?.setPosition) {
                        props.setPosition(i);
                      }
                      if (props?.setCurrentPromotedListItem) {
                        props.setCurrentPromotedListItem(promotedItemEdge.node);
                      }
                    }}
                    disableLoadingAnimation={true}
                    previewImageEmptyMessage={
                      // random generated products won't have productId
                      // and will have isRandomFiller === true

                      !promotedItemEdge?.node?.isAvailableForPurchase
                      ? <div className={classes.previewImageMessageText}>
                          {'Slot has not been made available for public sale by admins yet'}
                        </div>
                      : promotedItemEdge?.node?.ownerId === props.user?.id
                        ? <div className={classes.previewImageMessageText}>
                            {"You own this slot"} <br/>
                            {"Add a product"}
                          </div>
                        : <div className={classes.previewImageMessageText}>
                            {"Buy this slot for 2 days"} <br/>
                            {`${c(promotedItemEdge?.node?.reservePrice)}`}
                          </div>
                    }
                  />
                </div>
            </div>
            )
          })
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
  onClick(e?: any): void;
  setCurrentPromotedListItem(p: PromotedListItem): void;
  setPosition(p: number): void;
  user: UserPrivate;
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
  previewImageMessageText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  grayedOut: {
    // filter: "grayscale(1) blur(1px)",
    filter: "grayscale(1)",
  },
});


export default withStyles(styles)( PromotionCardsDesktop );







