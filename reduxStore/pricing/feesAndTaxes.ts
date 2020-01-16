import { PaymentProcessor } from "./imports";

// Calculates the total amount we need to charge customers to maintain
// a 20% margin, taking into account tax and payment processor fees.

interface FeesAndTaxes {
  total: number;
  taxes: number;
  paymentFee: number;
}

// NOTE: We could optionally only apply the fee if the subtotal is below a threshold here
// NOTE: Potentially if there are other applicable taxes these calculations can be
// more generic to take tax rate?
export const calculateFeesAndTaxes = (company: PaymentProcessor) => (
  subtotal: number,
  gstApplies: boolean
): FeesAndTaxes => {
  if (subtotal < 0) {
    throw Error("subtotal can't be negative");
  }

  if (subtotal === 0) {
    return {
      total: 0,
      taxes: 0,
      paymentFee: 0
    };
  }

  if (gstApplies) {
    // Calculate the total that would need to be charged
    let total = paymentProcessors[company].totalCharge(subtotal);
    // Separate the tax component and the payment fees
    let taxes = paymentProcessors[company].taxCharge(subtotal);
    return {
      total,
      taxes,
      paymentFee: total - taxes - subtotal
    };
  } else {
    // Calculate the total that would need to be charged
    // Separate the payment fee
    let total = paymentProcessors[company].totalCharge(subtotal);
    return {
      total,
      taxes: 0,
      paymentFee: total - subtotal
    };
  }
};

// These functions produces functions that calculate final charges and fees
// for different payment providers
const totalChargeFactory = (
  fixedPaymentFee: number,
  percentagePaymentFee: number
  // taxRate: number,
) => (subtotal: number) => {
  // (Y + 30) / (1 - f - 1/11)
  if (fixedPaymentFee < 0 || percentagePaymentFee < 0) {
    throw Error("fees can't be negative");
  }
  if (subtotal < 0) {
    throw Error("subtotal can't be negative");
  }
  if (!isInt(subtotal)) {
    throw Error("subtotal must be integer (cents)");
  }
  const numerator = subtotal + fixedPaymentFee;
  const divisor = 1.0 - percentagePaymentFee - 1 / 11;
  let totalCharge = Math.ceil(numerator / divisor);
  return totalCharge;
};
// TODO: derive a more general expression for any GST %
// The 1/11 comes from the fact that gst is 1/11 of the final price
// For a GST of 12%, the ratio would be 12/112... not so nice.
// You would need to derive these formulas with this change in mind.

const taxChargeFactory = (
  fixedPaymentFee: number,
  percentagePaymentFee: number
  // taxRate: number,
) => (subtotal: number) => {
  // (Y + 30) / (10 - 11f)
  if (fixedPaymentFee < 0 || percentagePaymentFee < 0) {
    throw Error("fees can't be negative");
  }
  if (subtotal < 0) {
    throw Error("subtotal can't be negative");
  }
  if (!isInt(subtotal)) {
    throw Error("subtotal must be integer (cents)");
  }
  const numerator = subtotal + fixedPaymentFee;
  const divisor = 10.0 - 11.0 * percentagePaymentFee;
  let taxes = Math.ceil(numerator / divisor);
  return taxes;
};

////////// Payment Provider Fees /////////
export const paymentProcessors = {
  // Stripe: 30c fixed cost, 2.9% per transaction
  Stripe: {
    totalCharge: totalChargeFactory(30, 0.029),
    taxCharge: taxChargeFactory(30, 0.029)
  },
  StripeDomestic: {
    totalCharge: totalChargeFactory(30, 0.0175),
    taxCharge: taxChargeFactory(30, 0.0175)
  },
  Paypal: {
    // Lookup pricing charts, different quotes depending on region
    totalCharge: totalChargeFactory(30, 0.029),
    taxCharge: taxChargeFactory(30, 0.029)
  }
};

function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
