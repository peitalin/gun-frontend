import React from "react";
import { useState, useEffect, useRef } from 'react';
// lodash
const throttle = require('lodash.throttle');




export const useWindowWidth = () => {

  let [windowWidth, setWindowWidth] = React.useState(
    (process.browser && window)
      ? window.innerWidth
      : 1080
  );

  React.useEffect(() => {
    const updateWindowWidth = () => {
      if (process.browser && window) {
        setWindowWidth(window.innerWidth);
      }
    }
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth)
  })

  return windowWidth
}


export const useFocus = (ref, defaultState = false) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const onFocus = () => setState(true);
    const onBlur = () => setState(false);
    if (ref?.current?.addEventListener) {
      ref.current.addEventListener("focus", onFocus);
      ref.current.addEventListener("blur", onBlur);
    }

    return () => {
      if (ref?.current?.addEventListener) {
        ref.current.removeEventListener("focus", onFocus);
        ref.current.removeEventListener("blur", onBlur);
      }
    };
  });

  return state;
};


export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = (): void => {
      savedCallback.current();
    };
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};


export const useScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

// export const useScrollToTop = ({ history }: RouteComponentProps) => {
//   React.useEffect(() => {
//     const unlisten = history.listen(() => {
//       window.scrollTo(0, 0);
//     });
//     return () => unlisten();
//   }, []);
//   return null;
// }


export const useScrollYPosition = () => {

  let [scrollYPosition, setScrollYPosition] = React.useState(
    process.browser ? window.scrollY: null
  );

  React.useEffect(() => {
    const updateScrollY = throttle(() => {
      setScrollYPosition(window.scrollY);
    }, 16)
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY)
  }, [
    process.browser ? window.scrollY : undefined
  ])

  return scrollYPosition
}


export const useScrollXPosition = (
  el: HTMLElement,
  id: string,
) => {
  // id: resets scroll if id changes

  let [scrollLeft, setScrollLeft] = React.useState(el?.scrollLeft ?? 0);

  const { scrollWidth, clientWidth } = el
    ? el
    : { scrollWidth: 0, clientWidth: 0 }


  const updateScrollLeft = () => {
    setScrollLeft(el?.scrollLeft ?? 0);
  }

  const resetScrollLeft = () => {
    setScrollLeft(0);
  }

  React.useEffect(() => {
    if (el) {
      el.addEventListener("scroll", updateScrollLeft);
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", updateScrollLeft)
      }
    }
  }, [el?.scrollLeft, id])

  // initial update, or reset scroll left when element changes
  React.useEffect(() => {
    resetScrollLeft()
  }, [id])

  return {
    // how far left element has scrolled
    scrollLeft,
    // how wide the scrolled element is in total (e.g. 1000px)
    scrollWidth,
    // how wide viewable element is (e.g. 200px)
    clientWidth,
  }
}



export const useDetectPaymentPlatform = () => {

  let [paymentPlatform, setPaymentPlatform] = React.useState("");

  const detectPaymentPlatform = () => {
    if (/[iI]phone/.test(window.navigator.userAgent)) {
      return "Stripe Apple Pay"
    }
    if (/[aA]ndroid/.test(window.navigator.userAgent)) {
      return "Stripe Google Pay"
    }
    return "Stripe"
  }

  React.useEffect(() => {
    setPaymentPlatform(detectPaymentPlatform())
  })

  return paymentPlatform
}