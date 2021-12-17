import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import CollectionsIcon from "components/Collections/CollectionsIcon";
// Typings
import { Categories, Product, NewsItem, SoldOutStatus } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/links";
import PriceDisplayMain from "components/PriceDisplayMain";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DescriptionLoading from "./DescriptionLoading";
// Carousel
import MainPreviewImage from "./MainPreviewImage";
import LinkLoading from "components/LinkLoading";
import {
  styles,
} from "./styles";
// img responsive sizing
import {
  imgSizesForScreenSizes,
  getImgSrcSetSizes
} from "./imageResponsiveSizes";
import DiscountBadge from "components/DiscountBadge";

import {
  transformNewsItemToFields
} from "pageComponents/Trending/transformNewsItemFields"

import AdType from "components/NewsItemChips/AdType";
import SourceSiteChip from "components/NewsItemChips/SourceSiteChip";
import VerifiedChip from "components/NewsItemChips/VerifiedChip";



const NewsItemCardRC = (props: ReactProps) => {
  /// NOTE:
  /// There are 2 <Link> tags, one of the image, one for the description container
  /// This is to prevent the watchList button from being inside the <Link> tag
  /// so that clicking watchList buttons don't navigate to the newsItem page.

  const {
    classes,
    newsItem,
    refetch,
    fit = false,
    cardsPerRow = 1,
    maxWidthOfRow = 1160,
    showCollectionsButton = true,
    isMobile = false,
    hideActionType = false,
    disableLoadingAnimation = false,
  } = props;

  let viewWidth = 100 / cardsPerRow;
  let viewWidthOffset = 1 / cardsPerRow + 1 // account for padding/margin on each card
  // e.g. 4 cards = 1rem each +1 rem for padding-left,
  // with when divided over 4 cards = 1/4 rem

  const {
    productId,
    externalProductId,
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
  } = transformNewsItemToFields(newsItem)

  const newsItemId = newsItem?.id
  const squishLetters = title?.length > 30


  const getCardMaxWidth = (cardsPerRow: number) => {
    // minus 16px (1rem) for left-padding on carousel
    // divide by 4, numCardsPerRow
    // minus 16px (1rem) for each card in the row
    return (maxWidthOfRow - 16) / cardsPerRow - 12
  }

  const cardWidthStyle = {
    width: `calc(${viewWidth}vw - ${viewWidthOffset}rem)`,
    maxWidth: getCardMaxWidth(cardsPerRow),
  };

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////


  const showDiscount = React.useMemo(
    () => showDiscountBadge(price, priceWas),
    [price, priceWas]
  )

  // for <LinkLoading/>
  let href = props.promotedSlotId ? "/f/[productId]" : "/p/[productId]"
  let as = props.promotedSlotId ? `/f/${productId}` : `/p/${productId}`
  let disableLink = typeof props.onClick === 'function'
  // disable link when onClick is defined

  return (
    <div className={classes.rootContainer}
      style={{
        ...cardWidthStyle,
        boxShadow: props.boxShadow ? BoxShadows.shadow3.boxShadow : null,
        borderRadius: props.boxShadow ? `${BorderRadius}px` : "",
        ...props.style
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >

      {
        showDiscount &&
        <DiscountBadge
          price={price}
          priceWas={priceWas}
        />
      }

      <LinkLoading
        href={href}
        as={as}
        disable={disableLink}
        onClick={props.onClick}
      >
        <MainPreviewImage
          featuredPreviewItem={featuredPreviewItem}
          productId={productId}
          promotedSlotId={props.promotedSlotId}
          screenSize={props.screenSize}
          fit={fit}
          cardsPerRow={cardsPerRow}
          previewImageEmptyMessage={props.previewImageEmptyMessage}
          onClick={props.onClick}
          disableLink={
            !props.newsItem?.product?.storeId ||
            typeof props.onClick === 'function'
            // disable link when onClick is defined
          }
        />
      </LinkLoading>

      <div className={classes.descriptionContainerOuter}
        style={props.styleInner}
      >
        {
          showCollectionsButton &&
          newsItemId &&
          <CollectionsIcon
            productId={productId}
            refetch={refetch}
            style={{
              top: '-0.8rem',
            }}
          />
        }
        <LinkLoading
          href={href}
          as={as}
          disable={disableLink}
          onClick={props.onClick}
        >
          {
            (!productId && !externalProductId)
            ? <DescriptionLoading
                style={cardWidthStyle}
                disableLoadingAnimation={disableLoadingAnimation}
              />
            : <div className={classes.descriptionContainer}
                style={cardWidthStyle}
              >
                {/* {
                  action &&
                  !hideActionType &&
                  <div className={classes.actionTag}>
                    <Typography
                      className={classes.actionType}
                      variant="body2"
                      component="div"
                    >
                      {action}
                    </Typography>
                  </div>
                } */}
                <div className={classes.descriptionDetailsFlexItem}>
                  <Typography
                    className={clsx(
                      classes.title,
                      squishLetters && classes.squishLetters,
                    )}
                    variant="body1"
                    component="div"
                  >
                    {`${make} ${model}`}
                  </Typography>
                  <Typography
                    className={classes.caliberText}
                    variant="body2"
                    component="div"
                  >
                    {`${caliber}`}
                  </Typography>

                </div>
                <div className={classes.priceDetailsFlexItem}>
                  {
                    price !== undefined &&
                    <PriceDisplayMain
                      price={price}
                      priceWas={priceWas}
                      isSuspended={isSuspended}
                      soldOutStatus={soldOutStatus}
                    />
                  }
                </div>

                {
                  newsItem?.product?.sellerLicense?.verified &&
                  <VerifiedChip
                    title={"Verified"}
                    style={{
                      position: 'absolute',
                      bottom: '2rem',
                      right: '0rem',
                      marginRight: 0,
                      height: 28,
                    }}
                  />
                }

                <AdType
                  productId={newsItem?.productId}
                  adType={adType}
                  promotedSlotId={props.promotedSlotId}
                  sourceSiteUrl={sourceSiteUrl}
                  disableLink={true} // disable for productCards
                  // cannot nest <a> tags
                  style={{
                    position: 'absolute',
                    bottom: '0rem',
                    right: '0rem',
                    height: 28,
                  }}
                />

              </div>
          }
        </LinkLoading>
      </div>
    </div>
  );
}

const showDiscountBadge = (price: number, priceWas: number) => {
  if (price && priceWas) {
    return price < priceWas
  } else {
    return false
  }
}



interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
  screenSize: "xs" | "sm" | "md" | "lg" | "xl";
  fit?: boolean; // object-fit the image
  cardsPerRow: number;
  maxWidthOfRow: number;
  showCollectionsButton?: boolean;
  isMobile?: boolean;
  refetch?(): void;
  // carousels
  boxShadow?: boolean;
  style?: any;
  styleInner?: any;
  previewImageEmptyMessage?: React.ReactNode;
  onClick?(a: any): void;
  onMouseEnter?(a: any): void;
  onMouseLeave?(a: any): void;
  hideActionType?: boolean;
  disableLoadingAnimation?: boolean;
  promotedSlotId?: string
}


export default withStyles(styles)( NewsItemCardRC );
