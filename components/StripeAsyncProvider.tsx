
import * as React from 'react';
// Error
import ErrorBounds from 'components/ErrorBounds';
// Stripe
import { StripeProvider } from 'react-stripe-elements';
import { Elements as StripeElements } from 'react-stripe-elements';
import { StripeClient } from "typings/typings-stripe";

import getConfig from 'next/config'
const {
  publicRuntimeConfig: {
    STRIPE_PUBLIC_KEY
  }
} = getConfig()


// Waits for Stripe.js to load asynchronously before setting up StripeProvider
class StripeAsyncProvider extends React.Component<any, ReactState> {

  state = {
    stripe: null
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: (window.Stripe as any)(STRIPE_PUBLIC_KEY)
      })
    } else {
      /// #stripe-js: the <script> tag for Stripe.js
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: (window.Stripe as any)(STRIPE_PUBLIC_KEY)
        })
      });
    }
  }

  render() {
    if (process.browser) {
      return (
        <ErrorBounds className="async-provider">
          <StripeProvider stripe={this.state.stripe}>
            <StripeElements>
              {this.props.children}
            </StripeElements>
          </StripeProvider>
        </ErrorBounds>
      )
    } else {
      return (
        <ErrorBounds className="async-provider">
          {this.props.children}
        </ErrorBounds>
      )
    }
  }
}

interface ReactState {
  stripe: StripeClient | null;
}


export default StripeAsyncProvider;