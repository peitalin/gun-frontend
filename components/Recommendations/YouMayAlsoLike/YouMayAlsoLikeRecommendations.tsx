import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Graphql
import {
  GET_RECOMMENDED_PRODUCTS,
} from "queries/products-queries";
// Components
import PreviewCardResponsive from "pageComponents/ProductGallery/PreviewCardResponsive";
// Typings
import { Connection, Product, Edge, ProductsConnection } from "typings/gqlTypes";
// Router
import Link from "next/link";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
// CSS
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { shuffle } from "utils/misc";
import { QueryWishlistHookArgs } from "pageComponents/Wishlist";
// Analytics
import { useAnalytics, analyticsEvent } from "utils/analytics";
import { getProductIdOrSlug } from "utils/links";



const YouMayAlsoLikeRecommendations = (props: ReactProps) => {

  const {
    classes,
    count,
    title = "You may also like",
  } = props;

  const {
    loading,
    error,
    data,
    getNextPage,
    getPrevPage,
    refetch,
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
  // wishlist refetch
  const wishlistConnectionResponse = usePaginateQueryHook(QueryWishlistHookArgs);

  const theme = useTheme();
  // jumboXL preview card on sm screen size only, remove right margin
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.only("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.only("xs"))


  // const renderWithLoadingProducts = (products: ProductsConnection) => {

  //   const itemsExist = !!option(products).edges([]).length;

  //   if (!itemsExist) {
  //     return [...Array(4).keys()].map(n =>
  //       <div key={n}
  //         className={clsx(
  //           classes.flexItem,
  //           classes.flexItemHover,
  //           classes.positionRelative,
  //         )}
  //       >
  //         <div className={classes.productImage}>
  //           <ProductRecommendationRow
  //             product={undefined}
  //             index={index}
  //             setIndex={setIndex}
  //           />
  //         </div>
  //       </div>
  //     )
  //   } else if (!itemsExist && error) {
  //     return (
  //       <div key={1}
  //         className={clsx(
  //           classes.flexItemHover,
  //           classes.positionRelative,
  //         )}
  //       >
  //         <div className={classes.productImage}>
  //           <Typography variant="body2" className={classes.noRecommendationsText}>
  //             No Recommendations Available
  //           </Typography>
  //         </div>
  //       </div>
  //     )
  //   } else {
  //     return products.edges.map(({ node: product }) => {

  //         let { featuredVariant } = product;
  //         let previewItem = option(product).featuredVariant.previewItems[0]();

  //         return (
  //           <div key={option(featuredVariant).variantId()}
  //             className={clsx(
  //               classes.flexItem,
  //               classes.flexItemHover,
  //               classes.positionRelative,
  //             )}
  //           >
  //             <Link
  //               href={"/p/[productIdOrSlug]"}
  //               as={`/p/${getProductIdOrSlug(product)}`}
  //             >
  //               <a
  //                 className={classes.productImage}
  //                 onClick={() => {
  //                   refetch()
  //                   setIndex(0) // reset featuredPreview carousel index
  //                   if (window && window.scrollTo) {
  //                     // window.scrollTo(0,0)
  //                     window.scrollTo({
  //                       top: 0,
  //                       behavior: 'smooth'
  //                     });
  //                   }
  //                 }}
  //               >
  //                 <ProductRecommendationRow
  //                   product={product}
  //                   index={index}
  //                   setIndex={setIndex}
  //                 />
  //               </a>
  //             </Link>
  //           </div>
  //         );
  //       })
  //   }
  // }


  return (
    <main className={classes.root}>

      <div className={classes.flexRow}>
        {
          (option(connection).edges([]).length > 0) &&
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
          (option(connection).edges([]).length > 0) &&
          connection.edges.map(({ node: product }) =>

            <div key={product.id}
              onClick={() => analyticsEvent("Recommendations.Bottom.Pressed")}
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
                  refetch={wishlistConnectionResponse.refetch}
                />
              </div>
            </div>

          )
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
  productsRecommendedConnection: ProductsConnection
}
interface QueryVar {
}

export const cardCornerRadius = 4;
const styles = (theme: Theme) => createStyles({
  root: {
    maxWidth: '1160px', // 4 products per row
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


export default withStyles(styles)( YouMayAlsoLikeRecommendations );







