import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Router
import Link from "next/link";
// Typings
import { Product } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
// Material UI
import Button from "@material-ui/core/Button";
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
import Typography from "@material-ui/core/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
// import AddCartItemButton from "components/AddCartItemButton";
// import WishlistButton from "components/WishlistButton";
import DescriptionLoadingText from "./DescriptionLoadingText";
// helpers
import { useRouter } from "next/router";
import { asCurrency as c } from "utils/prices";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";



const ProductRowMedium = (props: ReactProps) => {

  const { classes, product } = props;
  const featuredVariant = product?.featuredVariant;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))


  return (
    <ErrorBounds className={clsx(
      classes.productRowRoot,
      classes.flexRow,
    )}>
        <ShowOnMobileOrDesktopSSR desktop>
          <div className={clsx(
            classes.flexColOuter,
            classes.flexColPadding,
          )}>
            {
              featuredVariant?.previewItems?.[0]
              ? <Link
                  href="/p/[productIdOrSlug]"
                  as={`/p/${product?.id}`}
                >
                  <a>
                    <ProductPreviewCardRowSmall
                      previewItem={featuredVariant.previewItems[0]}
                      width={144}
                      height={90}
                    />
                  </a>
                </Link>
              : <ProductPreviewCardRowSmall
                  previewItem={undefined}
                  width={144}
                  height={90}
                />
            }
          </div>
        </ShowOnMobileOrDesktopSSR>
        <ShowOnMobileOrDesktopSSR mobile>
          <div className={clsx(
            classes.flexColOuter,
            classes.flexColPaddingSm,
          )}>
            {
              featuredVariant?.previewItems?.[0]
              ? <Link
                  href="/p/[productIdOrSlug]"
                  as={`/p/${product?.id}`}
                >
                  <a>
                    <ProductPreviewCardRowSmall
                      previewItem={featuredVariant.previewItems[0]}
                      width={88}
                      height={55}
                    />
                  </a>
                </Link>
              : <ProductPreviewCardRowSmall
                  previewItem={undefined}
                  width={88}
                  height={55}
                />
            }
          </div>
        </ShowOnMobileOrDesktopSSR>

        <div className={clsx(
          classes.flexRowWrapOuter,
          classes.flexGrow
        )}>

          {
            !product?.currentSnapshot?.title
            ? <div className={classes.flexColInner60}>
                <DescriptionLoadingText/>
              </div>
            : <div className={classes.flexColInner60}>
                <Typography className={classes.category} variant="body1">
                  {/* {product?.category?.name} */}
                  {`${product?.currentSnapshot?.model} ${product?.currentSnapshot?.make}`}
                </Typography>

                <Link
                  href="/p/[productIdOrSlug]"
                  as={`/p/${product?.id}`}
                >
                  <a>
                    <Typography className={classes.title} variant="body1">
                      {product?.currentSnapshot?.title}
                    </Typography>
                  </a>
                </Link>

                <Typography className={classes.dealerState} variant="body1">
                  {product?.currentSnapshot?.dealer?.state}
                </Typography>

                <div className={classes.priceContainer}>
                  {
                    product?.featuredVariant &&
                    <PriceDisplayMainMobile
                      price={product?.featuredVariant?.price}
                      soldOutStatus={product?.soldOutStatus}
                    />
                  }
                </div>
              </div>
          }

      </div>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  loading?: boolean;
  refetch?(): void; // apollo refetch
}

const styles = (theme: Theme) => createStyles({
  productRowRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexBasis: '100%',
  },
  flexColOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexColPadding: {
    padding: '0.5rem 0rem 0.5rem 1rem',
  },
  flexColPaddingSm: {
    padding: '0.5rem 0rem 0.5rem 0rem',
  },
  flexColInner60: {
    flexBasis: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: "0.5rem",
    flexGrow: 1,
  },
  flexColInner30: {
    flexBasis: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: "center",
    flexGrow: 1,
    maxWidth: 250,
  },
  flexRowOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    margin: "0.5rem",
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexRowWrapOuter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0rem 0rem 1rem 1rem',
  },
  flexGrow: {
    flexGrow: 1,
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  priceContainer: {
    marginTop: '0.25rem',
  },
  category: {
    fontWeight: 600,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
    textTransform: "uppercase",
    fontSize: '0.8rem',
  },
  title: {
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    lineHeight: '1rem',
    margin: '0.25rem 0rem',
    "&:hover": {
      color: theme.palette.type === 'dark'
        ? Colors.purple
        : Colors.blue,
    },
  },
  modelMake: {
    fontWeight: 600,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyDarkest,
    lineHeight: '0.9rem',
    fontSize: '0.8rem',
    marginBottom: '0.25rem',
  },
  dealerState: {
    fontWeight: 600,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    fontSize: '0.8rem',
  },
  variant: {
    fontWeight: 600,
    color: Colors.ghostGrey,
    fontSize: '0.8rem',
  },
  cartButton: {
    height: 40,
    maxHeight: 40,
    minWidth: '180px',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    borderRadius: '4px',
    // backgroundColor: "#EDF0F2",
    border: `1px solid ${Colors.secondary}`,
    color: `1px solid ${Colors.secondary}`,
    "&:hover": {
      border: `1px solid ${Colors.secondaryBright}`,
      color: `1px solid ${Colors.secondary}`,
    },
    maxWidth: 300,
    flexGrow: 0.5,
    width: '100%',
  },
});



export default withStyles(styles)(ProductRowMedium)