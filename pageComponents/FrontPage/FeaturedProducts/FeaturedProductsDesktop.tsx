import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { styles } from "./stylesDesktop";
// Material UI
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
// Components
import ProductCardResponsive from "components/ProductCardResponsive";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
// GraphQL Typings
import {
  Product,
  Order_By,
  PromotedSlotsConnection,
} from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowRight from "@material-ui/icons/ArrowRight";




const FeaturedProductsDesktop = (props: ReactProps) => {

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
    loading,
    categorySlug,
    showSeeMore = true,
  } = props;

  const theme = useTheme();

  const promotedSlots = connection?.edges?.map(
    promotedItem => promotedItem.node
  );

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
          promotedSlots?.length > 0
          ? promotedSlots?.filter(p => !!p?.product).map((promotedSlot, i) =>
              <div key={promotedSlot?.id + `_${i}`}
                className={classes.productCardWrapper}
              >
                <div className={clsx(
                  classes.flexItem,
                  "staggerFadeIn",
                  classes.flexItemHover,
                )}>
                  <ProductCardResponsive
                    product={promotedSlot?.product}
                    cardsPerRow={cardsPerRow}
                    promotedSlotId={
                      promotedSlot.isRandomFiller
                      ? undefined
                      : promotedSlot?.id
                    }
                  />
                </div>
              </div>
            )
          : <LoadingCards count={3} />
        }
        {
          showSeeMore &&
          !loading &&
          connection?.edges?.length > 0 &&
          <div className={classes.seeAllLinkContainer}>
            <Link
              as={`categories/${categorySlug}`}
              href={"categories/[categorySlug]"}
            >
              <a className={classes.seeAllLinkBorder}>
                See more
                <ArrowRight className={classes.sellAllIcon}/>
              </a>
            </Link>
          </div>
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
  connection: PromotedSlotsConnection;
  // sortAscending: boolean; // must be top-level
  // cause Desktop and Mobile share the same queries. Possible clash in variables
  // don't want Desktop's sortAscend: true, while Mobile is false,
  // as both queries will be sent and returned data conflicts
  loading?: boolean;
  showSeeMore?: boolean;
  categorySlug?: string
}


/////////// Styles //////////////



export default withStyles(styles)( FeaturedProductsDesktop );







