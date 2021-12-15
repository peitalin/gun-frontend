
import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
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
import Hidden from 'components/HiddenFix';

// useMediaQuery
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Graphql
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_PROMOTED_LIST } from "queries/promoted_lists-queries";

// import {
//   SAY_SOMETHING_MUTATION,
//   SAY_SOMETHING_SUBSCRIPTION
// } from "queries/chat-subscriptions";






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


  const [
    getPromotedList,
    { data, loading }
  ] = useLazyQuery<QueryData, QueryVar>(
    GET_PROMOTED_LIST, {
    variables: {
      promotedListId: props.promotedListId,
      limit: count,
      offset: 0,
    },
  })

  React.useEffect(() => {
    if (!props.initialPromotedList?.id) {
      getPromotedList()
    }
  }, [props.initialPromotedList])

  let promotedList = props.initialPromotedList ?? data?.getPromotedList
  // let promotedList = props.initialPromotedList
  let categorySlug = promotedList?.categoryFilterSlug
  let connection = promotedList?.promotedSlotsConnection

  return <>
    <Hidden mdDown implementation="js">
      <FeaturedProductsDesktop
        title={props.title}
        connection={connection}
        cardsPerRow={cardsPerRow}
        showSeeMore={!!categorySlug}
        categorySlug={categorySlug}
      />
    </Hidden>
    <Hidden mdUp implementation="js">
      <FeaturedProductsMobileCarousel
        title={props.title}
        connection={connection}
        cardsPerRow={cardsPerRow}
        showSeeMore={!!categorySlug}
        categorySlug={categorySlug}
      />
    </Hidden>
  </>;
}





interface ReactProps extends WithStyles<typeof styles> {
  promotedListId: string;
  initialPromotedList?: PromotedList
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
  getPromotedList: PromotedList;
}
interface QueryVar {
  promotedListId: string,
  limit?: number,
  offset?: number,
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
});


export default withStyles(styles)( FeaturedProducts );







