
import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Typings
import {
  Connection,
  Product,
  ProductsConnection,
  Order_By,
} from "typings/gqlTypes";

import FeaturedProductsMobileCarousel from "pageComponents/FrontPage/FeaturedProducts/FeaturedProductsMobileCarousel";
import FeaturedProductsDesktop from "pageComponents/FrontPage/FeaturedProducts/FeaturedProductsDesktop";
import FeaturedProductsLoading from "pageComponents/FrontPage/FeaturedProducts/FeaturedProductsLoading";
import Hidden from 'components/HiddenFix';

// const FEATURED_LIST_ID = 'prodlist_1bea860c-7b8b-476d-a417-82728287dc9d'
export const DEV_FEATURED_LIST_ID = 'prodlist_838af685-ba9c-40b4-80ee-fcf9529bdcfc'
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "queries/gun-queries";





const FeaturedProducts = (props: ReactProps) => {

  const {
    classes,
    initialFeaturedProducts,
    count = 8,
    cardsPerRow = {
      xs: 1.5,
      sm: 1.5,
      md: 2,
      lg: 3,
      xl: 4,
    },
  } = props;


  const orderByOptions = [
    { label: "Newest", value: { createdAt: Order_By.DESC }},
    { label: "Oldest", value: { createdAt: Order_By.ASC }},
    { label: "Highest Price", value: { price: Order_By.DESC }},
    { label: "Lowest Price", value: { price: Order_By.ASC }},
  ];

  const [orderBy, setOrderBy] = React.useState(orderByOptions[0]);
  const [expand, setExpand] = React.useState(false);
  const [searchTermUi, setSearchTermUi] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const inputRefEl = React.useRef(null);

  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_ALL_PRODUCTS, {
    variables: {
      searchTerm: searchTerm || "*",
      query: {
        limit: 12 || count,
        offset: props.offset || 0,
        orderBy: orderBy.value,
        where: { isPublished: { _eq: true } }
        // orderBy: {
        //   // price: OrderBy.ASC,
        //   // price: OrderBy.DESC
        //   // createdAt: OrderBy.ASC,
        //   // createdAt: OrderBy.DESC,
        // }
      }
    },
    ssr: true,
  })

  let connection = option(data).productsAllConnection()
    || initialFeaturedProducts;

  if (loading) {
    return (
      <FeaturedProductsLoading
        cardsPerRow={cardsPerRow}
      />
    )
  }

  return (
    <>
      <Hidden xsDown implementation="css">
        {
          (DEV_FEATURED_LIST_ID) &&
          <FeaturedProductsDesktop
            productsConnection={connection}
            cardsPerRow={cardsPerRow}
          />
        }
      </Hidden>
      <Hidden smUp implementation="css">
        <FeaturedProductsMobileCarousel
          productsConnection={connection}
          cardsPerRow={cardsPerRow}
        />
      </Hidden>
    </>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  initialFeaturedProducts?: ProductsConnection;
  count?: number;
  offset?: number;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}
interface QueryData {
  productsAllConnection: ProductsConnection;
}
interface QueryVar {
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
});


export default withStyles(styles)( FeaturedProducts );







