
import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius4x, Colors, isThemeDark } from "layout/AppTheme";
import clsx from 'clsx'
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import { NewsItem } from "typings/gqlTypes"
import { categoryPreviewsBackup } from "utils/categories"
import { useMutation } from "@apollo/client"
import { SET_NEWS_ITEM_CATEGORY } from "queries/news-items-mutations"
// snackbar
import { useSnackbar } from "notistack";


const ChangeNewsItemCategoryModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
    title,
    showModal,
    setShowModal,
    className,
  } = props;

  const snackbar = useSnackbar()

  interface Mdata {
    setNewsItemCategory: NewsItem
  }
  interface Mvar {
    newsItemId: string
    categoryId: string
  }

  const [
    setNewsItemCategory,
    response
  ] = useMutation<Mdata, Mvar>(
    SET_NEWS_ITEM_CATEGORY, {
    variables: {
      newsItemId: props.newsItem?.id,
      categoryId: undefined
    },
    onCompleted: (data) => {
      let newsItemId = data?.setNewsItemCategory?.id
      snackbar.enqueueSnackbar(
        `Set NewsItem ${newsItemId} category`,
        { variant: "info" }
      )
    },
  })

  let rifleCategoryId = categoryPreviewsBackup.find(c => c.slug === 'rifles')?.id
  let handgunCategoryId = categoryPreviewsBackup.find(c => c.slug === 'handguns')?.id
  let shotgunCategoryId = categoryPreviewsBackup.find(c => c.slug === 'shotguns')?.id
  let itemCategoryId = categoryPreviewsBackup.find(c => c.slug === 'items')?.id

  // console.log("rifleId: ", rifleCategoryId)
  // console.log("handgunId: ", handgunCategoryId)
  // console.log("shotgunId: ", shotgunCategoryId)
  // console.log("itemId: ", itemCategoryId)
  // console.log("chhange newsItem: ", props.newsItem)

  let newsItemCategory = props.newsItem?.externalProduct?.category
    || props.newsItem?.product?.category

  let newsItemCategoryId = props.newsItem?.externalProduct?.categoryId
    || props.newsItem?.product?.category?.id

  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      BackdropProps={{
        classes: {
          root: classes.modalBackdrop,
        }
      }}
      PaperProps={{
        classes: {
          root: classes.modalPaperScrollPaper
        }
      }}
    >
      <div className={classes.flexColModal}>
        <Typography variant="h5" className={className ?? classes.title}>
          {
            title ??  "Choose a Category"
          }
        </Typography>
        <div className={classes.currentCategory}>
          {
            `Current Category: ${newsItemCategory?.name}`
          }
        </div>
        {props.children}
        <div className={classes.flexRowModalWrap}>
          <Button
            className={clsx(
              classes.modalButtons,
              newsItemCategoryId === rifleCategoryId
                ? classes.activeButton
                : classes.inactiveButton
            )}
            variant={"outlined"}
            onClick={() => {
              setNewsItemCategory({
                variables: {
                  newsItemId: props.newsItem?.id,
                  categoryId: rifleCategoryId
                }
              })
              setShowModal(false)
            }}
          >
            Rifle
          </Button>
          <Button
            className={clsx(
              classes.modalButtons,
              newsItemCategoryId === handgunCategoryId
                ? classes.activeButton
                : classes.inactiveButton
            )}
            variant={"outlined"}
            onClick={() => {
              setNewsItemCategory({
                variables: {
                  newsItemId: props.newsItem?.id,
                  categoryId: handgunCategoryId
                }
              })
              setShowModal(false)
            }}
          >
            Handgun
          </Button>
          <Button
            className={clsx(
              classes.modalButtons,
              newsItemCategoryId === shotgunCategoryId
                ? classes.activeButton
                : classes.inactiveButton
            )}
            variant={"outlined"}
            onClick={() => {
              setNewsItemCategory({
                variables: {
                  newsItemId: props.newsItem?.id,
                  categoryId: shotgunCategoryId
                }
              })
              setShowModal(false)
            }}
          >
            Shotgun
          </Button>
          <Button
            className={clsx(
              classes.modalButtons,
              newsItemCategoryId === itemCategoryId
                ? classes.activeButton
                : classes.inactiveButton
            )}
            variant={"outlined"}
            onClick={() => {
              setNewsItemCategory({
                variables: {
                  newsItemId: props.newsItem?.id,
                  categoryId: itemCategoryId
                }
              })
              setShowModal(false)
            }}
          >
            Item
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  title?: React.ReactNode;
  showModal: boolean;
  setShowModal(payload: boolean): void;
  className?: any;
  newsItem: NewsItem
}

export const styles = (theme: Theme) => createStyles({
  modalButtons: {
    flexGrow: 1,
    flexBasis: '90%',
    margin: '0.5rem',
  },
  title: {
    textAlign: "center",
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    maxWidth: '400px',
    width: '100%',
    borderRadius: BorderRadius4x,
  },
  flexColModal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '2rem',
  },
  flexRowModalWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2rem',
    flexWrap: "wrap",
  },
  currentCategory: {
    width: "100%",
    textAlign: 'center',
    marginTop: "2rem",
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlue,
  },
  activeButton: {
    background: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlue,
    "&:hover": {
      background: isThemeDark(theme)
        ? Colors.purple
        : Colors.ultramarineBlue,
    },
    color: isThemeDark(theme)
      ? Colors.black
      : Colors.cream,
  },
  inactiveButton: {
    // background: isThemeDark(them)
    //   ? Colors.purple
    //   : Colors.ultramarineBlue,
  },
})

export default withStyles(styles)( ChangeNewsItemCategoryModal );