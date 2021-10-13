import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { styles } from "../FeaturedProducts/stylesMobile";
// Material UI
import Typography from "@material-ui/core/Typography";
// Typings
import {
  Product,
  ProductPreviewsConnection,
} from "typings/gqlTypes";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
// Watchlist
import ProductPreviewResponsive from "components/ProductPreviewResponsive";
import AirCarousel from "components/AirCarousel";
import Link from "next/link";
import ArrowRight from "@material-ui/icons/ArrowRight";






const NewProductsMobileCarousel = (props: ReactProps) => {

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
    showSeeMore = true,
  } = props;


  const productPreviews = connection?.edges?.map(edge => edge.node)
  let productPreviews1 = productPreviews?.slice(0,4) ?? []
  let productPreviews2 = productPreviews?.slice(4,8) ?? []
  let productPreviews3 = productPreviews?.slice(8) ?? []

  return (
    <main className={classes.root}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        {props.title || "Featured"}
      </Typography>

      <AirCarousel
        id={"new-products-carousel-main-mobile-1"}
        // handleClickLeft={getPrevPage}
        // handleClickRight={getNextPage}
        disableButtons={true}
        scrollSnapType={"x proximity"}
      >
        {
          !(productPreviews1?.length > 0)
          ? [...Array(1).keys()].map(i =>
              <AirCarousel
                key={`featured-products-carousel-main-1-${i}`}
                id={`featured-products-carousel-main-1-${i}`}
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
          : productPreviews1?.filter(p => !!p).map((productPreview, i) =>
              <div key={i} style={{
                marginLeft: '0.5rem',
              }}>
                <ProductPreviewResponsive
                  productPreview={productPreview}
                  cardsPerRow={cardsPerRow}
                />
              </div>
            )
        }
      </AirCarousel>


      {
        (productPreviews2?.length > 0) &&
        <>
          <div style={{ marginTop: '1rem' }}></div>
          <AirCarousel
            id={"new-products-carousel-main-mobile-2"}
            // handleClickLeft={getPrevPage}
            // handleClickRight={getNextPage}
            disableButtons={true}
            scrollSnapType={"x proximity"}
          >
            {
              !(productPreviews2?.length > 0)
              ? [...Array(1).keys()].map(i =>
                  <AirCarousel
                    key={`featured-products-carousel-main-2-${i}`}
                    id={`featured-products-carousel-main-2-${i}`}
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
              : productPreviews2?.filter(p => !!p).map((productPreview, i) =>
                  <div key={i} style={{
                    marginLeft: '0.5rem',
                  }}>
                    <ProductPreviewResponsive
                      productPreview={productPreview}
                      cardsPerRow={cardsPerRow}
                    />
                  </div>
                )
            }
          </AirCarousel>
        </>
      }

      {
        (productPreviews3?.length > 0) &&
        <>
          <div style={{ marginTop: '1rem' }}></div>
          <AirCarousel
            id={"new-products-carousel-main-mobile-3"}
            // handleClickLeft={getPrevPage}
            // handleClickRight={getNextPage}
            disableButtons={true}
            scrollSnapType={"x proximity"}
          >
            {
              !(productPreviews3?.length > 0)
              ? [...Array(1).keys()].map(i =>
                  <AirCarousel
                    key={`featured-products-carousel-main-3-${i}`}
                    id={`featured-products-carousel-main-3-${i}`}
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
              : productPreviews3?.filter(p => !!p).map((productPreview, i) =>
                  <div key={i} style={{
                    marginLeft: '0.5rem',
                  }}>
                    <ProductPreviewResponsive
                      productPreview={productPreview}
                      cardsPerRow={cardsPerRow}
                    />
                  </div>
                )
            }
          </AirCarousel>
        </>
      }
      {
        showSeeMore &&
        !loading &&
        connection?.edges?.length > 0 &&
        <div className={classes.seeAllLinkContainer}>
          <Link href={"/new"}>
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
  connection: ProductPreviewsConnection;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  showSeeMore?: boolean;
  loading?: boolean;
  // cause Desktop and Mobile share the same queries. Possible clash in variables
  // don't want Desktop's sortAscend: true, while Mobile is false,
  // as both queries will be sent and returned data conflicts
}



export default withStyles(styles)( NewProductsMobileCarousel );







