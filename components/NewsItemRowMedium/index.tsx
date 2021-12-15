import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
// Router
import Link from "next/link";
// Typings
import { NewsItem } from "typings/gqlTypes";
// Material UI
import ProductPreviewThumb from "components/ProductPreviewThumb";
import ProductPreviewThumbCategory from "components/ProductPreviewThumbCategory";
import Typography from "@mui/material/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
// import AddCartItemButton from "components/AddCartItemButton";
// import WatchlistButton from "components/WatchlistButton";
import DescriptionLoadingText from "./DescriptionLoadingText";
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import {
  transformNewsItemToFields
} from "pageComponents/Trending/transformNewsItemFields";
import {
  displayHrsToSold,
  printRelativeTime,
} from "utils/dates"
import AdType from "components/NewsItemChips/AdType";
import SourceSiteChip from "components/NewsItemChips/SourceSiteChip";
import VerifiedChip from "components/NewsItemChips/VerifiedChip";

import NewsItemAdminSuspendIcon from "components/NewsItems/NewsItemAdminSuspendIcon"
import NewsItemAdminSetCategoryIcon from "components/NewsItems/NewsItemAdminSetCategoryIcon"
import NewsItemAdminRescrapeIcon from "components/NewsItems/NewsItemAdminRescrapeIcon"
import NewsItemAdminMarkSoldIcon from "components/NewsItems/NewsItemAdminMarkSoldIcon"
import NewsItemAdminGenerateClaimIdIcon from "components/NewsItems/NewsItemAdminGenerateClaimIdIcon"


const NewsItemRowMedium = (props: ReactProps) => {

  const {
    classes,
    newsItem,
  } = props;

  const [hover, setHover] = React.useState(false)

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('xl'))

  let {
    productId,
		make,
		model,
		caliber,
    createdAt,
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
    categoryId,
    sellerLicenseVerified,
    isSold,
  } = transformNewsItemToFields(newsItem)

  let dateSold = createdAt

  return (
    <div className={clsx(
      classes.productRowRoot,
      classes.flexRow,
    )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ShowOnMobileOrDesktopSSR desktop>
        <div className={clsx(
          classes.flexColOuter,
          classes.flexColPadding,
        )}>
          {
            featuredPreviewItem?.id
            ? <Link
                href={
                  isInternalProduct
                    ? "/p/[productId]"
                    : sourceSiteUrl
                }
                as={
                  isInternalProduct
                    ? `/p/${newsItem?.product?.id}`
                    : sourceSiteUrl
                }
              >
                <a>
                  <ProductPreviewThumb
                    previewItem={featuredPreviewItem}
                    width={props.imageSize?.desktop?.width ?? 135}
                    height={props.imageSize?.desktop?.height ?? 90}
                  />
                </a>
              </Link>
            : <a href={sourceSiteUrl} target={"_blank"}>
                <ProductPreviewThumbCategory
                  categoryId={categoryId}
                  width={props.imageSize?.desktop?.width ?? 135}
                  height={props.imageSize?.desktop?.height ?? 90}
                />
              </a>
          }
        </div>
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
        <div className={clsx(
          classes.flexColOuter,
          classes.flexColPaddingSm,
        )}>
          {
            featuredPreviewItem?.id
            ? <Link
                href={
                  isInternalProduct
                    ? "/p/[productId]"
                    : sourceSiteUrl
                }
                as={
                  isInternalProduct
                    ? `/p/${productId}`
                    : sourceSiteUrl
                }
              >
                <a>
                  <ProductPreviewThumb
                    previewItem={featuredPreviewItem}
                    width={props.imageSize?.mobile?.width ?? 82.5}
                    height={props.imageSize?.mobile?.height ?? 55}
                  />
                </a>
              </Link>
            : <a href={sourceSiteUrl} target={"_blank"}>
                <ProductPreviewThumbCategory
                  categoryId={categoryId}
                  // previewItem={featuredPreviewItem}
                  width={props.imageSize?.mobile?.width ?? 82.5}
                  height={props.imageSize?.mobile?.height ?? 55}
                />
              </a>
          }
        </div>
      </ShowOnMobileOrDesktopSSR>

      <div className={clsx(
        classes.flexRowWrapOuter,
        classes.flexGrowItem,
        classes.positionRelative,
      )}>

        {
          !title
          ? <div className={classes.flexColInner60}>
              <DescriptionLoadingText/>
            </div>
          : <div className={classes.flexColInner60}>
              <Typography className={classes.category} variant="body1">
                {caliber}
              </Typography>

              {
                isInternalProduct
                ? <Link
                    href="/p/[productId]"
                    as={`/p/${productId}`}
                  >
                    <a>
                      <Typography className={classes.title} variant="body1">
                        {title}
                      </Typography>
                    </a>
                  </Link>
                : <a href={sourceSiteUrl} target={"_blank"}>
                    <Typography className={classes.title} variant="body1">
                      {title}
                    </Typography>
                  </a>
              }

              <Typography className={classes.dealerState} variant="body1">
                {state}
              </Typography>

              <div className={classes.priceContainer}>
                <PriceDisplayMainMobile
                  price={price}
                  soldOutStatus={soldOutStatus}
                  isSuspended={isSuspended}
                />
              </div>
            </div>
        }

        {
          isSold
          ? <div className={clsx(
              classes.soldInHrsText,
            )}>
              {`Sold ${printRelativeTime(dateSold)}`}
            </div>
          : <div className={clsx(
              classes.soldInHrsText,
            )}>
              {`${printRelativeTime(dateSold)}`}
            </div>
        }


        {
          hover &&
          <>
            <NewsItemAdminSuspendIcon
              newsItem={newsItem}
              style={{
                top: "unset",
                bottom: '-0.5rem',
                left: 'calc(25% - 5rem)',
                width: '28px',
                height: '28px',
              }}
            />

            <NewsItemAdminRescrapeIcon
              newsItem={newsItem}
              style={{
                top: "unset",
                bottom: '-0.5rem',
                left: 'calc(25% - 2.5rem)',
                width: '28px',
                height: '28px',
              }}
            />

            <NewsItemAdminSetCategoryIcon
              newsItem={newsItem}
              style={{
                top: "unset",
                bottom: '-0.5rem',
                left: 'calc(25%)',
                width: '28px',
                height: '28px',
              }}
            />

            <NewsItemAdminGenerateClaimIdIcon
              newsItem={newsItem}
              style={{
                top: 'unset',
                bottom: '-0.5rem',
                left: 'calc(25% + 2.5rem)',
                marginTop: '0.5rem',
                width: '28px',
                height: '28px',
              }}
            />

            <NewsItemAdminMarkSoldIcon
              newsItem={newsItem}
              style={{
                top: "unset",
                bottom: '-0.5rem',
                left: 'calc(25% + 5rem)',
                marginTop: '0.5rem',
                width: '28px',
                height: '28px',
              }}
            />

          </>
        }

        {/* <SourceSiteChip
          sourceSite={externalProduct?.sourceSite}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: '0.5rem',
            marginRight: 0,
            height: 28,
          }}
        /> */}
        {
          sellerLicenseVerified &&
          <VerifiedChip
            title={"Verified"}
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              right: '0rem',
              left: '0.5rem',
              height: 28,
            }}
          />
        }

        <AdType
          productId={productId}
          adType={adType}
          sourceSiteUrl={sourceSiteUrl}
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '0rem',
            height: 28,
          }}
        />

      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem
  loading?: boolean;
  refetch?(): void; // apollo refetch
  imageSize?: {
    mobile: {
      height: any
      width: any
    },
    desktop: {
      height: any
      width: any
    },
  }
}

const styles = (theme: Theme) => createStyles({
  productRowRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexBasis: '100%',
    borderRadius: `${BorderRadius}px`,
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.colors.uniswapDarkNavy
      : theme.colors.cream,
  },
  flexColOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexColPadding: {
    padding: '0.5rem 0rem 0.5rem 1rem',
  },
  flexColPaddingSm: {
    padding: '0.5rem 0rem 0.5rem 0.5rem',
  },
  flexColInner60: {
    flexBasis: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: "0.5rem",
    flexGrow: 1,
  },
  flexColInner30: {
    flexBasis: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: "center",
    flexGrow: 1,
    maxWidth: 250,
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
    //
    flexBasis: '50%',
    minWidth: 350,
    flexGrow: 1,
  },
  flexRowWrapOuter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0.5rem 0rem 0.5rem 1rem',
  },
  flexGrowItem: {
    flexGrow: 1,
    position: "relative",
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  priceContainer: {
    marginTop: '0.25rem',
  },
  category: {
    fontWeight: 600,
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
    textTransform: "uppercase",
    fontSize: '0.8rem',
  },
  title: {
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    lineHeight: '1rem',
    margin: '0.25rem 0rem',
    "&:hover": {
      color: theme.palette.mode === 'dark'
        ? Colors.purple
        : Colors.blue,
    },
  },
  modelMake: {
    fontWeight: 600,
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyDarkest,
    lineHeight: '0.9rem',
    fontSize: '0.8rem',
    marginBottom: '0.25rem',
  },
  dealerState: {
    fontWeight: 600,
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    fontSize: '0.8rem',
  },
  variant: {
    fontWeight: 600,
    color: Colors.ghostGrey,
    fontSize: '0.8rem',
  },
  cartButton: {
    height: 40,
    maxHeight: 40,
    minWidth: '180px',
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    borderRadius: '4px',
    // backgroundColor: "#EDF0F2",
    border: `1px solid ${Colors.secondary}`,
    color: `1px solid ${Colors.secondary}`,
    "&:hover": {
      border: `1px solid ${Colors.secondaryBright}`,
      color: `1px solid ${Colors.secondary}`,
    },
    maxWidth: 300,
    flexGrow: 0.5,
    width: '100%',
  },
  positionRelative: {
    position: "relative",
  },
  soldInHrsText: {
    fontWeight: 500,
    fontSize: '0.75rem',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarkest,
    minWidth: 100,
    lineHeight: '1rem',
    position: 'absolute',
    top: '0.25rem',
    right: '0.5rem',
    textAlign: "end",
  },
});



export default withStyles(styles)(NewsItemRowMedium)