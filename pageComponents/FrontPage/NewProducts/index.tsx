
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

// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_PROMOTED_LIST } from "queries/promoted_lists-queries";
import { GET_ALL_NEW_PRODUCTS } from "queries/products-queries";





const NewProducts = (props: ReactProps) => {

  const {
    classes,
    count = 16,
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

  const initialVariables = {
    searchTerm: "",
    query: {
      limit: 12,
      offset: 0,
      orderBy: orderByOptions[0],
    },
  }

  const [orderBy, setOrderBy] = React.useState(initialVariables?.query?.orderBy);
  const [expand, setExpand] = React.useState(false);
  const [searchTermUi, setSearchTermUi] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState(initialVariables?.searchTerm);

  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_ALL_NEW_PRODUCTS, {
    variables: {
      searchTerm: searchTerm,
      query: {
        limit: 12,
        offset: 0,
        orderBy: orderBy.value as any,
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

  let connection = data?.productsAllConnection


  return (
    <>
      <Hidden smDown implementation="css">
        <NewProductsDesktop
          title={props.title}
          connection={connection}
          cardsPerRow={cardsPerRow}
        />
      </Hidden>
      <Hidden mdUp implementation="css">
        <NewProductsMobileCarousel
          title={props.title}
          connection={connection}
          cardsPerRow={cardsPerRow}
        />
      </Hidden>
    </>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  count?: number;
  title?: string;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export interface QueryData {
  productsAllConnection: ProductsConnection;
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







