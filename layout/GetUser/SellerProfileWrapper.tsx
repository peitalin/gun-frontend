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
import { GET_STORE_PRIVATE } from "queries/store-queries";
import { useApolloClient } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
// Typings
import { UserPrivate } from 'typings/gqlTypes';
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
import ErrorDisplay from "components/Error";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors";
import Redirect from "pageComponents/Redirect";
// store deleted
import { isStoreDeleted, storeCreateRedirectCondition } from "utils/store";



export const GetUserWrapper = (props) => {

  const { loading, data, error, refetch } = useQuery<QueryData>(
    GET_USER, {
    variables: {},
    onError: (e) => {
      console.log(e)
    },
    errorPolicy: "all",
  });

  if (loading) {
    return <Loading fixed loading={loading} delay={"200ms"} />;
  }
  if (error && !option(data).user.id()) {
    return (
      <Redirect
        message={"Login required. Redirecting to login..."}
        redirectCondition={!option(data).user.id()}
        redirectDelay={1000}
        redirectRoute={"/login"}
      />
    )
  } else {
    return (
      <>
        {
          props.children({
            loading,
            error,
            refetch,
            data,
          })
        }
      </>
    )
  }
}


export const SellerProfileWrapper = (props) => {

  const dispatch = useDispatch();
  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const { loading, data, error, refetch } = useQuery<QueryData>(
    GET_STORE_PRIVATE, {
    variables: {},
    onError: (e) => {
      console.log(e)
    },
    onCompleted: (data) => {
      if (refetch) {
        // console.log('saving refetchStore: ', refetch)
        // dispatch(Actions.reduxRefetch.SET_REFETCH_STORE(refetch))
        // merge StorePrivate (dashboard stuff)
        dispatch(Actions.reduxLogin.SET_USER({
          ...user,
          store: {
            ...user.store,
            ...data.user.store
          }
        }))
      }
    },
    errorPolicy: "all",
  });

  if (loading) {
    // return <Loading fixed loading={loading} delay={"200ms"} />;
    return <LoadingBarSSR/>;
  }
  if (!option(data).user.id() && process.browser) {
    // user who is not logged in will error, causing a redirect
    return (
      <Redirect
        message={"Login required. Redirecting to login..."}
        redirectCondition={!!error}
        redirectDelay={1000}
        redirectRoute={"/login"}
      />
    )
  }
  if (storeCreateRedirectCondition(option(data).user.store()) && process.browser) {
    return (
      <Redirect
        message={"Store required. Redirecting to create a store..."}
        redirectCondition={!option(data).user.store.id()}
        redirectDelay={1000}
        redirectRoute={"/create-seller-profile"}
      />
    )
  } else {

    let apolloProps: SellerProfileProps = {
      loading,
      error,
      refetch,
      data,
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

interface QueryData {
  user: UserPrivate;
}

export default SellerProfileWrapper;