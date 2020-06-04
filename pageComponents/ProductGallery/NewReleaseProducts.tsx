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
import PreviewCardResponsive from "pageComponents/ProductGallery/PreviewCardResponsiveCarousel";
import PreviewCardLoading from "./PreviewCardLoading";
import LoadingCards from "./LoadingCards";
// Graphql Typings
import { ProductsConnection } from "typings/gqlTypes";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// GraphQL
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { GET_PRODUCTS } from "queries/gun-queries";



const NewReleaseProducts = (props: ReactProps) => {

  const {
    classes,
    initialProducts,
    count = 24,
    title = "New Releases"
  } = props;

  // const {
  //   loading,
  //   error,
  //   data,
  //   getNextPage,
  //   getPrevPage,
  // } = usePaginateQueryHook<QueryData, QueryVar, Product>({
  //   query: GET_ALL_PRODUCTS,
  //   variables: {},
  //   connectionSelector: (data: QueryData) => [
  //     option(data).productsAllConnection(),
  //     'productsAllConnection'
  //   ],
  //   sortAscending: false,
  //   count: count,
  //   ssr: true,
  // });

  const { loading, error, data } = useQuery<QueryData, QueryVar>(
    GET_PRODUCTS, {
    variables: {
      query: {
        limit: 10,
        offset: 0,
      }
    },
    ssr: true,
  })

  const [loadCarouselPics, setLoadCarouselPics] = React.useState({});
  const productLoading = {
    name: "",
    tagline: "",
  }


  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const smDown = useMediaQuery(theme.breakpoints.only("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.only("xs"))


  let products = option(data).productsAllConnection()

  return (
    <main className={classes.root}>

      <div className={classes.flexRow}>
        {
          (option(products).edges([]).length > 0) &&
          <Typography variant="h3"
            className={clsx(classes.title, classes.maxWidth)}
            gutterBottom
          >
            {title}
          </Typography>
        }
      </div>

      <div className={clsx(
        classes.carouselContainer,
        smDown ? classes.paddingRight : null,
      )}>
        {
          (option(products).edges([]).length > 0)
          ? products.edges.map(({ node: product }, i) =>
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
                    refetch={undefined}
                    listName={"new-release-list"}
                    loadCarouselPics={loadCarouselPics}
                    setLoadCarouselPics={setLoadCarouselPics}
                    productIndex={i}
                  />
                </div>
              </div>
            )
          : <LoadingCards count={8} />
        }
      </div>
    </main>
  )
}



/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  initialProducts?: ProductsConnection;
  count?: number;
  title?: string;
}
interface QueryData {
  productsAllConnection: ProductsConnection;
}
interface QueryVar {
}

/////////// Styles //////////////

export const cardCornerRadius = 4;
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
    marginBottom: "0.5rem",
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
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItem: {
    width: '100%',
    // borderBottom: "1px solid #f7f7f7",
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


export default withStyles(styles)( NewReleaseProducts );







