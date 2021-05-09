import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { styles } from "./stylesMobile";
// Material UI
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
// Typings
import {
  Product,
  PromotedSlotsConnection,
} from "typings/gqlTypes";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
// Wishlist
import ProductCardResponsive from "components/ProductCardResponsive";
import AirCarousel from "components/AirCarousel";
import ArrowRight from "@material-ui/icons/ArrowRight";






const FeaturedProductsMobileCarousel = (props: ReactProps) => {

  const {
    classes,
    connection,
    cardsPerRow = {
      xs: 1.5,
      sm: 1.5,
      md: 1.5, // redundant, since mobile is sm only
      lg: 1.5,
      xl: 1.5,
    },
    loading,
    categorySlug,
    showSeeMore = true,
  } = props;


  const promotedSlots = connection?.edges?.map(
    promotedItem => promotedItem.node
  );
  const products = connection?.edges?.map(
    promotedItem => promotedItem?.node?.product
  )

  return (
    <main className={classes.root}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        {props.title || "Featured"}
      </Typography>

      <AirCarousel
        id={"featured-products-carousel-main"}
        // handleClickLeft={getPrevPage}
        // handleClickRight={getNextPage}
        disableButtons={true}
        scrollSnapType={"x proximity"}
      >
        {
          !promotedSlots?.length
          ? [...Array(1).keys()].map(i =>
              <AirCarousel
                key={`featured-products-carousel-main-${i}`}
                id={`featured-products-carousel-main-${i}`}
                // handleClickLeft={getPrevPage}
                // handleClickRight={getNextPage}
                disableButtons={false}
                scrollSnapType={"x proximity"}
              >
                <LoadingCards
                  count={4}
                  flexWrapItems={false}
                  cardsPerRow={cardsPerRow}
                />
              </AirCarousel>
            )
          : promotedSlots?.filter(p => !!p.product).map((promotedSlot, i) =>
              <div key={i} style={{
                marginLeft: '0.5rem',
              }}>
                <ProductCardResponsive
                  product={promotedSlot.product}
                  cardsPerRow={cardsPerRow}
                  promotedSlotId={
                    promotedSlot.isRandomFiller
                    ? undefined
                    : promotedSlot?.id
                  }
                />
              </div>
            )
        }
      </AirCarousel>
      {
        showSeeMore &&
        !loading &&
        connection?.edges?.length > 0 &&
        <div className={classes.seeAllLinkContainer}>
          <Link
            href={`categories/${categorySlug}`}
            as={"categories/[categorySlug"}
          >
            <a className={classes.seeAllLinkBorder}>
              See more
              <ArrowRight className={classes.sellAllIcon}/>
            </a>
          </Link>
        </div>
      }
    </main>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  connection: PromotedSlotsConnection;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  // cause Desktop and Mobile share the same queries. Possible clash in variables
  // don't want Desktop's sortAscend: true, while Mobile is false,
  // as both queries will be sent and returned data conflicts
  loading?: boolean;
  showSeeMore?: boolean;
  categorySlug?: string
}



export default withStyles(styles)( FeaturedProductsMobileCarousel );







