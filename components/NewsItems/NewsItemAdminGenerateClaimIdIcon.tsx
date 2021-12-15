import React from "react";
// styles
import clsx from 'clsx';
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
// MUI
import LinkIcon from '@mui/icons-material/Link';
import IconButton from "@mui/material/IconButton";
// Graphql
import { useMutation } from "@apollo/client";
import {
  GENERATE_CLAIM_PRODUCT_REF_ID,
} from "queries/news-items-claims-mutations";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  UserPrivate,
  NewsItem,
  Role,
  ClaimProductLink,
  AggregatorScrapeResponse,
  ScraperSourceSite,
} from "typings/gqlTypes";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";
import Tooltip from "@mui/material/Tooltip";
import ConfirmActionModal from "components/ConfirmActionModal";
import copy from "clipboard-copy";


const NewsItemAdminGenerateClaimidIcon: React.FC<ReactProps> = (props) => {


  const {
    classes,
  } = props;

  const snackbar = useSnackbar()

  const user = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  const [
    generateClaimLink,
    response
  ] = useMutation<Mdata, Mvar>(
    GENERATE_CLAIM_PRODUCT_REF_ID, {
    variables: {
      newsItemId: props.newsItem?.id
    },
    onError: (err) => {
      console.log("rescrape error stack: ", err)
      let msg = err?.graphQLErrors?.[0]?.message
      snackbar.enqueueSnackbar(
        `${msg}`,
        { variant: "error" }
      )
    },
    onCompleted: (data) => {
      let claimUrl = data?.generateClaimProductRefId?.claimLink
      let claimId = data?.generateClaimProductRefId?.claimId
      copy(claimUrl)
      snackbar.enqueueSnackbar(
        `Copied claim: ${data?.generateClaimProductRefId?.claimId} to share`,
        { variant: "success" }
      )
    },
  })

  const [openRescrapeModal, setOpenRescrapeModal] = React.useState(false)

  if (
    user?.userRole !== Role.PLATFORM_ADMIN
    && user?.userRole !== Role.PLATFORM_EDITOR
  ) {
    return null
  }

  return <>
    <Tooltip title={"Generate Claim Link"}>
      <IconButton
        onClick={(e) => {
          // prevent click-through to underlying product card
          // e.stopPropagation();
          // let user know they are not logged in and item won't be saved
          if (
            user?.userRole === Role.PLATFORM_ADMIN
            || user?.userRole === Role.PLATFORM_EDITOR
          ) {
            generateClaimLink()
          } else {
            snackbar.enqueueSnackbar(
              "Must be admin to generate claim link",
              { variant: "info"}
            )
          }
        }}
        // onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
        className={classes.rescrapeNewsItemRoot}
        // size="small"
        style={{
          top: 'calc(50% - 16px)',
          padding: '.25rem', // determines button radius size
          ...props.style
        }}
        size="large">
        <LinkIcon classes={{
          root: classes.rescrapeRootIcon,
        }}/>
      </IconButton>
    </Tooltip>
    {/* <ConfirmActionModal
      title={"Do you wish to rescrape this NewsItem?"}
      showModal={openRescrapeModal}
      setShowModal={() => setOpenRescrapeModal(false)}
      onConfirmFunction={async() => {

        snackbar.enqueueSnackbar(
          `Rescraping NewsItem ${props.newsItem?.id}`,
          { variant: "info" }
        )
      }}
    /> */}
  </>;
}


interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
  style?: any;
}

interface Mdata {
  generateClaimProductRefId: ClaimProductLink
}
interface Mvar {
  newsItemId: string
}


const styles = (theme: Theme) => createStyles({
  rescrapeNewsItemRoot: {
    position: 'absolute',
    zIndex: 1,
    right: '1rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    // border: `1px solid ${Colors.black}`,
    boxShadow: BoxShadows.shadow3.boxShadow,
    transform: "scale(1.2)",
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapMediumNavy
        : Colors.slateGrey,
      transform: "scale(1.4)",
      "& > span > svg": {
        fill: Colors.yellow,
      },
    },
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  rescrapeRootIcon: {
    width: '1rem',
    height: '1rem',
    fill: Colors.blue,
  },
});


export default withStyles(styles)( NewsItemAdminGenerateClaimidIcon );