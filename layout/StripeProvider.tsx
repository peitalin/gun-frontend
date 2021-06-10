import React from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';

// loadStripe.setLoadParameters({advancedFraudSignals: false})
// // https://mtlynch.io/stripe-recording-its-customers/


console.log(`STRIPE_PUBLIC_KEY: ${process.env.STRIPE_PUBLIC_KEY?.slice(0, 15)}...`)
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const StripeProvider: React.FC<any> = (props) => (
  <Elements stripe={stripePromise}>
    {props.children}
  </Elements>
);

export default StripeProvider;