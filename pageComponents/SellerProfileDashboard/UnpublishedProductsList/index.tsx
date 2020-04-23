import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// Router
import { useRouter } from "next/router";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/PublishedProductsList";
import { Colors } from "layout/AppTheme";
// Typings
import { UserPrivate, Connection, Product, ProductsConnection } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import ProductRow from "pageComponents/SellerProfileDashboard/PublishedProductsList/ProductRow";
import ProductList from "pageComponents/SellerProfileDashboard/PublishedProductsList/ProductList";
import ProductEdit from "pageComponents/ProductEdit"
import EmptyProductList from "pageComponents/SellerProfileDashboard/PublishedProductsList/EmptyProductList";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// pagination
import PaginateButtons from "components/Paginators/PaginateButtons";
import { GET_UNPUBLISHED_PRODUCTS_CONNECTION } from "queries/store-queries";





const UnpublishedProducts = (props: ReactProps) => {

  const { classes } = props;

  const goBackToListings = () => {
    router.back()
  }

  const router = useRouter();
  const productId = option(router).query.productId();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PaginateButtons<QueryData, QueryVar, Product>
      query={GET_UNPUBLISHED_PRODUCTS_CONNECTION}
      variables={{}}
      count={10}
      sortAscending={false}
      connectionSelector={(data: QueryData) => [
        option(data).user.store.dashboardUnpublishedProductsConnection(),
        'dashboardUnpublishedProductsConnection',
      ]}
      ssr={true}
    >
      {({ loading, data, error, refetch }: PaginateProps) => {

        let myProducts = option(data).user.store.dashboardUnpublishedProductsConnection();

        React.useEffect(() => {
          refetch()
        }, [props.refetch])

        useAnalytics("View.Dashboard.Unpublished")

        if (option(myProducts).edges([]).length === 0) {
          return <EmptyProductList />
        }
        return (
          <div className={clsx(classes.marginTopBottom, classes.contentContainer)}>
            <ErrorBounds className={clsx(
              classes.root,
              smDown ? classes.paddingMobile : classes.paddingDesktop
            )}>
              <div className={classes.goBackContainer}>
                <Typography className={classes.title} variant="h3">
                  Your Unpublished Products
                </Typography>
              </div>
              <div className={classes.flexCol}>
              {
                myProducts &&
                <ProductList
                  productsConnection={myProducts}
                  hideDelete={false}
                  hidePublish={false}
                  hideUnpublish={true}
                  hideShareLinkButton={true}
                  hideViewButton={true}
                  refetchProducts={() => {
                    console.log("refetching products...")
                    refetch()
                  }}
                />
              }
              </div>
            </ErrorBounds>
          </div>
        )
      }}
    </PaginateButtons>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  refetch?: boolean;
}
interface QueryData {
  user: UserPrivate
}
interface PaginateProps {
  data: QueryData;
  error: any;
  loading: boolean;
  refetch: any;
}
interface QueryData {
  user: UserPrivate
}
interface QueryVar {
}

export default withStyles(styles)(React.memo(
  (props: ReactProps) => <UnpublishedProducts {...props}/>,
  // (prevProps, nextProps) => {
  //   return true
  // }
));


