import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonLoading from "components/ButtonLoading";
import TextInput from "components/Fields/TextInput";
// Utils Components
import ErrorBounds from "components/ErrorBounds";



const CancelOrderForm: React.FC<ReactOrdersFormProps> = (props) => {
  const {
    classes,
    onSubmit,
    disableCancelOrderButton,
    onClickDebugPrint,
    total,
  } = props;

  return (
    <ErrorBounds className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        {props.children}
        <div className={clsx(classes.flexCol, classes.section1)}>
          <ButtonLoading
            class={classes.cancelButton}
            type="submit" // this sets off Form submit
            disabled={!!disableCancelOrderButton}
            variant={"outlined"}
            color={"primary"}
            onClick={onClickDebugPrint}
          >
            { `Cancel Order: ${total}` }
          </ButtonLoading>
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

interface ReactOrdersFormProps extends WithStyles<typeof styles> {
  onSubmit(args: any): void;
  disableCancelOrderButton: boolean;
  onClickDebugPrint(): void;
  total: string;
}


const styles = (theme: Theme) => createStyles({
  root: {
    padding: '3rem',
    borderRadius: BorderRadius,
    backgroundColor: Colors.foregroundColor,
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
  cancelButton: {
    maxWidth: 250,
  },
});


export default withStyles(styles)( CancelOrderForm );



