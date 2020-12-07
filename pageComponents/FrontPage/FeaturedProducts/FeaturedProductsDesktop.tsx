import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import Link from "next/link";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import PreviewCardResponsive from "pageComponents/FrontPage/PreviewCardResponsive";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
import WishlistIcon from "components/WishlistIcon";
// GraphQL Typings
import {
  Product,
  Order_By,
  ProductsConnection,
} from "typings/gqlTypes";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
import Or from "components/Or";
import { useScrollYPosition } from "utils/hooks";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useDebouncedCallback } from 'use-debounce';
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "queries/gun-queries";
// import { GET_CURATED_LIST } from "queries/curated-lists";




const FeaturedProductsDesktop = (props: ReactProps) => {

  const {
    classes,
    productsConnection,
    cardsPerRow = {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    },
  } = props;

  const [loadCarouselPics, setLoadCarouselPics] = React.useState({});

  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"))


  return (
    <main className={classes.root}>

      <div className={classes.flexRow}>
        <Typography variant="h3"
          className={clsx(classes.title, classes.maxWidth)}
          gutterBottom
        >
          Featured Downloads
        </Typography>
      </div>

      <div className={classes.carouselContainer}>
        {
          (option(props).productsConnection.edges([]).length > 0)
          ? props.productsConnection.edges.map(({ node: product }, i) =>
              <div key={product.id + `_${i}`}
                className={xsDown ? classes.productImageXs : classes.productImage}
              >
                <div className={clsx(
                  smDown ? classes.flexItemMobile : classes.flexItem,
                  classes.flexItemHover,
                )}>
                  <PreviewCardResponsive
                    product={product as Product}
                    cardsPerRow={cardsPerRow}
                    listName={"featured-list"}
                    loadCarouselPics={loadCarouselPics}
                    setLoadCarouselPics={setLoadCarouselPics}
                    productIndex={i}
                  />
                </div>
              </div>
            )
          : <LoadingCards count={4} />
        }
      </div>
    </main>
  )
}


/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  productsConnection: ProductsConnection;
  // sortAscending: boolean; // must be top-level
  // cause Desktop and Mobile share the same queries. Possible clash in variables
  // don't want Desktop's sortAscend: true, while Mobile is false,
  // as both queries will be sent and returned data conflicts
}


/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: '1rem',
  },
  maxWidth: {
    maxWidth: '1160px',
    width: '100%',
  },
  carouselContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '1rem', // balances 1rem margin-right on flexItems
  },
  paddingRight: {
    paddingRight: '1rem',
  },
  productImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '1rem',
  },
  productImageXs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingRight: '1rem',
  },
  title: {
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItem: {
    marginBottom: '1rem',
    // borderBottom: "1px solid #f7f7f7",
    borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
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
      // borderBottom: `1px solid ${Colors.lightGrey}`,
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


export default withStyles(styles)( FeaturedProductsDesktop );







