import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
// Typings
import { OrderItem, ProductSale } from "typings/gqlTypes";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
//router
import { useRouter } from "next/router";
import Redirect from "pageComponents/Redirect";
// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_PRODUCT_SALE } from "queries/sales-queries";
import ProductSaleDetails from "pageComponents/SellerProfileDashboard/OrderSalesHistory/ProductSaleDetails";
// SSR disable
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";




const SalesItemDetails = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;
  const router = useRouter();

  const { data, loading, error } = useQuery<QueryData>(
    GET_PRODUCT_SALE, {
      variables: {
        orderItemId: router.query.orderItemId as string,
      },
      ssr: true,
    }
  )

  return (
    <>
      <MetaHeadersPage
        title="Order Details - Seller Dashboard  - Relay.shop"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {(dataUser: SellerProfileProps) => {

        const productSale = option(data).getProductSale();

        if (loading) {
          return <Loading fixed loading={loading} delay={"200ms"}/>
        } else if (error) {
          return (
            <Redirect
              message={"Order could not be retrieved. Redirecting to Sales orders..."}
              redirectCondition={!!error}
              redirectDelay={1000}
              redirectRoute={"/admin/orders"}
            />
          )
        } else {
          return (
            <div className={classes.contentContainer}>
              <ProductSaleDetails
                productSale={productSale}
              />
            </div>
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
  getProductSale: ProductSale
}
interface QueryVar {
}


export default withStyles(styles)( SalesItemDetails );

