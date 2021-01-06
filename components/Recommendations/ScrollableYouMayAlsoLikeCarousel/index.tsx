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
import { Product, ProductsConnectionCursorBased, ConnectionOffsetQuery } from "typings/gqlTypes";
// Paginator hooks
import { useQuery } from "@apollo/client";
import { ConnectionQueryProps } from "components/Paginators/usePaginateQueryHook";
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
import { useScrollXPosition, useCalcNumItemsFromWindowWidth } from "utils/hooks";
// helper
import { findSoonestDiscountExpiry } from "utils/prices";
// Main component
import CarouselFixedHeightVariableWidth from "components/Recommendations/CarouselFixedHeightVariableWidth";
// Wishlist
import { QueryWishlistHookArgs } from "pageComponents/Wishlist";



const YouMayAlsoLikeCarousel = (props: ReactProps) => {

  const { classes, initialProducts } = props;
  const count = 8;
  const numItems = useCalcNumItemsFromWindowWidth(count, props.maxWidthCarousel)

  const [el, setEl] = React.useState<HTMLElement>(null);
  // accumulate connection results as you scroll down.
  const [accumConnection, setAccumConnection] = React.useState(
    initialProducts
    || { edges: [], pageInfo: undefined } as ProductsConnectionCursorBased
  );

  const {
    loading,
    error,
    data,
    refetch,
  } = useQuery<QueryData, QueryVar>(
    GET_RECOMMENDED_PRODUCTS, {
    variables: {
      query: {
        limit: 8
      },
    },
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


  // need this for refetching when clicking wishlist on carousels
  const wishlistConnectionResponse = usePaginateQueryHook(QueryWishlistHookArgs);

  if (!accumConnection.edges.length) {
    return <></>
  }

  return (
    <div className={classes.recommendationsContainer}
      style={{ maxWidth: props.maxWidthCarousel }}
    >
      <CarouselFixedHeightVariableWidth
        carouselId={carouselId}
        numberOfItems={numItems}
        maxWidthCarousel={props.maxWidthCarousel}
        wishlistStyle={{
          top: "calc(50% - 1rem)"
        }}
        // getPrevPage={getPrevPage}
        // getNextPage={getNextPage}
        getPrevPage={() => {}}
        getNextPage={() => {}}
        refetch={wishlistConnectionResponse.refetch}
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
  initialProducts?: ProductsConnectionCursorBased;
  numberOfCarouselItems?: number;
  maxWidthCarousel?: number;
  topHalfFraction?: number;
  wishlistOffset?: string;
}
interface QueryVar {
  query: ConnectionOffsetQuery;
}
interface QueryData {
  productsRecommendedConnection: ProductsConnectionCursorBased
}


const styles = (theme: Theme) => createStyles({
  recommendationsContainer: {
    marginTop: '1rem',
    width: '100%',
  },
});


export default withStyles(styles)( YouMayAlsoLikeCarousel );







