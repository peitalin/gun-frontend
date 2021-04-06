
import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Typings
import {
  PromotedList,
  PromotedListItem,
  PromotedListItemsConnection,
  UserPrivate,
} from "typings/gqlTypes";

import { useDispatch, useSelector } from "react-redux";
import { Actions, GrandReduxState } from 'reduxStore/grand-reducer';

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
// snackbar
import { useSnackbar } from "notistack";






const PromotionCards = (props: ReactProps) => {

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

  const dispatch = useDispatch()
  const snackbar = useSnackbar();
  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const { loading, error, data, refetch } = useQuery<QueryData, QueryVar>(
    GET_PROMOTED_LIST, {
    variables: {
      promotedListId: props.promotedListId,
      limit: 4,
      offset: 0,
    },
    onCompleted: () => {
      if (typeof props.setRefetch === 'function') {
        props.setRefetch(refetch)
      }
    },
    ssr: true,
  })

  let connection = data?.promotedList?.promotedListItemsConnection


  const openPromotedItemPurchaseModal = () => {
    if (user?.id) {
      dispatch(Actions.reduxModals.TOGGLE_PROMOTED_ITEM_PURCHASE_MODAL(true))
    } else {
      snackbar.enqueueSnackbar(
        "Login to purchase this slot",
        { variant: "info" }
      )
    }
  }

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
          onClick={openPromotedItemPurchaseModal}
          setCurrentPromotedListItem={props.setCurrentPromotedListItem}
          setPosition={props.setPosition}
          user={user}
        />
      </Hidden>
      <Hidden mdUp implementation="css">
        <PromotionCardsMobileCarousel
          title={props.title}
          connection={connection}
          cardsPerRow={cardsPerRow}
          onClick={openPromotedItemPurchaseModal}
          setCurrentPromotedListItem={props.setCurrentPromotedListItem}
          setPosition={props.setPosition}
          user={user}
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
  setCurrentPromotedListItem(p: PromotedListItem): void;
  setPosition(p: number): void;
  setRefetch(p: any): void;
}
interface QueryData {
  promotedList?: PromotedList;
}
interface QueryVar {
  promotedListId: string,
  limit: number,
  offset: number,
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
});


export default withStyles(styles)( PromotionCards );







