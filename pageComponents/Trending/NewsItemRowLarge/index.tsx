import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors, isThemeDark, BorderRadius3x } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Router
import Link from "next/link";
// Typings
import {
  External_Products,
  External_Product_Snapshots,
  SoldOutStatus,
  UserPrivate,
  NewsItem,
} from "typings/gqlTypes";
// Material UI
import NewsItemPreviewCard from "./NewsItemPreviewCard";
import Typography from "@material-ui/core/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
import DescriptionLoadingText from "./DescriptionLoadingText2";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import TextInfoRow from "./TextInfoRow";

import {
  transformNewsItemToFields,
  NewsItemFields,
} from "../transformNewsItemFields";
//
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import LaunchIcon from '@material-ui/icons/Launch';
// graphql
import { useMutation } from '@apollo/client';
import {
  UPVOTE_NEWS_ITEM,
  DOWNVOTE_NEWS_ITEM,
  UNVOTE_NEWS_ITEM,
  SUSPEND_UNSUSPEND_NEWS_ITEM,
} from "queries/news-items-mutations";
// Snackbar
import { useSnackbar } from "notistack";
import ButtonLoading from "components/ButtonLoading";
import AdType from "./AdType";
import SourceSiteChip from "./SourceSiteChip";
import DescriptionText from "./DescriptionText";



const NewsItemRowLarge = (props: ReactProps) => {

  const {
    classes,
    user,
    newsItem,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const snackbar = useSnackbar();

  const [
    upvote,
    upvoteResponse
  ] = useMutation<MData1, MVar>(UPVOTE_NEWS_ITEM, {
    onError: (err) => console.log(err)
  })

  const [
    unvote,
    unvoteResponse
  ] = useMutation<MData2, MVar>(UNVOTE_NEWS_ITEM, {
    onError: (err) => console.log(err)
  })

  const [
    downvote,
    downvoteResponse
  ] = useMutation<MData3, MVar>(DOWNVOTE_NEWS_ITEM, {
    onError: (err) => console.log(err)
  })


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
		previewItem,
    isInternalProduct,
  } = transformNewsItemToFields(newsItem)


  // locally update score optimistic, so you get instant feedback when voting
  // instead of waiting for mutation to return to update score
  const [existingVoteScore, setExistingVoteScore] = React.useState(
    newsItem?.yourVote?.score ?? 0
  )

  const downvoted = existingVoteScore === -1
  const upvoted = existingVoteScore === 1
  // console.log("yourVote:", yourVote)
  // console.log("previewItem:", previewItem)


  return (
    <div className={classes.productRowRoot}>

      <ShowOnMobileOrDesktopSSR desktop>
        <div
          className={clsx(
            classes.flexColOuter,
            classes.flexColPadding,
            classes.unclickable,
            classes.positionRelative,
            "fadeInFast",
          )}
        >
          <NewsItemPreviewCard
            previewItem={previewItem}
            setPreviewLoaded={(b) => props.setPreviewLoaded(b)}
            unclickable={true}
            width={'100%'}
            height={'100%'}
            // width={previewItem?.image?.original?.widthInPixels}
            // height={previewItem?.image?.original?.heightInPixels}
          />
          <ButtonLoading
            className={props.classes.claimButton}
            // style={{ }}
            variant={"contained"}
            loadingIconColor={Colors.cream}
            replaceTextWhenLoading={true}
            // loading={loading}
            // disabled={ }
            // disabled={disabled}
            onClick={() => {
              console.log("Convert externalProduct to Product")
            }}
          >
            Claim Listing
          </ButtonLoading>
        </div>
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
        <div
          className={clsx(
            classes.flexColOuter,
            classes.flexColPaddingSm,
            classes.unclickable,
            "fadeInFast",
          )}
        >
          <NewsItemPreviewCard
            previewItem={previewItem}
            setPreviewLoaded={(b) => props.setPreviewLoaded(b)}
            unclickable={true}
            width={props.imageSize?.mobile?.width ?? 82.5}
            height={props.imageSize?.mobile?.height ?? 55}
          />
        </div>
      </ShowOnMobileOrDesktopSSR>


      <div className={classes.flexRow}>

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
                {
                  barrelLength &&
                  <TextInfoRow className={classes.textLine}
                    title={"Barrel Length"}
                    value={barrelLength}
                  />
                }
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

                <TextInfoRow className={classes.textLine}
                  title={"Phone"}
                  value={phoneNumber}
                />


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


      <div className={classes.flexRowWrapOuter}>

        <SourceSiteChip sourceSite={sourceSite}/>

        <AdType
          productId={newsItem?.productId}
          adType={adType}
          sourceSiteUrl={sourceSiteUrl}
        />
      </div>

      <div className={classes.flexRowWrapOuter}>
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
}

interface MData1 {
  upvoteNewsItem: NewsItem
}
interface MData2 {
  unvoteNewsItem: NewsItem
}
interface MData3 {
  downvoteNewsItem: NewsItem
}
interface MVar {
  newsItemId: string
}

const styles = (theme: Theme) => createStyles({
  productRowRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  unclickable: {
    cursor: "default",
  },
  positionRelative: {
    position: "relative",
  },
  flexColOuter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  flexColInner30: {
    flexBasis: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: "center",
    flexGrow: 1,
    maxWidth: 250,
  },
  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: "1rem",
    paddingLeft: "0.5rem",
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
    padding: '0.5rem 0rem 0.5rem 0rem',
  },
  flexGrow: {
    flexGrow: 1,
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  priceContainer: {
    marginTop: '0.25rem',
  },
  caliber: {
    fontWeight: 600,
    fontSize: '0.8rem',
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
  arrowIconUp: {
    fontWeight: 600,
    color: Colors.ghostGrey,
    width: '1.5rem',
    height: '1.5rem',
    cursor: "pointer",
    "&:hover": {
      fill: Colors.blue,
    },
  },
  blueFill: {
    fill: Colors.lightBlue,
  },
  redFill: {
    fill: Colors.lighterRed,
  },
  arrowIconDown: {
    fontWeight: 600,
    color: Colors.ghostGrey,
    width: '1.5rem',
    height: '1.5rem',
    cursor: "pointer",
    "&:hover": {
      fill: Colors.lightRed,
    },
  },
  scoreText: {
    fontWeight: 600,
    color: Colors.ghostGrey,
    fontSize: '0.9rem',
  },
  sourceSiteChip: {
    padding: "0.25rem 0.75rem",
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    background: isThemeDark(theme)
      ? Colors.uniswapGrey
      : Colors.slateGreyDark,
    // background: Colors.ultramarineBlueDarkest,
    color: Colors.slateGreyDark,
    fontSize: "0.9rem",
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
  },
  sourceSiteLink: {
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceSiteUrlIcon: {
    fontWeight: 600,
    marginLeft: "0.25rem",
  },
  sourceSite: {
    fontWeight: 800,
    fontSize: '0.8rem',
    "&:hover": {
      color: Colors.blue,
    },
  },
  adType: {
    padding: "0.25rem 0.75rem",
    width: '100%',
    color: Colors.black,
    "& > a > svg": {
      fill: Colors.black,
    },
    "&:hover > a > svg": {
      fill: Colors.ultramarineBlue,
    },
    "&:hover": {
      color: Colors.ultramarineBlue,
    },
    transition:  theme.transitions.create(['color', 'fill'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 200,
    }),
    cursor: "pointer",
    fontSize: "0.9rem",
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
  },
  adTypePrivate: {
    background: Colors.yellow,
  },
  adTypeDealer: {
    background: Colors.orange,
  },
  description: {
    fontWeight: 500,
    maxHeight: 200,
    overflow: "scroll",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLighterBlack,
  },
  claimButton: {
    position: "absolute",
    bottom: '-0.5rem',
    right: '-0.5rem',
    height: 32,
    width: '100%',
    maxWidth: 120,
    borderRadius: BorderRadius3x,
    backgroundColor: Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: Colors.ultramarineBlueLight
    }
  },
});



export default withStyles(styles)(NewsItemRowLarge)