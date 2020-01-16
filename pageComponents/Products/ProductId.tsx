import * as React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/react-hooks";
// Typings
import { Product, ID } from "typings/gqlTypes";
import { GET_PRODUCT } from "queries/products-queries";
// Utils Components
import ErrorDisplay from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import SnackBarA from "components/Snackbars/SnackbarA";
import CategoryBreadcrumbs from "./CategoryBreadcrumbs";
// GridImage
import ProductImageGalleryDesktop from "pageComponents/Products/ProductImageGalleryDesktop";
import ProductImageGalleryMobile from "pageComponents/Products/ProductImageGalleryMobile";
import ProductDescription from "pageComponents/Products/ProductDescription";
import PurchaseSummary from "pageComponents/Products/PurchaseSummary";
import ErrorPage from "pages/_error";
// Router
import { useRouter } from "next/router";
import ProductPageRecommendations from "./ProductPageRecommendations";
// Next
import dynamic from "next/dynamic";
const YouMayAlsoLikeCarousel = dynamic(
  () => import("components/Carousels/YouMayAlsoLikeCarousel"), {
    loading: () => <Loading/>,
    ssr: false,
  }
);
import Hidden from "@material-ui/core/Hidden";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { lgUpMediaQuery } from "./common";
// Payments
// Stripe
import { StripeClient } from "layout/Checkout/typings.stripe";
import { injectStripe } from 'react-stripe-elements';
const PurchaseSummaryStripe = injectStripe(PurchaseSummary);







const Products: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const lgUp = useMediaQuery(lgUpMediaQuery);

  const [displaySnack, setDisplaySnack] = React.useState(true)
  const router = useRouter();
  const productId: string = option(router).query.productId() as any;

    const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_PRODUCT, {
    variables: {
      productId: productId
    },
    ssr: true,
  })

  const product = option(data).product() || props.initialProduct;

  if (product && product.isSuspended) {
    return <ErrorPage statusCode={400} message={"Product has been suspended"}/>
  }
  if (product && product.isDeleted) {
    return <ErrorPage statusCode={400} message={"Product has been deleted"}/>
  }

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexCol,
    )}>
      <div className={clsx(classes.flexCol, classes.alignItemsCenter)}>

        {
          !xsDown &&
          <div className={clsx(classes.breadCrumbRoutes, classes.maxWidth)}>
            <CategoryBreadcrumbs
              categoryGroup={option(product).category.categoryGroup("...")}
              categoryName={option(product).category.name("...")}
            />
          </div>
        }

        <div className={clsx(
          classes.flexRow,
          classes.maxWidth,
          classes.overflowHidden,
        )}>

          {/* note: needs the newline here to work
            // @ts-ignore */}
          <Hidden className={classes.productColumn55MobileOuter}
            smUp implementation="css"
          >
            <div className={classes.productColumn55Mobile}>
              <ProductImageGalleryMobile
                product={product}
                loading={loading}
              />
            </div>
          </Hidden>

          <div className={classes.productColumn55}>
            <Hidden only={['xs']} implementation="css">
              <ProductImageGalleryDesktop
                product={product}
                loading={loading}
                numberOfItemsTall={16}
                numberOfItemsWide={8}
              />
            </Hidden>
            {
              (product && product.id) &&
              <>
                {
                  process.browser
                    ? <PurchaseSummaryStripe product={product}/>
                    : <PurchaseSummary product={product}/>
                }
              </>
            }
            <ProductDescription product={product}/>
          </div>

          <div className={
            lgUp
              ? classes.productColumn40LgUp
              : classes.productColumn40
          }>
            <ProductPageRecommendations />
          </div>

        </div>
      </div>

      {/* <Hidden only={['xs', 'sm', 'md']}>
        <YouMayAlsoLikeCarousel
          // initialProducts={initialProductsLimitedRelease}
          title={"You may also like"}
          maxWidthCarousel={2000}
        />
      </Hidden> */}

      {
        loading &&
        !props.initialProduct &&
        <Loading loading={loading} delay={"400ms"}/>
      }
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  initialProduct: Product;
}
interface QueryData {
  product: Product;
}
interface QueryVar {
  productId: ID;
}


const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  maxWidth: {
    maxWidth: 1100,
  },
  overflowHidden: {
    overflowX: 'hidden',
    // overflow-y and overflow-x influence each other
    // either are both hidden or visible.
  },
  imageContainer: {
    width: "50%",
    height: "50%",
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: "center",
    marginBottom: '1rem',
  },
  breadCrumbRoutes: {
    width: '100%',
    margin: '0.5rem 0rem 0rem 0rem',
  },
  productColumn55MobileOuter: {
    padding: '0rem',
    flexBasis: '60vw',
    flexGrow: 1,
  },
  productColumn55Mobile: {
    transform: 'translateX(-1.5%)',
    width: '104%',
  },
  productColumn55: {
    padding: '0.5rem 1rem 2rem 1rem',
    flexBasis: 'calc(60vw - 2rem)',
    maxWidth: 680,
    // in line with previewImages which are 60vw wide, 37.5vw tall (16:10)
    flexGrow: 1,
    // minWidth: 420, // when column gets to 480 width, snaps to tablet layout
  },
  productColumn40LgUp: {
    margin: '1rem 0rem 1rem 0',
    flexGrow: 1,
    maxWidth: 350,
  },
  productColumn40: {
    marginTop: '2rem',
    paddingLeft: '1rem',
    flexGrow: 1,
    maxWidth: 680,
  },
  productColumnInner: {
    border: '1px solid #eaeaea',
    borderRadius: '2px',
    padding: '1.5rem',
    background: '#fafafa',
  },
  justifyCenter: {
    display: 'flex',
    justifyContent: "center",
  },
});


export default withStyles(styles)( Products );
