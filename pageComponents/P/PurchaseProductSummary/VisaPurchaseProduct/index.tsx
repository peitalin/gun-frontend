
import React from 'react';
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, BorderRadius3x, Gradients } from "layout/AppTheme";
// Stripe
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  Stripe,
  StripeElements,
  PaymentMethod,
  ConfirmCardPaymentData
} from "@stripe/stripe-js";


import {
  StripeAuthorizePaymentData,
  StripeConfirmResponse,
} from "./purchaseTypings";
import {
  UserPrivate, ID,
  OrderStatus,
  Orders,
  Product,
  OrderMutationResponse,
  OrderCreateMutationResponse,
  Bids,
} from 'typings/gqlTypes';
// Components
import ErrorBounds from 'components/ErrorBounds';
import ButtonLoading from "components/ButtonLoading";
import CreateOfferSubscription from "../CreateOfferSubscription";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// Graphql
import { useApolloClient, useMutation } from '@apollo/client';
// Snackbar
import { useSnackbar } from "notistack";

import {
  CREATE_ORDER,
} from "queries/orders-mutations";
// Graphql Queries to update after order
import {
  GET_BUYER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
} from "queries/orders-queries";
// initial variables for updating apollo cache
import { initialVariables } from "pageComponents/MyOrders";




const VisaPurchaseProduct = (props: ReactProps) => {

  const stripe: Stripe = useStripe();
  const elements = useElements();
  const snackbar = useSnackbar();

  const { classes, disableButton } = props;

  const product = props.product;
  const featuredVariant = props.product.featuredVariant;
  const purchasePrice = props.selectedBid?.offerPrice
    || featuredVariant.price

  // const aClient = useApolloClient();
  // console.log("apollo CACHE::", aClient.cache)
  // const user2 = aClient?.cache?.readQuery<UserPrivate, any>({
  //   query: GET_BUYER_ORDERS_CONNECTION,
  //   variables: initialVariables,
  // });
  // console.log("aClient.CACHE user: ", user2)

  interface ReduxState {
    isDarkMode: boolean;
    buyer: UserPrivate
  }

  const { isDarkMode, buyer } = useSelector<GrandReduxState, ReduxState>(s => {
    return {
      isDarkMode: s.reduxLogin.darkMode === 'dark',
      buyer: s.reduxLogin.user,
    }
  })

  const [
    createOrder,
    { data, loading, error }
  ] = useMutation<MutDataCreateOrder, MutVarCreateOrder>(
    CREATE_ORDER, {
    variables: {
      productId: undefined,
      productSnapshotId: undefined,
      variantId: undefined,
      variantSnapshotId: undefined,
      total: undefined,
      buyerId: undefined,
      sellerStoreId: undefined,
      stripeAuthorizePaymentData: undefined,
      bidId: undefined,
    },
    update: (cache, { data: { createOrder } }) => {

      console.log("incoming order : ", createOrder?.unconfirmedOrder)
      let newOrder = createOrder?.unconfirmedOrder;

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
      let stripePaymentIntent = JSON.parse(
        data?.createOrder?.stripePaymentIntent ?? "{}"
      );
      console.log("createOrder response: ", data?.createOrder)
      console.info("stripePaymentIntent", stripePaymentIntent)
      snackbar.enqueueSnackbar(
        `Success order placed: ${data?.createOrder?.unconfirmedOrder?.id}`,
        { variant: "success" }
      )
      if (typeof props.handleOrderPostPurchase === "function") {
        console.log("handleOrderPostPurchase()")
        props.handleOrderPostPurchase(data?.createOrder?.unconfirmedOrder)
      }
      if (typeof props.refetchProduct === "function") {
        props.refetchProduct()
      }
    },
  })


  const createNewPaymentMethod = async(): Promise<PaymentMethod> => {
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
      snackbar.enqueueSnackbar(
        `createNewPaymentMethod error: ${error}`,
        { variant: "error"}
      )
    }
    return paymentMethod
  }



  const createOrderAndHoldFundsFirst = async({
    paymentMethodId,
    stripeCustomerId,
  }) => {
    // creates an order on the backend, and places a hold on the users card
    // with a payment authorization (to be captured later)

    if (!props?.user?.id) {
      snackbar.enqueueSnackbar(`Login to purchase.`, { variant: "info" })
      return
    }

    const stripeAuthorizePaymentData: StripeAuthorizePaymentData = {
      paymentMethod: paymentMethodId,
      customerId: stripeCustomerId,
    };

    // 1. Create Order + create stripe payment intent in the backend
    await createOrder({
      variables: {
        productId: product.id,
        productSnapshotId: product.currentSnapshot.id,
        variantId: featuredVariant.variantId,
        variantSnapshotId: featuredVariant.variantSnapshotId,
        total: purchasePrice,
        buyerId: props.user.id,
        sellerStoreId: product.store.id,
        stripeAuthorizePaymentData: JSON.stringify(stripeAuthorizePaymentData),
        bidId: props.selectedBid?.id,
      },
    })
  }


  return (
    <ErrorBounds name="Visa Checkout" className={props.className}>
      <div className={classes.root}>
        <div className={clsx(
          classes.formContainer,
          // showStripeElement ? "fadeInFast" : "hidden",
        )}>
          <div className={clsx(classes.flexCol)}>
            <div className={clsx(classes.creditCardContainer)}>
              <CardElement
                options={{
                  hidePostalCode: true,
                  style: {
                    base: {
                      color: isDarkMode
                        ? Colors.uniswapLightestGrey
                        : Colors.slateGreyBlack,
                      iconColor: isDarkMode
                        ? Colors.uniswapLightestGrey
                        : Colors.slateGreyBlack,
                      lineHeight: '1.5rem',
                      "::placeholder": {
                        fontSize: "0.875rem",
                        fontWeight: '400',
                        color: isDarkMode
                          ? Colors.uniswapLightestGrey
                          : Colors.slateGreyDarkest,
                        iconColor: isDarkMode
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
              onClick={
                () => createNewPaymentMethod()
                      .then(newPaymentMethod => {
                        createOrderAndHoldFundsFirst({
                          paymentMethodId: newPaymentMethod.id,
                          stripeCustomerId: props?.user?.stripeCustomerId,
                        });
                      })
              }
              loadingIconColor={Colors.blue}
              replaceTextWhenLoading={true}
              loading={loading}
              disabled={loading || disableButton}
              variant="contained"
              color="secondary"
              className={classes.buyButton}
              style={{
                height: props.buttonHeight ? props.buttonHeight : "38px",
              }}
            >
              <span style={{ marginLeft: '0.25rem' }}>
                { props.title ? props.title : "Buy Instantly" }
              </span>
            </ButtonLoading>
          </div>

          {
            // !disableButton &&
            // !!buyer?.id &&
            true &&
            <div className={classes.flexRowCenter}>
              <div className={classes.bidButtonContainer}>
                <CreateOfferSubscription
                  userId={buyer?.id}
                  product={product}
                />
              </div>
            </div>
          }

        </div>
      </div>
    </ErrorBounds>
  );
};

interface ReactProps extends WithStyles<typeof styles> {
  display: boolean;
  disableButton?: boolean;
  user?: UserPrivate;
  className?: string;
  buttonHeight?: any;
  title?: string;
  showIcon?: boolean;
  handleOrderPostPurchase(order: any): void;
  product: Product;
  refetchProduct?(): void;
  selectedBid?: Bids;
}

interface MutDataCreateOrder {
  createOrder: OrderCreateMutationResponse;
}
interface MutVarCreateOrder {
  productId: string
  productSnapshotId: string
  variantId: string
  variantSnapshotId: string
  total: number
  buyerId: string
  sellerStoreId: string
  stripeAuthorizePaymentData: string
  bidId: string
}
interface MutDataConfirmOrder {
  confirmOrder: OrderMutationResponse;
}
interface MutVarConfirmOrder {
  orderId: string
  stripeConfirmPaymentData: string
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
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.cream,
    // color: theme.palette.type === 'dark'
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







