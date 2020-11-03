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
// Router
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




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
    return (
      <div className={classes.outerContainer}>
        <div className={classes.bannerOuter}>
          <BannerProductCreate/>
        </div>
        <div className={classes.stickyNavbar}>
          {
            ["Title", "Model", "Description", "Images", "Price"].map(s => {
              return (
                <a className={classes.stickyLink} key={s} href={`#${s}`}>
                  <div key={s}>
                    {s}
                  </div>
                </a>
              )
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
    backgroundColor: "rgba(47, 57, 65, .85)",
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
  },
  stickyNavbar: {
    width: '100%',
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 1,
    height: '3rem',
    color: Colors.uniswapLighterGrey,
    // borderBottom: `1px solid ${Colors.uniswapNavy}`,
    background: Colors.uniswapDarkNavy,
    boxShadow: BoxShadows.shadow2.boxShadow,
    // background: Gradients.gradientUniswapDark.background,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  stickyLink: {
    color: Colors.uniswapLighterGrey,
    height: '100%',
    // flexBasis: '20%',
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderBottom: `2px solid ${Colors.uniswapDarkNavy}`,
    "&:hover": {
      color: Colors.uniswapLightestGrey,
      borderBottom: `2px solid ${Colors.uniswapLighterGrey}`,
    },
  },
});


export default withStyles(styles)( ProductCreate );
