import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Typings
import { PageConfig } from "typings/gqlTypes";
// SSR
import { NextPage, NextPageContext } from 'next';
// GraphQL
import PromoteListings from "pageComponents/PromoteListings";
import PageWithStripe from "layout/PageWithStripe";
// GraphQL
import { serverApolloClient } from "utils/apollo";
import { GET_PAGE_CONFIG_BY_PATH } from "queries/page_configs-queries";



const PromoteListingsSSR: NextPage<ReactProps> = (props) => {
  return (
    <PageWithStripe>
      <PromoteListings
        pageConfig={props.getPageConfig}
      />
    </PageWithStripe>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  getPageConfig: PageConfig;
}

export const getStaticProps = async (ctx: NextPageContext) => {

  const aClient = serverApolloClient(ctx);
  const { data } = await aClient.query<QData1, QVar1>({
    query: GET_PAGE_CONFIG_BY_PATH,
    variables: {
      urlPath: "/"
    }
  })

  return {
    props: {
      getPageConfig: data?.getPageConfig,
      revalidate: 600, // 10min
    },
  }
}

interface QData1 {
  getPageConfig: PageConfig;
}
interface QVar1 {
  urlPath: string;
}

export default withStyles(styles)( PromoteListingsSSR );






