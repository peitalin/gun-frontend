
import React from 'react';
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, BorderRadius3x, Gradients, isThemeDark } from "layout/AppTheme";
// Stripe
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  Stripe,
  StripeError,
  StripeElements,
  PaymentMethod,
  ConfirmCardPaymentData,
  PaymentIntent,
} from "@stripe/stripe-js";

import {
  StripeAuthorizePaymentData,
  StripeConfirmResponse,
} from "./purchaseTypings";
import {
  ID,
  UserPrivate,
  OrderStatus,
  Orders,
  Product,
  OrderMutationResponse,
  OrderConfirmMutationResponse,
  AuthorizePaymentMutationResponse,
  Bids,
  BlankMutationResponse,
  ChatRoomStatus,
  User_Licenses,
} from 'typings/gqlTypes';
// Components
import ErrorBounds from 'components/ErrorBounds';
import ButtonLoading from "components/ButtonLoading";
import CreatePriceSuggestion from "./CreatePriceSuggestion";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// Graphql
import { useMutation } from '@apollo/client';
// Snackbar
import { useSnackbar } from "notistack";
import { useTheme } from "@material-ui/core";

import {
  AUTHORIZE_PAYMENT,
  CONFIRM_ORDER,
} from "queries/orders-mutations";
import {
  CANCEL_PAYMENT_INTENT_FAILURE,
} from "queries/orders-cancels-mutations";
// Graphql Queries to update after order
import {
  GET_BUYER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
} from "queries/orders-queries";
// initial variables for updating apollo cache
import { initialVariables } from "pageComponents/MyOrders";
// license components
import DropdownInput from "components/Fields/DropdownInput";
import OptionLicense from "./OptionLicense";
import {
  SelectOption,
} from "layout/MySettingsModal/UserLicenses/EditUserLicenseForm/licenseUtils";
import { asCurrency as c } from "utils/prices";
import { calculateInternationalFee } from "./calculateInternationalFees";



const VisaPurchaseProduct = (props: ReactProps) => {

  const stripe: Stripe = useStripe();
  const elements = useElements();
  const snackbar = useSnackbar();
  const theme = useTheme();

  const {
    classes,
    disableButton,
  } = props;

  const [loading, setLoading] = React.useState(false)

  const [chosenLicense, setChosenLicense] = React.useState<SelectOptionLicense>(undefined)

  const product = props.product;
  const featuredVariant = props.product.featuredVariant;

  const {
    initialPurchasePrice,
    internationalFeeDisplay,
    setInternationalFeeDisplay,
  } = props

  // const aClient = useApolloClient();
  // console.log("apollo CACHE::", aClient.cache)
  // const user2 = aClient?.cache?.readQuery<UserPrivate, any>({
  //   query: GET_BUYER_ORDERS_CONNECTION,
  //   variables: initialVariables,
  // });
  // console.log("aClient.CACHE user: ", user2)

  interface ReduxState {
    buyer: UserPrivate
  }

  const { buyer } = useSelector<GrandReduxState, ReduxState>(s => {
    return { buyer: s.reduxLogin.user }
  })

  const [
    authorizePayment,
    { loading: loading1 }
  ] = useMutation<Mdata1, Mvar1>(
    AUTHORIZE_PAYMENT, {
    variables: {
      productId: undefined,
      total: undefined,
      internationalFee: undefined,
      buyerLicenseId: chosenLicense?.value?.id,
      stripeAuthorizePaymentData: undefined,
      bidId: undefined,
    },
    update: (cache, { data: { authorizePayment } }) => {
    },
    onError: (err) => {
      let errMsg = err?.graphQLErrors?.[0]?.message ?? JSON.stringify(err)
      snackbar.enqueueSnackbar(`${errMsg}`, { variant: "error" })
    },
    onCompleted: (data) => {
      let stripePaymentIntent = JSON.parse(
        data?.authorizePayment?.stripePaymentIntent ?? "{}"
      );
      console.info("stripePaymentIntent", stripePaymentIntent)
      snackbar.enqueueSnackbar(
        `Authorizing payment`,
        { variant: "info" }
      )
    },
  })

  const [
    confirmOrder,
    { data, loading: loading2, error }
  ] = useMutation<Mdata2, Mvar2>(
    CONFIRM_ORDER, {
    variables: {
      productId: undefined,
      total: undefined,
      internationalFee: undefined,
      buyerId: undefined,
      buyerLicenseId: undefined,
      sellerStoreId: undefined,
      paymentIntentId: undefined,
      bidId: undefined,
    },
    update: (cache, { data: { confirmOrder } }) => {

      console.log("confirmed order : ", confirmOrder?.confirmedOrder)
      let newOrder = confirmOrder?.confirmedOrder;

      // cache.evict({
      //   id: "ROOT_QUERY",
      //   fieldName: "dashboardProductsConnection"
      // })

      // Fetch the cached user.buyerOrdersConnection item with associated variables
      // remember, variables need to match, or cache will not return the data
      const cacheDataBuyerOrders = cache.readQuery<{ user: UserPrivate }, any>({
        query: GET_BUYER_ORDERS_CONNECTION,
        variables: initialVariables,
      });
      const cacheDataSellerOrders = cache.readQuery<{ user: UserPrivate }, any>({
        query: GET_SELLER_ORDERS_CONNECTION,
        variables: initialVariables,
      });
      const cacheDataSellerActionItems = cache.readQuery<{ user: UserPrivate }, any>({
        query: GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
        variables: initialVariables,
      });

      let updateBuyerOrders = newOrder?.buyerId === buyer?.id
        && cacheDataBuyerOrders?.user?.buyerOrdersConnection

      let updateSellerOrders = newOrder?.sellerStore?.user?.id === buyer?.id
        && cacheDataSellerOrders?.user?.sellerOrdersConnection

      let updateSellerActionItems = newOrder?.sellerStore?.user?.id === buyer?.id
        && cacheDataSellerActionItems?.user?.sellerOrdersActionItemsConnection


      // update user orders connections in Apollo cache if those
      // connections are present, otherwise you might be spreading null
      if (updateBuyerOrders) {
        cache.writeQuery({
          query: GET_BUYER_ORDERS_CONNECTION,
          variables: initialVariables,
          data: {
            user: {
              ...cacheDataBuyerOrders?.user,
              buyerOrdersConnection: {
                ...cacheDataBuyerOrders?.user?.buyerOrdersConnection,
                edges: [
                  { __typename: "OrdersEdge", node: newOrder },
                  ...(cacheDataBuyerOrders?.user?.buyerOrdersConnection?.edges ?? []),
                ],
                totalCount: (cacheDataBuyerOrders?.user?.buyerOrdersConnection?.edges?.length ?? 0) + 1,
              },
            }
          },
        });
      }

      if (updateSellerOrders) {
        console.log("UPDATING SELLER CACHE ", cacheDataSellerOrders)
        cache.writeQuery({
          query: GET_SELLER_ORDERS_CONNECTION,
          variables: initialVariables,
          data: {
            user: {
              ...cacheDataSellerOrders?.user,
              sellerOrdersConnection: {
                ...cacheDataSellerOrders?.user?.sellerOrdersConnection,
                edges: [
                  { __typename: "OrdersEdge", node: newOrder },
                  ...(cacheDataSellerOrders?.user?.sellerOrdersConnection?.edges ?? []),
                ],
                totalCount: (cacheDataSellerOrders?.user?.sellerOrdersConnection?.edges?.length ?? 0) + 1,
              },
            }
          },
        });
      }

      if (updateSellerActionItems) {
        console.log("UPDATING ACTION ITEMS CACHE ", cacheDataSellerActionItems)
        cache.writeQuery({
          query: GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
          variables: initialVariables,
          data: {
            user: {
              ...cacheDataSellerActionItems?.user,
              sellerOrdersActionItemsConnection: {
                ...cacheDataSellerActionItems?.user?.sellerOrdersActionItemsConnection,
                edges: [
                  { __typename: "OrdersEdge", node: newOrder },
                  ...(cacheDataSellerActionItems?.user?.sellerOrdersActionItemsConnection?.edges ?? []),
                ],
                totalCount: (cacheDataSellerActionItems?.user?.sellerOrdersActionItemsConnection?.edges?.length ?? 0) + 1,
              }
            }
          },
        });
      }

      // cache.modify({
      //   fields: {
      //     dashboardProductsConnection(existingConnection: ProductsConnection) {
      //       console.log("cache.modify: ", existingConnection)
      //       return {
      //         ...existingConnection,
      //         edges: newEdges
      //       }
      //     }
      //   }
      // });

    },
    onError: (err) => {
      let errMsg = err?.graphQLErrors?.[0]?.message ?? JSON.stringify(err)
      snackbar.enqueueSnackbar(`${errMsg}`, { variant: "error" })
    },
    onCompleted: (data) => {
      console.log("confirmOrder response: ", data?.confirmOrder)
      snackbar.enqueueSnackbar(
        `Successful order placed: ${data?.confirmOrder?.confirmedOrder?.id}`,
        { variant: "success" }
      )
      if (typeof props.handleOrderPostPurchase === "function") {
        console.log("handleOrderPostPurchase()")
        props.handleOrderPostPurchase(data?.confirmOrder?.confirmedOrder)
      }
      if (typeof props.refetchProduct === "function") {
        props.refetchProduct()
      }
    },
  })


  const [
    cancelPaymentIntentFailure,
    { loading: loading3 }
  ] = useMutation<Mdata3, Mvar3>(
    CANCEL_PAYMENT_INTENT_FAILURE, {
    variables: {
      paymentIntentId: undefined,
    },
    update: (cache, { data: { cancelPaymentIntentFailure } }) => {
    },
    onError: (err) => {
      let errMsg = err?.graphQLErrors?.[0]?.message ?? JSON.stringify(err)
      snackbar.enqueueSnackbar(`${errMsg}`, { variant: "error" })
    },
    onCompleted: (data) => {
      console.log("data: ", data)
      snackbar.enqueueSnackbar(
        `Payment cancelled, please try another card`,
        { variant: "info", autoHideDuration: 8000 }
      )
    },
  })


  const createNewPaymentMethod = async(): Promise<CreateNewPaymentMethodResponse> => {

    if (!chosenLicense?.value?.id) {
      snackbar.enqueueSnackbar(`Please select a license first`, { variant: "error" })
      throw new Error(`No license selected`)
    }
    setLoading(true)
    // Within the context of `Elements`, this call to createPaymentMethod
    // knows from which Element to create the PaymentMethod,
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    let { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: { email: props.user?.email }
    })

    if (error) {
      console.warn("error: ", error)
      snackbar.enqueueSnackbar(
        `${error?.message}`,
        { variant: "error"}
      )
      throw new Error(`${error?.message}`)
    }

    let acceptInternationalFees;
    let _internationalFee;

    if (paymentMethod.card?.country !== "AU") {
      // card is international and will incur %2.9 stripe fees instead of %1.75
      _internationalFee = calculateInternationalFee(initialPurchasePrice)
      acceptInternationalFees = confirm(
        `This is not an Australian card.\n` +
        `Stripe will charge an extra 1.21% international card fee.\n` +
        `This brings the total to: ${c(_internationalFee + initialPurchasePrice)}.`
      )
    } else {
      // card is Australian and will not incur %2.9 stripe fees
      acceptInternationalFees = false
    }
    console.log("acceptInternationalFees", acceptInternationalFees)
    console.log("purchasePrice", initialPurchasePrice)
    console.log("internationalPurchasePrice", _internationalFee + initialPurchasePrice)

    if (acceptInternationalFees && _internationalFee) {
      // use international card pricing
      await setInternationalFeeDisplay(_internationalFee)
      snackbar.enqueueSnackbar(
        `Updated international pricing to ${c(_internationalFee + initialPurchasePrice)}`,
        { variant: "info" }
      )
      return {
        paymentMethod,
        _internationalFee: _internationalFee
      }
    } else {
      setInternationalFeeDisplay(0)
      snackbar.enqueueSnackbar(
        `Please use an Australian card, or accept international card fees`,
        { variant: "error" }
      )
      throw new Error("Not an australian card and don't want to pay international fees")
    }
  }


  const authorizePaymentFirst = async({
    paymentMethodId,
    internationalFee,
    stripeCustomerId,
  }): Promise<{ paymentIntentId: string, error?: StripeError }> => {
    // creates an order on the backend, and places a hold on the users card
    // with a payment authorization (to be captured later)

    if (!props?.user?.id) {
      snackbar.enqueueSnackbar(`Login to purchase.`, { variant: "info" })
      return {
        paymentIntentId: undefined,
        error: undefined
      }
    }

    const stripeAuthorizePaymentData: StripeAuthorizePaymentData = {
      paymentMethod: paymentMethodId,
      customerId: stripeCustomerId,
    };

    // 1. create a stripe payment intent authorization in the backend
    let response = await authorizePayment({
      variables: {
        productId: product.id,
        total: initialPurchasePrice,
        internationalFee: internationalFee,
        buyerLicenseId: chosenLicense?.value?.id,
        stripeAuthorizePaymentData: JSON.stringify(stripeAuthorizePaymentData),
        bidId: props.selectedBid?.id,
      },
    })

    if (response.errors) {
      snackbar.enqueueSnackbar(
        `Your card was rejected, please try another Australian card`,
        { variant: "error", autoHideDuration: 5000 }
      )
      return {
        paymentIntentId: undefined,
        error: undefined
      }
    }

    let stripePaymentIntent = response?.data?.authorizePayment?.stripePaymentIntent
    let paymentIntent: PaymentIntent = JSON.parse(stripePaymentIntent)
    console.log("incoming paymentIntent: ", paymentIntent)

    // if (paymentIntent?.next_action?.type === 'redirect_to_url') {
    //   window.location.assign(
    //     paymentIntent?.next_action?.redirect_to_url?.url
    //   )
    // }
    /////// Not needed. automatic confirmation means this is not needed
    // if (paymentIntent.next_action) {
    //   let cardActionResponse = stripe.handleCardAction(
    //     paymentIntent.client_secret
    //   ).then(result => {
    //     console.log("result: ", result)
    //     if (result?.error) {
    //       console.log("result.error: ", result?.error)
    //     } else {
    //     }
    //   })
    //   console.log("stripe.handleCardAction: ", cardActionResponse)
    // }

    // 2. now prompt user for 3DS confirmation to complete the payment authorization
    // A 3DS should pop-up if enabled on stripe dashboard settings.
    let stripe3dsResponse: StripeConfirmResponse = await stripe.confirmCardPayment(
      paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          // activates 3DS prompt with test cards for newCards
          // otherwise Stripe 3DS is dynamic and you can set fraud detection rules
        }
      } as ConfirmCardPaymentData
    );

    // this can return an error, insufficient funds, card rejected, etc
    console.log("3DS confirm response", stripe3dsResponse)
    if (stripe3dsResponse?.error?.code) {
      console.log("3DS Error: ", stripe3dsResponse?.error?.message)
      snackbar.enqueueSnackbar(
        `Your card failed 3D Secure verification, or CVS number was wrong`,
        { variant: "error" }
      )
      await cancelPaymentIntentFailure({
        variables: {
          paymentIntentId: paymentIntent.id,
        }
      })
      // throw new Error("3DS error")
      return {
        paymentIntentId: paymentIntent?.id,
        error: stripe3dsResponse.error
      }
    }

    return {
      paymentIntentId: stripe3dsResponse?.paymentIntent?.id,
      error: undefined
    }
  }

  let licenseOptions = createLicenseOptions(props.user?.licenses)
  let loadingGql = loading1 || loading2 || loading3

  // React.useEffect(() => {
  //   // set defaultLicense as the initial license for the drodown
  //   if (licenseOptions?.length > 0) {
  //     let defaultLicense = licenseOptions.find(
  //       l => props.user?.defaultLicenseId === (l.value as User_Licenses).id
  //     )
  //     setChosenLicense(defaultLicense)
  //   }
  // }, [props.user?.defaultLicenseId])

  // console.log("licenseOptions", licenseOptions)
  // console.log("chosenLicenseId", chosenLicenseId)
  // console.log("chosenLicense", chosenLicense)
  // console.log("selectedBid", props.selectedBid)

  return (
    <ErrorBounds name="Visa Checkout" className={props.className}>
      <div className={classes.root}>
        <div className={clsx(
          classes.formContainer,
          // showStripeElement ? "fadeInFast" : "hidden",
        )}>
          <div className={clsx(classes.flexCol)}>

            {
              props.user?.id &&
              <div className={classes.dropdownContainer}>
                <DropdownInput
                  initialState={chosenLicense}
                  onChange={({ label, value }: SelectOption) => {
                    setChosenLicense({ label, value })
                  }}
                  value={chosenLicense}
                  // disableAutocomplete={true}
                  // menuPortalTarget={document?.body} // solves z-index problems
                  // menuIsOpen={true}
                  disable={!props.user?.id}
                  components={{
                    Option: OptionLicense
                  }}
                  options={licenseOptions}
                  placeholder={"Select a License"}
                  label="" // remove moving label
                  inputProps={{ style: { width: '100%' }}}
                  // errorMessage={formik.errors.licenseState}
                  // touched={formik.touched.licenseState}
                />
              </div>
            }

            <div className={clsx(classes.creditCardContainer)}>
              <CardElement
                options={{
                  hidePostalCode: true,
                  style: {
                    base: {
                      color: isThemeDark(theme)
                        ? Colors.uniswapLightestGrey
                        : Colors.slateGreyBlack,
                      iconColor: isThemeDark(theme)
                        ? Colors.uniswapLightestGrey
                        : Colors.slateGreyBlack,
                      lineHeight: '1.5rem',
                      "::placeholder": {
                        fontSize: "0.875rem",
                        fontWeight: '400',
                        color: isThemeDark(theme)
                          ? Colors.uniswapLightestGrey
                          : Colors.slateGreyDarkest,
                        iconColor: isThemeDark(theme)
                          ? Colors.uniswapLightestGrey
                          : Colors.slateGreyDarkest,
                      },
                    },
                  }
                }}
                onReady={(el) => {
                  // el.focus()
                }}
                onChange={(event) => {
                  // console.log('onChange', event)
                }}
                />
            </div>
          </div>

          <div className={classes.flexRowCenter}>
            <ButtonLoading
              onClick={() => {
                createNewPaymentMethod()
                  .then(async ({ paymentMethod, _internationalFee }) => {
                    if (paymentMethod?.id) {
                      let { paymentIntentId, error } = await authorizePaymentFirst({
                        paymentMethodId: paymentMethod.id,
                        internationalFee: _internationalFee,
                        stripeCustomerId: props?.user?.stripeCustomerId,
                      });
                      return {
                        paymentIntentId,
                        _internationalFee,
                        error,
                      }
                    }
                  })
                  .then(({ paymentIntentId, _internationalFee, error }) => {
                    // Confirms an order on the backend, and places a hold on the users card
                    // with a payment authorization (to be captured later)
                    if (paymentIntentId && !error) {
                      confirmOrder({
                        variables: {
                          productId: product.id,
                          total: initialPurchasePrice,
                          internationalFee: _internationalFee,
                          buyerId: props.user.id,
                          buyerLicenseId: chosenLicense?.value?.id,
                          sellerStoreId: product.store.id,
                          paymentIntentId: paymentIntentId,
                          bidId: props.selectedBid?.id,
                        },
                      }).catch(err => {
                        cancelPaymentIntentFailure({
                          variables: {
                            paymentIntentId: paymentIntentId,
                          }
                        })
                      })
                    }
                  })
                  .catch(err => err)
                  .finally(() => setLoading(false))
              }}
              loadingIconColor={Colors.blue}
              replaceTextWhenLoading={true}
              loading={loading}
              disabled={
                loading
                || disableButton
                || !props.user?.id
              }
              variant="contained"
              color="secondary"
              className={classes.buyButton}
              style={{
                height: props.buttonHeight ? props.buttonHeight : "38px",
              }}
            >
              <span style={{ marginLeft: '0.25rem' }}>
                {
                  !props.user?.id
                  ? "Log in to Purchase"
                  : `Buy for ${c(initialPurchasePrice + internationalFeeDisplay)} AUD`
                }
              </span>
            </ButtonLoading>
          </div>

          {
            // !disableButton &&
            // !!buyer?.id &&
            true &&
            <div className={classes.flexRowCenter}>
              <div className={classes.bidButtonContainer}>
                <CreatePriceSuggestion
                  userId={buyer?.id}
                  product={product}
                  chatRoomStatuses={[
                    ChatRoomStatus.ACTIVE,
                    ChatRoomStatus.ARCHIVED,
                    ChatRoomStatus.COMPLETED,
                  ]}
                />

              </div>
            </div>
          }

        </div>
      </div>
    </ErrorBounds>
  );
};





const createLicenseOptions = (licenses: User_Licenses[]): SelectOptionLicense[] => {
  return (licenses ?? []).map(c => {
    return {
      label: `License ${c.licenseNumber}`,
      value: c,
    }
  })
}

interface SelectOptionLicense {
  label: string;
  value: User_Licenses;
}

interface CreateNewPaymentMethodResponse {
  paymentMethod: PaymentMethod
  _internationalFee: number
}




interface ReactProps extends WithStyles<typeof styles> {
  display: boolean;
  disableButton?: boolean;
  user?: UserPrivate;
  className?: string;
  buttonHeight?: any;
  handleOrderPostPurchase(order: any): void;
  product: Product;
  refetchProduct?(): void;
  selectedBid?: Bids;
  initialPurchasePrice: number
  internationalFeeDisplay: number
  setInternationalFeeDisplay(p: number): void
}

interface Mdata1 {
  authorizePayment: AuthorizePaymentMutationResponse;
}
interface Mvar1 {
  productId: string
  total: number
  internationalFee: number
  buyerLicenseId: string
  stripeAuthorizePaymentData: string
  bidId?: string
}
interface Mdata2 {
  confirmOrder: OrderConfirmMutationResponse;
}
interface Mvar2 {
  productId: string
  total: number
  internationalFee: number
  buyerId: string
  buyerLicenseId: string
  sellerStoreId: string
  paymentIntentId: string
  bidId?: string
}

interface Mdata3 {
  cancelPaymentIntentFailure: BlankMutationResponse;
}
interface Mvar3 {
  paymentIntentId: string
}


/////////////// Styles /////////////
const styles = (theme: Theme) => createStyles({
  root: {
    // position: "relative",
    marginTop: '.25rem',
    // marginLeft: '2rem', // 2rem matches with 40px height button
    // marginRight: '2rem', // 2rem matches with 40px height button
  },
  formContainer: {
    minWidth: '180px',
  },
  creditCardContainer: {
    margin: "0px",
    height: 40,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    // color: isThemeDark(theme)
    //   ? Colors.uniswapLightestGrey
    //   : Colors.black,
    border: `1px solid rgba(170, 170, 170, 0.4)`,
    padding: "0.5rem",
    borderRadius: BorderRadius,
  },
  receiptLink: {
  },
  stripeElement: {
    boxSizing: 'border-box',
    height: '40px',
    padding: '10px 12px',
    border: '1px solid transparent',
    borderRadius: BorderRadius,
    // backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 #e6ebf1',
    transition: 'box-shadow 150ms ease',
    "&:focus": {
      boxShadow: '0 1px 3px 0 #cfd7df',
    },
    "--invalid": {
      borderColor: "#fa755a",
    }
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.25rem',
    marginBottom: '0.5rem',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    alignItems: 'center',
    textAlign: 'center',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex-end",
    width: '100%',
    margin: 0,
  },
  checkboxText: {
    fontSize: '0.875rem',
    fontWeight: 400,
    color: Colors.darkGrey,
  },
  buyButton: {
    width: "100%",
    borderRadius: BorderRadius,
  },
  emailField: {
    flexGrow: 1,
    minWidth: 100,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.8rem',
    margin: '0.25rem 0rem',
  },
  dropdownContainer: {
    marginBottom: '0.5rem',
  },
  marginTop: {
    marginTop: '1rem',
  },
  link: {
    color: Colors.blue,
    fontSize: "0.9rem",
    cursor: 'pointer',
    "&:hover": {
      color: fade(Colors.blue, 0.9),
    },
  },
  bidButtonContainer: {
    width: "100%",
    marginTop: "0.5rem",
  },
});

export default withStyles(styles)( VisaPurchaseProduct );







