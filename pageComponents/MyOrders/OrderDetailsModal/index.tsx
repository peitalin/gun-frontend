import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
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
import OrderDetailsPage from "./OrderDetailsPage";


const OrderDetailsModal: React.FC<ReactProps> = (props) => {

  const windowWidth = useWindowWidth();
  const { classes } = props;

  const [showOrderDetails, setShowOrderDetails] = React.useState(false);

  const closeModal = () => {
    setShowOrderDetails(false)
  }

  return (
    <ErrorBounds>
      <Dialog
        open={showOrderDetails}
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
        <OrderDetailsPage
          order={props.order}
          closeModal={closeModal}
        />
      </Dialog>
      <Button
        className={classes.orderDetailsButton}
        variant={"outlined"}
        color={"primary"}
        disabled={!props.order}
        onClick={() => setShowOrderDetails(true)}
      >
        <Typography
          className={classes.orderDetailsButtonText}
          variant={"body2"}
        >
          Order Details
        </Typography>
      </Button>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
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
  orderDetailsButton: {
    height: '38px',
    minWidth: '150px',
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.grey}`
      : `1px solid ${Colors.black}`,
    marginTop: '0.5rem',
    "&:hover": {
      border: `1px solid ${theme.colors.blue}`,
      color: theme.colors.blue,
      "& > span > p": {
        color: theme.colors.blue,
        transition: theme.transitions.create('color', {
          easing: theme.transitions.easing.sharp,
          duration: "250ms",
        }),
      },
    },
  },
  orderDetailsButtonText: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
});


export default withStyles(styles)( OrderDetailsModal );
