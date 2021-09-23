import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Router
import Link from "next/link";
// Typings
import { NewsItem } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
// Material UI
import Button from "@material-ui/core/Button";
import ProductPreviewThumb from "components/ProductPreviewThumb";
import ProductPreviewThumbCategory from "components/ProductPreviewThumbCategory";
import Typography from "@material-ui/core/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
// import AddCartItemButton from "components/AddCartItemButton";
// import WatchlistButton from "components/WatchlistButton";
import DescriptionLoadingText from "./DescriptionLoadingText";
// helpers
import { useRouter } from "next/router";
import { asCurrency as c } from "utils/prices";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import {
  transformNewsItemToFields
} from "pageComponents/Trending/transformNewsItemFields";

import AdType from "components/NewsItemChips/AdType";
import SourceSiteChip from "components/NewsItemChips/SourceSiteChip";
import VerifiedChip from "components/NewsItemChips/VerifiedChip";


const NewsItemRowMedium = (props: ReactProps) => {

  const {
    classes,
    newsItem,
  } = props;


  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  let {
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
    categoryId,
  } = transformNewsItemToFields(newsItem)


  return (
    <ErrorBounds className={clsx(
      classes.productRowRoot,
      classes.flexRow,
    )}>
        <ShowOnMobileOrDesktopSSR desktop>
          <div className={clsx(
            classes.flexColOuter,
            classes.flexColPadding,
          )}>
            {
              isInternalProduct
              ? <Link
                  href="/p/[productId]"
                  as={`/p/${newsItem?.product?.id}`}
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
                  <ProductPreviewThumb
                    previewItem={featuredPreviewItem}
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
              isInternalProduct
              ? <Link
                  href="/p/[productId]"
                  as={`/p/${newsItem?.product?.id}`}
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
          classes.flexGrowItem
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
                      as={`/p/${newsItem?.product?.id}`}
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
                  newsItem?.product?.sellerLicense?.verified &&
                  <VerifiedChip
                    title={"Verified"}
                    style={{
                      position: 'absolute',
                      bottom: '2.5rem',
                      right: '0.5rem',
                      marginRight: 0,
                      height: 28,
                    }}
                  />
                }

                <AdType
                  productId={newsItem?.product?.id}
                  adType={adType}
                  sourceSiteUrl={sourceSiteUrl}
                  style={{
                    position: 'absolute',
                    bottom: '0.5rem',
                    right: '0.5rem',
                    height: 28,
                  }}
                />

      </div>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem
  isExternalProductSuspended?: boolean;
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
    backgroundColor: theme.palette.type === 'dark'
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
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
    textTransform: "uppercase",
    fontSize: '0.8rem',
  },
  title: {
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    lineHeight: '1rem',
    margin: '0.25rem 0rem',
    "&:hover": {
      color: theme.palette.type === 'dark'
        ? Colors.purple
        : Colors.blue,
    },
  },
  modelMake: {
    fontWeight: 600,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyDarkest,
    lineHeight: '0.9rem',
    fontSize: '0.8rem',
    marginBottom: '0.25rem',
  },
  dealerState: {
    fontWeight: 600,
    color: theme.palette.type === 'dark'
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
});



export default withStyles(styles)(NewsItemRowMedium)