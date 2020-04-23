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
import { Colors } from "layout/AppTheme";
// Typings
import { UserPrivate, Product, ProductsConnection } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// Components
import ProductRow from "pageComponents/SellerProfileDashboard/PublishedProductsList/ProductRow";
import ProductList from "pageComponents/SellerProfileDashboard/PublishedProductsList/ProductList";
import ProductEdit from "pageComponents/ProductEdit"
import BackTo from "components/BackTo";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EmptyProductList from "pageComponents/SellerProfileDashboard/PublishedProductsList/EmptyProductList";
// pagination
import PaginateButtons from "components/Paginators/PaginateButtons";
import { useQuery } from "@apollo/react-hooks";
import { GET_PUBLISHED_PRODUCTS_CONNECTION } from "queries/store-queries";





const PublishedProducts = (props: ReactProps) => {

  const { classes } = props;

  const goBackToListings = () => {
    router.back()
  }

  const router = useRouter();
  const productId = option(router).query.productId();

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const user = useSelector<GrandReduxState, UserPrivate>(s => s.reduxLogin.user);

  return (
    <PaginateButtons<QueryData, QueryVar, Product>
      query={GET_PUBLISHED_PRODUCTS_CONNECTION}
      variables={{}}
      count={10}
      sortAscending={false}
      connectionSelector={(data: QueryData) => [
        option(data).user.store.dashboardPublishedProductsConnection(),
        'dashboardPublishedProductsConnection',
      ]}
      ssr={true}
    >
      {({ loading, data, error, refetch }: PaginateProps) => {

        const myProducts: ProductsConnection = option(data)
          .user
          .store
          .dashboardPublishedProductsConnection()

        React.useEffect(() => {
          refetch()
        }, [props.refetch])

        useAnalytics("View.Dashboard.Products")

        if (option(myProducts).edges([]).length === 0) {
          return <EmptyProductList />
        }

        if (!productId) {
          return (
            <div className={clsx(classes.contentContainer)}>
              <ErrorBounds className={clsx(
                classes.root,
                smDown ? classes.paddingMobile : classes.paddingDesktop
              )}>
                <div className={classes.goBackContainer}>
                  <Typography className={classes.title} variant="h3">
                    Your Published Products
                  </Typography>
                </div>
                <div className={classes.flexCol}>
                {
                  myProducts &&
                  <ProductList
                    productsConnection={myProducts}
                    hideDelete={true}
                    hidePublish={true}
                    hideUnpublish={false}
                    hideShareLinkButton={false}
                    hideViewButton={false}
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
        } else {
          return (
            <div className={clsx(classes.contentContainer)}>
              <ErrorBounds className={clsx(
                classes.root,
                smDown ? classes.paddingMobile : classes.paddingDesktop
              )}>
                <BackTo/>
                <div className={clsx(classes.flexRow, classes.subtitle)}>
                  <Typography variant="h4">
                    Edit Product Listing
                  </Typography>
                </div>
                {
                  myProducts &&
                  <EditProductPage
                    productsConnection={myProducts}
                  />
                }
              </ErrorBounds>
            </div>
          )
        }

      }}
    </PaginateButtons>
  )
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

export const styles = (theme: Theme) => createStyles({
  root: {
    borderRadius: '4px',
    // border: '1px solid #eaeaea',
    backgroundColor: Colors.foregroundColor,
    boxShadow: '0px 1px 1px 0 #e6ebf1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingDesktop: {
    padding: '4rem 2rem 2rem 2rem',
  },
  paddingMobile: {
    padding: '2rem 1rem 1rem 1rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginBottom: "2rem",
  },
  goBackContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  iconButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    "&:hover": {
      cursor: "pointer",
      color: Colors.purple,
      transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    },
  },
  iconButton: {
    marginRight: '0.5rem',
  },
  pad1rem: {
    padding: '1rem',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  contentContainer: {
    flexBasis: '70%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: 800,
  },
  marginTopBottom: {
    margin: '1rem 0rem 1rem 0rem',
  }
});


export default withStyles(styles)(React.memo(
  (props: ReactProps) => <PublishedProducts {...props}/>,
  // (prevProps, nextProps) => {
  //   return true
  // }
));


