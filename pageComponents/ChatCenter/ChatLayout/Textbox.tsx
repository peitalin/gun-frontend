import React from 'react';
// Styles
import clsx from "clsx";
import { fade, withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";

import { useMutation, useApolloClient } from "@apollo/client";
// import TypingIndicator from './TypingIndicator';
import { Message, Product, BidStatus } from "typings/gqlTypes";
import Button from "@material-ui/core/Button";
import TextEditorCK from "components/TextEditorCK";
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
/// Debounce
import { useDebouncedCallback } from 'use-debounce';
// Validation
import { validationSchemas } from "utils/validation";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import { Snackbar } from '@material-ui/core';



export const Textbox: React.FC<ReactProps> = (props) => {

  const [offerPrice, setOfferPrice] = React.useState(undefined)

  const { classes } = props;

  const snackbar = useSnackbar();

  // const emitTypingEvent = async () => {
  //   if (props.userId) {
  //     console.log("emitting event")
  //     await apolloClient.mutate({
  //       mutation: EMIT_TYPING_EVENT,
  //       variables: {
  //         senderId: props.userId
  //       }
  //     }).then(res => console.log('emitted typing event', res));
  //   }
  // }


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
              console.log("chatRoomId: ", props.chatRoomId)

              snackbar.enqueueSnackbar(
                `Placing a bid.`,
                { variant: "info" }
              )

              insertBidMessage({
                variables: {
                  chatRoomId: props.chatRoomId,
                  senderId: props.userId,
                  content: description,
                  productId: props.product.id,
                  productSnapshotId: props.product?.currentSnapshot?.id,
                  variantId: props.product?.featuredVariant?.variantId,
                  offerPrice: offerPrice,
                  bidStatus: BidStatus.CREATED,
                }
              }).then(res => {
                // fprops.resetForm()
                fprops.setFieldValue("description", "")
              });
          }}>
            <div className={classes.textboxWrapper}>
              {/* <TypingIndicator userId={props.userId} /> */}
              <div className={classes.textEditorWrapper}>

                <Rifm
                  // $ need to be in regexp to prevent cursor jumping on backspace
                  accept={/[\d.]/g}
                  format={formatCurrency}
                  value={displayedPrice}
                  onChange={value => {
                    // values before currency mask
                    // multiple by 100 as formik/graphql takes cents, not dollars
                    let dollars = parseNumber(value)
                    setDisplayedPrice(dollars)
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


                <TextEditorCK
                  className={classes.textEditorRoot}
                  errorMessage={errors.description}
                  limit={{
                    max: 1000,
                  }}
                  errors={fprops.errors}
                  values={fprops.values}
                  touched={fprops.touched}
                  setFieldTouched={fprops.setFieldTouched}
                  containerStyle={{
                    marginBottom: '1rem',
                  }}
                  editorStyle={{
                    // maxWidth: 'calc(100vw - 4rem)', // constrain width for mobile
                    background: Colors.uniswapMediumNavy,
                  }}
                  {...fprops}
                />

                <Button
                  type={"submit"}
                  variant={"outlined"}
                  className={clsx(classes.sendBidButton)}
                  onClick={() => { }}
                >
                  Create Bid
                </Button>

              </div>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  scrollToNewMessage?(): void;
  numOfNewMessages?: number;
  mutationCallback?(a: any): void;
  chatRoomId: string;
  product: Product;
}

interface MutData {
  sendBidMessage: Message[]
}
interface MutVarsBid {
  chatRoomId: string
  senderId: string
  content: string
  // previewItemId?: string
  productId: string
  productSnapshotId: string
  variantId: string
  offerPrice: number
  bidStatus: string
}

const styles = (theme: Theme) => createStyles({
  sendButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  sendBidButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: Colors.cream,
    background: theme.palette.type === "dark"
      ? Colors.purple
      : Colors.secondary,
    "&:hover": {
      background: theme.palette.type === "dark"
        ? fade(Colors.purple, 0.9)
        : fade(Colors.secondary, 0.9),
    },
  },
  typoButton: {
    position: 'absolute',
    bottom: 8,
    right: '5rem',
  },
  textBox: {
  },
  textboxWrapper: {
    position: 'relative',
  },
  textEditorRoot: {
    background: theme.palette.type === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    borderRadius: BorderRadius,
  },
  textEditorWrapper: {
    height: '100%',
    marginTop: '0.5rem',
  },
  typoTextbox: {
    // fontSize: '16px',
    // height: '40px',
    // width: '75%',
    // marginRight: '1%',
    // fontWeight: 300,
    // border: '1px solid #ececec',
    // borderRadius: '5px',
    // padding: 0,
    // paddingLeft: '10px',
    // display: 'inline-block',
    // backgroundColor: '#f6f6f7',
  },
  inputField: {
    flexGrow: 1,
    minWidth: 100,
    marginBottom: '0.5rem',
  },
})


export default withStyles(styles)( Textbox );