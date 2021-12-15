import React from "react";
import clsx from "clsx";
// Styles
import { Theme, lighten } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextInput from "components/Fields/TextInput";
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// validation
import { FormikProps } from 'formik';



const DeleteDealerFormWrapper = (
  props: ReactProps & { children: React.ReactNode } & FormikProps<FormikFields>
) => {

  const {
    classes,
    handleSubmit,
    ...fprops
  } = props;

  const [confirmDelete, setConfirmDelete] = React.useState(false)

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {props.children}
      <div className={clsx(classes.flexCol, classes.section1)}>
        <Button
          className={confirmDelete ? classes.buttonRed : null}
          type="submit" // this sets off Form submit
          variant={"outlined"}
          color={"primary"}
          onClick={props.onClickDebugPrint}
          disabled={!confirmDelete}
        >
          Delete Dealer
        </Button>
        <FormControlLabel
          className={classes.confirmCheckbox}
          control={
            // <Switch
            //   checked={confirmDelete}
            //   onChange={() => setConfirmDelete(s => !s)}
            // />
            <Checkbox
              checked={confirmDelete}
              onChange={() => setConfirmDelete(s => !s)}
              name="confirmDelete"
            />
          }
          label="Do you want to delete this dealer?"
        />
      </div>
    </form>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  handleSubmit(args: any): void;
  onClickDebugPrint(args?: any): void;
}

interface FormikFields {
  dealerId: string;
}

const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  section: {
    margin: '2rem',
  },
  section1: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  form: {
    width: '100%',
  },
  caption: {
    marginTop: "1rem",
    fontSize: 14,
  },
  buttonRed: {
    maxWidth: 250,
    color: Colors.cream,
    backgroundColor: Colors.red,
    border: `1px solid ${Colors.magenta}`,
    "&:hover": {
      border: `1px solid ${Colors.pink}`,
      backgroundColor: lighten(Colors.red,0.1),
    }
  },
  buttonBlue: {
    maxWidth: 250,
    color: Colors.cream,
    backgroundColor: Colors.blue,
    border: `1px solid ${Colors.lightBlue}`,
    "&:hover": {
      border: `1px solid ${Colors.blue}`,
      backgroundColor: lighten(Colors.blue,0.1),
    }
  },
  confirmCheckbox: {
    marginTop: '0.5rem',
  },
});


export default withStyles(styles)( DeleteDealerFormWrapper );



