import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Typings
import { Product } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
import Typography from "@material-ui/core/Typography";
import PriceDisplay3 from "components/PriceDisplay3";
// Modals
import { goToModalConnect } from "utils/modals";
// helpers
import { useRouter } from "next/router";
import { trimTitle } from "utils/strings";
// next
import Link from "next/link";



const ProductRow = (props: ReactProps) => {

  const { classes, product } = props;

  const featuredVariant = option(product).currentVariants[0]();
  const previewItem = option(product).currentVariants[0].previewItems[0]();
  const previewItems = option(product).currentVariants[0].previewItems([]);

  // const priceDetails = option(featuredVariant).priceDetails();
  const priceDetails = {};
  const quantityAvailable = 0;
  const isSoldOut = false;

  const dispatch = useDispatch();
  const actions = Actions.reduxProductEdit;
  const goToModal = goToModalConnect(dispatch);
  const router = useRouter();

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
    )}>
      <Link
        key={product.id}
        href={"/p/[productId]"}
        as={`/p/${product.id}`}
      >
        <a className={classes.flexRowLink}>
          <div className={classes.flexCol}>
          {
            option(featuredVariant).previewItems[0]() &&
            <ProductPreviewCardRow
              previewItem={featuredVariant.previewItems[0]}
              className={classes.previewCard}
              height={80}
              width={120}
            />
          }
          </div>

          <div className={classes.flexCol}>
            <div className={clsx(classes.flexCol)}>

              <Typography
                className={clsx(
                  classes.category,
                  // !option(product).category.name() ? "pulse" : null
                )}
                variant="body1"
                component="div"
              >
                {option(product).category.name()}
              </Typography>
              <Typography
                className={clsx(
                  classes.title,
                  // !option(product).currentSnapshot.name() ? "pulse" : null
                )}
                variant="body1"
                component="div"
              >
                {trimTitle(option(product).title(""), 48)}
              </Typography>

              <div className={clsx(
                classes.priceAbsoluteBottom,
                !priceDetails ? "pulse" : null
              )}>
                {
                  (priceDetails)
                  ? <PriceDisplay3
                      priceDetails={priceDetails as any}
                      hideSavings={true}
                      quantityAvailable={0}
                      isSoldOut={isSoldOut}
                      countDownStyle={{ }}
                    />
                  : <span style={{ color: Colors.grey }}></span>
                }
              </div>
            </div>
          </div>
        </a>
      </Link>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
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
  flexRowLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    paddingTop: 0,
    borderBottom: `1px solid ${Colors.lightGrey}`,
    "&:hover": {
      borderBottom: `1px solid ${Colors.lightGrey}`,
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
      })
    },
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  category: {
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: '0.4rem',
    lineHeight: '1rem',
    color: Colors.darkGrey,
    fontSize: '0.75rem',
  },
  title: {
    fontWeight: 600,
    marginBottom: '0.4rem',
    lineHeight: '1rem',
    fontSize: '0.875',
  },
  name: {
    fontWeight: 600,
    color: "#484848",
  },
  tagline: {
    fontWeight: 400,
    color: "#888888",
  },
  priceAbsoluteBottom: {
    // position: "relative",
    // position: "absolute",
    bottom: '0.5rem',
    width: 'calc(100%)',
  },
  previewCard: {
    marginRight: '0.5rem',
    borderRadius: '4px',
  },
});



export default withStyles(styles)(ProductRow);
