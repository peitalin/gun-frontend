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
import WishlistIcon from "components/WishlistIcon";
// Graphq
import {
  GET_RECOMMENDED_PRODUCTS,
  // GET_DEALS_ENDING_SOON_PRODUCTS,
  // GET_LIMITED_RELEASE_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "queries/products-queries";
// import { GET_CURATED_LIST } from "queries/curated-lists";

// Typings
import {
  Connection,
  Product,
  ConnectionQuery,
  WishlistItem,
  ProductsConnection,
  CuratedListItemsConnection,
  // useCuratedListItemsConnectionQuery,
  CuratedListItemsEdge,
  CuratedListItem,
} from "typings/gqlTypes";
// Paginator hooks
import { ConnectionQueryProps } from "components/Paginators/usePaginateQueryHook";
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
// helper
import { useCalcNumItemsFromWindowWidth } from "utils/hooks";
// Wishlist
// import { QueryWishlistHookArgs } from "pageComponents/Wishlist";
import Divider from "components/Divider";

import getConfig from "next/config";
const {
  publicRuntimeConfig: { FEATURED_LIST_ID }
} = getConfig();
// import { getProductIdOrSlug } from "utils/links";

// const FEATURED_LIST_ID = 'prodlist_1bea860c-7b8b-476d-a417-82728287dc9d'
// import { DEV_FEATURED_LIST_ID } from "../FeaturedProducts";






const FeaturedProductsMobile = (props: ReactProps) => {

  const {
    classes,
    initialProducts,
    count = 4,
  } = props;

  // accumulate connection results as you scroll down.
  const [accumConnection, setAccumConnection] = React.useState(
    initialProducts ||
    { edges: [], pageInfo: undefined } as CuratedListItemsConnection
  );


  // const { data, loading, error } = useCuratedListItemsConnectionQuery({
  //   variables: {
  //     listId: FEATURED_LIST_ID || DEV_FEATURED_LIST_ID,
  //     query: {
  //       count: count,
  //       sortAscending: true
  //     }
  //   }
  // })

  // const {
  //   loading,
  //   error,
  //   data,
  //   getNextPage,
  //   getPrevPage,
  // } = usePaginateQueryHook<QueryData, QueryVar, CuratedListItem>({
  //   query: GET_CURATED_LIST,
  //   variables: {
  //     listId: FEATURED_LIST_ID || DEV_FEATURED_LIST_ID,
  //   },
  //   connectionSelector: (data: QueryData) => [
  //     option(data).curatedListItemsConnection(),
  //     'curatedListItemsConnection'
  //   ],
  //   count: count,
  //   sortAscending: true,
  //   ssr: true,
  // });

  // const connection = option(data).curatedListItemsConnection();
  const connection = undefined

  const products = option(connection).edges([])
      .map(curatedItem => curatedItem.node.product)


  const product: Product = products[0] as any;
  const featuredVariant = option(product).featuredVariant();
  const previewItem = option(product).featuredVariant.previewItems[0]();
  const original = option(previewItem).image.original();

  // need this for refetching when clicking wishlist on carousels
  // const wishlistConnectionResponse = usePaginateQueryHook(QueryWishlistHookArgs);

  return (
    <main className={classes.root}>
      {
        !!product &&
        <>
          <Typography variant="h3" className={classes.title} gutterBottom>
            Featured Downloads
          </Typography>
          <div className={clsx(
            classes.flexItem,
            classes.minWidth
          )}>
            <WishlistIcon
              productId={option(product).id()}
              variantId={option(product).featuredVariant.variantId()}
              style={{ top: `calc(50% - 16px ${props.wishlistOffset})` }}
              // refetch={wishlistConnectionResponse.refetch}
            />
            <Link
              href={"/p/[productIdOrSlug]"}
              // as={`/p/${getProductIdOrSlug(product)}`}
            >
              <a className={classes.flexRowLink}>
                <PreviewCardWide
                  previewItem={previewItem}
                  title={option(product).currentSnapshot.title()}
                  tagline={option(product).currentSnapshot.model()}
                  category={option(product).category()}
                  price={option(featuredVariant).price()}
                  priceWas={option(featuredVariant).priceWas()}
                  // quantityAvailable={option(featuredVariant).currentStockLevel.quantityAvailable()}
                  isSoldOut={option(featuredVariant).isSoldOut()}
                  fit={original ? (original.heightInPixels > original.widthInPixels) : false}
                  topHalfFraction={props.topHalfFraction}
                />
              </a>
            </Link>
          </div>
          <div className={classes.divider}>
            <Divider/>
          </div>
          <div className={classes.flexCol}>
          {
            option(connection).edges() &&
            connection.edges.slice(1).map(({ node: { product } }, i) =>
              <ProductRow
                key={`${product.id}_${i}`}
                product={product as any}
              />
            )
          }
          </div>
        </>
      }
    </main>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  numberOfCarouselItems: number;
  // maxWidthCarousel: number;
  initialProducts?: CuratedListItemsConnection;
  topHalfFraction?: number;
  wishlistOffset?: string;
  count?: number;
}
interface QueryData {
  curatedListItemsConnection: CuratedListItemsConnection;
}
interface QueryVar {
}

export const cardCornerRadius = 4;

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
    borderRadius: `${cardCornerRadius}px`,
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
  },
  minWidth: {
    minWidth: 'calc(100vw - 2rem)',
  },
  divider: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});


export default withStyles(styles)( FeaturedProductsMobile );







