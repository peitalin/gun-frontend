import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Typings
import {
  Product,
  ProductPrivate,
} from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@mui/material/Typography";
import Loading from "components/Loading";
import Link from "next/link";
// helpers
import { formatDateTime } from "utils/dates";
import { Colors } from "layout/AppTheme";
import currency from 'currency.js';
// validation
import { FormikProps } from 'formik';




const SellerDetails = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    product,
    ...fprops
  } = props;

  // let product: ProductPrivate = props.product as any;
  console.log("product: ", product)
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  React.useEffect(() => {
    fprops.setFieldValue("storeId", product?.store?.id)
    fprops.setFieldValue("isSuspended", product?.store?.isSuspended)
  }, [product])

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
    )}>
      <div className={classes.orderItemsContainer}>

        <div className={classes.flexCol}>
          <div className={classes.flexCol}>

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
                Store ID:
              </Typography>
              <Typography
                className={clsx(classes.fieldInfo)}
                variant="subtitle1"
              >
                {product?.store?.id}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Store isSuspended:
              </Typography>
              <Typography
                className={clsx(
                  product?.store?.isSuspended
                  ? classes.fieldInfoRed
                  : classes.fieldInfo,
                )}
                variant="subtitle1"
              >
                {`${product?.store?.isSuspended}`}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                License Number:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {product?.sellerLicense?.licenseNumber}
              </Typography>
            </div>


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
  storeId: string;
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
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    marginBottom: "0.5rem",
    marginTop: "1rem",
  },
  fieldKey: {
    fontWeight: 400,
    fontSize: '0.9rem',
    width: '200px',
    color: theme.palette.mode === 'dark'
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
    color: theme.palette.mode === 'dark'
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

export default withStyles(styles)(SellerDetails);
