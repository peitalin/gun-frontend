import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import PreviewCardWide from "components/PreviewCardWide";
import ProductRow from "./ProductRow";
import Link from "next/link";
import WishlistButton from "components/WishlistButton";
// Graphq
import {
  GET_RECOMMENDED_PRODUCTS,
  GET_DEALS_ENDING_SOON_PRODUCTS,
  GET_LIMITED_RELEASE_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "queries/products-queries";
// Typings
import { Connection, Product, ProductsConnection, WishlistItem } from "typings/gqlTypes";
// Paginator hooks
import { ConnectionQueryProps } from "components/Paginators/usePaginateQueryHook";
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// import { WishlistItemId } from "reduxStore/wishlist-reducer";
// helper
import { findSoonestDiscountExpiry } from "utils/prices";
import { useCalcNumItemsFromWindowWidth } from "utils/hooks";
// Wishlist
// import { QueryWishlistHookArgs } from "pageComponents/Wishlist";




const EndingSoonCarouselMobile = (props: ReactProps) => {

  const { classes, initialProducts } = props;

  // accumulate connection results as you scroll down.
  const [accumConnection, setAccumConnection] = React.useState(
    initialProducts
    || { edges: [], pageInfo: undefined } as ProductsConnection
  );

  const count = process.browser
    ? window.innerWidth/270
    : props.numberOfCarouselItems


  const {
    loading,
    error,
    data,
    refetch,
    getNextPage,
    getPrevPage,
    connectionQuery,
  } = usePaginateQueryHook<QueryData, QueryVar, Product>({
    query: GET_DEALS_ENDING_SOON_PRODUCTS,
    variables: {},
    connectionSelector: (data: QueryData) => [
      option(data).productsDealsEndingSoonConnection(),
      'productsDealsEndingSoonConnection'
    ],
    count: Math.ceil(count) + 1, // overfetch, extra element to scroll
    ssr: true,
  });

  const connection = option(data).productsDealsEndingSoonConnection();

  React.useEffect(() => {
    if (option(connection).edges([]).length > 0) {
      setAccumConnection(s => {
        return {
          ...connection,
          edges: [
            ...s.edges,
            ...connection.edges
              .filter(e => !s.edges.find(s => s.node.id === e.node.id))
          ]
        }
      })
    }
  }, [option(connection).edges()])


  const products = option(accumConnection).edges([])
      .filter(({ node }) => !!findSoonestDiscountExpiry(node.featuredVariant.priceDetails))

  const product = option(products[0]).node();
  const featuredVariant = option(product).featuredVariant();
  const previewItem = option(product).featuredVariant.previewItems[0]();
  const original = option(previewItem).image.original();

  // need this for refetching when clicking wishlist on carousels
  // const wishlistConnectionResponse = usePaginateQueryHook(QueryWishlistHookArgs);


  if (accumConnection.edges.length === 0) {
    return <></>
  }

  return (
    <main className={classes.root}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Time Limited Deals
      </Typography>
      {
        featuredVariant &&
        <div className={classes.flexItem}>
          {/* <WishlistButton
            productId={option(product).id()}
            variantId={option(product).featuredVariant.variantId()}
            style={{ top: `calc(50% - 16px ${props.wishlistOffset})` }}
            refetch={wishlistConnectionResponse.refetch}
          /> */}
          <Link
            href={"/download/[productId]"}
            as={`/download/${option(product).id()}`}
          >
            <a className={classes.flexRowLink}>
              <PreviewCardWide
                previewItem={previewItem}
                title={option(product).name()}
                tagline={option(product).tagline()}
                category={option(product).category()}
                priceDetails={option(featuredVariant).priceDetails()}
                quantityAvailable={option(featuredVariant).currentStockLevel.quantityAvailable()}
                isSoldOut={option(featuredVariant).isSoldOut()}
                fit={original ? (original.heightInPixels > original.widthInPixels) : false}
                topHalfFraction={props.topHalfFraction}
              />
            </a>
          </Link>
        </div>
      }
      <div className={classes.flexCol}>
      {
        products.slice(1).map(({ node: product}, i) =>
          <ProductRow
            key={`${product.id}_${i}`}
            product={product}
          />
        )
      }
      </div>
    </main>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  numberOfCarouselItems: number;
  // maxWidthCarousel: number;
  initialProducts?: ProductsConnection;
  topHalfFraction?: number;
  wishlistOffset?: string;
}
interface QueryVar {
  connectionQuery: ConnectionQueryProps;
}
interface QueryData {
  productsDealsEndingSoonConnection: ProductsConnection
}

export const cardCornerRadius = 3;

const styles = (theme: Theme) => createStyles({
  root: {
    margin: "0rem 0rem",
    paddingRight: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    paddingLeft: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    width: '100%',
  },
  flexRowLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '1rem',
  },
  title: {
    fontWeight: 600,
    marginBottom: "0.5rem",
    marginTop: "2rem",
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItem: {
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    backgroundColor: "#fbfbfb",
    position: 'relative',
  },
  flexItemHoverNull: {
    "&:hover": {
      borderBottom: `2px solid ${Colors.lightGrey}`,
      backgroundColor: "#fafafa",
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  paginateButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default withStyles(styles)( EndingSoonCarouselMobile );







