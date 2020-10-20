import React from "react";
import { NextPage, NextPageContext } from 'next';
import { oc as option } from "ts-optchain";
// styles
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Dispatch, Store } from "redux";
import { batch, useDispatch, useSelector } from "react-redux";
// Graphql
import { useQuery } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { GET_STORE_PRIVATE } from "queries/store-queries";
import { useApolloClient } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
// Typings
import { UserPrivate } from 'typings/gqlTypes';
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
import ErrorDisplay from "components/Error";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors";
import Redirect from "pageComponents/Redirect";
// store deleted
import { isStoreDeleted, storeDoesNotExist } from "utils/store";



const AdminProfileWrapper = (
  props: ReactProps & { children?: any }
) => {

  const {
    disableAdminBorder = false,
    disablePadding = false,
  } = props;

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
  } else if (option(data).user.userRole() === "PLATFORM_ADMIN") {
    if (!disableAdminBorder) {
      return (
        <div className={props.classes.adminWrapperRoot}>
          <div className={props.classes.adminInnerContainer}>
            {
              props.children({
                loading,
                error,
                refetch,
                data,
              })
            }
          </div>
        </div>
      )
    } else {
      return (
        <div className={props.classes.adminWrapperRoot}>
          {
            props.children({
              loading,
              error,
              refetch,
              data,
            })
          }
        </div>
      )
    }
  } else {
    return (
      <Redirect
        message={"Admin login required. Redirecting ..."}
        redirectCondition={option(data).user.userRole() !== "PLATFORM_ADMIN"}
        redirectDelay={2000}
        redirectRoute={"/login"}
      />
    )
  }
}


export interface AdminProfileProps {
  loading: boolean;
  error: any;
  refetch(): void;
  data: QueryData;
}

export interface ReactProps extends WithStyles<typeof styles> {
  disableAdminBorder?: boolean
  disablePadding?: boolean
}

interface QueryData {
  user: UserPrivate;
}

const styles = (theme: Theme) => createStyles({
  adminWrapperRoot: {
    width: '100%',
    paddingRight: '1rem',
  },
  adminInnerContainer: {
    margin: '1rem 0rem 1rem 0rem',
    height: '100%',
    minHeight: 'calc(600px)',
    width: '100%',
    background: "#fafafa",
    border: "1px solid #eaeaea",
    padding: '1rem',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
});

export default withStyles(styles)(AdminProfileWrapper);