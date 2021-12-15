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
import ButtonLoading from "components/ButtonLoading";
import TextInput from "components/Fields/TextInput";
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
    totalIncludingInternationalFees,
    loading,
    ...fprops
  } = props;

  return (
    <ErrorBounds className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        {props.children}
        <div className={clsx(classes.flexCol, classes.section1)}>
          <ButtonLoading
            className={
              disableCancelOrderButton
                ? classes.cancelButtonDisabled
                : classes.cancelButtonEnabled
            }
            type="submit" // this sets off Form submit
            disabled={disableCancelOrderButton}
            variant={"outlined"}
            loadingIconColor={Colors.cream}
            onClick={onClickDebugPrint}
            loading={loading}
          >
            { `Cancel Order: ${totalIncludingInternationalFees}` }
          </ButtonLoading>

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
  totalIncludingInternationalFees: string;
  loading: boolean;
}

interface FormikFields {
  orderId: string;
  markProductAbandoned: boolean;
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '1rem',
    borderRadius: BorderRadius,
    border: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: theme.palette.mode === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
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



