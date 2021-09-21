
import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import { NewsItem, Product, SoldOutStatus } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
import ProductPreviewCardRowSmallCategory from "components/ProductPreviewCardRowSmallCategory";

import Typography from "@material-ui/core/Typography";
import PriceDisplayMain from "components/PriceDisplayMain";
import DescriptionLoading from "components/ProductCardResponsive/DescriptionLoading";
// next
import {
  transformNewsItemToFields
} from "pageComponents/Trending/transformNewsItemFields"
import AdType from "components/NewsItemChips/AdType";
import StateChip from "components/NewsItemChips/StateChip";
import SourceSiteChip from "components/NewsItemChips/SourceSiteChip";
import ConditionChip from "components/NewsItemChips/ConditionChip";
import VerifiedChip from "components/NewsItemChips/VerifiedChip";
import NewsItemLink from "./NewsItemLink"
import {
  maxLengthTitle
} from "utils/limitsAndRules"




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
  let categoryId = product?.category?.id ?? product?.categoryId
  let featuredPreview = previewItems?.[0]

  const priceWas = newsItem?.product?.featuredVariant?.priceWas;
  // console.log("NEWSITEM: ", newsItem)

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
    )}>
      {
        !(product && product.id)
        ? <DescriptionLoading
            isMobile
            height={'100%'}
          />
        : <div className={classes.flexRow}>
            <div className={classes.flexCol}>
              {/* <ProductPreviewCardRowSmall
                previewItem={featuredPreview}
                className={classes.previewCard}
                height={46}
                width={46 * 1.5}
              /> */}
              <ProductPreviewCardRowSmallCategory
                categoryId={categoryId}
                className={classes.previewCard}
                height={46}
                width={46 * 1.5}
              />
            </div>
            <div className={classes.flexRow}>
              <div className={classes.flexCellItem}>
              <NewsItemLink newsItem={newsItem} >
                  <Typography
                    className={clsx(
                      classes.makeModelText,
                      (!make || !model) ? "pulse" : null
                    )}
                    variant="body1"
                    component="div"
                  >
                    {`${make} ${model}`.slice(0, 60)}
                  </Typography>
                  <Typography
                    className={classes.caliberText}
                    variant="body2"
                    component="div"
                  >
                    {caliber}
                  </Typography>
                </NewsItemLink>
              </div>

              {/* <div className={classes.flexCellItem}>
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
              </div> */}

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


              <div className={clsx(
                classes.flexCellItemSmall,
                classes.flexGrowItem,
              )}>

                {
                  newsItem?.product?.sellerLicense?.verified
                  ? <VerifiedChip
                      title={"Verified Seller"}
                      style={{ margin: 0, marginRight: '0.5rem' }}
                    />
                  : <ConditionChip
                      condition={condition}
                      style={{ margin: 0, marginRight: '0.5rem' }}
                    />
                }

                <StateChip
                  state={state}
                  style={{ margin: 0, marginRight: '0.5rem' }}
                />

                <AdType
                  productId={newsItem?.productId}
                  adType={adType}
                  sourceSiteUrl={sourceSiteUrl}
                  style={{ margin: 0, marginRight: '0.5rem' }}
                />

              </div>
            </div>
        </div>
      }
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
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
  },
  flexCellItem: {
    flexBasis: '45%',
    maxWidth: '43%', // constrain width for textOverflow: ellipsis
  },
  flexCellItemSmall: {
    flexBasis: '15%',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: '1rem',
  },
  flexGrowItem: {
    flexGrow: 1,
    paddingRight: '0.25rem',
  },
  makeModelText: {
    fontWeight: 600,
    lineHeight: '1rem',
    textTransform: "uppercase",
    fontSize: '0.875rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
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
  caliberText: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: '0.825rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightestBlack,
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
