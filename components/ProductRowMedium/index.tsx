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
        <div className={clsx(
          classes.flexColOuter,
          smDown ? classes.flexColPaddingSm : classes.flexColPadding
        )}>
          {
            product?.featuredVariant?.previewItems?.[0]
            ? <Link
                href="/p/[productIdOrSlug]"
                as={`/p/${product?.id}`}
              >
                <a>
                  <ProductPreviewCardRowSmall
                    previewItem={product.featuredVariant.previewItems[0]}
                    width={smDown ? 88 : 144}
                    height={smDown ? 55 : 90}
                  />
                </a>
              </Link>
            : <ProductPreviewCardRowSmall
                previewItem={undefined}
                width={smDown ? 88 : 144}
                height={smDown ? 55 : 90}
              />
          }
        </div>

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
                  {product?.category?.name}
                </Typography>

                <Link
                  href="/p/[productIdOrSlug]"
                  as={`/p/${product?.id}`}
                >
                  <a>
                    <Typography className={classes.name} variant="body1">
                      {product?.currentSnapshot?.title}
                    </Typography>
                  </a>
                </Link>

                <Typography className={classes.tagline} variant="body1">
                  {product?.currentSnapshot?.model}
                </Typography>

                <Typography className={classes.storeName} variant="body1">
                  {product?.store?.user?.license?.id}
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
    padding: '1rem 0rem 1rem 1rem',
  },
  flexColPaddingSm: {
    padding: '1rem 0rem 1rem 0rem',
  },
  flexColInner60: {
    flexBasis: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: "1rem",
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
    padding: '1rem 0rem 1rem 1rem',
  },
  flexGrow: {
    flexGrow: 1,
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  priceContainer: {
    marginTop: '0.5rem',
  },
  category: {
    fontWeight: 600,
    color: Colors.grey,
    textTransform: "uppercase",
    fontSize: '0.8rem',
    "&:hover": {
      color: Colors.blue,
    },
  },
  name: {
    fontWeight: 600,
    fontSize: '1rem',
    color: Colors.charcoal,
    lineHeight: '1rem',
    margin: '0.25rem 0rem',
    "&:hover": {
      color: Colors.blue,
    },
  },
  tagline: {
    fontWeight: 600,
    color: Colors.darkGrey,
    lineHeight: '0.9rem',
    fontSize: '0.8rem',
    marginBottom: '0.25rem',
  },
  storeName: {
    fontWeight: 600,
    color: Colors.ghostGrey,
    fontSize: '0.8rem',
    "&:hover": {
      color: Colors.blue,
    },
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



export default withStyles(styles)(React.memo(
  (props: ReactProps) => <ProductRowMedium {...props}/>,
  // (prevProps, nextProps) => {
  //   // return prevProps.product === nextProps.product
  //   return true
  // }
));
