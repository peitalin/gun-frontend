import React from "react";
// styles
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
// MUI
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import GavelIcon from '@material-ui/icons/Gavel';
import IconButton from "@material-ui/core/IconButton";
// Graphql
import { useMutation } from "@apollo/client";
import {
  SUSPEND_UNSUSPEND_NEWS_ITEM,
} from "queries/news-items-mutations";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  UserPrivate,
  NewsItem,
  Role ,
} from "typings/gqlTypes";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";
import Tooltip from "@material-ui/core/Tooltip";
import ConfirmActionModal from "components/ConfirmActionModal";



const NewsItemAdminSuspendIcon: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const snackbar = useSnackbar()

  const user = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  const [
    suspendNewsItem,
    response
  ] = useMutation<Mdata, Mvar>(SUSPEND_UNSUSPEND_NEWS_ITEM, {
    variables: {
      newsItemId: props.newsItem?.id,
      isSuspended: true
    },
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        `Suspended NewsItem ${data?.suspendUnsuspendNewsItem?.id}`,
        { variant: "info" }
      )
    },
  })

  const [openSuspendModal, setOpenSuspendModal] = React.useState(false)

  if (
    user?.userRole !== Role.PLATFORM_ADMIN
    && user?.userRole !== Role.PLATFORM_EDITOR
  ) {
    return null
  }

  return (
    <>
      <Tooltip title={"Suspend News Item"}>
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
              setOpenSuspendModal(true)
            } else {
              snackbar.enqueueSnackbar(
                "Must be admin to suspend",
                { variant: "info"}
              )
            }
          }}
          // onMouseEnter={() => setHover(true)}
          // onMouseLeave={() => setHover(false)}
          className={classes.suspendNewsItemRoot}
          style={{
            top: 'calc(50% - 16px)',
            padding: '.25rem', // determines button radius size
            ...props.style
          }}
          // size="small"
        >
          <GavelIcon classes={{
            root: classes.gavelRootIcon,
          }}/>
        </IconButton>
      </Tooltip>
      <ConfirmActionModal
        title={"Do you wish to suspend this NewsItem?"}
        showModal={openSuspendModal}
        setShowModal={() => setOpenSuspendModal(false)}
        onConfirmFunction={async() => {
          suspendNewsItem({
            variables: {
              newsItemId: props.newsItem?.id,
              isSuspended: true
            }
          })
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
  suspendUnsuspendNewsItem: NewsItem
}
interface Mvar {
  newsItemId: string
  isSuspended: boolean
}


const styles = (theme: Theme) => createStyles({
  suspendNewsItemRoot: {
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
  gavelRootIcon: {
    width: '1rem',
    height: '1rem',
    fill: Colors.lightRed,
  },
});


export default withStyles(styles)( NewsItemAdminSuspendIcon );