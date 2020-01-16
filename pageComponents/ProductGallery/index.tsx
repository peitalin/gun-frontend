import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Connection, Product, ProductsConnection } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from 'components/ErrorBounds';
import Divider from "components/Divider";
import Loading from "components/Loading";
// Mui
import Button from '@material-ui/core/Button';
import SaveAlt from "@material-ui/icons/SaveAlt";
// import HeroBanner from "pageComponents/HeroBanner";
import Typography from "@material-ui/core/Typography";
// Next
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
// GraphQL
import {
  GET_RECOMMENDED_PRODUCTS,
  GET_DEALS_ENDING_SOON_PRODUCTS,
  GET_LIMITED_RELEASE_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "queries/products-queries";
// Components
const InfiniteScrollProducts = dynamic(
  () => import("pageComponents/ProductGallery/InfiniteScrollProducts"), {
    loading: () => <Loading inline/>,
    ssr: false
  }
)
// Category Component
// import CategoryIdOrName from "pageComponents/Categories/CategoryIdOrName";
// import EndingSoonCarouselDesktop from "pageComponents/ProductGallery/EndingSoonCarouselDesktop";
// import EndingSoonCarouselMobile from "pageComponents/ProductGallery/EndingSoonCarouselMobile";
import Hidden from '@material-ui/core/Hidden';
const MAX_WIDTH_CAROUSEL = 980;



const ProductGallery: React.FC<ReactProps> = (props) => {

  // from getInitialProps
  const initialProductsRecommended = props.initialProductsRecommended;
  const initialProductsDealsEndingSoon = props.initialProductsDealsEndingSoon;
  const initialProductsLimitedRelease = props.initialProductsLimitedRelease;

  const { classes } = props;

  return (
    <ErrorBounds className={props.classes.root}>
      {/* <HeroBanner/> */}

      <div className={props.classes.productSectionsContainer}>
        <div className={props.classes.limitedReleaseContainer}>
          {/* Keep in sync with utils/hooks/useWindowWidthCount  */}
          {/* These are Media Queries, based on breakpoints set in layouts/AppTheme */}
          <Hidden xsDown implementation="js">
            <>
              {/* <EndingSoonCarouselDesktop
                initialProducts={initialProductsLimitedRelease}
                numberOfCarouselItems={5}
                maxWidthCarousel={MAX_WIDTH_CAROUSEL}
              /> */}
            </>
          </Hidden>
          {/* <Hidden smUp implementation="css">
            <EndingSoonCarouselMobile
              initialProducts={initialProductsLimitedRelease}
              numberOfCarouselItems={1}
              topHalfFraction={0.6}
              wishlistOffset={"+ 2.75rem"}
            />
          </Hidden> */}
        </div>

        <InfiniteScrollProducts
          initialProducts={initialProductsRecommended}
        />
      </div>
    </ErrorBounds>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {
    // backgroundColor: "#fefefe",
  },
  productSectionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  limitedReleaseContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  categoryContainer: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: Colors.darkRed,
    marginTop: '2rem',
  },
  categoryStripe1: {
    width: '100%',
    position: 'absolute',
    background: Colors.darkerRed,
    height: '9rem',
    bottom: 0,
  },
  categoryStripe2: {
    width: '100%',
    position: 'absolute',
    background: Colors.darkestRed,
    height: '3.5rem',
    bottom: 0,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    maxWidth: MAX_WIDTH_CAROUSEL,
    marginTop: '2rem',
    paddingLeft: '1rem',
  },
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  initialProductsRecommended?: ProductsConnection;
  initialProductsDealsEndingSoon?: ProductsConnection;
  initialProductsLimitedRelease?: ProductsConnection;
}

export default withStyles(styles)(ProductGallery);






