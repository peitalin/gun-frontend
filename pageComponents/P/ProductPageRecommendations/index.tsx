import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { col2MinWidth } from "../common";
import { BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Graphql
import {
  GET_RECOMMENDED_PRODUCTS,
} from "queries/products-queries";
// Typings
import { Product, Edge, ProductsConnection } from "typings/gqlTypes";
// Router
import Link from "next/link";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
import ProductRecommendationRow from "./ProductRecommendationRow";
// CSS
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { shuffle } from "utils/misc";
// Analytics
import { useAnalytics, analyticsEvent } from "utils/analytics";




const ProductPageRecommendations = (props: ReactProps) => {

  const {
    classes,
    index,
    setIndex,
  } = props;
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  // accumulate connection results as you scroll down.
  // seed with getInitialProps
  const [accumConnection, setAccumConnection] = React.useState(
    { edges: [], pageInfo: undefined } as ProductsConnection
  );
  const [state, setState] = React.useState({
    scrollEl: undefined,
    clientHeight: undefined, // viewable area
    scrollHeight: undefined, // full scrollable area
    scrollTop: undefined, // where scroll is in scrollable area
  });

  const {
    loading,
    error,
    data,
    getNextPage,
    getPrevPage,
    refetch,
  } = usePaginateQueryHook<QueryData, QueryVar, Product>({
    query: GET_RECOMMENDED_PRODUCTS,
    variables:
      props.currentlyViewingProductIdOrSlug
      ? { currentlyViewingProductIdOrSlug: props.currentlyViewingProductIdOrSlug }
      : {},
    connectionSelector: (data: QueryData) => [
      option(data).productsRecommendedConnection(),
      'productsRecommendedConnection'
    ],
    count: 10,
    ssr: true,
  });

  const connection = option(data).productsRecommendedConnection();
  const products = accumConnection;


  React.useEffect(() => {
    if (option(connection).edges()) {
      setAccumConnection(s => {
        return {
          ...connection,
          edges: shuffle([
            ...s.edges,
            ...connection.edges
              .filter(e => !s.edges.find(s => s.node.id === e.node.id))
          ])
        }
      })
    }
  }, [option(connection).edges()])


  const maxScrollDown = state.scrollHeight - state.clientHeight;
  const isEnd = process.browser
    ? state.scrollTop > (maxScrollDown - 20) // 10px offset
    : false;


  React.useEffect(() => {
    const updateScrollTop = () => {
      setState(s => ({ ...s, scrollTop: el.scrollTop }));
    }
    let el = document.querySelector("#product-page-recommendations")
    if (el) {
      el.addEventListener("scroll", updateScrollTop);
    }
    setState(s => ({
      ...s,
      scrollEl: el,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
    }))

    return () => {
      if (el) {
        el.removeEventListener("scroll", updateScrollTop)
      }
    }
  }, [accumConnection.edges.length])


  React.useEffect(() => {
    if (isEnd) {
      console.log("end hit")
      getNextPage()
    }
  }, [isEnd])


  const renderWithLoadingProducts = (products: ProductsConnection) => {

    const itemsExist = !!option(products).edges([]).length;


    if (!itemsExist) {
      return [...Array(4).keys()].map(n =>
        <div key={n}
          className={clsx(
            classes.flexItem,
            classes.positionRelative,
          )}
        >
          <div className={classes.productImage}>
            <ProductRecommendationRow
              product={undefined}
              index={index}
              setIndex={setIndex}
            />
          </div>
        </div>
      )
    } else if (!itemsExist && error) {
      return (
        <div key={1}
          className={clsx(
            classes.positionRelative,
          )}
        >
          <div className={classes.productImage}>
            <Typography variant="body2" className={classes.noRecommendationsText}>
              No Recommendations Available
            </Typography>
          </div>
        </div>
      )
    } else {
      return products.edges.map(({ node: product }) => {

          let { featuredVariant } = product;
          let previewItem = option(product).featuredVariant.previewItems[0]();

          return (
            <div key={option(featuredVariant).variantId()}
              className={clsx(
                classes.flexItem,
                classes.positionRelative,
              )}
            >
              <Link
                href={"/p/[productId]"}
                as={`/p/${product.id}`}
              >
                <a
                  className={classes.productImage}
                  onClick={() => {
                    refetch()
                    setIndex(0) // reset featuredPreview carousel index
                    analyticsEvent("Recommendations.Sidebar.Pressed")
                    if (window && window.scrollTo) {
                      // window.scrollTo(0,0)
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  <ProductRecommendationRow
                    product={product}
                    index={index}
                    setIndex={setIndex}
                  />
                </a>
              </Link>
            </div>
          );
        })
    }
  }


  return (
    <main className={clsx(
      classes.root,
    )}>
      <Typography variant="subtitle2" className={classes.title} gutterBottom>
        Recommended Products
      </Typography>
      <main id="product-page-recommendations"
        className={clsx(
          classes.flexRow,
          classes.productRecommendations,
        )}
      >
      { renderWithLoadingProducts(products) }
      </main>
    </main>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  index?: number;
  setIndex?(a?: any): void;
  currentlyViewingProductIdOrSlug?: string;
}
interface QueryData {
  productsRecommendedConnection: ProductsConnection
}
interface QueryVar {
}


const styles = (theme: Theme) => createStyles({
  root: {
    minWidth: col2MinWidth, // 340px
    paddingLeft: '1rem',
    paddingTop: '1rem',
  },
  productImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 500,
    marginBottom: "0.5rem",
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
    // width: CARD_HEIGHT / 0.666, // 16:10
    // borderBottom: "1px solid #f7f7f7",
    borderRadius: BorderRadius,
  },
  paginateButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionRelative: {
    position: 'relative',
    width:'100%',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
  },
  productRecommendations: {
    // maxHeight: 580,
    // overflow: 'scroll',
  },
  marginHalf: {
    margin: '0rem 0.5rem',
  },
  margin1: {
    margin: '0rem 1rem',
  },
  noRecommendationsText: {
    width: '100%',
    textAlign: 'center',
    padding: '1rem',
    border: `1px solid ${Colors.lightGrey}`,
    borderRadius: '4px',
  },
});


export default withStyles(styles)( ProductPageRecommendations );







