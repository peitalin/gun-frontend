
import React from "react";
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
  PromotedList,
  ConnectionQuery,
} from "typings/gqlTypes";

import NewProductsMobileCarousel from "pageComponents/FrontPage/NewProducts/NewProductsMobileCarousel";
import NewProductsDesktop from "pageComponents/FrontPage/NewProducts/NewProductsDesktop";
import Hidden from 'components/HiddenFix';
import { useSelector } from "react-redux";
import { GrandReduxState, Actions} from "reduxStore/grand-reducer";
import { PaginatorVariables } from "reduxStore/paginator-variables-actions";

// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_NEW_PRODUCTS } from "queries/products-queries";





const NewProducts = (props: ReactProps) => {

  const {
    classes,
    cardsPerRow = {
      xs: 1.5,
      sm: 1.5,
      md: 2,
      lg: 3,
      xl: 4,
    },
  } = props;

  const variables = useSelector<GrandReduxState, PaginatorVariables>(
    s => s.reduxPaginatorVariables.newProductsVariables
  )

  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_ALL_NEW_PRODUCTS, {
    variables: {
      searchTerm: variables.searchTerm,
      query: {
        limit: variables.query.limit,
        offset: variables.query.offset,
        orderBy: variables.query.orderBy,
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

  let connection = data?.productsNewReleasesConnection


  return (
    <>
      <Hidden smDown implementation="js">
        <NewProductsDesktop
          title={props.title}
          connection={connection}
          cardsPerRow={cardsPerRow}
          loading={loading}
          showSeeMore={props.showSeeMore}
        />
      </Hidden>
      <Hidden mdUp implementation="js">
        <NewProductsMobileCarousel
          title={props.title}
          connection={connection}
          cardsPerRow={cardsPerRow}
          loading={loading}
          showSeeMore={props.showSeeMore}
        />
      </Hidden>
    </>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  showSeeMore?: boolean;
}

export interface QueryData {
  productsNewReleasesConnection: ProductsConnection;
}
interface QueryVar {
  searchTerm?: string;
  query?: ConnectionQuery;
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
});


export default withStyles(styles)( NewProducts );







