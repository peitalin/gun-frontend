import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Graphql
import { GET_PRODUCTS_BY_CATEGORY } from "queries/products-queries";
// useMediaQuery
import { useQuery, useApolloClient } from "@apollo/client";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Typings
import {
  Product,
  ProductsConnection,
} from "typings/gqlTypes";
// Paginator hooks
import { ConnectionQueryProps } from "components/Paginators/usePaginateQueryHook";
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
// Wishlist
import ProductCardResponsive from "components/ProductCardResponsive";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
import AirCarousel from "components/AirCarousel";





const CategoryProductsMobile = (props: ReactProps) => {

  const {
    classes,
    initialProducts,
    categoryIdOrName = "Video LUTs",
    // categoryIdOrName = "Lightroom Presets",
    cardsPerRow = {
      xs: 1.5,
      sm: 1.5,
      md: 1.5, // redundant, since mobile is sm only
      lg: 1.5,
      xl: 1.5,
    },
    count = 3,
  } = props;

  // const gqlVariables = categoryIdOrName.startsWith("pcategory")
  //   ? { categoryId: categoryIdOrName }
  //   : { categoryName: categoryIdOrName }

  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      categoryName: categoryIdOrName,
      query: {
        count: count
      },
    },
    ssr: true, // must be true cause Apollo is stupid
  });

  const connection = data?.productsByCategoryConnectionPageBased ?? initialProducts
  // // wishlist refetch
  // const wishlistConnectionResponse = usePaginateQueryHook(QueryWishlistHookArgs);

  if (loading) {
    return (
      <main className={classes.root}>
        <Typography variant="h3" className={classes.title} gutterBottom>
          {categoryIdOrName}
        </Typography>
        <LoadingCards
          count={4}
          flexWrapItems={false}
          cardsPerRow={cardsPerRow}
        />
      </main>
    )
  }

  return (
    <main className={classes.root}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        {categoryIdOrName}
      </Typography>

      <AirCarousel
        id={`category-products-carousel-${categoryIdOrName}`}
        // handleClickLeft={getPrevPage}
        // handleClickRight={getNextPage}
        disableButtons={false}
        scrollSnapType={"x proximity"}
      >
        {
          !!connection?.edges?.[0]
          ? <>
              {
                connection.edges.map(({ node: product }, i) =>
                  <div key={i} style={{
                    marginLeft: '0.5rem',
                  }}>
                    <ProductCardResponsive
                      product={product as Product}
                      cardsPerRow={cardsPerRow}
                    />
                  </div>
                )
              }
            </>
          : <div className={classes.root}>
              <Typography variant="h3">
                No Featured Products yet
              </Typography>
            </div>
        }
      </AirCarousel>
    </main>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  initialProducts?: ProductsConnection;
  count: number;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  categoryIdOrName: string;
}
interface QueryData {
  productsByCategoryConnectionPageBased: ProductsConnection;
}
interface QueryVar {
}

const styles = (theme: Theme) => createStyles({
  root: {
    margin: "0rem 0rem",
    // paddingRight: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    // paddingLeft: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    width: '100%',
  },
  flexRowLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: '0.5rem', // subtract 1rem for carousel buttons: 1rem on both sides
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
    borderRadius: `${BorderRadius}px`,
    position: 'relative',
  },
  flexItemHoverNull: {
    "&:hover": {
      borderBottom: `2px solid ${Colors.lightGrey}`,
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
  // dividerFeaturedProduct: {
  //   border: `2px solid ${Colors.lightGrey}`,
  // },
});


export default withStyles(styles)( CategoryProductsMobile );







