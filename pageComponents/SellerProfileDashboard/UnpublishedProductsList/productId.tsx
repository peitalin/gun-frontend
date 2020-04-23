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
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// Components
import ProductRow from "pageComponents/SellerProfileDashboard/PublishedProductsList/ProductRow";
import ProductEdit from "pageComponents/ProductEdit"
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";





const UnpublishedProducts = (props: ReactProps) => {

  const { classes } = props;

  const goBackToListings = () => {
    router.back()
  }

  const router = useRouter();
  const user = useSelector<GrandReduxState, UserPrivate>(s => s.reduxLogin.user);
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={clsx(classes.marginTopBottom, classes.contentContainer)}>
      <ErrorBounds className={clsx(
        classes.root,
        smDown ? classes.paddingMobile : classes.paddingDesktop
      )}>
        <div className={classes.goBackContainer}>
          <div className={classes.iconButtonContainer} onClick={goBackToListings}>
            <KeyboardArrowLeft className={classes.iconButton}/>
            <Typography className={classes.title} variant="h6">
              Back to listings
            </Typography>
          </div>
        </div>
        <div className={clsx(classes.flexRow, classes.subtitle)}>
          <Typography variant="h4">
            Edit Product Listing
          </Typography>
        </div>
        {
          option(user).store.dashboardUnpublishedProductsConnection.edges() &&
          <EditProductPage
            productsConnection={user.store.dashboardUnpublishedProductsConnection}
          />
        }
      </ErrorBounds>
    </div>
  )
}

const ProductList = (props: {
  productsConnection: ProductsConnection,
}) => {
  const { productsConnection } = props;
  return <>
  {
    productsConnection.edges.map(({ node: product}) =>
      <div key={product.id}>
        <ProductRow product={product}/>
      </div>
    )
  }
  </>
}

const EditProductPage = (props: {
  productsConnection: ProductsConnection,
}) => {

  const { productsConnection } = props;
  const router = useRouter();

  return <>
  {
    productsConnection.edges
    .filter(({ node: product }) => product.id === router.query.productId)
    .map(({ node: product }) =>
      <div key={product.id}>
        <ProductRow product={product}/>
        <ProductEdit
          asModal={false}
          product={product}
        />
      </div>
    )
  }
  </>
}

interface ReactProps extends WithStyles<typeof styles> {
}


export default withStyles(styles)(React.memo(
  (props: ReactProps) => <UnpublishedProducts {...props}/>,
  // (prevProps, nextProps) => {
  //   return true
  // }
));


