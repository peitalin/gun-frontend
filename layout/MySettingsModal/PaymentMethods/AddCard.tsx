import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Graphql Queries
import { useApolloClient, useMutation } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { ADD_PAYMENT_METHOD } from "queries/payment_methods-mutations";
// import { UserPrivate, ID } from "typings/gqlTypes";
type UserPrivate = any;
type ID = any;
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import TextInput from "components/Fields/TextInput";
import ErrorBounds from "components/ErrorBounds";



const AddCard = (props: ReactProps) => {

  const { classes } = props;
  const aClient = useApolloClient();

  const [nameOnCard, setNameOnCard] = React.useState("");
  const [showAddVisaForm, setShowAddVisaForm] = React.useState(false);

  const resetCardForm = () => {
    setNameOnCard("")
    setShowAddVisaForm(false)
  }

  const addCreditCard = async() => {
    // props.setIsLoading(true)
    // Within the context of `Elements`, this call to createPaymentMethod
    // knows from which Element to create the PaymentMethod,
    //
    // createPaymentMethods()......
    //
    // const response = await aClient.mutate({
    //   mutation: ADD_PAYMENT_METHOD,
    //   variables: {
    //     paymentMethodId: paymentMethod.id,
    //   }
    // })
    // props.refetchPaymentMethods()
    // resetCardForm()
    // props.setIsLoading(false)
    // console.log('Saved payment methods:', response.data);
  }

  return (
    <ErrorBounds className={classes.addCardContainer}>
      <a
        className={clsx(classes.link, classes.subtitle)}
        onClick={() => setShowAddVisaForm(show => !show)}
      >
        {
          !showAddVisaForm
          ? <Typography variant="body1" className={clsx(
              classes.subtitle,
              classes.link,
              classes.textAlignEnd,
              'fadeIn',
            )}>
              {"+Add Credit/Debit Card"}
            </Typography>
          : <Typography variant="body1" className={clsx(
              classes.subtitle,
              classes.link,
              classes.textAlignEnd,
              'fadeIn',
            )}>
              {"Cancel"}
            </Typography>
        }
      </a>
      <section className={showAddVisaForm
        ? classes.displaySomeVisa
        : classes.displayNone
      }>
        <div className={classes.container}>
          <form>
            <TextInput
              placeholder={"Name on card"}
              value={nameOnCard}
              className={classes.textField}
              classes={{
                input: classes.nameOnCardInput
              }}
              onChange={(e) => setNameOnCard(e.target.value)}
              inputProps={{
                style: {
                  width: '100%',
                  color: Colors.charcoal,
                },
              }}
            />
          </form>
        </div>
        <div className={classes.container}>
          {/* {
            option(props).user()
            && process.browser
            ? <form className={classes.creditCardInputContainer}>
                <CardElement
                  options={{
                    hidePostalCode: true,
                  }}
                />
              </form>
            : <Typography variant="subtitle1">
                No PaymentMethod data. Network error
              </Typography>
          } */}
        </div>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.saveCardButton}
            variant={"outlined"}
            color={"primary"}
            onClick={async() => {
              addCreditCard()
            }}
          >
            Save
          </Button>
        </div>
      </section>
    </ErrorBounds>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate
  isLoading: boolean;
  setIsLoading(a: boolean): void;
  refetchPaymentMethods(): void;
}


export default withStyles(styles)( AddCard );

