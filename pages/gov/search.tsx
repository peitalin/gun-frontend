import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

import Typography from "@material-ui/core/Typography";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, BoxShadows, Colors } from "layout/AppTheme";
// Graphql
import { useQuery, ApolloClient, useApolloClient } from "@apollo/client";
import { REINDEX_SEARCH_INDEX_ADMIN } from "queries/search-queries";
import { UserPrivate, Role, BlankMutationResponse } from 'typings/gqlTypes';
import { useMutation } from "@apollo/client";
import LoadingBarSSR from "components/LoadingBarSSR";
import ButtonLoading from "components/ButtonLoading";
import { useSnackbar } from "notistack";
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const GovSearch = (props: ReactProps) => {

  const { classes } = props;
  const snackbar = useSnackbar();

  const [reindexSearchIndex, response] = useMutation<MutData, {}>(
    REINDEX_SEARCH_INDEX_ADMIN, {
    variables: {},
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        `Reindexing call complete: ${JSON.stringify(
          data?.reindexSearchIndex?.success
        )}`,
        { variant: "info", persist: true }
      )
    }
  });

  return (
    <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {

        const user = data?.user;
        const disabled = user?.userRole !== Role.PLATFORM_ADMIN;

        return (
          <div className={classes.govHomePageSSR}>
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
                await reindexSearchIndex()
                console.log("response: ", response?.data)
                snackbar.enqueueSnackbar(
                  `Search engine reindexing...`,
                  { variant: "info", persist: true }
                )
              }}
            >
              Reindex Search Engine
            </ButtonLoading>
          </div>
        )
      }}
    </AdminProfileWrapper>
  )

}

interface ReactProps extends WithStyles<typeof styles> {
}

interface MutData {
  reindexSearchIndex: BlankMutationResponse
}

const styles = (theme: Theme) => createStyles({
  govHomePageSSR: {
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
    maxWidth: 250,
  },
})

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( GovSearch );
