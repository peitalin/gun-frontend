import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Graphql
import {
  GET_RECOMMENDED_PRODUCTS,
} from "queries/products-queries";
// Components
import PreviewCardResponsive from "pageComponents/FrontPage/PreviewCardResponsive";
import LoadingCards from "pageComponents/FrontPage/LoadingCards";
// Typings
import {
  ConnectionOffsetQuery,
  Product,
  Edge,
  ProductsConnection,
} from "typings/gqlTypes";
// Router
import Link from "next/link";
// Paginator hooks
import { useQuery } from "@apollo/client";
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
// CSS
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { shuffle } from "utils/misc";



const YouMayAlsoLikeRecommendations = (props: ReactProps) => {

  const {
    classes,
    count,
    title = "Explore other products",
  } = props;

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

  const connection = option(data).getRecommendedProductsConnection();

  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.only("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.only("xs"))


  let productsExist = option(connection).edges([]).length > 0;
  console.log("recommmmmmm", data)

  if (!productsExist && !loading) {
    return <div className={"you-may-also-like-products-empty"}></div>
  }

  return (
    <main className={classes.root}>

      <div className={clsx(classes.flexRow, classes.minHeight50px)}>
        <Typography variant="h3"
          className={clsx(classes.title, classes.maxWidth)}
          gutterBottom
        >
          { productsExist ? `${title}` : '' }
        </Typography>
      </div>

      <div className={clsx(
        classes.carouselContainer,
        smDown ? classes.paddingRight : null,
      )}>
        {
          productsExist
          ? connection.edges.map(({ node: product }) =>

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
                    // refetch={wishlistConnectionResponse.refetch}
                    style={{
                      marginBottom: '0.5rem',
                    }}
                  />
                </div>
              </div>
            )
          : <LoadingCards count={8}/>
        }
      </div>
    </main>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  count?: number;
  title?: string;
}
interface QueryData {
  getRecommendedProductsConnection: ProductsConnection
}
interface QueryVar {
  query?: ConnectionOffsetQuery
}

const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: '1rem',
  },
  maxWidth: {
    maxWidth: '1160px',
    width: '100%',
  },
  minHeight50px: {
    height: '50px',
  },
  carouselContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingLeft: '1rem', // balances 1rem margin-right on flexItems
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
    marginBottom: "0.5rem",
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
});


export default withStyles(styles)( YouMayAlsoLikeRecommendations );







