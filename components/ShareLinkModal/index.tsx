import * as React from "react";
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
import ShareLinkPage from "./ShareLinkPage";



const ShareLinkModal: React.FC<ShareLinkProps> = (props) => {
  const { classes, toggleShareLinkModal, shareLinkModalOpen } = props;
  return (
    <>
      <Dialog
        open={shareLinkModalOpen}
        onClose={() => {
          toggleShareLinkModal(false)
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
        <ShareLinkPage/>
      </Dialog>
    </>
  )
}

type ShareLinkProps = ReactProps & ReduxProps;

interface ReactProps extends WithStyles<typeof styles> {
}
interface ReduxProps {
  shareLinkModalOpen: boolean;
  toggleShareLinkModal(payload: boolean): void;
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: GrandReduxState ) => {
  return {
    shareLinkModalOpen: state.reduxModals.shareLinkModalOpen
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    toggleShareLinkModal: (payload: boolean) => dispatch(
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
)(withStyles(styles)( ShareLinkModal ))
