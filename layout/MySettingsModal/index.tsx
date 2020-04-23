import * as React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
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
// // Analytics
// import { useAnalytics, analyticsEvent } from "utils/analytics";





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
    dispatch(Actions.reduxModals.TOGGLE_MY_SETTINGS_MODAL(false))
  }

  React.useEffect(() => {
    if (mySettingsModalOpen) {
      // analyticsEvent("View.Settings")
    }
  }, [mySettingsModalOpen])

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"))

  if (!asModal && process.browser && option(window).Stripe()) {
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
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaperSm: {
    maxHeight: "calc(100% - rem)",
    height: '100%',
    // overflowY: 'none',
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 0px)",
    height: '100%',
    width: '100%',
    maxWidth: '540px',
  },
});


export default withStyles(styles)( MySettingsModal );
