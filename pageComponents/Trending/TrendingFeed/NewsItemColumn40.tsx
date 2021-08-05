import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, BorderRadius } from "layout/AppTheme";
// typings
import {
  UserPrivate,
  NewsItem,
} from "typings/gqlTypes";
// Redux
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer"

import NewsItemCard from "./NewsItemCard";
// Snackbar
import { useSnackbar } from "notistack";
import { useWindowWidth } from "utils/hooks";
// Material UI
import Dialog from "@material-ui/core/Dialog";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";



export const NewsItemColumn40: React.FC<ReactProps> = (props) => {

  const {
    classes,
    currentNewsItem,
    setCurrentNewsItem,
    openModal,
    setOpenModal,
  } = props;

  const windowWidth = useWindowWidth()

  const userRedux = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })


  return (
    <div className={classes.trendItemFlex40}>
      <ShowOnMobileOrDesktopSSR desktop implementation="js">
        {
          currentNewsItem
          ? <NewsItemCard
              newsItem={currentNewsItem}
              user={userRedux}
              closeModal={() => {
                setCurrentNewsItem(undefined)
                setOpenModal(false)
              }}
            />
          : <div id="empty-newsItemColumn-2"></div>
        }
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile implementation="js">
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          BackdropProps={{
            classes: { root: classes.modalBackdrop }
          }}
          fullScreen={windowWidth < 480}
          fullWidth={false}
          maxWidth={"lg"}
          PaperProps={{
            classes: { root: classes.modalPaperScrollPaper }
          }}
        >
          <NewsItemCard
            newsItem={currentNewsItem}
            user={userRedux}
            closeModal={() => setOpenModal(false)}
          />
        </Dialog>
      </ShowOnMobileOrDesktopSSR>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  currentNewsItem: NewsItem
  setCurrentNewsItem(n: NewsItem): void
  openModal: boolean
  setOpenModal(b: boolean): void
}


const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "calc(100% - 1rem)",
    maxWidth: '960px',
    // height: '100%',
    boxShadow: 'unset',
    background: 'transparent',
    transition:  theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.easeIn,
      duration: 300,
    }),
  },
  trendItemFlex40: {
    display: "flex",
    flexDirection: "column",
    minWidth: 400,
    flexBasis: "40%",
    top: "2rem",
    position: "sticky",
    height: '100%',
    marginTop: '-1rem',
  },
})


export default withStyles(styles)( NewsItemColumn40 );