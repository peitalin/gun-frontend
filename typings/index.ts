
import {
  ProductVariantInput,
  ProductVariantEditInput,
  VariantsLabel,
  QuantityLabel,
} from "typings/gqlTypes";

type ID = any;
type Order = any;
type Edge = any;
type Connection = any;
type PageBasedConnectionEdge = any;
type PageBasedConnection = any;

type PaymentMethod = any;
type PayoutMethod = any;


export interface SendgridStatus {
  message: string;
}

export interface SendPasswordResetResponse {
  resetId: string;
  emailSentTo: string;
  status: {
    message: string;
  };
}

export interface StripeCustomerCreationResponse {
  status: string;
  response: StripeCustomerProfile;
  endpoint: string;
}

export interface StripeCustomerProfile {
  id: string;
  object: string;
  accountBalance?: number;
  address?: any;
  balance?: number;
  businessVatId?: string;
  created?: Date;
  currency?: string;
  defaultSource?: string;
  delinquent?: boolean;
  description?: string;
  email?: string;
  invoicePrefix?: string;
  invoiceSettings?: any;
  livemode?: boolean;
  metadata?: string;
  name?: string;
  phone?: string;
  preferredLocales?: string[];
  shipping?: any;
  sources?: any;
  taxExempt?: string;
  taxIds?: any;
  taxInfo?: any;
  taxInfoVerification?: any;
}

export type HtmlEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export interface SubtotalDisplay {
  subtotalCents: number;
  subtotalDisplay: string;
  subtotalPaypal: string;
}

export interface ConfirmOrderAfterFrontendPaymentResponse {
  data?: {
    confirmOrderAfterFrontendPayment: {
      order: Order;
    };
  };
}

export interface CheckoutProductsForFrontendPaymentResponse {
  data?: {
    checkoutProductsForFrontendPayment: {
      order: Order;
    };
  };
}

export interface CheckoutCartForFrontendPaymentResponse {
  data?: {
    checkoutCartForFrontendPayment: {
      order: Order;
    };
  };
}

export interface CheckoutProductsResponse {
  data?: {
    checkoutProducts: {
      order: Order;
    };
  };
}

export interface CheckoutCartResponse {
  data?: {
    checkoutCart: {
      order: Order;
    };
  };
}

export interface GenericEdge<T> extends Edge {
  node: T;
}

export interface GenericConnection<T> extends Connection {
  edges?: GenericEdge<T>[];
  pageInfo?: any;
}

export interface GenericPageBasedEdge<T> extends PageBasedConnectionEdge {
  node?: T;
}

export interface GenericPageBasedConnection<T> extends PageBasedConnection {
  // pageInfo: PageBasedConnectionPageInfo;
  edges?: GenericPageBasedEdge<T>[];
  // totalCount: number;
  totalAmount?: number;
}

export interface CreateStoreInput {
  userId: ID;
  storeId: ID;
  name: string;
  profileId: ID;
  coverId: ID | undefined;
  bio: string | undefined;
  website: string | undefined;
}

export interface EditStoreInput {
  userId: ID;
  storeId: ID;
  name: string | undefined;
  profileId: ID | undefined;
  coverId: ID | null | undefined;
  bio: string | null | undefined;
  website: string | null | undefined;
}

export enum PayoutType {
  PAYPAL = "PAYPAL",
  BANK = "BANK"
}

export interface EditUserProfileInput {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  // // emailVerified: boolean,
  // downloads?: ID[];
  // referredUsers?: ID[];
  subscribedNewsletters?: ID[];
  // wishlist?: Wishlist;
  // cart?: Cart;
  paymentMethods?: PaymentMethod[];
  defaultPaymentMethod?: PaymentMethod | null;
  // isSuspended?: boolean;
  // store?: Store | null;
  payoutMethod?: PayoutMethod | null;
}

export interface ProductCreateEditCommonInput {
  categoryId: string;
  tags: string[] | string;
  title: string;
  description: string;
  condition: string;
  make: string;
  model: string;
  ammoType?: string;
  actionType: string;
  boreDiameter?: string;
  serialNumber: string;
  location: string;
  dealer: string;
  isPublished: boolean;
  variantsLabel?: VariantsLabel;
  isQuantityEnabled: boolean;
  quantityLabel?: QuantityLabel;
  productId?: ID;
  currentVariants: ProductVariantInput[] | ProductVariantEditInput[];
}

export interface ProductCreateInputFrontEnd extends ProductCreateEditCommonInput {
  currentVariants: ProductVariantInput[];
};


export interface ProductEditInputFrontEnd extends ProductCreateEditCommonInput  {
  currentVariants: ProductVariantEditInput[];
};
