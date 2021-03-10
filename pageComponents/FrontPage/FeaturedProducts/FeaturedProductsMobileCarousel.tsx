import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Typings
import {
  Product,
  ProductsConnection,
} from "typings/gqlTypes";
// Paginator hooks
import { ConnectionQueryProps } from "components/Paginators/usePaginatePagedQueryHook";
import usePaginateQueryHook from "components/Paginators/usePaginatePagedQueryHook";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
// Wishlist
import ProductCardResponsive from "components/ProductCardResponsive";

import Loading from "components/Loading";
import { GET_ALL_PRODUCTS } from "queries/gun-queries";
import AirCarousel from "components/AirCarousel";






const FeaturedProductsMobile = (props: ReactProps) => {

  const {
    classes,
    productsConnection,
    cardsPerRow = {
      xs: 1.5,
      sm: 1.5,
      md: 1.5, // redundant, since mobile is sm only
      lg: 1.5,
      xl: 1.5,
    },
  } = props;

  const connection = option(props).productsConnection();

  const products = option(connection).edges([])
      .map(curatedItem => curatedItem.node)

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
          products.map((product, i) =>
            <div key={i} style={{
              marginLeft: '0.5rem',
            }}>
              <ProductCardResponsive
                product={product as Product}
                cardsPerRow={cardsPerRow}
              />
            </div>
          )
        }
      </AirCarousel>
    </main>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  productsConnection: ProductsConnection;
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
}

const styles = (theme: Theme) => createStyles({
  root: {
    margin: "0rem 0rem",
    // paddingRight: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    // paddingLeft: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    width: '100%',
  },
  flexRowLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: '0.5rem', // subtract 1rem for carousel buttons: 1rem on both sides
    fontWeight: 600,
    marginBottom: "0.5rem",
    marginTop: "2rem",
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItem: {
    borderRadius: `${BorderRadius}px`,
    position: 'relative',
  },
  flexItemHoverNull: {
    "&:hover": {
      borderBottom: `2px solid ${Colors.lightGrey}`,
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  paginateButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minWidth: {
    minWidth: 'calc(100vw - 2rem)',
  },
  divider: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  // dividerFeaturedProduct: {
  //   border: `2px solid ${Colors.lightGrey}`,
  // },
});


export default withStyles(styles)( FeaturedProductsMobile );







