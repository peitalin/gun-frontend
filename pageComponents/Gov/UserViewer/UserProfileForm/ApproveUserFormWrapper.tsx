import React from "react";
import clsx from "clsx";
// Styles
import { Theme, lighten } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Button from "@mui/material/Button";
// validation
import { FormikProps } from 'formik';
import { User_Licenses } from "typings/gqlTypes";



const ApproveUserFormWrapper = (
  props: ReactProps & { children: React.ReactNode } & FormikProps<FormikFields>
) => {

  const {
    classes,
    handleSubmit,
    selectedLicense,
    onClickDebugPrint,
    ...fprops
  } = props;


  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {props.children}
      <div className={clsx(classes.flexCol, classes.section1)}>
        <Button
          className={
            selectedLicense?.verified
              ? classes.buttonRed
              : classes.buttonBlue
          }
          type="submit" // this sets off Form submit
          variant={"outlined"}
          color={"primary"}
          onClick={onClickDebugPrint}
          disabled={!selectedLicense?.id}
        >
          {
            !selectedLicense
            ? "Choose a license to approve"
            : selectedLicense.verified
              ? `Unapprove License ${selectedLicense?.licenseNumber}`
              : `Approve License ${selectedLicense?.licenseNumber}`
          }
        </Button>
      </div>
      </form>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  handleSubmit(args: any): void;
  onClickDebugPrint(): void;
  selectedLicense: User_Licenses;
}

interface FormikFields {
  userId: string;
  verified: boolean;
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


export default withStyles(styles)( ApproveUserFormWrapper );



