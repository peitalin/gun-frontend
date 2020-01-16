import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Graphql
import {
  GET_RECOMMENDED_PRODUCTS,
  GET_DEALS_ENDING_SOON_PRODUCTS,
  GET_LIMITED_RELEASE_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "queries/products-queries";
// Typings
import { Product, ProductsConnection, WishlistItem } from "typings/gqlTypes";
// Paginator hooks
import { ConnectionQueryProps } from "components/Paginators/usePaginateQueryHook";
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
import { useScrollXPosition, useCalcNumItemsFromWindowWidth } from "utils/hooks";
// helper
import { findSoonestDiscountExpiry } from "utils/prices";
// Main component
import CarouselFixedHeightVariableWidth from "components/Carousels/CarouselFixedHeightVariableWidth";
// Wishlist
// import { QueryWishlistHookArgs } from "pageComponents/Wishlist";



const YouMayAlsoLikeCarousel = (props: ReactProps) => {

  const { classes, initialProducts } = props;
  const count = 8;
  const numItems = useCalcNumItemsFromWindowWidth(8, props.maxWidthCarousel)

  const [el, setEl] = React.useState<HTMLElement>(null);
  // accumulate connection results as you scroll down.
  const [accumConnection, setAccumConnection] = React.useState(
    initialProducts
    || { edges: [], pageInfo: undefined } as ProductsConnection
  );

  const {
    loading,
    error,
    data,
    refetch,
    getNextPage,
    getPrevPage,
    connectionQuery,
  } = usePaginateQueryHook<QueryData, QueryVar, Product>({
    query: GET_RECOMMENDED_PRODUCTS,
    variables: {},
    connectionSelector: (data: QueryData) => [
      option(data).productsRecommendedConnection(),
      'productsRecommendedConnection'
    ],
    count: count,
    ssr: true,
  });

  const connection = option(data).productsRecommendedConnection();

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

  const carouselId = "air-cara-paginator"

  React.useEffect(() => {
    if (process.browser) {
      let el: HTMLElement = document.querySelector(`#${carouselId}`);
      if (el) {
        setEl(el)
      }
    }
  }, [])

  const {
    scrollLeft,
    scrollWidth,
    clientWidth
  } = useScrollXPosition(
    process.browser ? document.querySelector(`#${carouselId}`) : el,
    carouselId,
  );

  const maxScrollLeft = scrollWidth - clientWidth;
  const isLeftEnd = scrollLeft > (maxScrollLeft - 10) // 10px offset
  // when you get within 10px of the edge, trigger isLeftEnd

  React.useEffect(() => {
    if (isLeftEnd) {
      getNextPage()
    }
  }, [isLeftEnd])


  // need this for refetching when clicking wishlist on carousels
  // const wishlistConnectionResponse = usePaginateQueryHook(QueryWishlistHookArgs);

  if (!accumConnection.edges.length) {
    return <></>
  }

  return (
    <div className={classes.recommendationsContainer}>
      <CarouselFixedHeightVariableWidth
        carouselId={carouselId}
        numberOfItems={numItems}
        maxWidthCarousel={props.maxWidthCarousel}
        wishlistStyle={{
          top: "calc(50% - 1rem)"
        }}
        getPrevPage={getPrevPage}
        getNextPage={getNextPage}
        // refetch={wishlistConnectionResponse.refetch}
        title={props.title}
        loading={loading}
        accumConnectionEdges={
          accumConnection.edges
            .filter(({ node }) => {
              if (!option(node).featuredVariant.priceDetails()) {
                return false
              }
              return !!findSoonestDiscountExpiry(node.featuredVariant.priceDetails)
            })
        }
        // products connection, accumulated over pages
      />
    </div>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  initialProducts?: ProductsConnection;
  numberOfCarouselItems?: number;
  maxWidthCarousel?: number;
  topHalfFraction?: number;
  wishlistOffset?: string;
}
interface QueryVar {
  connectionQuery: ConnectionQueryProps;
}
interface QueryData {
  productsRecommendedConnection: ProductsConnection
}

export const cardCornerRadius = 3;

const styles = (theme: Theme) => createStyles({
  recommendationsContainer: {
    marginTop: '2rem',
    width: '100%',
  },
});


export default withStyles(styles)( YouMayAlsoLikeCarousel );







