import React from 'react';
// Styles
import clsx from "clsx";
import { alpha, withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";

import { useMutation, useApolloClient } from "@apollo/client";
import { Message, Product, BidStatus } from "typings/gqlTypes";
import Button from "@material-ui/core/Button";
import {
  SEND_BID_MESSAGE,
} from "queries/chat-mutations";

import TextInputAdorned from 'components/Fields/TextInputAdorned';
import { Rifm } from 'rifm';
import { formatCurrency, parseNumber} from "utils/currencyInput";
// Snackbar
import { useSnackbar } from "notistack";
// Typings
import { asCurrency as c } from "utils/prices";
// Validation
import { validationSchemas } from "utils/validation";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';



export const SendBidInput: React.FC<ReactProps> = (props) => {

  const [offerPrice, setOfferPrice] = React.useState(undefined)

  const { classes } = props;

  const snackbar = useSnackbar();


  const [insertBidMessage, bidMutationResponse] = useMutation<MutData, MutVarsBid>(
    SEND_BID_MESSAGE, {
      // variables: { }, // add later in sendMessage()
      onCompleted: (data) => {
        console.log(data)
        setDisplayedPrice('')
        setOfferPrice(0)
        snackbar.enqueueSnackbar(
          `Bid placed successfully.`,
          { variant: "success" }
        )
      },
      onError: (err) => {
        snackbar.enqueueSnackbar(
          `${err?.graphQLErrors?.[0]?.message}`,
          { variant: "error" }
        )
      },
      update: (cache, { data: { sendBidMessage }}) => {
      },
    }
  )

  // RIFM - masking currency values
  const [displayedPrice, setDisplayedPrice] = React.useState('');


  return (
    <Formik
      initialValues={{
        description: "<p></p>",
      }}
      validationSchema={validationSchemas.CreateDealer}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log("formik values: ", values)
      }}
    >
      {(fprops) => {

        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          validateField,
          validateForm,
        } = fprops;

        // Mutation component. Add message to the state of <RenderMessages> after mutation.
        return (
          <form onSubmit={async(e) => {

              e.preventDefault(); // prevent refresh
              let description = fprops.values?.description

              snackbar.enqueueSnackbar(
                `Placing a bid.`,
                { variant: "info" }
              )

              insertBidMessage({
                variables: {
                  chatRoomId: props.chatRoomId,
                  senderId: props.userId,
                  // content: description,
                  productId: props.product.id,
                  productSnapshotId: props.product?.currentSnapshot?.id,
                  variantId: props.product?.featuredVariant?.variantId,
                  offerPrice: offerPrice,
                }
              }).then(res => {
                // fprops.resetForm()
                fprops.setFieldValue("description", "")
              });
          }}>
            <div className={classes.bidInputWrapper}>

              <Rifm
                // $ need to be in regexp to prevent cursor jumping on backspace
                accept={/[\d.]/g}
                format={formatCurrency}
                value={displayedPrice}
                onChange={value => {
                  // values before currency mask
                  // multiple by 100 as formik/graphql takes cents, not dollars
                  let displayDollars = parseNumber(value)
                  let dollars = parseFloat(displayDollars)
                  setDisplayedPrice(displayDollars)
                  console.log("dollars", dollars)
                  let cents = Math.round(parseFloat((dollars * 100) as any)) // round: 200.9999 => 201
                  console.log('cents: ', cents)
                  if (cents) {
                    setOfferPrice(cents)
                  } else {
                    // setOfferPrice(undefined)
                  }
                  // multiple by 100 as formik/graphql takes cents, not dollars
                }}
              >
                {({ value, onChange }) => (
                  <TextInputAdorned
                    startAdornment={"$ "}
                    name={'bid'}
                    type="currency"
                    // placeholder="0.00"
                    placeholder={"Enter a bid"}
                    className={classes.inputField}
                    value={value || ""}
                    onChange={(e) => {
                      e.persist()
                      onChange(e)
                    }}
                    inputProps={{ style: { width: '100%', marginLeft: '0.25rem' }}}
                  />
                )}
              </Rifm>

              <Button
                type={"submit"}
                variant={"outlined"}
                className={clsx(classes.sendBidButton)}
                onClick={() => { }}
              >
                Create Bid
              </Button>

            </div>
          </form>
        )
      }}
    </Formik>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  numOfNewMessages?: number;
  chatRoomId: string;
  product: Product;
}

interface MutData {
  sendBidMessage: Message[]
}
interface MutVarsBid {
  chatRoomId: string
  senderId: string
  productId: string
  productSnapshotId: string
  variantId: string
  offerPrice: number
}

const styles = (theme: Theme) => createStyles({
  sendBidButton: {
    width: '100%',
    borderRadius: BorderRadius,
    color: Colors.cream,
    background: theme.palette.type === "dark"
      ? Colors.purple
      : Colors.secondary,
    "&:hover": {
      background: theme.palette.type === "dark"
        ? alpha(Colors.purple, 0.9)
        : alpha(Colors.secondary, 0.9),
    },
  },
  bidInputWrapper: {
    margin: '1rem',
  },
  inputField: {
    flexGrow: 1,
    minWidth: 100,
  },
})


export default withStyles(styles)( SendBidInput );