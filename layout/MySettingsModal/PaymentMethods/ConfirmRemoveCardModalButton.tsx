
import * as React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";



const ConfirmModal = ({
  classes,
  showModal,
  setShowModal,
  onConfirmFunction,
}: ReactProps) => {
  return (
    <>
      <IconButton
        onClick={() => setShowModal(true)}
        size="small"
      >
        <ClearIcon height={30} width={30}/>
      </IconButton>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
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
        <div className={classes.flexColModal}>
          <Typography variant="h5">
            Do you wish to remove this card?
          </Typography>
          <div className={classes.flexRowModal}>
            <Button
              className={classes.saveVisaButton}
              variant={"contained"}
              color={"primary"}
              onClick={() => {
                onConfirmFunction()
                setShowModal(false)
              }}
            >
              Yes
            </Button>
            <Button
              className={classes.saveVisaButton}
              variant={"contained"}
              color={"primary"}
              onClick={() => setShowModal(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  showModal: boolean;
  setShowModal(payload: boolean): void;
  onConfirmFunction(): void;
}

export const styles = (theme: Theme) => createStyles({
  saveVisaButton: {
    minWidth: 150,
  },
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    maxWidth: '400px',
    width: '100%',
  },
  flexColModal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '2rem',
  },
  flexRowModal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },
})

export default withStyles(styles)(ConfirmModal);
