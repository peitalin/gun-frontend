import React from "react";
import { NextPage, NextPageContext } from 'next';
import { oc as option } from "ts-optchain";
// Redux
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Dispatch, Store } from "redux";
import { batch, useDispatch } from "react-redux";
// Graphql
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "queries/user-queries";
import { useApolloClient } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
// Typings
import { UserPrivate } from 'typings/gqlTypes';



const GetUser = (props: ReactProps) => {

  const dispatch = useDispatch();
  const client = useApolloClient();

  React.useEffect(() => {
    if (process.browser) {

      client.query({ query: GET_USER })
      .then(({ loading, data, errors }) => {
        if (option(data).user.cart() && option(data).user.store()) {
          dispatch(reduxBatchUpdate.userCartStoreId(data))
        } else if (option(data).user.cart()) {
          dispatch(reduxBatchUpdate.userCart(data))
        } else if (option(data).user.store()) {
          dispatch(reduxBatchUpdate.userStoreId(data))
        } else if (option(data).user()) {
          dispatch(Actions.reduxLogin.SET_USER(data.user))
        } else {
        }
      })
      .catch(e => {
        // swallow error message: not loggedIn, and no user_id provided
      })

    }
  }, [])

  return <div className="get-user"></div>;
};

interface ReactProps {
  user?: UserPrivate;
}
interface QueryData {
  user?: UserPrivate;
}

//////////////// REDUX THUNK CREATORS /////////////////////
const reduxBatchUpdate = {
  userCartStoreId: (data: QueryData) => (dispatch: Dispatch) => {
    batch(() => {
      dispatch(Actions.reduxLogin.SET_USER(data.user));
      // dispatch(Actions.reduxCart.UPDATE_CART(data.user.cart));
      dispatch(Actions.reduxProductCreate.UPDATE_STORE_ID(data.user.store.id));
      // dispatch(Actions.reduxWishlist.SET_WISHLIST(
      //   option(data).user.wishlistItemsConnection()
      // ));
    })
  },
  userCart: (data: QueryData) => (dispatch: Dispatch) => {
    batch(() => {
      dispatch(Actions.reduxLogin.SET_USER(data.user));
      // dispatch(Actions.reduxCart.UPDATE_CART(data.user.cart));
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

      // userResponse = await ctx.apolloClient.query<QueryData>({
      //   query: GET_USER,
      // });

      // console.log("initial GetUser response:", userResponse)
      // if (option(userResponse).data.user.cart()) {
      //   dispatch(Actions.reduxCart.UPDATE_CART(userResponse.data.user.cart));
      // }
      // if (option(userResponse).data.user.store()) {
      //   dispatch(Actions.reduxProductCreate.UPDATE_STORE_ID(userResponse.data.user.store.id));
      // }
      // if (option(userResponse).data.user()) {
      //   dispatch(Actions.reduxLogin.SET_USER(userResponse.data.user));
      // }
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

