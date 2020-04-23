import * as React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Components
import ContactUsPage from "./ContactUsPage";


const ContactUsModal: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const contactUsModalOpen = useSelector<GrandReduxState, boolean>(
    s => s.reduxModals.contactUsModalOpen
  );
  const dispatch = useDispatch();

  const handleGoBack = () => {
    dispatch(Actions.reduxModals.TOGGLE_CONTACT_US_MODAL(false))
  }

  return (
    <>
      <Dialog
        open={contactUsModalOpen}
        onClose={() => handleGoBack()}
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
        <ContactUsPage/>
      </Dialog>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
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


export default withStyles(styles)( ContactUsModal )
