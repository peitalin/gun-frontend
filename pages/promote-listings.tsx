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



const PromoteListingsSSR: NextPage<ReactProps> = (props) => {
  return (
    <PageWithStripe>
      <PromoteListings
        pageConfig={props.pageConfig}
      />
    </PageWithStripe>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  pageConfig: PageConfig;
}

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( PromoteListingsSSR );






