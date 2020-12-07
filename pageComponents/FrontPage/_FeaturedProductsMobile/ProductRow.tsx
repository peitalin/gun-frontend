import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, BoxShadows, Colors } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Typings
import { Product, SoldOutStatus } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
import Typography from "@material-ui/core/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
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

  const price = option(featuredVariant).price();
  const priceWas = option(featuredVariant).priceWas();

  const dispatch = useDispatch();
  const actions = Actions.reduxProductEdit;
  const goToModal = goToModalConnect(dispatch);
  const router = useRouter();

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRow2,
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

          <div className={classes.flexColDescription}>
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
                {trimTitle(option(product).currentSnapshot.title(""), 48)}
              </Typography>

              <div className={clsx(
                classes.priceAbsoluteBottom,
                // !priceDetails ? "pulse" : null
              )}>
                {
                  (price)
                  ? <PriceDisplayMainMobile
                      price={price}
                      priceWas={priceWas}
                      hideSavings={true}
                      quantityAvailable={0}
                      soldOutStatus={product.soldOutStatus}
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
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    background: Colors.uniswapDarkNavy,
    borderRadius: BorderRadius,
    // padding: '0.25rem 0.25rem',
    padding: '0rem',
    boxShadow: BoxShadows.shadow1.boxShadow,
    "&:hover": {
      boxShadow: BoxShadows.shadow2.boxShadow,
    },
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexColDescription: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
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
  flexRow2: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0rem',
    "&:hover": {
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
    marginBottom: '0.25rem',
    lineHeight: '1rem',
    color: Colors.uniswapLighterGrey,
    fontSize: '0.75rem',
  },
  title: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    lineHeight: '1rem',
    fontSize: '0.875rem',
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
    position: "absolute",
    bottom: '0.25rem',
    right: '0rem',
  },
  previewCard: {
    marginRight: '0.5rem',
    borderRadius: `${BorderRadius}px ${BorderRadius}px ${BorderRadius}px ${BorderRadius}px `,
  },
});



export default withStyles(styles)(ProductRow);
