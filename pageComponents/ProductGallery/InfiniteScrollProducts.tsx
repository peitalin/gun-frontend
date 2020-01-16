import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
import Link from "next/link";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import PreviewCardInfiniteScroll from "pageComponents/ProductGallery/PreviewCardInfiniteScroll";
import WishlistButton from "components/WishlistButton";
// Graphql
import {
  GET_RECOMMENDED_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_DEALS_ENDING_SOON_PRODUCTS,
  GET_LIMITED_RELEASE_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "queries/products-queries";
// GraphQL Typings
import { Connection, Product, ConnectionQuery, ProductsConnection } from "typings/gqlTypes";
import { CARD_MAX_WIDTH, CARD_MIN_WIDTH, CARD_MAX_HEIGHT, CARD_MIN_HEIGHT } from "./PreviewCardInfiniteScroll";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
import Or from "components/Or";
import { useScrollYPosition } from "utils/hooks";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// import { WishlistItemId } from "reduxStore/wishlist-reducer";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";





const InfiniteScrollProducts = (props: ReactProps) => {

  const { classes, initialProducts } = props;
  const count = 6;

  // accumulate connection results as you scroll down.
  // seed with getInitialProps
  const [accumConnection, setAccumConnection] = React.useState(
    initialProducts
    || { edges: [], pageInfo: undefined } as ProductsConnection
  );

  const {
    loading,
    error,
    data,
    getNextPage,
    getPrevPage,
  } = usePaginateQueryHook<QueryData, QueryVar, Product>({
    query: GET_ALL_PRODUCTS,
    variables: {},
    connectionSelector: (data: QueryData) => [
      option(data).productsAllConnection(),
      'productsAllConnection'
    ],
    count: count,
    ssr: true,
  });

  const connection = option(data).productsAllConnection();


  React.useEffect(() => {
    if (option(connection).edges()) {
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


  let yPos = useScrollYPosition();
  let bottomOffset = 50;
  let isBottom;
  if (process.browser) {
    isBottom = yPos > (document.body.clientHeight
                        - window.innerHeight
                        - bottomOffset);
  } else {
    isBottom = false;
  }

  React.useEffect(() => {
    if (isBottom) {
      console.log('bottom', yPos)
      getNextPage()
    }
  }, [isBottom])

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const xs = useMediaQuery(theme.breakpoints.only("xs"))

  return (
    <main className={classes.root}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Latest Additions
      </Typography>
      <div className={clsx(
        classes.carouselContainer,
        sm ? classes.paddingRight : null,
      )}>
        {
          option(accumConnection).edges() &&
          accumConnection.edges.map(({ node: product }) =>
            <div
              key={product.id}
              className={xs ? classes.productImageXs : classes.productImage}
            >
              <AirItemProduct key={product.id}
                product={product}
                classes={classes}
              />
            </div>
          )
        }
        {
          option(accumConnection).pageInfo.isLastPage() &&
          <div className={classes.paginateEndMessage}>
            <Or title={"End"}/>
          </div>
        }
      </div>
    </main>
  )
}


const AirItemProduct = (props: AirItemProductProps) => {

  const { product, classes } = props;
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <div className={clsx(
      smDown ? classes.flexItemMobile : classes.flexItem,
      classes.flexItemHover,
    )}>
      <PreviewCardInfiniteScroll
        product={product}
      />
    </div>
  )
}

/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  initialProducts?: ProductsConnection;
}
interface QueryData {
  productsAllConnection: ProductsConnection
}
interface QueryVar {
}

interface AirItemProductProps extends WithStyles<typeof styles> {
  key: string | number;
  product: Product;
}

/////////// Styles //////////////

export const cardCornerRadius = 3;
const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: '1rem',
    maxWidth: '1080px', // 4 products per row
  },
  carouselContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '1rem', // balances 1rem margin-right on flexItems
  },
  paddingRight: {
    paddingRight: '1rem',
  },
  productImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImageXs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    marginTop: "1rem",
    marginBottom: "1rem",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItemMobile: {
    flexGrow: 1,
    marginBottom: '1rem',
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItem: {
    marginBottom: '1rem',
    marginRight: '1rem',
    borderBottom: "1px solid #f7f7f7",
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItemHover: {
    "&:hover": {
      // borderBottom: `1px solid ${Colors.purple}`, // purple
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  flexItemHoverNull: {
    "&:hover": {
      borderBottom: `1px solid ${Colors.lightGrey}`,
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  paginateEndMessage: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
    marginLeft: '20%',
    marginRight: '20%',
  },
});


export default withStyles(styles)( InfiniteScrollProducts );







