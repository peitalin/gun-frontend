import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextInput from "components/Fields/TextInput";
// Utils Components
import ErrorBounds from "components/ErrorBounds";


const OrderSearch: React.FC<ReactOrdersSearchProps> = (props) => {

  const {
    classes,
    orderId,
    setOrderId,
    searchOrder,
    loading,
    errorMsg,
  } = props;

  return (
    <ErrorBounds className={clsx(classes.searchRoot)}>
      <Typography variant="h4">
        View Orders
      </Typography>

      <div className={clsx(classes.flexRow, classes.section)}>
        <Typography color={"primary"} variant="subtitle1" gutterBottom>
          Lookup Order ID:
        </Typography>
        <TextInput
          name="orderId"
          placeholder="e.g. oxxxxxxxxxxxxxx"
          className={classes.textField}
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          inputProps={{ style: { width: '100%' }}}
        />
        <Button
          className={classes.orderItemButton}
          variant={"outlined"}
          color={"primary"}
          onClick={() => searchOrder(orderId)}
        >
          Find Order
        </Button>
        {
          errorMsg &&
          <Typography color={"primary"} variant="subtitle1" gutterBottom>
            {errorMsg}
          </Typography>
        }
      </div>
      {props.children}
    </ErrorBounds>
  )
}

interface ReactOrdersSearchProps extends WithStyles<typeof styles> {
  setOrderId(orderId: string): void;
  orderId: string;
  searchOrder(orderId: string): void;
  errorMsg: string;
  loading: boolean;
}


const styles = (theme: Theme) => createStyles({
  searchRoot: {
    marginBottom: '1rem',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  section: {
    margin: '2rem',
  },
  orderItemButton: {
    padding: "0.5rem 1rem",
    width: '100%',
    borderRadius: BorderRadius,
    border: `1px solid ${Colors.blue}`,
    "&:hover": {
      border: `1px solid ${Colors.green}`,
    },
  },
  textField: {
    marginBottom: '0.5rem',
  },
});


export default withStyles(styles)( OrderSearch );



