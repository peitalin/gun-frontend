import React from "react";
// Graphql Queries
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { GET_USER_PAYMENT_METHODS } from "queries/payment_methods-queries";
// import { UserPrivate, ID, PaymentMethod } from "typings/gqlTypes";
type UserPrivate = any;
type PaymentMethod = any;
type ID = any;
// Redux
import { useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import Loading from "components/Loading";
import ErrorDisplay, { GraphQLErrors } from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import CreditCard from "./CreditCard";
import AddCard from "./AddCard";
import { REMOVE_PAYMENT_METHOD, SET_DEFAULT_PAYMENT_METHOD } from "queries/payment_methods-mutations";



const PaymentMethods = (props: ReactProps) => {

  const { classes } = props;
  const aClient = useApolloClient();
  const dispatch = useDispatch();

  const actions = Actions.reduxLogin;
  const [isLoading, setIsLoading] = React.useState(false);


  const removeCreditCard = async(payment_method_id: string) => {
    // setIsLoading(true)
    // await aClient.mutate({
    //   mutation: REMOVE_PAYMENT_METHOD,
    //   variables: {
    //     paymentMethodId: payment_method_id,
    //   }
    // });
    // refetchUserPaymentMethods()
    // setIsLoading(false)
  }

  const setDefaultPaymentMethod = async(payment_method_id: ID) => {
    // setIsLoading(true)
    // await aClient.mutate({
    //   mutation: SET_DEFAULT_PAYMENT_METHOD,
    //   variables: {
    //     paymentMethodId: payment_method_id,
    //   }
    // });
    // refetchUserPaymentMethods()
    // setIsLoading(false)
  }

  const refetchUserPaymentMethods = async() => {
    let { data } = await refetch()
    syncUserPaymentMethodsRedux(
      data.user.paymentMethods,
      data.user.defaultPaymentMethod,
    )
  }

  const syncUserPaymentMethodsRedux = (
    paymentMethods: PaymentMethod[],
    defaultPaymentMethod: PaymentMethod,
  ) => {
    const updatedUser = {
      ...props.user,
      paymentMethods: paymentMethods,
      defaultPaymentMethod: defaultPaymentMethod,
    };
    // redux
    dispatch(actions.SET_USER(updatedUser))
  }

  const { loading, error, data, refetch } = useQuery<QueryData>(
    GET_USER_PAYMENT_METHODS
  );


  if (loading) {
    return <Loading loading={loading} delay={"200ms"}/>;
  } else if (error || !data.user) {
    return (
      <ErrorBounds className={classes.root}>
        <Typography className={classes.subtitle} variant="h4">
          Payment Methods
        </Typography>
        <ErrorDisplay title={"PaymentMethods"} error={error}/>
        {
          !!data.user &&
          <Typography variant="subtitle1">
            No PaymentMethod data. Network error
          </Typography>
        }
      </ErrorBounds>
    )
  } else {
    let defaultPaymentMethodId = data?.user?.defaultPaymentMethod?.id
    return (
      <ErrorBounds className={classes.root}>
        <Typography className={classes.subtitle} variant="h4">
          Payment Methods
        </Typography>
        <div className={classes.flexCol}>
          {
            data?.user?.paymentMethods &&
            data.user.paymentMethods.map(pm => {
              return (
                <CreditCard
                  key={pm.id}
                  paymentMethod={pm}
                  isDefaultPaymentMethod={pm.id === defaultPaymentMethodId}
                  setDefaultPaymentMethod={setDefaultPaymentMethod}
                  removeCreditCard={removeCreditCard}
                />
              )
            })
          }
        </div>
        <AddCard
          user={props.user}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          refetchPaymentMethods={refetchUserPaymentMethods}
        />
        <Loading absolute loading={isLoading} delay={"0ms"} />
        <br/>
      </ErrorBounds>
    );
  };
}




interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate
}
interface QueryData {
  user: UserPrivate;
}

export default withStyles(styles)( PaymentMethods );

