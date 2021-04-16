import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { col2MinWidth } from "pageComponents/P/common";
import { BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
// Typings
import { Product, ProductsConnection } from "typings/gqlTypes";
// Router
import Link from "next/link";
// Paginator hooks
import ProductRecommendationRow from "./ProductRecommendationRow";
// CSS
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';




const RenderProductRecommendations: React.FC<ReactProps> = (props) => {

  const {
    classes,
    products,
    error,
    index,
    setIndex,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const itemsExist = !!products?.edges?.length;

  if (!itemsExist && error) {
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
  } else if (!itemsExist) {
    return (
      <React.Fragment>
        {
          [...Array(4).keys()].map(n =>
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
        }
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {
          products.edges.map(({ node: product }) => {

            let { featuredVariant } = product;
            let previewItem = product?.featuredVariant?.previewItems?.[0]

            return (
              <div key={featuredVariant?.variantId}
                className={clsx(
                  classes.flexItem,
                  classes.positionRelative,
                )}
              >
                <Link
                  href={"/p/[productId]"}
                  as={`/p/${product?.id}`}
                >
                  <a
                    className={classes.productImage}
                    onClick={() => {
                      setIndex(0) // reset featuredPreview carousel index
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
      </React.Fragment>
    )
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  index?: number;
  setIndex?(a?: any): void;
  products: ProductsConnection;
  error: any;
  currentlyViewingProductIdOrSlug?: string;
}


const styles = (theme: Theme) => createStyles({
  root: {
    minWidth: col2MinWidth, // 340px
    paddingTop: '1rem',
  },
  pageRecommendationsBox: {
    marginTop: '2rem',
    padding: '1rem',
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


export default withStyles(styles)( RenderProductRecommendations );







