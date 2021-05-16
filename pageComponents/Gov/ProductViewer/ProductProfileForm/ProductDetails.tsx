import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import {
  Product,
  ProductPrivate,
} from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";
import Loading from "components/Loading";
import Link from "next/link";
import ProductCardResponsive from "components/ProductCardResponsive";
// helpers
import { formatDateTime } from "utils/dates";
import { Colors } from "layout/AppTheme";
import currency from 'currency.js';
// validation
import { FormikProps } from 'formik';




const ProductDetails = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    product,
    ...fprops
  } = props;

  // let product: ProductPrivate = props.product as any;
  // console.log("product: ", product)
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  let cardsPerRow = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  };

  React.useEffect(() => {
    fprops.setFieldValue("productId", product?.id)
    fprops.setFieldValue("isSuspended", product?.isSuspended)
  }, [product])

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
    )}>
      <div className={classes.orderItemsContainer}>

        <div className={classes.flexCol}>
          <div className={classes.flexCol}>

            <Typography className={classes.fieldTitle} variant="subtitle1">
              Product
            </Typography>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Product ID:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {product?.id}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Title:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {product?.currentSnapshot?.title}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Model - Make
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {`${product?.currentSnapshot?.model} - ${product?.currentSnapshot?.make}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Created At
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {formatDateTime(product?.createdAt)}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Last Updated
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {formatDateTime(product?.updatedAt)}
              </Typography>
            </div>


            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Price
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {`${c(product?.featuredVariant?.price)}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                isSuspended
              </Typography>
              <Typography
                className={
                  product?.isSuspended
                    ? classes.fieldInfoRed
                    : classes.fieldInfo
                }
                variant="subtitle1"
              >
                {`${product?.isSuspended}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                isPublished
              </Typography>
              <Typography
                className={
                  product?.isPublished
                    ? classes.fieldInfoBlue
                    : classes.fieldInfo
                }
                variant="subtitle1"
              >
                {`${product?.isPublished}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                isDeleted
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {`${product?.isDeleted ?? "-"}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                excludedFromSearch
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {`${product?.isExcludedFromSearch ?? "-"}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                excludedFromRecommends
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {`${product?.isSoldElsewhere ?? "-"}`}
              </Typography>
            </div>

            <Typography className={classes.fieldTitle} variant="subtitle1">
              Seller
            </Typography>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                User ID:
              </Typography>
              <Link href={`/gov/users?userId=${product?.store?.user?.id}`}>
                <Typography
                  className={clsx(classes.fieldInfo, classes.link)}
                  variant="subtitle1"
                >
                  {product?.store?.user?.id}
                </Typography>
              </Link>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License Number:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {product?.sellerLicense?.licenseNumber}
              </Typography>
            </div>

            <Typography className={classes.fieldTitle} variant="subtitle1">
              Product Link
            </Typography>
            <ProductCardResponsive
              product={product}
              cardsPerRow={cardsPerRow}
            />

          </div>
        </div>

      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
}
interface FormikFields {
  productId: string;
  isSuspended: boolean;
}


const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '0.5rem',
    marginTop: '0.25rem',
    marginBottom: '0.25rem',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0rem',
  },
  orderItemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  fieldTitle: {
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    marginBottom: "0.5rem",
    marginTop: "1rem",
  },
  fieldKey: {
    fontWeight: 400,
    fontSize: '0.9rem',
    width: '200px',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    marginBottom: "0.5rem",
  },
  fieldInfoBlue: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: Colors.blue,
    marginBottom: "0.5rem",
  },
  fieldInfoRed: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: Colors.lightRed,
    marginBottom: "0.5rem",
  },
  fieldInfo: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
    marginBottom: "0.5rem",
  },
  fieldKeyBold: {
    fontWeight: 700,
    fontSize: '0.9rem',
    width: '200px',
    marginBottom: "0.5rem",
  },
  fieldInfoBold: {
    fontSize: '0.9rem',
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  blue: {
    color: Colors.blue,
  },
  red: {
    color: Colors.red,
  },
  link: {
    cursor: "pointer",
    color: Colors.ultramarineBlue,
    "&:hover": {
      color: Colors.ultramarineBlueLight,
    },
  },
});

export default withStyles(styles)(ProductDetails);
