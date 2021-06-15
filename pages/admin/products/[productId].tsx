import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Typings
import {
  Product,
  ProductEditInput,
  ID,
  StorePrivate,
} from "typings/gqlTypes";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import ProductEdit from "pageComponents/ProductEdit";
// Graphql
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "queries/products-queries";
// router
import { useRouter } from "next/router";
import Redirect from "pageComponents/Redirect";
// SSR disable
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const ProductEditPage = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;

  const router = useRouter();
  // const theme = useTheme();
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  ///// Use this instead of passing product via router
  //// extra request, but won't fail/error as easily
  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_PRODUCT, {
      variables: {
        productId: router?.query?.productId as any
      },
      onCompleted: (data: QueryData) => {
      },
      onError: (err) => console.log(err),
      ssr: true,
    },
  )

  return (
    <>
      <MetaHeadersPage
        title="Edit Product - Seller Dashboard"
        robots="noindex"
      />
      <SellerProfileWrapper>
        {(dataUser: SellerProfileProps) => {
          if (loading) {
            return <LoadingBarSSR/>
          } else if (error) {
            return (
              <Redirect
                message={"Error fetching product. Redirecting..."}
                redirectCondition={!!error}
                redirectDelay={2000}
                redirectRoute={"/admin/products"}
              />
            )
          } else if (!!data?.getProductById) {
            return (
              <div className={classes.contentContainer}>
                <div className={classes.rootOuter}>
                  <ProductEdit
                    asModal={false}
                    product={data.getProductById}
                  />
                </div>
              </div>
            )
          } else {
            return (
              <Redirect
                message={"Product could not be retrieved. Redirecting..."}
                redirectCondition={!data}
                redirectDelay={2000}
                redirectRoute={"/admin/products"}
              />
            )
          }
        }}
      </SellerProfileWrapper>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  getProductById: Product;
}
interface QueryVar {
  productId: ID;
}

export const styles = (theme: Theme) => createStyles({
  rootOuter: {
    // backgroundColor: Colors.foregroundColor,
  },
  contentContainer: {
    flexBasis: '65%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: 800,
    // marginTop: '2rem',
    // padding: '0rem 1rem 2rem 1rem',
  },
});

export default withStyles(styles)( ProductEditPage );

