
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
} from "typings/gqlTypes";

import FeaturedProductsMobileCarousel from "pageComponents/FrontPage/FeaturedProducts/FeaturedProductsMobileCarousel";
import FeaturedProductsDesktop from "pageComponents/FrontPage/FeaturedProducts/FeaturedProductsDesktop";
import FeaturedProductsLoading from "pageComponents/FrontPage/FeaturedProducts/FeaturedProductsLoading";
import Hidden from 'components/HiddenFix';

// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_PROMOTED_LIST } from "queries/promoted_lists-queries";

// import {
//   SAY_SOMETHING_MUTATION,
//   SAY_SOMETHING_SUBSCRIPTION
// } from "queries/chat-subscriptions";






const FeaturedProducts = (props: ReactProps) => {

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


  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_PROMOTED_LIST, {
    variables: {
      promotedListId: props.promotedListId,
      limit: count,
      offset: 0,
    },
    ssr: true,
  })

  let connection = data?.promotedList?.promotedListItemsConnection

  if (loading) {
    return (
      <FeaturedProductsLoading
        cardsPerRow={cardsPerRow}
        numRows={3}
      />
    )
  }

  return (
    <>
      <Hidden smDown implementation="css">
        <FeaturedProductsDesktop
          title={props.title}
          connection={connection}
          cardsPerRow={cardsPerRow}
        />
      </Hidden>
      <Hidden mdUp implementation="css">
        <FeaturedProductsMobileCarousel
          title={props.title}
          connection={connection}
          cardsPerRow={cardsPerRow}
        />
      </Hidden>
    </>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  promotedListId: string;
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
interface QueryData {
  promotedList?: PromotedList;
}
interface QueryVar {
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
});


export default withStyles(styles)( FeaturedProducts );







