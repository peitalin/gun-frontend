import React from "react";
import { oc as option } from "ts-optchain";
// Redux
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
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


export const DealerProfileWrapper = (props) => {

  const userRedux = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const { loading, data, error, refetch } = useQuery<QueryData>(
    GET_DEALER_PRIVATE, {
    variables: {},
    onError: (e) => { console.log(e) },
    onCompleted: (data) => { },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  console.log("user: ", data?.user)

  const getUserDataFromGqlOrRedux = (): QueryData => {
    if (data?.user?.dealer?.id) {
      return data
    }
    if (userRedux?.dealer?.id) {
      return { user: userRedux }
    } else {
      return data
    }
  }

  let data2 = getUserDataFromGqlOrRedux()

  if (loading) {
    return <LoadingBar
            absoluteTop
            color={Colors.blue}
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

interface QueryData {
  user: UserPrivate;
}

export default DealerProfileWrapper;