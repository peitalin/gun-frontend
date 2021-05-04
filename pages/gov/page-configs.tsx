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
import { INITIATE_CATEGORIES } from "queries/categories-queries";
import { INITIATE_CALIBERS } from "queries/calibers-queries";
import { useMutation } from "@apollo/client";
// typings
import { UserPrivate, Role, BlankMutationResponse } from 'typings/gqlTypes';
//components
import LoadingBarSSR from "components/LoadingBarSSR";
import LoadingBar from "components/LoadingBar";
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

  const [initiatePageConfig, response1] = useMutation(
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

  const [initiateCategories, response2] = useMutation(
    INITIATE_CATEGORIES, {
    variables: {},
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        "initiated categories",
        { variant: "success"}
      )
      console.log("data: ", data)
      alert(JSON.stringify(data))
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        `error initiating categories: ${err}`,
        { variant: "error"}
      )
    }
  })

  const [initiateCalibers, response3] = useMutation(
    INITIATE_CALIBERS, {
    variables: {},
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        "initiated calibers",
        { variant: "success"}
      )
      console.log("data: ", data)
      alert(JSON.stringify(data))
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        `error initiating calibers: ${err}`,
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
              loading &&
              <LoadingBar
                absoluteTop
                color={Colors.blue}
                height={4}
                width={'100vw'}
                loading={true}
              />
            }

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
            <div className={classes.spacer}></div>

            <ButtonLoading
              loadingIconColor={Colors.cream}
              replaceTextWhenLoading={true}
              loading={response1.loading}
              disabled={response1.loading}
              variant="contained"
              color="secondary"
              className={classes.reindexButton}
              style={{ }}
              onClick={async () => {
                let b = confirm(
                  "Are you sure you want to reset FRONT PAGE CONFIGS, "
                  + "PROMOTED_LISTS and PROMOTED_SLOTS to defaults?"
                  + "\n\nThis will annoy sellers who bought a promoted slot "
                  + "unless you BACKUP!"
                )
                if (b) {
                  initiatePageConfig()
                }
              }}
            >
              Initiate Page Configs
            </ButtonLoading>
            <Typography variant="h4" className={classes.warning}>
              Resets front-page configs, promoted lists,
            </Typography>
            <Typography variant="h4" className={classes.warning}>
              and promoted slots to defaults
            </Typography>

            <div className={classes.spacer}></div>

            <ButtonLoading
              loadingIconColor={Colors.cream}
              replaceTextWhenLoading={true}
              loading={response2.loading}
              disabled={response2.loading}
              variant="contained"
              color="secondary"
              className={classes.reindexButton}
              style={{ }}
              onClick={async () => {
                let b = confirm("Are you sure you want to reset CATEGORIES to defaults?")
                if (b) {
                  initiateCategories()
                }
              }}
            >
              Initiate Categories
            </ButtonLoading>
            <Typography variant="h4" className={classes.warning}>
              This resets Categories to defaults
            </Typography>

            <div className={classes.spacer}></div>

            <ButtonLoading
              loadingIconColor={Colors.cream}
              replaceTextWhenLoading={true}
              loading={response3.loading}
              disabled={response3.loading}
              variant="contained"
              color="secondary"
              className={classes.reindexButton}
              style={{ }}
              onClick={async () => {
                let b = confirm("Are you sure you want to reset CALIBERS to defaults?")
                if (b) {
                  initiateCalibers()
                }
              }}
            >
              Initiate Calibers
            </ButtonLoading>
            <Typography variant="h4" className={classes.warning}>
              This resets Calibers to defaults
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
    paddingBottom: "6rem",
  },
  homeHeading: {
    paddingTop: '6rem',
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
    color: Colors.lightRed,
  },
  spacer: {
    marginTop: "2rem",
    marginBottom: "2rem",
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
