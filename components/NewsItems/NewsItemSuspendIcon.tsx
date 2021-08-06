import React from "react";
// styles
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
// MUI
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import IconButton from "@material-ui/core/IconButton";
// Graphql
import { useMutation } from "@apollo/client";
import {
  SUSPEND_UNSUSPEND_NEWS_ITEM,
} from "queries/news-items-mutations";
// redux
import { useDispatch, useSelector } from "react-redux";
import { CollectionItemId } from "reduxStore/collections-reducer";
import { UserPrivate, Role } from "typings/gqlTypes";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// snackbar
import { useSnackbar } from "notistack";
import Tooltip from "@material-ui/core/Tooltip";



const NewsItemSuspendIcon: React.FC<ReactProps> = (props) => {


  const {
    classes,
  } = props;

  const dispatch = useDispatch();
  const snackbar = useSnackbar()

  const user = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  const [
    suspendedUnsuspendNewsItem,
    response
  ] = useMutation<Mdata, Mvar>(SUSPEND_UNSUSPEND_NEWS_ITEM, {
    variables: {
      newsItemId: props.newsItemId,
      isSuspended: true
    }
  })


  return (
    <Tooltip title={"Suspend News Item"}>
      <IconButton
        onClick={(e) => {
          // prevent click-through to underlying product card
          e.stopPropagation();
          // let user know they are not logged in and item won't be saved
          if (
            user?.userRole === Role.PLATFORM_ADMIN
            || user?.userRole === Role.PLATFORM_EDITOR
          ) {
            // if user is logged in, add or remove to redux
            openModal()
          } else {
            snackbar.enqueueSnackbar(
              "Must be admin to suspend",
              { variant: "info"}
            )
          }
        }}
        // onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
        className={classes.collectionRoot}
        style={{
          top: 'calc(50% - 16px)',
          padding: '.25rem', // determines button radius size
          ...props.style
        }}
        // size="small"
      >
        <RemoveIcon classes={{
          root: classes.favoriteRootAdded,
        }}/>
      </IconButton>
    </Tooltip>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  newsItemId?: string;
  style?: any;
}


const styles = (theme: Theme) => createStyles({
  collectionRoot: {
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
        fill: Colors.ultramarineBlueLight,
      },
    },
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  favoriteRoot: {
    width: '1rem',
    height: '1rem',
    fill: Colors.ultramarineBlue,
  },
  favoriteRootAdded: {
    width: '1rem',
    height: '1rem',
    fill: Colors.lightRed,
  },
});


export default withStyles(styles)( NewsItemSuspendIcon );