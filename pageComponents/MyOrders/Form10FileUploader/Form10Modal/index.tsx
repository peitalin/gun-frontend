import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";
// Material UI
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// utils
import { UserPrivate, Order } from "typings/gqlTypes";
import ErrorBounds from "components/ErrorBounds";
import { useWindowWidth } from "utils/hooks";
// Components
import Form10PreviewPage from "./Form10PreviewPage";


const OrderDetailsModal: React.FC<ReactProps> = (props) => {

  const windowWidth = useWindowWidth();
  const { classes } = props;

  const closeModal = () => {
    props.setShowModal(false)
  }

  return (
    <ErrorBounds>
      <Dialog
        open={props.showModal}
        onClose={closeModal}
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
        <Form10PreviewPage
          order={props.order}
          closeModal={closeModal}
        />
      </Dialog>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  orderCancelled?: boolean;
  showModal: boolean;
  setShowModal(a: boolean): void;
}


const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    maxWidth: '880px',
    width: '100%',
    height: '100%',
  },
});


export default withStyles(styles)( OrderDetailsModal );
