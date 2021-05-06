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
    hideViewAll = true,
    viewAllPath = "/categories",
  } = props;


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
          !products?.length
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
          : products?.filter(p => !!p).map((product, i) =>
              <div key={i} style={{
                marginLeft: '0.5rem',
              }}>
                <ProductCardResponsive
                  product={product}
                  cardsPerRow={cardsPerRow}
                />
              </div>
            )
        }
      </AirCarousel>
      {
        !hideViewAll &&
        !loading &&
        connection?.edges?.length > 0 &&
        <div className={classes.seeAllLinkContainer}>
          <Link href={viewAllPath}>
            <a className={classes.seeAllLinkBorder}>
              See all
              {/* <ArrowRight/> */}
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
  hideViewAll?: boolean;
  viewAllPath?: string
}



export default withStyles(styles)( FeaturedProductsMobileCarousel );







