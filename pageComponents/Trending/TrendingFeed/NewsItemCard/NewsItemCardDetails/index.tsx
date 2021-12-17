import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import {
  BorderRadius,
  BorderRadius2x,
  BorderRadius3x,
  Colors,
  isThemeDark,
} from "layout/AppTheme";
// Typings
import {
  SoldOutStatus,
  UserPrivate,
  NewsItem,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
import DescriptionLoadingText from "components/NewsItemRowMedium/DescriptionLoadingText";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextInfoRow from "./TextInfoRow";
/// gql
import { useQuery } from "@apollo/client"
import { GET_NEWS_ITEM_BY_ID } from "queries/news-items-queries"

import {
  transformNewsItemToFields,
  NewsItemFields,
} from "../../../transformNewsItemFields";
// Snackbar
import { useSnackbar } from "notistack";
import ButtonLoading from "components/ButtonLoading";
import AdType from "components/NewsItemChips/AdType";
import PromotedBadge from "components/NewsItemChips/PromotedBadge";
import SourceSiteChip from "components/NewsItemChips/SourceSiteChip";
import VerifiedChip from "components/NewsItemChips/VerifiedChip";
import DescriptionText from "./DescriptionText";

import CollectionsIcon from 'components/Collections/CollectionsIcon';
import NewsItemAdminSuspendIcon from "components/NewsItems/NewsItemAdminSuspendIcon"
import NewsItemAdminSetCategoryIcon from "components/NewsItems/NewsItemAdminSetCategoryIcon"
import NewsItemAdminRescrapeIcon from "components/NewsItems/NewsItemAdminRescrapeIcon"
import NewsItemAdminMarkSoldIcon from "components/NewsItems/NewsItemAdminMarkSoldIcon"
import NewsItemAdminGenerateClaimIdIcon from "components/NewsItems/NewsItemAdminGenerateClaimIdIcon"

import FeaturedPreview from "pageComponents/P/ImageGallery/FeaturedPreview";
import BottomImageCarouselDesktop from "pageComponents/P/ImageGallery/ImageGalleryDesktop/BottomImageCarouselDesktop";




const NewsItemCardDetails = (props: ReactProps) => {

  const {
    classes,
    user,
  } = props;

  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("lg"))
  // const snackbar = useSnackbar();


  const { data, loading } = useQuery<QData1, QVar1>(GET_NEWS_ITEM_BY_ID, {
    variables: {
      newsItemId: props.newsItem?.id,
    }
  })
  const newsItemFull = data?.getNewsItemById

  let newsItem = newsItemFull?.id
    ? { ...newsItemFull, ...props.newsItem }
    : props.newsItem


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
		featuredPreviewItem: _featuredPreviewItem,
		previewItems,
    isInternalProduct,
  } = transformNewsItemToFields(newsItem)


  const [
    featuredPreviewItem,
    setFeaturedPreviewItem
  ] = React.useState(_featuredPreviewItem);
  // console.log("newsITEMFull:", newsItemFull)

  // if there is a gallery, constrain aspect ratio so the
  // image box doesnt jitter in size when browsing through the gallery
  let constrainAspect = previewItems?.length > 1

  React.useEffect(() => {
    setFeaturedPreviewItem(_featuredPreviewItem)
  }, [newsItem?.id])

  // console.log("currentNewsItem:", props.newsItem)

  return (
    <div className={classes.newsItemCardDetailsRoot}>

      <div
        className={clsx(
          classes.flexColOuter,
          classes.unclickable,
          classes.positionRelative,
          "fadeInFast",
        )}
      >
        <div className={classes.overflowHidden}>
          <FeaturedPreview
            featuredPreviewItem={featuredPreviewItem}
            previewItems={previewItems}
            setPreviewLoaded={(b) => props.setPreviewLoaded(b)}
            loading={props.loading || !process.browser} // for SSR
            index={props.index}
            setIndex={props.setIndex}
            isPromoted={false}
            disableModalPopup={false}
            style={{
              width: props.imageSize?.desktop?.width,
              height: props.imageSize?.desktop?.height,
              maxHeight: 266,
            }}
            swipeableStyle={{
            }}
            previewImageClassName={classes.previewImageClass}
            constrainAspectRatio={constrainAspect}
            animateTransitions={true}
            previewsMissingMessage={"Image Needs Claiming"}
          />
        </div>


        <NewsItemAdminSuspendIcon
          newsItem={newsItem}
          style={{
            top: 'unset',
            bottom: '-1rem',
            left: 'calc(1rem)',
            marginTop: '0.5rem',
            width: '28px',
            height: '28px',
          }}
        />

        <NewsItemAdminRescrapeIcon
          newsItem={newsItem}
          style={{
            top: 'unset',
            bottom: '-1rem',
            left: 'calc(3.5rem)',
            marginTop: '0.5rem',
            width: '28px',
            height: '28px',
          }}
        />

        <NewsItemAdminSetCategoryIcon
          newsItem={newsItem}
          style={{
            top: 'unset',
            bottom: '-1rem',
            left: 'calc(6rem)',
            marginTop: '0.5rem',
            width: '28px',
            height: '28px',
          }}
        />

        <NewsItemAdminGenerateClaimIdIcon
          newsItem={newsItem}
          style={{
            top: 'unset',
            bottom: '-1rem',
            left: 'calc(8.5rem)',
            marginTop: '0.5rem',
            width: '28px',
            height: '28px',
          }}
        />

        <NewsItemAdminMarkSoldIcon
          newsItem={newsItem}
          style={{
            top: "unset",
            bottom: '-1rem',
            left: 'calc(11rem)',
            marginTop: '0.5rem',
            width: '28px',
            height: '28px',
          }}
        />

        <CollectionsIcon
          productId={newsItem?.productId}
          externalProductId={newsItem?.externalProductId}
          // refetch={refetch}
          style={{
            top: 'unset',
            bottom: '-1rem',
            // right: 'calc(130px + 1.25rem)',
            right: '2.5rem',
            marginTop: '0.5rem',
            width: '28px',
            height: '28px',
          }}
        />

      </div>

      {
        previewItems?.length > 1 &&
        <div className={classes.bottomImageGalleryBox}>
          <BottomImageCarouselDesktop
            setFeaturedPreviewItem={setFeaturedPreviewItem}
            previewItems={previewItems}
            productId={newsItem?.id}
            loading={props.loading || !process.browser} // for SSR
            index={props.index}
            setIndex={props.setIndex}
            numberOfItemsWide={
              previewItems?.length < 6
                ? 6
                : previewItems?.length
            }
          />
        </div>
      }


      <div className={clsx(
        classes.flexRow,
        classes.titleBox,
      )}>

        <div
          className={clsx(
            classes.flexRowWrapOuter,
            classes.flexGrow,
            "fadeInFast",
          )}
          onClick={props.onClick}
        >
          {
            !title
            ? <div className={classes.flexColInner60}>
                <DescriptionLoadingText/>
              </div>
            : <div className={classes.flexColInner60}>

                <Typography className={classes.newsItemTitle}
                  variant="body1"
                  onClick={props.onClick}
                >
                  {title}
                </Typography>

                <TextInfoRow className={classes.textLine}
                  title={"Caliber"}
                  value={caliber}
                />

                <TextInfoRow className={classes.textLine}
                  title={"Make"}
                  value={make}
                />
                <TextInfoRow className={classes.textLine}
                  title={"Model"}
                  value={model}
                />
                {
                  action &&
                  <TextInfoRow className={classes.textLine}
                    title={"Action"}
                    value={action}
                  />
                }
                {/* {
                  barrelLength &&
                  <TextInfoRow className={classes.textLine}
                    title={"Barrel Length"}
                    value={barrelLength}
                  />
                } */}
                <TextInfoRow className={classes.textLine}
                  title={"Serial Number"}
                  value={serialNumber}
                />

                <TextInfoRow className={classes.textLine}
                  title={"License Number"}
                  value={licenseNumber}
                />

                <TextInfoRow className={classes.textLine}
                  title={"Condition"}
                  value={condition}
                />

                {/* <TextInfoRow className={classes.textLine}
                  title={"Phone"}
                  value={phoneNumber}
                /> */}


                <div className={classes.priceContainer}>
                  {
                    price &&
                    <PriceDisplayMainMobile
                      price={price}
                      soldOutStatus={soldOutStatus}
                      isSuspended={props.isSuspended}
                    />
                  }
                </div>

              </div>
          }
        </div>
      </div>


      <div className={clsx(
        classes.flexRowWrapOuter,
        classes.chipsBox,
        )}>

        {/* <SourceSiteChip sourceSite={sourceSite}/> */}

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

        {
          newsItem?.id?.startsWith('promoted_slot') &&
          <PromotedBadge />
        }

      </div>

      <div className={clsx(
        classes.flexRowWrapOuter,
        classes.descriptionBox,
      )}>
        <DescriptionText
          isInternalProduct={isInternalProduct}
          description={description}
        />
      </div>

    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem
  isSuspended: boolean;
  loading?: boolean;
  user: UserPrivate;
  onClick(): void;
  setPreviewLoaded(b: boolean): void;
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
  index: number
  setIndex(i: number): void
}

interface QData1 {
  getNewsItemById: NewsItem
}
interface QVar1 {
  newsItemId: string
}


const styles = (theme: Theme) => createStyles({
  newsItemCardDetailsRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  unclickable: {
    cursor: "default",
  },
  overflowHidden: {
    // SAFAIR overflow hidden bug, needs this willChange line
    borderRadius: `${BorderRadius2x}px ${BorderRadius2x}px 0px 0px`,
    overflow: 'hidden',
    // '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
    willChange: 'transform',
  },
  positionRelative: {
    zIndex: 1,
    position: "relative",
  },
  flexColOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // overflowY: 'hidden',
    // borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`,
    // alignItems: "center",
  },
  flexColPadding: {
    padding: '0.5rem 0rem 0.5rem 0rem',
  },
  flexColPaddingSm: {
    padding: '0.5rem 0rem 0.5rem 0rem',
  },
  flexColInner60: {
    flexBasis: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: "0.5rem",
    flexGrow: 1,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flexRowWrapOuter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomImageGalleryBox: {
    paddingLeft: "0.5rem",
    // paddingRight: "0.5rem",
    marginBottom: "-1.5rem",
  },
  titleBox: {
    marginTop: "1.5rem",
    padding: "0rem 1.5rem",
  },
  chipsBox: {
    // marginTop: "0.5rem",
    // marginBottom: "1rem",
    marginBottom: "0.5rem",
    padding: "0rem 1.5rem",
  },
  descriptionBox: {
    padding: "0rem 1.5rem",
    marginBottom: "1.5rem",
  },
  flexGrow: {
    flexGrow: 1,
  },
  priceContainer: {
    marginTop: '0.25rem',
  },
  newsItemTitle: {
    marginTop: "0.5rem",
    fontWeight: 600,
    fontSize: '1rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    lineHeight: '1rem',
    margin: '0.25rem 0rem',
    textTransform: "uppercase",
  },
  textLine: {
    fontWeight: 600,
  },
  claimButton: {
    position: "absolute",
    bottom: '-1rem',
    // right: '0.5rem',
    right: 'calc(40px + 0.5rem)',
    height: 32,
    width: '100%',
    maxWidth: 130,
    borderRadius: BorderRadius3x,
    backgroundColor: Colors.ultramarineBlue,
    color: Colors.cream,
    // transition: theme.transitions.create('transform', {
    //   easing: theme.transitions.easing.easeInOut,
    //   duration: '100ms',
    // }),
    "&:hover": {
      // transition: theme.transitions.create('transform', {
      //   easing: theme.transitions.easing.easeInOut,
      //   duration: '100ms',
      // }),
      backgroundColor: Colors.ultramarineBlueLight
    }
  },
  previewImageClass: {
    maxHeight: 266,
  },
});



export default withStyles(styles)(NewsItemCardDetails)