
import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius4x, Colors } from "layout/AppTheme";
// Material UI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";


const ConfirmActionModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
    title,
    showModal,
    setShowModal,
    onConfirmFunction,
    className,
  } = props;

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
        <Typography variant="h5" className={className ?? classes.title}>
          {
            title
              ? title
              : "Do you really want to do this?"
          }
        </Typography>
        {props.children}
        <div className={classes.flexRowModal}>
          <Button
            className={classes.modalButtons}
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
            className={classes.modalButtons}
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
  title?: React.ReactNode;
  showModal: boolean;
  setShowModal(payload: boolean): void;
  onConfirmFunction(): void;
  className?: any;
}

export const styles = (theme: Theme) => createStyles({
  modalButtons: {
    minWidth: 150,
  },
  title: {
    textAlign: "center",
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    maxWidth: '400px',
    width: '100%',
    borderRadius: BorderRadius4x,
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

export default withStyles(styles)( ConfirmActionModal );