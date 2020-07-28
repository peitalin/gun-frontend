import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// utils
import { UserPrivate, Order } from "typings/gqlTypes";
import ErrorBounds from "components/ErrorBounds";
import { useWindowWidth } from "utils/hooks";
// Components
import OrderDetailsPage from "./OrderDetailsPage";


const OrderDetailsModal: React.FC<ReactProps> = (props) => {

  const windowWidth = useWindowWidth();
  const { classes } = props;

  return (
    <ErrorBounds>
      <Dialog
        open={props.displayModal}
        onClose={props.closeModal}
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
        <OrderDetailsPage
          order={props.order}
          closeModal={props.closeModal}
        />
      </Dialog>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  displayModal: boolean;
  closeModal(): void;
  order: Order;
}


const styles = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    maxWidth: '880px',
    width: '100%',
  },
});


export default withStyles(styles)( OrderDetailsModal );
