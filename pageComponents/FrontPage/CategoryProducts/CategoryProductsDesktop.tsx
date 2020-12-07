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
import LoadingCards from "../LoadingCards";
// Graphql
import {
  GET_RECOMMENDED_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "queries/products-queries";
// GraphQL Typings
import { Connection, Product, ProductsConnection } from "typings/gqlTypes";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
import Or from "components/Or";
import { useScrollYPosition } from "utils/hooks";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
// useMediaQuery
import { useQuery, useApolloClient } from "@apollo/client";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowRight from "@material-ui/icons/ArrowRight";





const CategoryProducts = (props: ReactProps) => {

  const {
    classes,
    initialProducts,
    categoryIdOrName = "Video LUTs",
    // categoryIdOrName = "Lightroom Presets",
    cardsPerRow = {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
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
    ssr: true,
  });

  // console.log("category products: ", data)

  const [loadCarouselPics, setLoadCarouselPics] = React.useState({});

  const connection = option(data).productsByCategoryConnectionPageBased(initialProducts);
  const numProducts = option(connection).edges([]).length;

  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const smDown = useMediaQuery(theme.breakpoints.only("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.only("xs"))

  return (
    <main className={classes.root}>

      <div className={classes.flexRow}>
        {
          (numProducts > 0) &&
          <Typography variant="h3"
            className={clsx(classes.title, classes.maxWidth)}
            gutterBottom
          >
            {categoryIdOrName}
          </Typography>
        }
      </div>

      <div className={clsx(
        classes.carouselContainer,
        smDown ? classes.paddingRight : null,
      )}>
        {
          loading
          ? <LoadingCards
              count={count}
              cardsPerRow={cardsPerRow}
            />
          : (numProducts > 0)
            ? connection.edges.map(({ node: product }, i) =>
                <div key={product.id}
                  className={
                    xsDown
                    ? classes.productImageXs
                    : sm
                      ? classes.productImageSm
                      : classes.productImage
                  }
                >
                  <div className={clsx(
                    smDown ? classes.flexItemMobile : classes.flexItem,
                    classes.flexItemHover,
                  )}>
                    <PreviewCardResponsive
                      product={product}
                      cardsPerRow={cardsPerRow}
                      listName={"categories-list"}
                      loadCarouselPics={loadCarouselPics}
                      setLoadCarouselPics={setLoadCarouselPics}
                      productIndex={i}
                    />
                  </div>
                </div>
              )
            : null
        }
      </div>
      {
        (numProducts > 0) &&
        <div className={classes.categoryLinkContainer}>
          <Link key={categoryIdOrName}
            href="/categories/[categoryIdOrName]"
            as={`/categories/${categoryIdOrName}`}
          >
            <a className={classes.categoryLinkBorder}>
              Browse more <ArrowRight/>
            </a>
          </Link>
        </div>
      }
    </main>
  )
}



/////////// Typings //////////////

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

/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  root: {
  },
  maxWidth: {
    maxWidth: '1160px', // 4 products per row
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
  productImageSm: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '0rem',
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
    justifyContent: 'flex-start',
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
    width: '100%',
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
  categoryLinkContainer: {
    marginRight: '2rem',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  categoryLinkBorder: {
    fontSize: '0.8rem',
    color: Colors.charcoal,
    // borderBottom: `2px solid ${Colors.charcoal}`,
    borderBottom: `2px solid ${Colors.white}`,
    // borderRadius: '2px',
    paddingLeft: '0.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: theme.transitions.create(['border', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '800ms',
    }),
    "&:hover": {
      color: Colors.secondaryBright,
      borderBottom: `2px solid ${Colors.secondaryBright}`,
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  descriptionLoading: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    paddingTop: 0,
    borderBottom: `1px solid ${Colors.lightestGrey}`,
    "&:hover": {
      borderBottom: `1px solid ${Colors.lightestGrey}`,
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
      })
    },
  }
});


export default withStyles(styles)( CategoryProducts );







