//// Westpac Quickstream Documentation
// https://quickstream.westpac.com.au/docs/quickstreamapi/v1/quickstream-api-js/#gettoken-form-supplierbusinesscode-callback-rarr-void

/// Form must have the following fields:
// Attribute Name/Value	Description
// data-quickstream-api="cardholderName"	Apply to the input that the customer enters their cardholder name into.
// data-quickstream-api="cardNumber"	Apply to the input that the customer enters their credit card number into.
// data-quickstream-api="expiryDateMonth"	Apply to the input that the customer enters their card's expiry month into.
// data-quickstream-api="expiryDateYear"	Apply to the input that the customer enters their card's expiry year into.
// data-quickstream-api="cvn"	Apply to the input that the customer enters their card verification number into.

////////////// Quickstream Object ////////////////

export interface WestpacQuickstreamClient {

  bankAccounts: {

    appendErrors: (form: HTMLElement, errors: WestpacError[]) => void;

    appendTokenToForm: (form: HTMLElement, singleUseTokenId: string) => void;

    createTrustedFrame: (
      config: CreateTrustedFrameOptions,
      callback: WestpacCallback<TrustedFrameInstanceResponse>,
    ) => void;

    getToken: (
      form: HTMLElement,
      supplierBusinessCode: string,
      callback: WestpacCallback<GetTokenResponseDD>,
    ) => void;

    validateAccountNumber: (
      form: HTMLElement,
      callback: WestpacCallback<ValidationResponse>,
    ) => void;

    validateBsb: (
      form: HTMLElement,
      callback: WestpacCallback<ValidationResponse>,
    ) => void;
  }

  creditCards: {

    appendErrors: (form: HTMLElement, errors: WestpacError[]) => void;

    appendTokenToForm: (form: HTMLElement, singleUseTokenId: string) => void;

    createTrustedFrame: (
      config: CreateTrustedFrameOptions,
      callback: WestpacCallback<TrustedFrameInstanceResponse>,
    ) => void;

    getAcceptedCards: (
      supplierBusinessCode: string,
      callback: WestpacCallback<GetAcceptedCardsResponse>,
    ) => void;

    getCardScheme: (
      form: HTMLElement,
      callback: WestpacCallback<any>,
    ) => void;

    getCardSchemeSurchargeRate: (
      form: HTMLElement,
      supplierBusinessCode: string,
      callback: WestpacCallback<any>,
    ) => Promise<any>;

    getToken: (
      form: HTMLElement,
      supplierBusinessCode: string,
      callback: WestpacCallback<GetTokenResponseCC>,
    ) => void;

    validateCardNumber: (
      form: HTMLElement,
      callback: WestpacCallback<ValidationResponse>,
    ) => void;

    validateCvn: (
      form: HTMLElement,
      callback: WestpacCallback<ValidationResponse>,
    ) => void;

    validateExpiryDate: (
      form: HTMLElement,
      callback: WestpacCallback<ValidationResponse>,
    ) => void;
  }

  getPublishableApiKey(): string;

  init({ publishableApiKey: string }): void;

  isInitialised(): boolean;

  zip: {
    appendCheckoutIdToForm: (e: any, t: any) => Promise<any>;

    createZipButton: (e: any, t: any) => Promise<any>;

    initCheckout: (e: any, t: any) => Promise<any>;
  }
}

/// Callback Generic Type

type WestpacCallback<D> = (errors: WestpacError[], data: D) => void

interface LinkResponse {
  href: string
  rel: string
  requestMethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
}

interface WestpacError {
  fieldName: string
  messages: string[]
}

/// Responses

interface GetTokenResponseCC {
  form: HTMLElement;
  singleUseToken: {
    accountType: "CREDIT_CARD" | "DEBIT_CARD" | "BANK_ACCOUNT";
    creditCard: {
      cardNumber: string;
      cardScheme: string;
      cardType: string;
      cardholderName: string;
      expiryDateMonth: string;
      expiryDateYear: string;
      maskedCardNumber4Digits: string;
      surchargePercentage: string;
    };
    links: LinkResponse[];
    singleUseTokenId: string;
  };
  token: string;
}

interface GetTokenResponseDD {
  form: HTMLElement;
  singleUseToken: {
    accountType: "DIRECT_DEBIT";
    bankAccount: {
      bsb: string;
      accountNumber: string;
      accountName: string;
    };
    links: LinkResponse[];
    singleUseTokenId: string;
  };
  token: string;
}

type GetAcceptedCardsResponse = Array<{
  cardScheme: "VISA" | "MASTERCARD" | "AMEX" | "DINERS" | "UNIONPAY" | string
}>

interface ValidationResponse {
  isValid: boolean
}

interface TrustedFrameInstanceResponse {
  trustedFrame: TrustedFrameInstance
}
interface TrustedFrameInstance {
  clearField(fieldName, callback): void
  changePlaceholder(fieldName, placeholder, callback): void
  changeStyle(elementName, style, callback): void
  setEventHandler(fieldName, event, handler): void
  getEventHandlers(): any
  submitForm(callback): void
  teardown(callback): void
}

interface CreateTrustedFrameOptions {
  config: { supplierBusinessCode: string },
  iframe?: {
    width?: number;
    height?: number;
    scrolling?: "no" | "yes" | "auto";
    style?: Object;
    dummyTouchStart?: boolean;
    dummyTouchMove?: boolean;
    dummyTouchEnd?: boolean;
  },
  showAcceptedCards?: boolean;
  showRequiredIndicators?: boolean;
  body?: { style: Object };
  labels?: { style: Object };
  cardholderName?: {
    hidden?: boolean;
    label?: string;
    placeholder?: string;
    inputType?: string | "text";
    style?: Object
  };
  cardNumber?: {
    label?: string;
    placeholder?: string;
    inputType?: string;
    style?: string;
  };
  expiryDateMonth?: {
    label?: string;
    hideDefault?: boolean;
    optionFormat?: "NUMBER" | "NAME";
    style?: Object;
  };
  expiryDateYear?: {
    label?: string;
    hideDefault?: boolean;
    style?: Object;
  };
  cvn?: {
    hidden?: boolean;
    label?: string;
    placeholder?: string;
    inputType?: string;
    style?: Object;
    showHelp?: boolean;
  };
}