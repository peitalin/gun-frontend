

export const lgUpMediaQuery = '(min-width:1024px)';
// this is the breakpoint for deciding when to apply IPAD
export const col1MinWidth = 684;
export const col2MinWidth = 340;

// https://github.com/stripe/react-stripe-elements/issues/99
export const destroyStripeIFrame = () => {
  let r = document.getElementsByTagName("iframe");
  let i = 0;
  while (i < r.length) {
    if (r[i].name.startsWith("__privateStripeFrame")) {
      r[i].remove()
    }
    i += 1;
  }
  // this.state.prButton.destroy('#payment-request-button');
  // let d = document.getElementById('payment-request-button');
  // d.removeChild(d.firstChild)
}