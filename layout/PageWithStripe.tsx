import React from 'react';
import StripeProvider from "layout/StripeProvider";

const PageWithStripe: React.FC<ReactProps> = (props) => {
  return (
    <StripeProvider>
      {props.children}
    </StripeProvider>
  )
};

interface ReactProps {
}

export default PageWithStripe


