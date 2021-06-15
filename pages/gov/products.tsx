import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
// GraphQL
import LoadingBarSSR from "components/LoadingBarSSR";
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
import ProductViewerPage from "pageComponents/Gov/ProductViewer";



const GovProductsPage: NextPage<ReactProps> = (props) => {

  return (
    <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {
        return (
          <ProductViewerPage
            onSubmit={undefined}
            onClickDebugPrint={undefined}
          />
        )
      }}
    </AdminProfileWrapper>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( GovProductsPage );






