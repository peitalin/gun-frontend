import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark, BorderRadius2x } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  NewsItem,
  Role,
} from "typings/gqlTypes";
// Material UI
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
import Typography from "@material-ui/core/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
import DescriptionLoadingText from "./DescriptionLoadingText";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import {
  transformNewsItemToFields,
  NewsItemFields,
} from "../../transformNewsItemFields";
//
import VoteOnNewsItem from "./VoteOnNewsItem";
import AdType from "components/NewsItemChips/AdType";
import SourceSiteChip from "components/NewsItemChips/SourceSiteChip";
import VerifiedChip from "components/NewsItemChips/VerifiedChip";
// Snackbar
import { useSnackbar } from "notistack";


const TrendingNewsItemRow = (props: ReactProps) => {

  const {
    classes,
    user,
    newsItem,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const snackbar = useSnackbar();

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
  } = transformNewsItemToFields(newsItem)


  // locally update score optimistic, so you get instant feedback when voting
  // instead of waiting for mutation to return to update score
  const [existingVoteScore, setExistingVoteScore] = React.useState(
    newsItem?.yourVote?.score ?? 0
  )


  return (

    <div className={classes.productPanelRoot}>
      <div className={classes.productCardBox}>
        <div className={clsx(classes.productRowRoot)}>

          <ShowOnMobileOrDesktopSSR desktop>
            <div
              className={clsx(
                classes.flexColOuter,
                classes.flexColPadding,
                classes.clickable,
                "fadeInFast",
              )}
              onClick={props.onClick}
            >
              <ProductPreviewCardRowSmall
                previewItem={featuredPreviewItem}
                width={props.imageSize?.desktop?.width ?? 135}
                height={props.imageSize?.desktop?.height ?? 90}
              />
            </div>
          </ShowOnMobileOrDesktopSSR>
          <ShowOnMobileOrDesktopSSR mobile>
            <div
              className={clsx(
                classes.flexColOuter,
                classes.flexColPaddingSm,
                classes.clickable,
                "fadeInFast",
              )}
              onClick={props.onClick}
            >
              <ProductPreviewCardRowSmall
                previewItem={featuredPreviewItem}
                width={props.imageSize?.mobile?.width ?? 82.5}
                height={props.imageSize?.mobile?.height ?? 55}
              />
            </div>
          </ShowOnMobileOrDesktopSSR>

          <div className={clsx(
              classes.flexRowWrapOuter,
              classes.flexGrow,
              classes.clickable,
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
                    {
                      !sourceSite.match(/ozgunsales/)
                      ? title
                      : `${make} ${model}`
                    }
                  </Typography>

                  <Typography className={classes.textLine} variant="body1">
                    {state}
                  </Typography>

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

                  <div className={classes.chipContainer}>
                    <SourceSiteChip
                      sourceSite={sourceSite}
                    />
                    <AdType
                      className={classes.maxWidthAdType}
                      adType={adType}
                      sourceSiteUrl={sourceSiteUrl}
                      productId={newsItem?.productId}
                    />
                    {
                      newsItem?.product?.sellerLicense?.verified &&
                      // true &&
                      <VerifiedChip
                        title={"Verified Seller"}
                      />
                    }
                  </div>

                  {
                    user?.userRole === Role.PLATFORM_ADMIN &&
                    <>
                      <Typography className={classes.rankScore} variant="body1">
                        {`rank: ${newsItem?.rankScore}`}
                      </Typography>
                      {
                        newsItem?.externalProduct?.category?.slug &&
                        <Typography className={classes.rankScore} variant="body1">
                          {`category: ${newsItem?.externalProduct?.category?.slug}`}
                        </Typography>
                      }
                      <Typography className={classes.rankScoreId} variant="body1">
                        {`id: ${newsItem?.id}`}
                      </Typography>
                      <Typography className={classes.rankScoreId} variant="body1">
                        {
                          newsItem?.externalProduct
                          ? `snapshotId: ${newsItem?.externalProduct?.currentExternalProductSnapshotId}`
                          : `snapshotId: ${newsItem?.product?.currentSnapshotId}`
                        }
                      </Typography>
                      <Typography className={classes.rankScoreId} variant="body1">
                        {`date: ${newsItem?.createdAt}`}
                      </Typography>
                    </>
                  }

                </div>
            }
          </div>


          <VoteOnNewsItem
            newsItem={newsItem}
            user={user}
            setExistingVoteScore={setExistingVoteScore}
            existingVoteScore={existingVoteScore}
          />

        </div>
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem
  isSuspended: boolean;
  user: UserPrivate;
  onClick(): void;
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
  productPanelRoot: {
    width: '100%',
  },
  productCardBox: {
    height: "100%",
    width: '100%',
  },
  productRowRoot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: "100%",
    padding: '0.25rem',
    transition:  theme.transitions.create(['background-color'], {
      easing: theme.transitions.easing.easeIn,
      duration: 100,
    }),
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    "&:hover": {
      transition:  theme.transitions.create(['background-color'], {
        easing: theme.transitions.easing.easeIn,
        duration: 0,
      }),
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapMediumNavy
        : Colors.slateGrey,
    },
  },
  clickable: {
    "&:hover": {
      cursor: "pointer"
    },
    "&:hover > div > p:nth-child(2)": {
      // highlight title
      color: isThemeDark(theme)
        ? Colors.purple
        : Colors.blue,
    },
  },
  flexColOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexColPadding: {
    padding: '0.5rem 0rem 0.5rem 0.5rem',
  },
  flexColPaddingSm: {
    padding: '0.25rem 0rem 0.25rem 0.25rem',
  },
  flexColInner60: {
    flexBasis: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: "0.5rem",
    flexGrow: 1,
    height: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexRowWrapOuter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0.5rem 0rem 0.5rem 1rem',
  },
  flexGrow: {
    flexGrow: 1,
  },
  priceContainer: {
    marginTop: '0.25rem',
  },
  caliber: {
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
    textTransform: "uppercase",
    fontSize: '0.8rem',
  },
  newsItemTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    lineHeight: '1rem',
    margin: '0.25rem 0rem',
  },
  textLine: {
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    fontSize: '0.8rem',
  },
  rankScore: {
    fontWeight: 800,
    marginTop: "0.25rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarker,
    fontSize: '0.8rem',
  },
  rankScoreId: {
    fontWeight: 500,
    marginTop: "0.25rem",
    color: isThemeDark(theme)
      ? Colors.uniswapMediumGrey
      : Colors.slateGreyDark,
    fontSize: '0.8rem',
  },
  maxWidthAdType: {
    maxWidth: 120,
    marginRight: '0.5rem',
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: "wrap",
  },
});



export default withStyles(styles)(TrendingNewsItemRow)