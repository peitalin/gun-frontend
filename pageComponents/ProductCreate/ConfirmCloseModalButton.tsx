
import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";


const ConfirmCloseModal = ({
  classes,
  showModal,
  setShowModal,
  onConfirmFunction,
}: ReactProps) => {
  return (
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
          Do you wish to cancel uploading this file?
        </Typography>
        <div className={classes.flexRowModal}>
          <Button
            className={classes.saveVisaButton}
            variant={"outlined"}
            color={"secondary"}
            onClick={() => {
              onConfirmFunction()
              setShowModal(false)
            }}
          >
            Yes
          </Button>
          <Button
            className={classes.saveVisaButton}
            variant={"outlined"}
            color={"primary"}
            onClick={() => setShowModal(false)}
          >
            No
          </Button>
        </div>
      </div>
    </Dialog>
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
    backgroundColor: Colors.modalBackground,
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

export default withStyles(styles)(ConfirmCloseModal);