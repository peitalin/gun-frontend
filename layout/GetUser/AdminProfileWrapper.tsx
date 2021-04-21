import React from "react";
import { NextPage, NextPageContext } from 'next';
// styles
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Redux
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import { batch, useDispatch, useSelector } from "react-redux";
// Graphql
import { useQuery } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { GET_STORE_PRIVATE } from "queries/store-queries";
// Typings
import { UserPrivate, Role } from 'typings/gqlTypes';
import LoadingBar from "components/LoadingBar";
import Redirect from "pageComponents/Redirect";
import { getUserDataFromGqlOrRedux } from "./utils";
import { useRouter } from "next/router";



const AdminProfileWrapper = (
  props: ReactProps
) => {

  const {
    disableAdminBorder = false,
    disablePadding = false,
  } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, data, error, refetch } = useQuery<QueryData>(
    GET_USER, {
    variables: {},
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

  let data2 = getUserDataFromGqlOrRedux(data, userRedux)
  const userIsAdmin = data2?.user?.userRole === Role.PLATFORM_ADMIN

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
    // remove leading /
    let from = router.pathname.slice(1)
    return (
      <Redirect
        message={"Admin login required. Redirecting..."}
        redirectCondition={!data?.user?.id}
        redirectDelay={1000}
        redirectRoute={`/login?from=${from}`}
      />
    )
  } else if (userIsAdmin) {
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
        redirectCondition={!userIsAdmin}
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
  children?(args: any): React.ReactNode;
}


interface ReduxProps {
  userRedux: UserPrivate;
  isDarkMode: boolean;
}

interface QueryData {
  user: UserPrivate;
}

const styles = (theme: Theme) => createStyles({
  adminWrapperRoot: {
    width: '100%',
  },
  adminInnerContainer: {
    margin: '1rem 0rem 1rem 0rem',
    height: '100%',
    minHeight: 'calc(600px)',
    width: '100%',
    // border: `1px solid ${Colors.uniswapLightGrey}`,
    // background: Colors.uniswapDarkNavy,
    // boxShadow: BoxShadows.shadow1.boxShadow,
    // borderRadius: BorderRadius,
    padding: '1rem',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
});

export default withStyles(styles)(AdminProfileWrapper);