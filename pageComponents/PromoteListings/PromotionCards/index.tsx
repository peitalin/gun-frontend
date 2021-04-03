
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
  PromotedList,
} from "typings/gqlTypes";

import PromotionCardsMobileCarousel from "pageComponents/PromoteListings/PromotionCards/PromotionCardsMobileCarousel";
import PromotionCardsDesktop from "pageComponents/PromoteListings/PromotionCards/PromotionCardsDesktop";
import PromotionCardsLoading from "pageComponents/PromoteListings/PromotionCards/PromotionCardsLoading";
import Hidden from 'components/HiddenFix';

// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_PROMOTED_LIST } from "queries/promoted_lists-queries";






const FeaturedProducts = (props: ReactProps) => {

  const {
    classes,
    count = 4,
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
      <PromotionCardsLoading
        cardsPerRow={cardsPerRow}
        numRows={3}
      />
    )
  }

  return (
    <>
      <Hidden smDown implementation="css">
        <PromotionCardsDesktop
          title={props.title}
          connection={connection}
          cardsPerRow={cardsPerRow}
        />
      </Hidden>
      <Hidden mdUp implementation="css">
        <PromotionCardsMobileCarousel
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







