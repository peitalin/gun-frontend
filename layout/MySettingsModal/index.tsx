import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius2x, Gradients, BorderRadius } from "layout/AppTheme";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import MySettingsPage from "./MySettingsPage";
/// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";





const MySettingsModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
    asModal = true,
  } = props;

  const dispatch = useDispatch();
  const mySettingsModalOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.mySettingsModalOpen
  );

  const goBack = () => {
    // unload Stripe card component first, then shut the modal
    dispatch(Actions.reduxModals.TOGGLE_MY_SETTINGS_MODAL(false))
  }

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"))

  if (!asModal && process.browser) {
    return <MySettingsPage goBack={goBack} asModal={asModal}/>
  } else {
    return (
      <>
        <Dialog
          open={mySettingsModalOpen}
          // full height
          fullScreen={mdUp ? false : true}
          fullWidth={mdUp ? false : null}
          maxWidth={"md"}
          onClose={() => goBack()}
          BackdropProps={{
            classes: {
              root: classes.modalBackdrop,
            }
          }}
          PaperProps={{
            classes: {
              root: mdUp
                ? classes.modalPaperScrollPaper
                : classes.modalPaperScrollPaperSm
            }
          }}
          scroll="body"
        >
          <MySettingsPage goBack={goBack}/>
        </Dialog>
      </>
    )
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean;
}

const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaperSm: {
    maxHeight: "calc(100% - rem)",
    overflowY: 'hidden',
    borderRadius: BorderRadius2x,
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 0px)",
    width: '100%',
    maxWidth: '540px',
    background: Colors.uniswapDarkNavy,
    borderRadius: BorderRadius2x,
  },
});


export default withStyles(styles)( MySettingsModal );
