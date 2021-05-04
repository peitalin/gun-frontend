import React from "react";
import { NextPage, NextPageContext } from 'next';
// Redux
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Dispatch, Store } from "redux";
import { batch, useDispatch, useSelector } from "react-redux";
import { Colors } from "layout/AppTheme";
// Graphql
import { useQuery } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { GET_STORE_PRIVATE } from "queries/store-queries";
// Typings
import { UserPrivate } from 'typings/gqlTypes';
import LoadingBar from "components/LoadingBar";
import Redirect from "pageComponents/Redirect";
// store deleted
import { isStoreDeleted, storeDoesNotExist } from "utils/store";
import { getUserDataFromGqlOrRedux } from "./utils";
import { useRouter } from "next/router";




export const SellerProfileWrapper = (props) => {

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    userRedux,
    isDarkMode
  } = useSelector<GrandReduxState, ReduxProps>(s => ({
    userRedux: s.reduxLogin.user,
    isDarkMode: s.reduxLogin.darkMode === 'dark'
  }))

  const { loading, data, error, refetch } = useQuery<QueryData>(
    GET_STORE_PRIVATE, {
    variables: {},
    onError: (e) => {
      console.log(e)
    },
    onCompleted: (data) => {
      if (refetch) {
        // console.log('saving refetchStore: ', refetch)
        dispatch(Actions.reduxRefetch.SET_REFETCH_STORE(refetch))
        // merge StorePrivate (dashboard stuff)
        // console.log('saving GET_STORE_PRIVATE: ', data.user)
        if (data?.user?.store?.id) {
          dispatch(Actions.reduxLogin.SET_USER_STORE(data.user.store))
        }
      }
    },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  let data2 = getUserDataFromGqlOrRedux(data, userRedux)


  if (loading) {
    return <LoadingBar
            absoluteTop
            color={isDarkMode ? Colors.purple : Colors.blue}
            height={4}
            width={'100vw'}
            loading={true}
          />
  }
  if (!data2?.user?.id && process.browser) {
    // user who is not logged in will error, causing a redirect
    let redirectCondition = !data2?.user?.id && process.browser;
    // console.log("redirectCondition: ", redirectCondition)

    // remove leading /
    let from = router.pathname.slice(1)

    return (
      <Redirect
        message={"Login required. Redirecting to login..."}
        redirectCondition={redirectCondition}
        redirectDelay={1000}
        redirectRoute={`/login?from=${from}`}
      />
    )
  }
  if (storeDoesNotExist(data2?.user?.store) && process.browser) {
    return (
      <Redirect
        message={"Store required. Redirecting to create a store..."}
        redirectCondition={!data2?.user?.store?.id}
        redirectDelay={1000}
        redirectRoute={"/create-store"}
      />
    )
  } else {

    let apolloProps: SellerProfileProps = {
      loading,
      error,
      refetch,
      data: data2,
    }

    return (
      <>
        { props.children(apolloProps) }
      </>
    )
  }
}


export interface SellerProfileProps {
  loading: boolean;
  error: any;
  refetch(): void;
  data: QueryData;
}

interface ReduxProps {
  userRedux: UserPrivate;
  isDarkMode: boolean;
}

interface QueryData {
  user: UserPrivate;
}

export default SellerProfileWrapper;