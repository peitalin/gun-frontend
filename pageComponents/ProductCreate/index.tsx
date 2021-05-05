import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Gradients, Colors, BoxShadows } from "layout/AppTheme";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import ProductCreatePage from "./ProductCreatePage";
import BannerProductCreate from "components/BannerProductCreate";
import { useScrollYPosition } from "utils/hooks";
// Router
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { refLinks, viewingWhichSection } from "./RefLink";




const ProductCreate: React.FC<ReactProps> = (props) => {

  const { classes, asModal, children } = props;

  const dispatch = useDispatch();

  const productCreateModalOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.productCreateModalOpen
  );

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));


  const closeModal = () => {
    dispatch(Actions.reduxProductCreate.RESET_PRODUCT_CREATE())
    dispatch(Actions.reduxModals.TOGGLE_PRODUCT_CREATE_MODAL(false))
  }


  if (!asModal) {

    let y = useScrollYPosition()
    let currentViewSection = viewingWhichSection(y)

    return (
      <div className={classes.outerContainer}>
        <div className={classes.bannerOuter}>
          <BannerProductCreate/>
        </div>
        <div className={classes.stickyNavbar}>
          {
            Object.values(refLinks).map(s => {
              let ref = `#product-create-nav-${s}`
              if (process.browser) {
                return (
                  <a key={s} href={ref}
                    className={
                      currentViewSection === s
                      ? classes.stickyLinkHighlighted
                      : classes.stickyLink
                    }
                  >
                    <div key={s}>
                      {s}
                    </div>
                  </a>
                )
              } else {
                return (
                  <a key={s} href={ref}
                    className={classes.stickyLink}
                  >
                    <div key={s}>
                      {s}
                    </div>
                  </a>

                )
              }
            })
          }
        </div>
        <div className={classes.flexRow}>
          <div className={classes.flexRowInner}>
            <ProductCreatePage
              asModal={false}
              closeModal={closeModal}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <Dialog
          open={productCreateModalOpen}
          onClose={closeModal}
          fullScreen={smDown}
          fullWidth={smDown}
          // fullWidth={false}
          maxWidth="md"
          BackdropProps={{
            classes: {
              root: classes.modalBackdrop,
            }
          }}
          PaperProps={{
            classes: {
              root: smDown
                ? classes.fullMaxHeight
                : classes.modalPaperScrollPaper
            }
          }}
          scroll={"body"}
        >
          <ProductCreatePage
            asModal={true}
            closeModal={closeModal}
          />
        </Dialog>
      </>
    )
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  asModal: boolean;
}

const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 32px)",
  },
  fullMaxHeight: {
    maxHeight: "100%",
    width: '100%',
  },
  outerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // backgroundColor: Colors.darkWhite,
  },
  bannerOuter: {
    position: 'relative',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1160,
    // width: '100%',
  },
  stickyNavbar: {
    width: '100%',
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 1,
    height: '2.5rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow3.boxShadow
      : 'unset',
      // : BoxShadows.shadow3.boxShadow,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  stickyLink: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.uniswapLighterGrey,
    height: '100%',
    // flexBasis: '20%',
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderBottom: theme.palette.type === 'dark'
      ? `3px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    "&:hover": {
      color: theme.palette.type === 'dark'
        ? Colors.uniswapLightestGrey
        : Colors.black,
    },
  },
  stickyLinkHighlighted: {
    color: Colors.gradientUniswapBlue1,
    height: '100%',
    // flexBasis: '20%',
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderBottom: `2px solid ${Colors.gradientUniswapBlue1}`,
    "&:hover": {
      color: Colors.blue,
      borderBottom: `2px solid ${Colors.blue}`,
    },
  },
});


export default withStyles(styles)( ProductCreate );
