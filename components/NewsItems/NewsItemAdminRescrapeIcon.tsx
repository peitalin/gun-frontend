import React from "react";
// styles
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
// MUI
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import IconButton from "@material-ui/core/IconButton";
// Graphql
import { useMutation } from "@apollo/client";
import {
  RESCRAPE_EXTERNAL_PRODUCT,
} from "queries/news-items-mutations";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  UserPrivate,
  NewsItem,
  Role,
  AggregatorScrapeResponse,
  ScraperSourceSite,
} from "typings/gqlTypes";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";
import Tooltip from "@material-ui/core/Tooltip";
import ConfirmActionModal from "components/ConfirmActionModal";



const NewsItemAdminRescrapeIcon: React.FC<ReactProps> = (props) => {


  const {
    classes,
  } = props;

  const snackbar = useSnackbar()

  const user = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  const [
    rescrapeExternalProduct,
    response
  ] = useMutation<Mdata, Mvar>(RESCRAPE_EXTERNAL_PRODUCT, {
    variables: {
      sourceSiteId: props.newsItem?.externalProduct?.sourceSiteId,
      sourceSite:
        props.newsItem?.externalProduct?.sourceSite?.match(/usedguns/g)
          ? ScraperSourceSite.USEDGUNS
          : props.newsItem?.externalProduct?.sourceSite?.match(/ozgunsales/g)
            ? ScraperSourceSite.OZGUNSALES
            : props.newsItem?.externalProduct?.sourceSite?.match(/ssaa/g)
            ? ScraperSourceSite.SSAA
            : undefined,
      sourceSiteUrl: props.newsItem.externalProduct?.sourceSiteUrl,
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        `Error: ${err}`,
        { variant: "error" }
      )
    },
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        `Rescraped NewsItem ${data?.rescrapeExternalProduct?.id}`,
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

  return (
    <>
      <Tooltip title={"Rescrape News Item"}>
        <IconButton
          onClick={(e) => {
            // prevent click-through to underlying product card
            // e.stopPropagation();
            // let user know they are not logged in and item won't be saved
            if (
              user?.userRole === Role.PLATFORM_ADMIN
              || user?.userRole === Role.PLATFORM_EDITOR
            ) {
              // if user is logged in, add or remove to redux
              setOpenRescrapeModal(true)
            } else {
              snackbar.enqueueSnackbar(
                "Must be admin to rescrape",
                { variant: "info"}
              )
            }
          }}
          // onMouseEnter={() => setHover(true)}
          // onMouseLeave={() => setHover(false)}
          className={classes.rescrapeNewsItemRoot}
          style={{
            top: 'calc(50% - 16px)',
            padding: '.25rem', // determines button radius size
            ...props.style
          }}
          // size="small"
        >
          <SystemUpdateAltIcon classes={{
            root: classes.rescrapeRootIcon,
          }}/>
        </IconButton>
      </Tooltip>
      <ConfirmActionModal
        title={"Do you wish to rescrape this NewsItem?"}
        showModal={openRescrapeModal}
        setShowModal={() => setOpenRescrapeModal(false)}
        onConfirmFunction={async() => {

          snackbar.enqueueSnackbar(
            `Rescraping NewsItem ${props.newsItem?.id}`,
            { variant: "info" }
          )
          rescrapeExternalProduct()
        }}
      />
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
  style?: any;
}

interface Mdata {
  rescrapeExternalProduct: AggregatorScrapeResponse
}
interface Mvar {
  sourceSiteId: string
  sourceSite: string
  sourceSiteUrl?: string
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


export default withStyles(styles)( NewsItemAdminRescrapeIcon );