
////////////// Stripe Object ////////////////
export interface StripeClient {

  confirmPaymentIntent(
    client_secret: string,
    // The client secret of the PaymentIntent.
    payment_method?: string,
    // ID of the payment method to attach to this PaymentIntent.
    receipt_email?: string,
    return_url?: string,
    save_payment_method?: boolean,
    shipping?: {
      address: string;
      name: string;
      carrier?: string;
      phone?: string;
      tracking_number?: number;
    },
  ): Promise<any>;
  // https://stripe.com/docs/api/payment_intents/confirm

  createPaymentMethod(
    type?: "card" | "card_present",
    // cardElement?: stripe.elements.Element,
    data?: BillingDetailsArgs,
    card?: CreditCardArgs | { token: string },
    metadata?: { [key: string]: any },
  ): Promise<{ paymentMethod: StripePaymentMethodResponse, error: stripe.Error }>;

  createSource(
    // element?: stripe.elements.Element,
    sourceData?: {
      type?: string;
      amount?: number;
      currency?: string;
      owner?: {
        name?: string;
      },
      redirect?: {
        return_url?: string;
      }
    },
  ): Promise<{ source: stripe.Source, error: stripe.Error }>;

  createToken(
    // element: stripe.elements.Element,
    options?: {
      type?: string;
      name?: string,
      address_line1?: string;
      address_line2?: string;
      address_city?: string;
      address_state?: string;
      address_zip?: string;
      address_country?: string;
      currency?: string;
    }
  ): Promise<{ token: stripe.Token, error: stripe.Error }>;

  // elements(n?: any): any;
  // https://stripe.com/docs/stripe-js/reference#stripe-elements

  fulfillPaymentIntent?(): any;
  handleCardAction?(n: any): any;
  handleCardPayment?(
    clientSecret: string,
    elementOrData: {
      type?: string,
      props?: any;
    },
    maybeData?: any,
  ): any;
  handleIdealPayment?(): any;
  handleSepaDebitPayment?(): any;
  // // paymentRequest?(n: any): any;
  redirectToCheckout(options: {
    items?: Array<{
      sku?: string;
      plan?: string;
      quantity?: number;
      [key: string]: any;
    }>;
    successUrl?: string;
    cancelUrl?: string;
    clientReferenceId?: string;
    customerEmail?: string;
    billingAddressCollection?: string;
    sessionId?: string;
    locale?: string;
  }): any;
  retrievePaymentIntent(n: any): any;
  retrieveSource?(n: any): any;
}

interface CreditCardArgs {
  exp_month: number;
  exp_year: number;
  number: number;
  cvc: number;
}
interface BillingDetailsArgs {
  billing_details: {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
  };
}

export interface StripeChargeResponse {
  id?: string;
  amount?: number;
  amount_refunded?: number;
  application?: any;
  application_fee?: any;
  balance_transaction?: string;
  captured?: boolean;
  created?: number;
  currency?: string;
  customer?: any;
  description?: string;
  destination?: any;
  dispute?: any;
  failure_code?: any;
  failure_message?: string;
  fraud_details?: {
    user_report?: any;
    stripe_report?: any
  };
  invoice?: any;
  livemode?: false;
  metadata?: {};
  on_behalf_of?: any;
  order?: any;
  outcome?: {
    outcome_type?: string;
    network_status?: string;
    reason?: any;
    risk_level?: string;
    seller_message?: string;
    rule?: any
  }
  paid?: boolean;
  payment_intent?: any;
  receipt_url?: string;
  receipt_email?: any;
  receipt_number?: any;
  refunded?: boolean;
  refunds?: {
    data?: any[];
    has_more?: boolean;
    total_count?: number;
    url?: string;
  };
  review?: any;
  shipping?: any;
  source?: StripeSource;
  source_transfer?: any;
  statement_descriptor?: any;
  status?: string;
  transfer_group?: any;
}

export interface StripeSource {
  object?: string;
  id?: string;
  account?: any;
  address_city?: string;
  address_country?: string
  address_line1?: string
  address_line1_check?: string;
  address_line2?: string;
  address_state?: string;
  address_zip?: string
  address_zip_check?: string;
  available_payout_methods?: any;
  brand?: string;
  country?: string;
  currency?: any;
  customer?: any;
  cvc_check?: string;
  default_for_currency?: any;
  dynamic_last4?: any;
  exp_month?: number;
  exp_year?: number;
  fingerprint?: string;
  funding?: string;
  last4?: string;
  metadata?: any;
  name?: string;
  recipient?: any;
  tokenization_method?: any;
}

// Responses
export interface StripePaymentMethodResponse {
  id?: string;
  object?: string; // "checkout.session"
  billing_details?: StripeBillingResponse;
  card?: StripeCardResponse;
  created?: number;
  customer?: any;
  livemode?: boolean;
  metadata?: any;
  type?: string;
}


export interface StripeBillingResponse {
  address?: {
    city?: string;
    country?: string;
    line1?: string;
    line2?: string;
    postal_code?: string;
    state?: string
  };
  email?: string;
  name?: string;
  phone?: string
}

export interface StripeCardResponse {
  brand?: string;
  checks?: {
    address_line1_check?: string;
    address_postal_code_check?: string;
    cvc_check?: string
  };
  country?: string;
  exp_month?: number;
  exp_year?: number;
  fingerprint?: string;
  funding?: string;
  generated_from?: string;
  last4?: string;
  three_d_secure_usage?: {
    supported?: boolean;
  };
  wallet?: string;
}

export interface StripeCheckoutResponse {
  id?: string;
  object?: string; // "checkout.session"
  billing_address_collection?: string;
  cancel_url?: string; // "https://example.com/cancel"
  client_reference_id?: string;
  customer?: string;
  customer_email?: string;
  display_items?: Array<{
    amount?: number;
    currency?: string;
    custom?: {
      images?: string[];
      description?: string;
      name?: string;
      [key: string]: any;
    };
    type?: string;
  }>;
  livemode?: boolean;
  locale?: string;
  payment_intent?: string; // "pi_1EVYajKqy1M9WH1DRLZOoWsV"
  subscription?: any;
  success_url?: string;
}


export interface StripeCreateCustomerResponse {
  account_balance: number;
  business_vat_id: string;
  created: number;
  currency: string;
  default_source: string;
  delinquent: boolean;
  desc: string;
  discount: any;
  email: string;
  id: string;
  livemode: boolean;
  metadata: any;
  shipping: any;
  sources: {
    data: StripeSource[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  subscriptions: {
    data: any[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
}
