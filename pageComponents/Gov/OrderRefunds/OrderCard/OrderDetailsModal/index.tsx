import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Redux
import { connect } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Material UI
import Dialog from "@material-ui/core/Dialog";
// utils
import { UserPrivate, Orders } from "typings/gqlTypes";
import ErrorBounds from "components/ErrorBounds";
// Components
import OrderDetailsPage from "./OrderDetailsPage";



const OrderDetailsModal: React.FC<OrderDetailsProps> = (props) => {

  const { classes } = props;

  return (
    <ErrorBounds>
      <Dialog
        open={props.displayModal}
        onClose={props.closeModal}
        BackdropProps={{
          classes: { root: classes.modalBackdrop }
        }}
        fullScreen={false}
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

type OrderDetailsProps = ReactProps & ReduxProps;

interface ReactProps extends WithStyles<typeof styles> {
  displayModal: boolean;
  closeModal(): void;
  order: Orders;
}
interface ReduxProps {
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
