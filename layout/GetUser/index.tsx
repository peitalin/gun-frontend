import React from "react";
import { NextPage, NextPageContext } from 'next';
import { oc as option } from "ts-optchain";
// Redux
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Dispatch, Store } from "redux";
import { batch, useDispatch, useSelector } from "react-redux";
// Graphql
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "queries/user-queries";
import { useApolloClient } from "@apollo/react-hooks";
import { ApolloClient, ApolloError, ApolloQueryResult } from "apollo-client";
// Typings
import { UserPrivate } from 'typings/gqlTypes';
import Loading from "components/Loading";
import ErrorDisplay from "components/Error";
// import { analyticsUser } from "utils/analytics";
import { logout } from "queries/requests";
import Router from "next/router";





const GetUser = (props: ReactProps) => {

  const dispatch = useDispatch();
  const client = useApolloClient();
  const { user } = useSelector<GrandReduxState, { user: UserPrivate }>(state => {
    return {
      user: option(state).reduxLogin.user()
    }
  })

  const { data, error, loading, refetch } = useQuery<QueryData>(
    GET_USER, {
    variables: {},
    onCompleted: (data: QueryData) => {
      getUserOnCompleted(dispatch)(data, refetch)
    },
    onError: (error: ApolloError) => {
      // swallow error message: not loggedIn, and no user_id provided
      // if network error, attempt logout to clear redux user state
      if (user && user.id) {
        logout(client, dispatch)(undefined)
        // logout graphql call will fail, but it will clear redux User
        // and clear localStorage timer
      }
    },
    ssr: true,
  })

  return <div className="get-user"></div>;
};

interface ReactProps {
  user?: UserPrivate;
}
interface QueryData {
  user: UserPrivate;
}

export const getUserOnCompleted =
(dispatch: Dispatch<any>) =>
(
  data: QueryData,
  refetch?: (variables?: Record<string, any>) => Promise<ApolloQueryResult<QueryData>>
) => {

  // update Redux user state on initial page load
  if (option(data).user.cart() && option(data).user.store()) {
    // console.log("1: userCartStore")
    dispatch(reduxBatchUpdate.userCartStoreId(data))
  } else if (option(data).user.cart()) {
    // console.log("2: userCart")
    dispatch(reduxBatchUpdate.userCart(data))
  } else if (option(data).user.store()) {
    // console.log("3: userStore")
    dispatch(reduxBatchUpdate.userStoreId(data))
  } else if (option(data).user()) {
    // console.log("4: user")
    dispatch(Actions.reduxLogin.SET_USER(data.user))
  } else {
  }

  // Tell analytics this user is logged in
  if (refetch) {
    console.log(refetch)
    dispatch(Actions.reduxRefetch.SET_REFETCH_USER(refetch))
  }
}


//////////////// REDUX THUNK CREATORS /////////////////////
export const reduxBatchUpdate = {
  userCartStoreId: (data: QueryData) => (dispatch: Dispatch) => {
    batch(() => {
      dispatch(Actions.reduxLogin.SET_USER(data.user));
      // dispatch(Actions.reduxCart.UPDATE_CART(data.user.cart));
      dispatch(Actions.reduxProductCreate.UPDATE_STORE_ID(data.user.store.id));
      dispatch(Actions.reduxWishlist.SET_WISHLIST(
        option(data).user.wishlistItemsConnection()
      ));
      dispatch(Actions.reduxFollowingStores.SET_FOLLOWING_STORES(
        option(data).user.followingStores.edges([])
          .map(({ node }) => node.store.id)
      ));
    })
  },
  userCart: (data: QueryData) => (dispatch: Dispatch) => {
    batch(() => {
      dispatch(Actions.reduxLogin.SET_USER(data.user));
      // dispatch(Actions.reduxCart.UPDATE_CART(data.user.cart));
      dispatch(Actions.reduxWishlist.SET_WISHLIST(
        option(data).user.wishlistItemsConnection()
      ));
      dispatch(Actions.reduxFollowingStores.SET_FOLLOWING_STORES(
        option(data).user.followingStores.edges([])
          .map(({ node }) => node.store.id)
      ));
    })
  },
  userStoreId: (data: QueryData) => (dispatch: Dispatch, state) => {
    batch(() => {
      dispatch(Actions.reduxLogin.SET_USER(data.user));
      dispatch(Actions.reduxProductCreate.UPDATE_STORE_ID(data.user.store.id));
    })
  },
}

//////////////////////////
////////// SSR ///////////
//////////////////////////

interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>
  store: Store<GrandReduxState>;
}

GetUser.getInitialProps = async (ctx: Context) => {

  console.log('getting InitialProps for GetUser.tsx');
  console.log('GetUser req headers:\n', option(ctx).req.headers.cookie());

  const cookie = option(ctx).req.headers.cookie();
  let userResponse = { data: undefined };
  const dispatch = ctx.store.dispatch;

  if (cookie && /efc-auth=/.exec(cookie)) {
    try {

      userResponse = await ctx.apolloClient.query<QueryData>({
        query: GET_USER,
      });

      console.log("initial GetUser response:", userResponse)
      if (option(userResponse).data.user.cart()) {
        // dispatch(Actions.reduxCart.UPDATE_CART(userResponse.data.user.cart));
      }
      if (option(userResponse).data.user.store()) {
        dispatch(Actions.reduxProductCreate.UPDATE_STORE_ID(userResponse.data.user.store.id));
      }
      if (option(userResponse).data.user()) {
        dispatch(Actions.reduxLogin.SET_USER(userResponse.data.user));
      }
    } catch(e) {
      //   console.log(e)
    }
  }

  return {
    user: userResponse.data
      ? userResponse.data.user
      : {},
  };

}

export default GetUser;

