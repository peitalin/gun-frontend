import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, isThemeDark } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  NewsItem,
} from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
// Material UI
import ProductPreviewThumb from "components/ProductPreviewThumb";
import Typography from "@mui/material/Typography";
import PriceDisplayMainMobile from "components/PriceDisplayMainMobile";
// import AddCartItemButton from "components/AddCartItemButton";
// import WatchlistButton from "components/WatchlistButton";
import DescriptionLoadingText from "./DescriptionLoadingText";
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
//
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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



const VoteOnNewsItem = (props: ReactProps) => {

  const {
    classes,
    user,
    newsItem,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))
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

  const downvoted = props.existingVoteScore === -1
  const upvoted = props.existingVoteScore === 1

  return (
    <div className={clsx(classes.voteOnNewsItemRoot)}>
      <ArrowUpIcon
        className={clsx(
          classes.arrowIconUp,
          upvoted && classes.blueFill,
        )}
        onClick={() => {
          if (!user?.id) {
            snackbar.enqueueSnackbar("Login to vote", { variant: "info" })
            return
          }

          if (upvoted) {
            props.setExistingVoteScore(0)
            snackbar.enqueueSnackbar("Unvoting", { variant: "info" })
            unvote({ variables: { newsItemId: newsItem?.id } })
          } else {
            props.setExistingVoteScore(1)
            snackbar.enqueueSnackbar("Upvoting", { variant: "success" })
            upvote({ variables: { newsItemId: newsItem?.id }
            })
          }
        }}
      />
      <Typography className={classes.scoreText}>
        {props.existingVoteScore}
      </Typography>
      <ArrowDownIcon
        className={clsx(
          classes.arrowIconDown,
          downvoted && classes.redFill,
        )}
        onClick={() => {
          if (!user?.id) {
            snackbar.enqueueSnackbar("Login to vote", { variant: "info" })
            return
          }

          if (downvoted) {
            props.setExistingVoteScore(0)
            snackbar.enqueueSnackbar("Unvoting", { variant: "info" })
            unvote({ variables: { newsItemId: newsItem?.id }
            })
          } else {
            props.setExistingVoteScore(-1)
            snackbar.enqueueSnackbar("Downvoting", { variant: "error" })
            downvote({ variables: { newsItemId: newsItem?.id }
            })
          }
        }}
      />
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem
  user: UserPrivate;
  setExistingVoteScore(n: number): void
  existingVoteScore: number
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
  voteOnNewsItemRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: "1rem",
    paddingLeft: "0.5rem",
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



export default withStyles(styles)(VoteOnNewsItem)