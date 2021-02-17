import React from "react";
import { NextPage, NextPageContext } from 'next';
import { oc as option } from "ts-optchain";
// Redux
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Dispatch, Store } from "redux";
import { batch, useDispatch, useSelector } from "react-redux";
// Graphql
import { useQuery } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { useApolloClient } from "@apollo/client";
import { ApolloClient, ApolloError, ApolloQueryResult } from "@apollo/client";
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
      setUserOnCompleted(dispatch)(data, refetch)
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
  user?: UserPrivate;
}

export type ApolloRefetch = (variables?: Record<string, any>) => Promise<ApolloQueryResult<QueryData>>

export const refetchUser =
(apolloClient: ApolloClient<any>) =>
async (variables?: any): Promise<ApolloQueryResult<QueryData>> => {
  return await apolloClient.query<QueryData>({
    query: GET_USER,
    variables: variables ? variables : {}
  })
}

export const setUserOnCompleted =
(dispatch: Dispatch<any>) =>
(
  data: QueryData,
  refetch?: ApolloRefetch
) => {

  // console.log("update redux user with data: ", data)
  // update Redux user state on initial page load
  if (option(data).user.id() && refetch) {
    // set User profile, and userRefetch in REDUX
    dispatch(reduxBatchUpdate.userStore(data, refetch))
  } else {
    // set User profile
    dispatch(Actions.reduxLogin.SET_USER(data.user))
  }
}

//////////////// REDUX THUNK CREATORS /////////////////////
export const reduxBatchUpdate = {
  userStore: (data: QueryData, refetch?: ApolloRefetch) => (dispatch: Dispatch) => {
    batch(() => {
      // set User Profile in REDUX
      // console.log("setting user.store in redux: ", data.user.store)
      dispatch(Actions.reduxLogin.SET_USER(data.user));

      dispatch(Actions.reduxWishlist.SET_WISHLIST(
        option(data).user.wishlistItemsConnection()
      ));
      dispatch(Actions.reduxFollowingStores.SET_FOLLOWING_STORES(
        option(data).user.followingStores.edges([])
          .map(({ node }) => node.store.id)
      ));

      // set userRefetch in REDUX
      dispatch(Actions.reduxRefetch.SET_REFETCH_USER(
        refetch
      ))
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
  let userResponse: { data?: { user?: UserPrivate } } = { data: undefined };
  const dispatch = ctx.store.dispatch;

  if (cookie && /efc-auth=/.exec(cookie)) {
    try {

      userResponse = await ctx.apolloClient.query<QueryData>({
        query: GET_USER,
      });

      console.log("initial GetUser response:", userResponse)
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

