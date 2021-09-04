import React from "react";
// styles
import clsx from 'clsx';
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark } from "layout/AppTheme";
// MUI
import CategoryIcon from '@material-ui/icons/Category';
import IconButton from "@material-ui/core/IconButton";
// Graphql
import { useMutation } from "@apollo/client";
import {
  SET_NEWS_ITEM_CATEGORY,
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
import ChangeNewsItemCategoryModal from "./ChangeNewsItemCategoryModal";

import { categoryPreviewsBackup } from "utils/categories"




const NewsItemAdminSetCategoryIcon: React.FC<ReactProps> = (props) => {


  const {
    classes,
  } = props;

  const snackbar = useSnackbar()

  const user = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

  const [
    categoryId,
    setCategoryId
  ] = React.useState(undefined)


  const [openCategoryModal, setOpenCategoryModal] = React.useState(false)

  if (
    user?.userRole !== Role.PLATFORM_ADMIN
    && user?.userRole !== Role.PLATFORM_EDITOR
  ) {
    return null
  }

  return (
    <>
      <Tooltip title={"Set Category"}>
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
              setOpenCategoryModal(true)
            } else {
              snackbar.enqueueSnackbar(
                "Must be admin to change category",
                { variant: "info"}
              )
            }
          }}
          // onMouseEnter={() => setHover(true)}
          // onMouseLeave={() => setHover(false)}
          className={classes.setNewsItemCategoryRoot}
          style={{
            top: 'calc(50% - 16px)',
            padding: '.25rem', // determines button radius size
            ...props.style
          }}
          // size="small"
        >
          <CategoryIcon classes={{
            root: classes.changeCategoryRootIcon,
          }}/>
        </IconButton>
      </Tooltip>
      <ChangeNewsItemCategoryModal
        title={"Change Category for this NewsItem"}
        showModal={openCategoryModal}
        setShowModal={() => setOpenCategoryModal(false)}
        newsItem={props.newsItem}
      />
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
  style?: any;
}

interface Mdata {
  setNewsItemCategory: NewsItem
}
interface Mvar {
  newsItemId: string
  categoryId: string
}


const styles = (theme: Theme) => createStyles({
  setNewsItemCategoryRoot: {
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
  changeCategoryRootIcon: {
    width: '1rem',
    height: '1rem',
    fill: Colors.lightRed,
  },
});


export default withStyles(styles)( NewsItemAdminSetCategoryIcon );