
import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Categories } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from 'components/ErrorBounds';
// components
import CategoriesComponent from "pageComponents/Categories";
import CategoriesWall from "pageComponents/Categories/CategoriesWall";
// GQL
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// ENV variables
import getConfig from 'next/config'
const { publicRuntimeConfig: { EFC_ENV } } = getConfig()



const CategoriesPage: NextPage<ReactProps> = (props) => {
  return (
    <ErrorBounds className={props.classes.root}>
      <MetaHeadersPage
        title={"Browse Categories - gunmarketplace.com.au"}
        description={`
          Shop gunmarketplace local firearms to trade.
        `}
        ogTitle={"Browse Categories - gunmarketplace.com.au"}
        ogDescription={`
          Shop gunmarketplace local firearms to trade.
        `}
        // ogImage={
        //   EFC_ENV === "development"
        //   ? "https://image-content.fileworks.net/og-img-relay-category.png"
        //   : "https://image-content.relaydownloads.com/og-img-relay-category.png"
        // }
      />
      <CategoriesComponent>
        <CategoriesWall
          categories={props.initialCategories}
        />
      </CategoriesComponent>
    </ErrorBounds>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  initialCategories: Categories[];
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<object>;
}

CategoriesPage.getInitialProps = async (ctx: Context) => {

  try {
    const { data }  = await serverApolloClient(ctx).query({
      query: GET_PRODUCT_CATEGORIES,
      variables: {}
    });
    console.log('getInitialProps Categories: ', data);
    // return props
    return {
      initialCategories: data.categories || {
        pageInfo: {},
        edges: []
      },
      classes: undefined,
    };

  } catch(e) {
    return {
      initialCategories: {
        pageInfo: {},
        edges: []
      },
      classes: undefined,
    };
  }

}


export default withStyles(styles)( CategoriesPage );






