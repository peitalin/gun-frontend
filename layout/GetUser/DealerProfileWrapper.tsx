import React from "react";
// Redux
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "layout/AppTheme";
// Graphql
import { useQuery } from "@apollo/client";
import { GET_DEALER_PRIVATE } from "queries/store-queries";
// Typings
import { UserPrivate } from 'typings/gqlTypes';
import LoadingBar from "components/LoadingBar";
import Redirect from "pageComponents/Redirect";
// store deleted
import { dealerExists } from "utils/store";
import { getUserDataFromGqlOrRedux } from "./utils";


export const DealerProfileWrapper = (props) => {

  const dispatch = useDispatch();

  const {
    userRedux,
    isDarkMode
  } = useSelector<GrandReduxState, ReduxProps>(s => ({
    userRedux: s.reduxLogin.user,
    isDarkMode: s.reduxLogin.darkMode === 'dark'
  }))

  const { loading, data, error, refetch } = useQuery<QueryData>(
    GET_DEALER_PRIVATE, {
    variables: {},
    onError: (e) => { console.log(e) },
    onCompleted: (data) => {
      if (data?.user?.id) {
        dispatch(Actions.reduxLogin.SET_USER(data.user))
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
  if (!dealerExists(data2?.user) && process.browser) {
    return (
      <Redirect
        message={"Registered Dealers access only."}
        redirectCondition={!data2?.user?.dealer?.id}
        redirectDelay={1000}
        redirectRoute={"/"}
      />
    )
  } else {

    let apolloProps: DealerProfileProps = {
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


export interface DealerProfileProps {
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

export default DealerProfileWrapper;