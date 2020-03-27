import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import getConfig from 'next/config'
const {
  publicRuntimeConfig: {
    STRIPE_PUBLIC_KEY
  }
} = getConfig()

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const StripeProvider: React.FC<any> = (props) => (
  <Elements stripe={stripePromise}>
    {props.children}
  </Elements>
);

export default StripeProvider;