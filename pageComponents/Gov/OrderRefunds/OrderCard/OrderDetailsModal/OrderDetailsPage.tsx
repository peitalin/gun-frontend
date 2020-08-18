import * as React from "react";
import { FunctionComponent } from "react";
import {oc as option} from "ts-optchain";
import classNames from "classnames";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// MUI
import Typography from "@material-ui/core/Typography";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import { Order } from "typings/gqlTypes";
import currency from 'currency.js';
// Components
import Row from "../../Row";


const OrderDetailsPage: FunctionComponent<ReactProps> = (props) => {

  const { classes, order } = props;
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  return (
    <ErrorBounds className={classNames(
      classes.root,
      "fadeInFast",
    )}>

      <div className={classNames(
        classes.flexRow,
        classes.orderTitle,
        classes.spaceBetween
      )}>
        <Typography color={"primary"} variant={"h4"} gutterBottom>
          OrderItem Details
        </Typography>
        <IconButton onClick={props.closeModal}>
          <ClearIcon/>
        </IconButton>
      </div>

      {
        option(order).id() &&
        <div className={classes.flexCol}>
          <div className={classNames(classes.flexCol, classes.section)}>
            <Typography color={"primary"} variant={"h6"} gutterBottom>
              Order Details
            </Typography>
            <Row
              fieldName={"OrderItem ID:"}
              fieldValue={order.id}
            />
            <Row
              fieldName={"OrderItem Status:"}
              fieldValue={order.currentSnapshot.orderStatus}
            />
            <Row
              fieldName={"OrderItem Price:"}
              fieldValue={c(order.currentSnapshot.total)}
            />
          </div>
          <div className={classNames(classes.flexCol, classes.section)}>
            <Typography color={"primary"} variant={"h6"} gutterBottom>
              Product Details
            </Typography>
            <Row
              fieldName={"Product ID:"}
              fieldValue={order.product.id}
            />
            <Row
              fieldName={"Product Name:"}
              fieldValue={order.product.title}
            />
            <Row
              fieldName={"Product Variant ID:"}
              fieldValue={order.product.chosenVariant.variantId}
            />
            <Row
              fieldName={"Product Variant Name:"}
              fieldValue={order.product.chosenVariant.variantName}
            />
          </div>
          <div className={classNames(classes.flexCol, classes.section)}>
            <Typography color={"primary"} variant={"h6"} gutterBottom>
              Store Details
            </Typography>
            <Row
              fieldName={"Store:"}
              fieldValue={order.product.store.name}
            />
            <Row
              fieldName={"Store ID:"}
              fieldValue={order.product.store.id}
            />
            <Row
              fieldName={"Website:"}
              fieldValue={order.product.store.website}
            />
          </div>
        </div>
      }

    </ErrorBounds>
  );
}



interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  closeModal(): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    margin: '3rem',
  },
  rootMobile: {
    margin: '1rem',
    marginTop: '2rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  orderTitle: {
    marginBottom: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: '1rem',
  },
});

export default withStyles(styles)( OrderDetailsPage );