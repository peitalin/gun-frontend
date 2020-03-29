type Transaction = any;


export interface PaypalClient {
  Buttons: any;
  FUNDING: {
    BANCONTACT: "bancontact";
    CARD: "card";
    CREDIT: "credit";
    EPS: "eps";
    GIROPAY: "giropay";
    IDEAL: "ideal";
    ITAU: "itau";
    MYBANK: "mybank";
    P24: "p24";
    PAYPAL: "paypal";
    SEPA: "sepa";
    SOFORT: "sofort";
    VENMO: "venmo";
    WECHATPAY: "wechatpay";
    ZIMPLER: "zimpler";
  };
  version: string;
}

export interface PaypalOnApproveData {
  orderID: string;
  payerID: string;
}

export interface PaypalOnApproveActions {
  order?: {
    authorize?(): any;
    capture?(): any;
    get?(): any;
    patch?(): any;
  };
  redirect?(): any;
  restart?(): any;
  subscriptions?(): any;
}

export interface PaypalCreateOrder {
  orderId: string;
  payerId: string;
  cartId: string;
  details: string;
  subtotal: number;
  paymentProcessingFee: number;
  taxes: number;
  total: number;
  currency: string;
}

export interface PaypalConfirmOrder {
  paypalResponse: PaypalResponse;
  cartId: string;
  transaction: Transaction;
}

export interface PaypalResponse {
  create_time: string;
  update_time: string;
  id: string;
  intent: string;
  payer: {
    email_address: string;
    payer_id: string;
    address: {
      address_line_1: string;
      admin_area_2: string;
      admin_area_1: string;
      postal_code: string;
      country_code: string;
    }
    name: {
      given_name: string;
      surname: string;
    };
    phone: {
      phone_number: {
        national_number: string;
      };
    };
  };
  purchase_units: Array<PaypalPurchaseUnits>;
  links: Array<PaypalLinks>;
}

// {
//   'create_time': '2019-06-08T05:58:54Z',
//   'update_time': '2019-06-08T05:58:54Z',
//   'id': '6TP15053L3858374E',
//   'intent': 'CAPTURE',
//   'status': 'COMPLETED',
//   'payer': {'email_address': 'leo@efc.com',
//   'payer_id': 'DKPJV8SETUYMQ',
//   'address': {'address_line_1': '1 Main St',
//     'admin_area_2': 'San Jose',
//     'admin_area_1': 'CA',
//     'postal_code': '95131',
//     'country_code': 'US'},
//   'name': {'given_name': 'Leo', 'surname': 'Tolstoy'},
//   'phone': {'phone_number': {'national_number': '4084473359'}}},
//   'purchase_units': [
//      PURCHASEUNITS
//   ],
//   'links': [
//     {
//       'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/6TP15053L3858374E',
//       'rel': 'self',
//       'method': 'GET',
//       'title': 'GET'
//     }
//   ]
// }

interface PaypalPurchaseUnits {
  reference_id: string;
  soft_descriptor: string;
  amount: {
    value: string;
    currency_code: string;
  };
  payee: {
    email_address: string;
    merchant_id: string;
  };
  shipping: {
    name: {
      full_name: string;
    };
    address: {
      address_line_1: string;
      admin_area_2: string;
      admin_area_1: string;
      postal_code: string;
      country_code: string;
    };
  };
  payments: {
    captures: Array<PaypalCaptures>;
  };
}

// {
//   'reference_id': 'default',
//   'soft_descriptor': 'PAYPAL *PYPLTEST',
//   'amount': {'value': '0.01', 'currency_code': 'USD'},
//   'payee': {
//     'email_address': 'barco.03-facilitator@gmail.com',
//     'merchant_id': 'YQZCHTGHUK5P8'
//   },
//   'shipping': {
//     'name': {'full_name': 'Leo Tolstoy'},
//     'address': {'address_line_1': '1 Main St',
//     'admin_area_2': 'San Jose',
//     'admin_area_1': 'CA',
//     'postal_code': '95131',
//     'country_code': 'US'
//     }
//   },
//   'payments': {
//     'captures': [ CAPTURES ]
//   }
// }

interface PaypalCaptures {
  status: string;
  id: string;
  final_capture: boolean;
  create_time: string;
  update_time: string;
  amount: {
    value: string;
    currency_code: string;
  },
  seller_protection: {
    status: string;
    dispute_categories: string[];
  },
  links: Array<PaypalLinks>;
}

interface PaypalLinks {
  href: string;
  rel: string;
  method: string;
  title: string;
}

// {
//   'status': 'COMPLETED',
//   'id': '5201065220151980M',
//   'final_capture': True,
//   'create_time': '2019-06-08T05:58:54Z',
//   'update_time': '2019-06-08T05:58:54Z',
//   'amount': {'value': '0.01', 'currency_code': 'USD'},
//   'seller_protection': {
//     'status': 'ELIGIBLE',
//     'dispute_categories': ['ITEM_NOT_RECEIVED', 'UNAUTHORIZED_TRANSACTION']
//   },
//   'links': [
//     {
//       'href': 'https://api.sandbox.paypal.com/v2/payments/captures/5201065220151980M',
//       'rel': 'self',
//       'method': 'GET',
//       'title': 'GET'
//     },
//     {
//       'href': 'https://api.sandbox.paypal.com/v2/payments/captures/5201065220151980M/refund',
//       'rel': 'refund',
//       'method': 'POST',
//       'title': 'POST'
//     },
//     {
//       'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/6TP15053L3858374E',
//       'rel': 'up',
//       'method': 'GET',
//       'title': 'GET'
//     }
//   ]
// }