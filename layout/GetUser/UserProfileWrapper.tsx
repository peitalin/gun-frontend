import React from "react";
import { NextPage, NextPageContext } from 'next';
import { oc as option } from "ts-optchain";
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
import { useApolloClient } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
// Typings
import { UserPrivate } from 'typings/gqlTypes';
import Loading from "components/Loading";
import LoadingBar from "components/LoadingBar";
import LoadingBarSSR from "components/LoadingBarSSR";
import Redirect from "pageComponents/Redirect";



export const UserProfileWrapper = (props) => {

  const { loading, data, error, refetch } = useQuery<QueryData>(
    GET_USER, {
    variables: {},
    onError: (e) => {
      console.log(e)
    },
    errorPolicy: "all",
  });

  if (loading) {
    return <LoadingBar
            absoluteTop
            color={Colors.blue}
            height={4}
            width={'100vw'}
            loading={true}
          />
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

export interface UserProfileProps {
  loading: boolean;
  error: any;
  refetch(): void;
  data: QueryData;
}

interface QueryData {
  user: UserPrivate;
}

export default UserProfileWrapper;