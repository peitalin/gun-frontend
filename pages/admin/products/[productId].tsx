import React from "react";
import { oc as option } from "ts-optchain";
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
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
import ErrorBounds from 'components/ErrorBounds';
import ErrorDisplay from "components/Error";
import ProductEdit from "pageComponents/ProductEdit";
// Material UI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { useDispatch } from "react-redux";
import { seedProductEditDataAction } from "pageComponents/ProductEdit/seedEditData";
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
import BackTo from "components/BackTo";
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
  const dispatch = useDispatch();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  ///// Use this instead of passing product via router
  //// extra request, but won't fail/error as easily
  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_PRODUCT, {
      variables: {
        productId: option(router).query.productId() as any
      },
      onCompleted: (data: QueryData) => {
        dispatch(seedProductEditDataAction(data.product))
      },
      // onError: (err) => console.log(err),
      ssr: true,
    },
  )

  React.useEffect(() => {
    if (data && data.product) {
      console.log("seeding product edit data")
      dispatch(seedProductEditDataAction(data.product))
    }
  }, [data])

  return (
    <>
      <MetaHeadersPage
        title="Edit Product - Seller Dashboard"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {(dataUser: SellerProfileProps) => {

        if (loading) {
          return <Loading fixed loading={loading} delay={"200ms"}/>
        } else if (error) {
          return (
            <Redirect
              message={"Error fetching product. Redirecting..."}
              redirectCondition={!!error}
              redirectDelay={2000}
              redirectRoute={"/admin/products"}
            />
          )
        } else if (data && data.product) {
          return (
            <div className={classes.contentContainer}>
              <div className={classes.rootOuter}>
                <Typography className={classes.title} variant="h2">
                  Edit Product Listing
                </Typography>
                <BackTo/>
                <ErrorBounds className={clsx(
                  classes.pageRoot,
                  smDown ? classes.paddingMobile : classes.paddingMobile,
                )}>
                  <ProductEdit
                    asModal={false}
                    product={data.product}
                  />
                </ErrorBounds>
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
  product: Product;
}
interface QueryVar {
  productId: ID;
}

export const styles = (theme: Theme) => createStyles({
  pageRoot: {
    boxShadow: '0px 1px 1px 0 #e6ebf1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingDesktop: {
    padding: '2rem 2rem 2rem 2rem',
  },
  paddingMobile: {
    padding: '2rem 0rem 2rem 0rem',
  },
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
    marginTop: '2rem',
    padding: '0rem 1rem 2rem 1rem',
  },
  iconButton: {
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem',
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    "&:hover": {
      cursor: "pointer",
      color: Colors.red,
      transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    },
  },
  pad1rem: {
    padding: '1rem',
    width: '100%',
    textAlign: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  spaceTop: {
    marginTop: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  subtitle: {
    marginTop: "2rem",
  },
  title: {
    marginBottom: '1rem',
  },
});

export default withStyles(styles)( ProductEditPage );

