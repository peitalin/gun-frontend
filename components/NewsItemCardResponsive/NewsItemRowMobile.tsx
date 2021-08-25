import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Typings
import { Product } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
import Typography from "@material-ui/core/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
import DescriptionLoading from "components/ProductCardResponsive/DescriptionLoading";
// helpers
import { trimTitle } from "utils/strings";
// next
import Link from "next/link";



const ProductRowMobile = (props: ReactProps) => {

  const { classes, newsItem } = props;

  const newsItemId = newsItem?.id;
  const previewItems = newsItem?.featuredVariant?.previewItems ?? []

  const title = newsItem?.currentSnapshot?.title
  const price = newsItem?.featuredVariant?.price;
  const priceWas = newsItem?.featuredVariant?.price;

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
        !newsItem?.id
        ? <DescriptionLoading
            isMobile
            style={cardWidthStyle}
            height={'100%'}
          />
        : <Link
            href={"/p/[newsItemId]"}
            as={`/p/${newsItem?.id}`}
          >
            <a className={classes.flexRowLink}>
              <div className={classes.flexCol}>
                {
                  newsItem?.featuredVariant?.previewItems?.[0] &&
                  <ProductPreviewCardRowSmall
                    previewItem={newsItem.featuredVariant.previewItems[0]}
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
                      !newsItem?.category?.name ? "pulse" : null
                    )}
                    variant="body1"
                    component="div"
                  >
                    {newsItem?.category?.name}
                  </Typography>
                  <Typography
                    className={clsx(
                      classes.title,
                      !title ? "pulse" : null
                    )}
                    variant="body1"
                    component="div"
                  >
                    {trimTitle(title, 48)}
                  </Typography>

                  <div className={classes.priceAbsoluteBottom}>
                    {
                      price !== undefined &&
                      <PriceDisplayMainMobile
                        price={price}
                        priceWas={priceWas}
                        soldOutStatus={newsItem.soldOutStatus}
                        isSuspended={newsItem?.isSuspended}
                      />
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
  newsItem: Product;
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



export default withStyles(styles)(ProductRowMobile);
