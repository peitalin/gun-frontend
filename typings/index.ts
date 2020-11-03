
import {
  ProductVariantInput,
  ProductVariantEditInput,
} from "typings/gqlTypes";

type ID = any;
type Edge = any;
type Connection = any;
type PageBasedConnectionEdge = any;
type PageBasedConnection = any;

type PaymentMethod = any;
type PayoutMethod = any;


export interface SendPasswordResetResponse {
  resetId: string;
  emailSentTo: string;
  status: {
    message: string;
  };
}


export type HtmlEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export interface SubtotalDisplay {
  subtotalCents: number;
  subtotalDisplay: string;
  subtotalPaypal: string;
}

export interface GenericEdge<T> extends Edge {
  node: T;
}

export interface GenericConnection<T> extends Connection {
  edges?: GenericEdge<T>[];
  pageInfo?: any;
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
  caliber?: string;
  serialNumber: string;
  location: string;
  dealerId?: string;
  dealer?: {
    licenseNumber?: string;
    name?: string;
    postCode?: string;
    address?: string;
    state?: string;
    city?: string;
  };
  isPublished: boolean;
  productId?: ID;
  currentVariants: ProductVariantInput[] | ProductVariantEditInput[];
}

export interface ProductCreateInputFrontEnd extends ProductCreateEditCommonInput {
  currentVariants: ProductVariantInput[];
};


export interface ProductEditInputFrontEnd extends ProductCreateEditCommonInput  {
  currentVariants: ProductVariantEditInput[];
};


export enum ActionType {
  BOLT = "Bolt",
  BREAK = "Break",
  LEVER = "Lever",
  PUMP = "Pump",
  REVOLVING = "Revolving",
  SEMI_AUTOMATIC = "Semi Automatic",
  SINGLE_SHOT = "Single Shot",
  SPRING = "Spring",
  STRAIGHT_PULL = "Straight Pull",
  CO2 = "CO2",
  FLINTLINK = "Flintlock",
  GAS_RAM = "Gas Ram",
  INLINE = "Inline",
  PERCUSSION_CAP = "Percussion Cap",
  PCP = "PCP",
  DOUBLE = "Double",
  OTHER = "Other"
}

export const ActionTypes = [
  ActionType.BOLT,
  ActionType.BREAK,
  ActionType.LEVER,
  ActionType.PUMP,
  ActionType.REVOLVING,
  ActionType.SEMI_AUTOMATIC,
  ActionType.SINGLE_SHOT,
  ActionType.STRAIGHT_PULL,
  ActionType.CO2,
  ActionType.FLINTLINK,
  ActionType.GAS_RAM,
  ActionType.INLINE,
  ActionType.PERCUSSION_CAP,
  ActionType.PCP,
  ActionType.DOUBLE,
  ActionType.OTHER,
]


export enum Condition {
  PERFECT = "Perfect",
  EXCELLENT = "Excellent",
  GOOD = "Good",
  FAIR = "Fair",
  POOR = "Poor",
}

export const getConditionDescription = (c: Condition) => {
  switch (c) {
    case Condition.PERFECT: {
      return ConditionDescriptions.PERFECT
    }
    case Condition.EXCELLENT: {
      return ConditionDescriptions.EXCELLENT
    }
    case Condition.GOOD: {
      return ConditionDescriptions.GOOD
    }
    case Condition.FAIR: {
      return ConditionDescriptions.FAIR
    }
    case Condition.POOR: {
      return ConditionDescriptions.POOR
    }
  }
}

export enum ConditionDescriptions {
  PERFECT = "New condition",
  // Perfect - New condition.
  EXCELLENT = "New condition, little use, no noticeable marring",
  // Excellent - New condition, little use, no noticeable marring.
  GOOD = "Perfect working condition, no appreciable wearing on working surfaces, no corrosion or pitting, only minor surface dents or scratches",
  // Good - Perfect working condition, no appreciable wearing on working surfaces, no corrosion or pitting, only minor surface dents or scratches.
  FAIR = "Safe working condition, minor wear on surface, no broken parts, no corrosion or pitting that will interfere with functioning",
  // Fair - Safe working condition, minor wear on surface, no broken parts, no corrosion or pitting that will interfere with functioning.
  POOR = "Safe working condition but well worn, perhaps requiring replacement of minor parts or adjustments",
  // Poor - Safe working condition but well worn, perhaps requiring replacement of minor parts or adjustments.
}


export const Conditions = [
  Condition.PERFECT,
  Condition.EXCELLENT,
  Condition.GOOD,
  Condition.FAIR,
  Condition.POOR,
]