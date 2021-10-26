
import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
// Typings
import { NewsItem, Product, SoldOutStatus } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import ProductPreviewThumb from "components/ProductPreviewThumb";
import ProductPreviewThumbCategory from "components/ProductPreviewThumbCategory";

import Typography from "@material-ui/core/Typography";
import PriceDisplayMain from "components/PriceDisplayMain";
import DescriptionLoading from "components/NewsItemCardResponsive/DescriptionLoading";
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
import {
  displayHrsToSold,
  printRelativeTime,
} from "utils/dates"
import { useTheme } from "@material-ui/core/styles";

import CollectionsIcon from 'components/Collections/CollectionsIcon';
import NewsItemAdminSuspendIcon from "components/NewsItems/NewsItemAdminSuspendIcon"
import NewsItemAdminSetCategoryIcon from "components/NewsItems/NewsItemAdminSetCategoryIcon"
import NewsItemAdminRescrapeIcon from "components/NewsItems/NewsItemAdminRescrapeIcon"
import NewsItemAdminGenerateClaimIdIcon from "components/NewsItems/NewsItemAdminGenerateClaimIdIcon"




const NewsItemCardAsRow = (props: ReactProps) => {

  const {
    classes,
    newsItem,
  } = props;

  const [hover, setHover] = React.useState(false)
  const theme = useTheme()

  const {
    productId,
    createdAt,
    createdAtSnapshot,
		make,
		model,
		caliber,
		barrelLength,
		action,
		state,
		soldOutStatus,
		description,
		price,
    priceWas,
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
    isSold,
    categoryId,
  } = transformNewsItemToFields(newsItem)


  // console.log("NEWSITEM: ", newsItem)
  let dateSold = createdAt
  // console.log("dateSold: ", dateSold)
  // console.log("hrsToSold: ", hrsToSold)

  return (
    <div
      className={clsx(
        classes.root,
        classes.flexRowWithBorder,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {
        !productId
        ? <DescriptionLoading
            isMobile
            height={'36px'}
            plainPlaceholder={true}
          />
        : <div className={classes.flexRow}>
            <div className={classes.flexCol}>
              {
                // (props.showExternalImages && featuredPreview)
                featuredPreviewItem?.id
                ? <ProductPreviewThumb
                    previewItem={featuredPreviewItem}
                    className={classes.previewCard}
                    height={46}
                    width={46 * 1.5}
                  />
                : <ProductPreviewThumbCategory
                    categoryId={categoryId}
                    className={classes.previewCard}
                    style={{
                      backgroundColor: isThemeDark(theme)
                        ? Colors.uniswapDarkNavy
                        : Colors.cream
                    }}
                    height={46}
                    width={46 * 1.5}
                  />
              }
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
                  {
                    isSold
                    ? <div className={classes.soldInHrsText} >
                        {`Sold ${printRelativeTime(dateSold)}`}
                      </div>
                    : <div className={classes.soldInHrsText} >
                        {`${printRelativeTime(dateSold)}`}
                      </div>
                  }
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

                {
                  hover &&
                  <>
                    <NewsItemAdminSuspendIcon
                      newsItem={newsItem}
                      style={{
                        top: "unset",
                        bottom: '-1rem',
                        right: '-2rem',
                        width: '28px',
                        height: '28px',
                      }}
                    />


                    <NewsItemAdminRescrapeIcon
                      newsItem={newsItem}
                      style={{
                        top: "unset",
                        bottom: '-1rem',
                        right: '-4.5rem',
                        width: '28px',
                        height: '28px',
                      }}
                    />

                    <NewsItemAdminSetCategoryIcon
                      newsItem={newsItem}
                      style={{
                        top: "unset",
                        bottom: '-1rem',
                        right: '-7rem',
                        width: '28px',
                        height: '28px',
                      }}
                    />

                    <NewsItemAdminGenerateClaimIdIcon
                      newsItem={newsItem}
                      style={{
                        top: "unset",
                        bottom: '-1rem',
                        right: '-9.5rem',
                        width: '28px',
                        height: '28px',
                      }}
                    />
                  </>
                }

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



        <CollectionsIcon
          productId={newsItem?.productId}
          externalProductId={newsItem?.externalProductId}
          // refetch={refetch}
          style={{
            top: 'unset',
            // bottom: '-1rem',
            right: '-0.75rem',
            // marginTop: '0.5rem',
            width: '28px',
            height: '28px',
          }}
        />

    </div>
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
    paddingRight: '0.75rem',
    marginRight: '0.5rem',
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
    // marginRight: '0rem',
    // paddingBottom: '0.5rem',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    borderRadius: BorderRadius,
    background: isThemeDark(theme)
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
    "&:hover": {
      background: isThemeDark(theme)
        ? `${Colors.uniswapLightNavy}`
        : `${Colors.slateGrey}`,
    },
  },
  flexCellItem: {
    flexBasis: '45%',
    maxWidth: '43%', // constrain width for textOverflow: ellipsis
    position: "relative",
  },
  flexCellItemSmall: {
    flexBasis: '15%',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: '1rem',
    position: 'relative',
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
    maxWidth: 300,
  },
  priceAbsoluteBottom: {
    position: "relative",
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
  soldInHrsText: {
    fontWeight: 500,
    fontSize: '0.75rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarkest,
    minWidth: 100,
    lineHeight: '1rem',
    position: 'absolute',
    bottom: '0rem',
    right: '0.5rem',
  },
});



export default withStyles(styles)(NewsItemCardAsRow);
