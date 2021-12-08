import React from "react";
// styles
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
// MUI
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import IconButton from "@material-ui/core/IconButton";
// Graphql
import { useMutation } from "@apollo/client";
import {
  MARK_NEWS_ITEM_AS_SOLD_ADMIN,
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



const NewsItemAdminMarkSoldIcon: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const snackbar = useSnackbar()

  const user = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  const [
    markNewsItemAsSoldAdmin,
    response
  ] = useMutation<Mdata, Mvar>(
    MARK_NEWS_ITEM_AS_SOLD_ADMIN, {
    variables: {
      newsItemId: props.newsItem?.id,
    },
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        `Marked NewsItem ${data?.markNewsItemAsSoldAdmin.id} Sold`,
        { variant: "info" }
      )
    },
  })

  const [openMarkSoldModal, setopenMarkSoldModal] = React.useState(false)

  if (
    user?.userRole !== Role.PLATFORM_ADMIN
    && user?.userRole !== Role.PLATFORM_EDITOR
  ) {
    return null
  }

  return (
    <>
      <Tooltip title={"Mark Sold"}>
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
              setopenMarkSoldModal(true)
            } else {
              snackbar.enqueueSnackbar(
                "Must be admin to mark Sold",
                { variant: "info"}
              )
            }
          }}
          // onMouseEnter={() => setHover(true)}
          // onMouseLeave={() => setHover(false)}
          className={classes.markNewsItemAsSoldAdminRoot}
          style={{
            top: 'calc(50% - 16px)',
            padding: '.25rem', // determines button radius size
            ...props.style
          }}
          // size="small"
        >
          <MonetizationOnIcon classes={{
            root: classes.soldRootIcon,
          }}/>
        </IconButton>
      </Tooltip>
      <ConfirmActionModal
        title={"Mark this NewsItem as Sold?"}
        showModal={openMarkSoldModal}
        setShowModal={() => setopenMarkSoldModal(false)}
        onConfirmFunction={async() => {
          markNewsItemAsSoldAdmin({
            variables: {
              newsItemId: props.newsItem?.id,
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
  markNewsItemAsSoldAdmin: NewsItem
}
interface Mvar {
  newsItemId: string
}


const styles = (theme: Theme) => createStyles({
  markNewsItemAsSoldAdminRoot: {
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
  soldRootIcon: {
    width: '1rem',
    height: '1rem',
    fill: Colors.lightRed,
  },
});


export default withStyles(styles)( NewsItemAdminMarkSoldIcon );