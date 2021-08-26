
import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Typings
import { NewsItem, Product, SoldOutStatus } from "typings/gqlTypes";
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
import {
  transformNewsItemToFields
} from "pageComponents/Trending/transformNewsItemFields"
import AdType from "components/NewsItemChips/AdType";
import SourceSiteChip from "components/NewsItemChips/SourceSiteChip";
import VerifiedChip from "components/NewsItemChips/VerifiedChip";
import NewsItemLink from "./NewsItemLink"





const NewsItemCardAsRow = (props: ReactProps) => {

  const {
    classes,
    newsItem,
  } = props;

  const {
		model,
		make,
		caliber,
		barrelLength,
		action,
		state,
		soldOutStatus,
		description,
		price,
		title,
		serialNumber,
		condition,
		adType,
		licenseNumber,
		phoneNumber,
		sourceSite,
		sourceSiteUrl,
		featuredPreviewItem,
		previewItems,
    isInternalProduct,
    isSuspended,
  } = transformNewsItemToFields(newsItem)


  let product = newsItem?.product ?? newsItem?.externalProduct
  let featuredPreview = previewItems?.[0]

  const priceWas = newsItem?.product?.featuredVariant?.priceWas;


  const cardWidthStyle = {
    // width: `calc(${100}vw - ${1+1}rem)`,
    // maxWidth: 415
    // getCardMaxWidth(cardsPerRow)
  };

  console.log("price: ", price)


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
        : <NewsItemLink newsItem={newsItem}>
            <div className={classes.flexCol}>
              {
                featuredPreview &&
                <ProductPreviewCardRowSmall
                  previewItem={featuredPreview}
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
                    !price ? "pulse" : null
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
                  action &&
                  <div className={classes.actionTag}>
                    <Typography
                      className={classes.actionType}
                      variant="body2"
                      component="div"
                    >
                      {action}
                    </Typography>
                  </div>
                }
                {
                  caliber &&
                  <div className={classes.actionTag}>
                    <Typography
                      className={classes.actionType}
                      variant="body2"
                      component="div"
                    >
                      {caliber}
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
                        isSuspended={isSuspended}
                      />
                    : <span style={{ color: Colors.grey }}></span>
                  }
                </div>
              </div>


              {/* <div className={classes.flexCellItemSmall}>

                <SourceSiteChip sourceSite={sourceSite}/>

                <AdType
                  productId={newsItem?.productId}
                  adType={adType}
                  sourceSiteUrl={sourceSiteUrl}
                />

                {
                  newsItem?.product?.sellerLicense?.verified &&
                  <VerifiedChip
                    title={"Verified Seller"}
                  />
                }
              </div> */}
            </div>
          </NewsItemLink>
      }
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  // product: Product;
  newsItem: NewsItem;
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



export default withStyles(styles)(NewsItemCardAsRow);
