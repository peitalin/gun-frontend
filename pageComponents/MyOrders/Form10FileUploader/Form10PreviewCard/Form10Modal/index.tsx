import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Dialog from "@mui/material/Dialog";
// utils
import { Order } from "typings/gqlTypes";
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
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 1rem)",
    maxWidth: '960px',
    // width: '100%',
    // height: '100%',
    boxShadow: 'unset',
    background: 'transparent',
  },
});


export default withStyles(styles)( OrderDetailsModal );
