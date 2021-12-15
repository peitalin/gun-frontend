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
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// validation
import { FormikProps } from 'formik';



const SuspendProductFormWrapper = (
  props: ReactProps & { children: React.ReactNode } & FormikProps<FormikFields>
) => {

  const {
    classes,
    handleSubmit,
    onClickDebugPrint,
    ...fprops
  } = props;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {props.children}
      <div className={clsx(classes.flexCol, classes.section1)}>
        <Button
          className={
            props.isSuspended
              ? classes.buttonBlue
              : classes.buttonRed
          }
          type="submit" // this sets off Form submit
          variant={"outlined"}
          color={"primary"}
          onClick={onClickDebugPrint}
        >
          {
            props.isSuspended
            ? "Unsuspend Product"
            : "Suspend Product"
          }
        </Button>
      </div>
      </form>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  handleSubmit(args: any): void;
  onClickDebugPrint(): void;
  isSuspended: boolean;
}

interface FormikFields {
  productId: string;
  isSuspended: boolean;
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
});


export default withStyles(styles)( SuspendProductFormWrapper );



