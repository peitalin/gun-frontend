
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
import { GET_CATEGORIES } from "queries/categories-queries";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { categoryPreviewsBackup } from "utils/categories";



const CategoriesPage: NextPage<ReactProps> = (props) => {

  return (
    <ErrorBounds className={props.classes.root}>
      <MetaHeadersPage
        title={"Browse used guns for sale by category | Gun Marketplace Australia"}
        description={`
          Shop Gun Marketplace and browse local second hand firearms to trade.
        `}
        ogTitle={"Browse used guns for sale by category | Gun Marketplace Australia"}
        ogDescription={`
          Shop Gun Marketplace and browse local second hand firearms to trade.
        `}
        // ogImage={
        //   "https://image-content.gunmarketplace.com.au/og-img-category.png"
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

interface QueryData1 {
  getCategories: Categories[];
}
interface QueryVar1 {
  slug?: string;
}

export const getStaticProps = async (context) => {

  // const { data } = await serverApolloClient(ctx).query<QueryData1, QueryVar1>({
  //   query: GET_CATEGORIES,
  // })
  // console.log("data.getCategories:", data?.getCategories)
  // console.log("local categories", categoryPreviewsBackup)
  // let initialCategories = data?.getCategories ?? categoryPreviewsBackup as any;
  let initialCategories: Categories[] = categoryPreviewsBackup as any;

  // return props
  return {
    props: {
      initialCategories: initialCategories,
    }
  };
};


export default withStyles(styles)( CategoriesPage );






