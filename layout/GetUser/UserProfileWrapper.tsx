import React from "react";
import { NextPage, NextPageContext } from 'next';
// Redux
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import { batch, useDispatch, useSelector } from "react-redux";
import { Colors } from "layout/AppTheme";
// Graphql
import { useQuery } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { GET_STORE_PRIVATE } from "queries/store-queries";
// Typings
import { UserPrivate } from 'typings/gqlTypes';
import LoadingBar from "components/LoadingBar";
import LoadingBarSSR from "components/LoadingBarSSR";
import Redirect from "pageComponents/Redirect";
import { getUserDataFromGqlOrRedux } from "./utils";



export const UserProfileWrapper = (props) => {

  const dispatch = useDispatch();

  const { loading, data, error, refetch } = useQuery<QueryData>(
    GET_USER, {
    variables: {},
    onError: (e) => {
      console.log(e)
    },
    onCompleted: (data) => {
      if (data?.user?.id) {
        dispatch(Actions.reduxLogin.SET_USER(data.user))
      }
    },
    errorPolicy: "all",
  });

  const {
    userRedux,
    isDarkMode
  } = useSelector<GrandReduxState, ReduxProps>(s => ({
    userRedux: s.reduxLogin.user,
    isDarkMode: s.reduxLogin.darkMode === 'dark'
  }))

  if (loading) {
    return <LoadingBar
            absoluteTop
            color={isDarkMode ? Colors.purple : Colors.blue}
            height={4}
            width={'100vw'}
            loading={true}
          />
  }
  if (error && !data?.user?.id) {
    return (
      <Redirect
        message={"Login required. Redirecting to login..."}
        redirectCondition={!data?.user?.id}
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

interface ReduxProps {
  userRedux: UserPrivate;
  isDarkMode: boolean;
}

interface QueryData {
  user: UserPrivate;
}

export default UserProfileWrapper;