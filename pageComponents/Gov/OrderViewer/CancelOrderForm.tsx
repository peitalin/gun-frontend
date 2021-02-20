import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, lighten } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextInput from "components/Fields/TextInput";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// validation
import { FormikProps } from 'formik';



const CancelOrderForm = (
  props: ReactProps & { children: React.ReactNode } & FormikProps<FormikFields>
) => {

  const {
    classes,
    onSubmit,
    disableCancelOrderButton,
    onClickDebugPrint,
    total,
    ...fprops
  } = props;

  return (
    <ErrorBounds className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        {props.children}
        <div className={clsx(classes.flexCol, classes.section1)}>
          <Button
            className={
              disableCancelOrderButton
                ? classes.cancelButtonDisabled
                : classes.cancelButtonEnabled
            }
            type="submit" // this sets off Form submit
            disabled={disableCancelOrderButton}
            variant={"outlined"}
            color={"primary"}
            onClick={onClickDebugPrint}
          >
            { `Cancel Order: ${total}` }
          </Button>

          {
            !disableCancelOrderButton &&
            <FormControlLabel
              control={
                <Checkbox
                  checked={fprops.values.markProductAbandoned}
                  onChange={() => {
                    fprops.setFieldValue(
                      "markProductAbandoned",
                      !fprops.values.markProductAbandoned,
                    )
                  }}
                  name="markAbandonded"
                />
              }
              label="Also mark product ABANDONED"
            />
          }
          {
            disableCancelOrderButton
            ? <Typography className={classes.caption} variant="caption">
                Order has been processed and cannot be cancelled
              </Typography>
            : <Typography className={classes.caption} variant="caption">
                Cancel the payment authorization and order
              </Typography>
          }
        </div>
      </form>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  onSubmit(args: any): void;
  disableCancelOrderButton: boolean;
  onClickDebugPrint(): void;
  total: string;
}

interface FormikFields {
  orderId: string;
  markProductAbandoned: boolean;
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '3rem',
    borderRadius: BorderRadius,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  cancelButtonDisabled: {
    maxWidth: 250,
  },
  cancelButtonEnabled: {
    maxWidth: 250,
    color: Colors.cream,
    backgroundColor: Colors.red,
    border: `1px solid ${Colors.magenta}`,
    "&:hover": {
      border: `1px solid ${Colors.pink}`,
      backgroundColor: lighten(Colors.red,0.1),
    }
  },
});


export default withStyles(styles)( CancelOrderForm );



