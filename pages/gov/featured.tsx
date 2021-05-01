import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

import Typography from "@material-ui/core/Typography";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, BoxShadows, Colors } from "layout/AppTheme";
// Graphql
import { useQuery, ApolloClient, useApolloClient } from "@apollo/client";
import { INITIATE_PAGE_CONFIG } from "queries/page_configs-queries";
import { useMutation } from "@apollo/client";
// typings
import { UserPrivate, Role, BlankMutationResponse } from 'typings/gqlTypes';
//components
import LoadingBarSSR from "components/LoadingBarSSR";
import ButtonLoading from "components/ButtonLoading";
// router and snackbars
import { useSnackbar } from "notistack";
import { useRouter} from "next/router";
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const GovFeaturedProducts = (props: ReactProps) => {

  const { classes } = props;
  const snackbar = useSnackbar();
  const router = useRouter();

  const [initiatePageConfig, response] = useMutation(
    INITIATE_PAGE_CONFIG, {
    variables: {},
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        "initiated page configs",
        { variant: "success"}
      )
      console.log("data: ", data)
      alert(JSON.stringify(data))
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        `error initiating page configs: ${err}`,
        { variant: "error"}
      )
    }
  })

  return (
    <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {

        const user = data?.user;
        const disabled = user?.userRole !== Role.PLATFORM_ADMIN;

        return (
          <div className={classes.govPromotedProducts}>
            {
              user && !disabled &&
              <div className={classes.homeHeading}>
                <Typography variant="h4" gutterBottom>
                  {`Logged in as PLATFORM_ADMIN:`}
                </Typography>
                <Typography variant="h4">
                  {user.email}
                </Typography>
              </div>
            }
            <ButtonLoading
              loadingIconColor={Colors.blue}
              replaceTextWhenLoading={true}
              loading={loading}
              disabled={loading}
              variant="contained"
              color="secondary"
              className={classes.reindexButton}
              style={{ }}
              onClick={async () => {
                initiatePageConfig()
              }}
            >
              Initiate Page Configs
            </ButtonLoading>
            <Typography variant="h4" className={classes.warning}>
              This resets front page configs and promoted lists to defaults
            </Typography>
          </div>
        )
      }}
    </AdminProfileWrapper>
  )

}

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  apolloClient: ApolloClient<any>;
}

const styles = (theme: Theme) => createStyles({
  govPromotedProducts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    minHeight: '80vh',
  },
  homeHeading: {
    paddingTop: '8rem',
    padding: '1rem',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  reindexButton: {
  },
  warning: {
    marginTop: "1rem",
  },
})


////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

GovFeaturedProducts.getInitialProps = async (ctx: Context) => {

  try {
    return {
      apolloClient: ctx.apolloClient,
    };
  } catch(e) {
    return {
      apolloClient: ctx.apolloClient,
    };
  }

}


export default withStyles(styles)( GovFeaturedProducts );
