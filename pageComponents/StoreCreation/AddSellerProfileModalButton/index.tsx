import React from "react";
import { oc as option } from "ts-optchain";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
import { StorePrivate } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// Components
import CreateStoreForm from "../CreateStoreForm";
import AccountCreated from "./AccountCreated";
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";






const AddSellerProfileButton = (props: ReactProps) => {

  // redux
  const { classes } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  const goToModal = goToModalConnect(dispatch);
  const storeCreateModalOpen = useSelector<GrandReduxState, boolean>(
    state => state.reduxModals.storeCreateModalOpen
  );
  const store = useSelector<GrandReduxState, StorePrivate>(
    state => option(state).reduxLogin.user.store()
  );

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => goToModal.storeCreate()}
      >
        {props.title ? props.title : "Create a Store"}
      </Button>
      <Dialog
        open={storeCreateModalOpen}
        fullScreen={smDown}
        fullWidth={smDown}
        onClose={() => {
          dispatch(Actions.reduxModals.TOGGLE_STORE_CREATE_MODAL(false))
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
        scroll={'body'}
      >
        {
          !option(store).id()
          ? <CreateStoreForm asModal={true} />
          : <AccountCreated asModal={true} />
        }
      </Dialog>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
}

export default withStyles(styles)( AddSellerProfileButton );

