import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// Redux
import { connect } from "react-redux";
import { ReduxStateLogin } from "reduxStore/login-reducer";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Components
import GiftDownloadPage from "./GiftDownload";
import { useRouter } from "next/router";



const GiftDownloadModal: React.FC<GiftDownloadProps> = (props) => {

  const { classes, toggleGiftDownloadModal, giftDownloadModalOpen } = props;
  const router = useRouter();

  return (
    <>
      <Dialog
        open={giftDownloadModalOpen}
        onClose={() => {
          toggleGiftDownloadModal(false)
          router.back()
        }}
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
        <GiftDownloadPage/>
      </Dialog>
    </>
  )
}

type GiftDownloadProps = ReactProps & ReduxProps;

interface ReactProps extends WithStyles<typeof styles> {
}
interface ReduxProps {
  giftDownloadModalOpen: boolean;
  toggleGiftDownloadModal(payload: boolean): void;
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: GrandReduxState ) => {
  return {
    giftDownloadModalOpen: state.reduxModals.giftDownloadModalOpen
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    toggleGiftDownloadModal: (payload: boolean) => dispatch(
      Actions.reduxModals.TOGGLE_SHARE_LINK_MODAL(payload)
    ),
  }
}

const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    width: '100%',
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)( GiftDownloadModal ))
