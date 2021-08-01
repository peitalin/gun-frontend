import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Router
import Link from "next/link";
// Typings
import {
  External_Products,
  SoldOutStatus,
  NewsItem,
} from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
// Material UI
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
import Typography from "@material-ui/core/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
// import AddCartItemButton from "components/AddCartItemButton";
// import WatchlistButton from "components/WatchlistButton";
import DescriptionLoadingText from "./DescriptionLoadingText";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
//
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// graphql
import { useMutation } from '@apollo/client';
import {
  UPVOTE_NEWS_ITEM,
  DOWNVOTE_NEWS_ITEM,
  UNVOTE_NEWS_ITEM,
} from "queries/news-items-mutations";
// Snackbar
import { useSnackbar } from "notistack";


const NewsItemRowMedium = (props: ReactProps) => {

  const {
    classes,
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


  const externalProduct = newsItem?.externalProduct
  const productSnapshot = externalProduct?.currentExternalProductSnapshot
  const model = productSnapshot?.model
  const make = productSnapshot?.make
  const caliber = productSnapshot?.caliber

  const state = productSnapshot?.state
  const soldOutStatus = productSnapshot?.soldText || SoldOutStatus.AVAILABLE
  const price = productSnapshot?.price
  const title = productSnapshot?.title ?? `${make} ${model} ${caliber}`

  const previewItem = productSnapshot?.previewItems?.[0]


  // locally update score optimistic, so you get instant feedback when voting
  // instead of waiting for mutation to return to update score
  const [existingVoteScore, setExistingVoteScore] = React.useState(
    newsItem?.yourVote?.score ?? 0
  )

  const downvoted = existingVoteScore === -1
  const upvoted = existingVoteScore === 1
  // console.log("yourVote:", yourVote)


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
              previewItem
              ? <Link
                  href={
                    externalProduct?.sourceSiteUrl ??
                    `https://usedguns.com.au/gun/${externalProduct?.sourceSiteId}`
                  }
                  // as={`/p/${product?.id}`}
                >
                  <a>
                    <ProductPreviewCardRowSmall
                      previewItem={previewItem}
                      width={props.imageSize?.desktop?.width ?? 135}
                      height={props.imageSize?.desktop?.height ?? 90}
                    />
                  </a>
                </Link>
              : <ProductPreviewCardRowSmall
                  previewItem={undefined}
                  width={props.imageSize?.desktop?.width ?? 135}
                  height={props.imageSize?.desktop?.height ?? 90}
                />
            }
          </div>
        </ShowOnMobileOrDesktopSSR>
        <ShowOnMobileOrDesktopSSR mobile>
          <div className={clsx(
            classes.flexColOuter,
            classes.flexColPaddingSm,
          )}>
            {
              previewItem
              ? <Link
                  // href="/p/[productId]"
                  // as={`/p/${product?.id}`}
                  href={
                    externalProduct?.sourceSiteUrl ??
                    `https://usedguns.com.au/gun/${externalProduct?.sourceSiteId}`
                  }
                >
                  <a>
                    <ProductPreviewCardRowSmall
                      previewItem={previewItem}
                      width={props.imageSize?.mobile?.width ?? 82.5}
                      height={props.imageSize?.mobile?.height ?? 55}
                    />
                  </a>
                </Link>
              : <ProductPreviewCardRowSmall
                  previewItem={undefined}
                  width={props.imageSize?.mobile?.width ?? 82.5}
                  height={props.imageSize?.mobile?.height ?? 55}
                />
            }
          </div>
        </ShowOnMobileOrDesktopSSR>

        <div className={clsx(
          classes.flexRowWrapOuter,
          classes.flexGrow
        )}>
          {
            !title
            ? <div className={classes.flexColInner60}>
                <DescriptionLoadingText/>
              </div>
            : <div className={classes.flexColInner60}>
                <Typography className={classes.category} variant="body1">
                  {`${model} ${make}`}
                </Typography>

                <Link
                  // href="/p/[productId]"
                  // as={`/p/${product?.id}`}
                  href={
                    externalProduct?.sourceSiteUrl ??
                    `https://usedguns.com.au/gun/${externalProduct?.sourceSiteId}`
                  }
                >
                  <a>
                    <Typography className={classes.title} variant="body1">
                      {title}
                    </Typography>
                  </a>
                </Link>

                <Typography className={classes.dealerState} variant="body1">
                  {state}
                </Typography>

                <Typography className={classes.rankScore} variant="body1">
                  {`${newsItem?.rankScore}`}
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
              </div>
          }
      </div>

      <div className={clsx(
        classes.flexColCenter,
      )}>
        <ArrowUpIcon
          className={clsx(
            classes.arrowIconUp,
            upvoted && classes.blueFill,
          )}
          onClick={() => {

            if (upvoted) {
              setExistingVoteScore(0)
              snackbar.enqueueSnackbar("UNVOTING", { variant: "info" })
              unvote({ variables: { newsItemId: newsItem?.id } })
            } else {
              setExistingVoteScore(1)
              snackbar.enqueueSnackbar("UPVOTING", { variant: "success" })
              upvote({ variables: { newsItemId: newsItem?.id }
              })
            }
          }}
        />
        <Typography className={classes.scoreText}>
          {existingVoteScore}
        </Typography>
        <ArrowDownIcon
          className={clsx(
            classes.arrowIconDown,
            downvoted && classes.redFill,
          )}
          onClick={() => {
            console.log("down")
            if (downvoted) {
              setExistingVoteScore(0)
              snackbar.enqueueSnackbar("UNVOTING", { variant: "info" })
              unvote({ variables: { newsItemId: newsItem?.id }
              })
            } else {
              setExistingVoteScore(-1)
              snackbar.enqueueSnackbar("DOWNVOTING", { variant: "error" })
              downvote({ variables: { newsItemId: newsItem?.id }
              })
            }
          }}
        />
      </div>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem
  isSuspended: boolean;
  loading?: boolean;
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
    flexDirection: 'row',
    width: '100%',
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
  dealerState: {
    fontWeight: 600,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    fontSize: '0.8rem',
  },
  rankScore: {
    fontWeight: 800,
    marginTop: "0.25rem",
    color: theme.palette.type === 'dark'
      ? Colors.red
      : Colors.red,
    fontSize: '0.8rem',
  },
  variant: {
    fontWeight: 600,
    color: Colors.ghostGrey,
    fontSize: '0.8rem',
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
});



export default withStyles(styles)(NewsItemRowMedium)