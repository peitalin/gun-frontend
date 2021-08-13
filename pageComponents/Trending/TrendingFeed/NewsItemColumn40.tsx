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

  // const windowWidth = useWindowWidth()

  const userRedux = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })


  return (
    <>
      <ShowOnMobileOrDesktopSSR desktop implementation="js">
        <div className={clsx(classes.trendItemFlex40, classes.desktopWidth)}>
          {
            currentNewsItem
            ? <NewsItemCard
                newsItem={currentNewsItem}
                user={userRedux}
                isModal={false}
                closeModal={() => {
                  setCurrentNewsItem(undefined)
                  setOpenModal(false)
                }}
                index={props.index}
                setIndex={props.setIndex}
              />
            : <div id="empty-newsItemColumn-2"></div>
          }
        </div>
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile implementation="js">
        <div className={clsx(classes.trendItemFlex40, classes.mobileWidth)}>
          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            BackdropProps={{
              classes: { root: classes.modalBackdrop }
            }}
            fullScreen={true}
            fullWidth={true}
            maxWidth={"lg"}
            PaperProps={{
              classes: { root: classes.modalPaperScrollPaper }
            }}
          >
            <NewsItemCard
              newsItem={currentNewsItem}
              user={userRedux}
              closeModal={() => setOpenModal(false)}
              isModal={true}
              index={props.index}
              setIndex={props.setIndex}
            />
          </Dialog>
        </div>
      </ShowOnMobileOrDesktopSSR>
    </>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  currentNewsItem: NewsItem
  setCurrentNewsItem(n: NewsItem): void
  openModal: boolean
  setOpenModal(b: boolean): void
  index: number
  setIndex(i: number): void
}


const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
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
    top: "1rem",
    position: "sticky",
    height: '100%',
    marginTop: '-1rem',
  },
  mobileWidth: {
  },
  desktopWidth: {
    minWidth: 400,
    flexBasis: "40%",
  },
})


export default withStyles(styles)( NewsItemColumn40 );