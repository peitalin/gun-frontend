import React from 'react';
import { oc as option } from "ts-optchain";
// Redux
import { connect } from 'react-redux'
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
import { PaymentMethod } from "typings/gqlTypes";
// Css
import clsx from 'clsx';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Colors } from "layout/AppTheme";
// Material-ui components
import Typography from '@material-ui/core/Typography';
// Selectable input bar
import Select, { components } from 'react-select';
import { selectStyles } from './CommonSelect';
//
import CreditCardOption from "./CreditCardOption";



const SelectCreditCard: React.FC<ReactProps> = (props) => {

  const {
    classes,
    showExpiry = true,
  } = props;


  return (
    <Select
      closeMenuOnSelect={true}
      placeholder={"Choose payment method"}
      // classes={classes}
      onChange={(e) => {
        let selectedPaymentMethod = e.value
        props.setSelectedPaymentMethod(selectedPaymentMethod)
      }}
      components={{
        Option: showExpiry ? OptionExpiry : Option,
        SingleValue: showExpiry ? SingleValueExpiry : SingleValue,
      }}
      styles={{
        option: base => ({
          ...base,
          borderBottom: `1px solid ${Colors.lightGrey}`,
          padding: 0,
          margin: 0,
          height: '100%',
          "&:hover": {
            background: Colors.foregroundColor,
          },
          "&:focus": {
            background: Colors.foregroundColor,
          },
        }),
        singleValue: base => ({
          ...base,
          maxWidth: 'unset',
          marginLeft: '-0.1rem',
        }),
        indicatorSeparator: styles => ({
          display:'none'
        }),
        control: styles => ({
          ...styles,
          border: `1px solid ${Colors.lightGrey}`,
          "&:focus": {
          },
          "&:hover": {
            cursor: "pointer",
          },
          boxShadow: 'none',
          borderRadius: '4px',
          fontFamily: '"Helvetica Neue",Arial,sans-serif',
          fontSize: '0.8rem',
          width: '100%',
        }),
        menu: styles => ({
          ...styles,
          marginTop: '0rem',
          cursor: "pointer",
          background: Colors.foregroundColor,
          "&:hover": {
            cursor: "pointer",
          },
          "&:focus": {
          },
        })
      }}
      defaultValue={{
        label: option(props).selectedPaymentMethod.id(),
        value: option(props).selectedPaymentMethod()
      }}
      options={
        !props.paymentMethods.length
        ? []
        : props.paymentMethods.map(pm => {
            return {
              label: pm.id,
              value: pm
            }
          })
      }
    />
  );
}

interface ReactProps extends WithStyles<typeof selectStyles> {
  selectedPaymentMethod: PaymentMethod;
  setSelectedPaymentMethod(pm: PaymentMethod): void;
  paymentMethods?: PaymentMethod[];
  showExpiry?: boolean;
}



/// These are each option in the dropdown menu
const Option = props => {
  // console.log("option props:", props)
  // props.data.value
  // props.data.label
  const label = props.data.label;
  const paymentMethod = props.data.value;

  return (
    <>
      <components.Option {...props}>
        <CreditCardOption
          paymentMethod={paymentMethod}
          selected={false}
          showExpiry={false}
        />
      </components.Option>
    </>
  );
};

/// These are each option in the dropdown menu
const OptionExpiry = props => {
  const label = props.data.label;
  const paymentMethod = props.data.value;

  return (
    <>
      <components.Option {...props}>
        <CreditCardOption
          paymentMethod={paymentMethod}
          selected={false}
          showExpiry={true}
        />
      </components.Option>
    </>
  );
};


/// These are the selected option in the input field
const SingleValue = ({ children, ...props }) => {
  const paymentMethod = props.data.value;
  return (
    <components.SingleValue {...props}>
      <CreditCardOption
        paymentMethod={paymentMethod}
        selected={true}
        showExpiry={false}
      />
    </components.SingleValue>
  )
};

/// These are the selected option in the input field
const SingleValueExpiry = ({ children, ...props }) => {
  const paymentMethod = props.data.value;
  return (
    <components.SingleValue {...props}>
      <CreditCardOption
        paymentMethod={paymentMethod}
        selected={true}
        showExpiry={true}
      />
    </components.SingleValue>
  )
};


export default withStyles(selectStyles)( SelectCreditCard );