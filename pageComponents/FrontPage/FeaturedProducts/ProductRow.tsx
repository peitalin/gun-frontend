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
import PriceDisplayMain from "components/PriceDisplayMain";
import DescriptionLoading from "pageComponents/FrontPage/PreviewCardResponsive/DescriptionLoading";
// Modals
import { goToModalConnect } from "utils/modals";
// helpers
import { useRouter } from "next/router";
import { trimTitle } from "utils/strings";
// next
import Link from "next/link";



const ProductRow = (props: ReactProps) => {

  const { classes, product } = props;

  const featuredVariant = option(product).featuredVariant();
  const dispatch = useDispatch();

  const cardWidthStyle = {
    width: `calc(${100}vw - ${1+1}rem)`,
    maxWidth: 415
    // getCardMaxWidth(cardsPerRow)
  };

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
    )}>
      {
        !(product && product.id)
        ? <DescriptionLoading
            isMobile
            style={cardWidthStyle}
            height={'100%'}
          />
        : <Link
            href={"/p/[productId]"}
            as={`/p/${product?.id}`}
          >
            <a className={classes.flexRowLink}>
              <div className={classes.flexCol}>
                {
                  option(product).featuredVariant.previewItems[0]() &&
                  <ProductPreviewCardRow
                    previewItem={product.featuredVariant.previewItems[0]}
                    className={classes.previewCard}
                    height={75}
                    width={75*1.6} // 16:10
                  />
                }
              </div>
              <div className={classes.flexCol}>
                <div className={clsx(classes.flexCol)}>
                  <Typography
                    className={clsx(
                      classes.category,
                      !option(product).category.name() ? "pulse" : null
                    )}
                    variant="body1"
                    component="div"
                  >
                    {option(product).category.name()}
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.title,
                      !product?.currentSnapshot.title ? "pulse" : null
                    )}
                    variant="body1"
                    component="div"
                  >
                    {product?.currentSnapshot.title}
                  </Typography>

                  <div className={clsx(
                    classes.priceAbsoluteBottom,
                    !product?.featuredVariant.price ? "pulse" : null
                  )}>
                    <PriceDisplayMain
                      price={product?.featuredVariant?.price}
                      priceWas={product?.featuredVariant?.priceWas}
                      quantityAvailable={0}
                      soldOutStatus={product?.soldOutStatus}
                      hideSavings={true}
                      countDownStyle={{

                      }}
                    />
                  </div>
                </div>
              </div>
            </a>
          </Link>
      }
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
    borderBottom: `1px solid ${Colors.lightestGrey}`,
    "&:hover": {
      borderBottom: `1px solid ${Colors.lightestGrey}`,
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
