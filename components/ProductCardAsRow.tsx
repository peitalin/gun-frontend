import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Typings
import { Product, SoldOutStatus } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
import Typography from "@material-ui/core/Typography";
import PriceDisplayMain from "components/PriceDisplayMain";
import DescriptionLoading from "components/ProductCardResponsive/DescriptionLoading";
// next
import Link from "next/link";
import { convertSoldOutStatus } from "utils/strings";



const ProductCardAsRow = (props: ReactProps) => {

  const {
    classes,
    product,
    soldOutStatus = SoldOutStatus.AVAILABLE,
  } = props;

  const title = product?.currentSnapshot?.title
  const make = product?.currentSnapshot?.make
  const model = product?.currentSnapshot?.model
  const featuredVariant = product?.featuredVariant;
  const price = featuredVariant?.price;
  const priceWas = featuredVariant?.priceWas;

  const dispatch = useDispatch();

  const cardWidthStyle = {
    // width: `calc(${100}vw - ${1+1}rem)`,
    // maxWidth: 415
    // getCardMaxWidth(cardsPerRow)
  };

  if (soldOutStatus !== SoldOutStatus.AVAILABLE) {
    return (
      <Typography className={classes.price} variant="body1">
        {convertSoldOutStatus(soldOutStatus)}
      </Typography>
    )
  }

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
            href={"/p/[productIdOrSlug]"}
            as={`/p/${product?.id}`}
          >
            <a className={classes.flexRowLink}>
              <div className={classes.flexCol}>
                {
                  product?.featuredVariant?.previewItems?.[0] &&
                  <ProductPreviewCardRowSmall
                    previewItem={product.featuredVariant.previewItems[0]}
                    className={classes.previewCard}
                    height={50}
                    width={50*1.5}
                  />
                }
              </div>
              <div className={classes.flexRow}>
                <div className={classes.flexCellItem}>
                  <Typography
                    className={clsx(
                      classes.title,
                      !featuredVariant.price ? "pulse" : null
                    )}
                    variant="body1"
                    component="div"
                  >
                    { title ? title : "" }
                  </Typography>
                  <Typography
                    className={classes.makeModel}
                    variant="body2"
                    component="div"
                  >
                    {`${make} - ${model}`}
                  </Typography>
                </div>

                <div className={classes.flexCellItem}>
                  {
                    product?.currentSnapshot?.actionType &&
                    <div className={classes.actionTag}>
                      <Typography
                        className={classes.actionType}
                        variant="body2"
                        component="div"
                      >
                        {product?.currentSnapshot?.actionType}
                      </Typography>
                    </div>
                  }
                  {
                    product?.currentSnapshot?.caliber &&
                    <div className={classes.actionTag}>
                      <Typography
                        className={classes.actionType}
                        variant="body2"
                        component="div"
                      >
                        {product?.currentSnapshot?.caliber}
                      </Typography>
                    </div>
                  }
                </div>

                <div className={classes.flexCellItemSmall}>
                  <div className={clsx(
                    classes.priceAbsoluteBottom,
                    !price ? "pulse" : null
                  )}>
                    {
                      price
                      ? <PriceDisplayMain
                          price={price}
                          priceWas={priceWas}
                          soldOutStatus={soldOutStatus}
                        />
                      : <span style={{ color: Colors.grey }}></span>
                    }
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
  soldOutStatus?: string;
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
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
    width: '100%',
  },
  flexRowLink: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0rem',
    // paddingBottom: '0.5rem',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    borderRadius: BorderRadius,
    background: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? `${Colors.uniswapLightNavy}`
        : `${Colors.slateGrey}`,
    },
    // border: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapLightNavy}`
    //   : `1px solid ${Colors.slateGrey}`,
  },
  flexCellItem: {
    flexBasis: '45%',
  },
  flexCellItemSmall: {
    flexBasis: '15%',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: '1rem',
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
  },
  previewCard: {
    marginRight: '1rem',
    borderRadius: '4px',
  },
  price: {
    marginRight: '0.5rem',
    fontSize: "1.5rem",
    fontWeight: 600,
    color: Colors.green
  },
  makeModel: {
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: '0.9rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    lineHeight: '1rem',
  },
  actionTag: {
    // position: 'absolute',
    bottom: '0.25rem',
    right: '0rem',
    // border: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapLighterGrey}`
    //   : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
  },
  actionType: {
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: '0.9rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
  },
});



export default withStyles(styles)(ProductCardAsRow);
