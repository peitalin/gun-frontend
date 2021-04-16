import React from "react";
import { useState, useEffect, useRef } from 'react';
// lodash
const throttle = require('lodash.throttle');
import { useTheme } from '@material-ui/core/styles';
import smoothscroll from 'smoothscroll-polyfill'



export const useForcedSmoothScroll = () => {

  React.useEffect(() => {
    // smoothscrool polyfill
    if (typeof window !== 'undefined') {
      // console.log("smoothscroll.polyfill()")
      window.__forceSmoothScrollPolyfill__ = true;
      smoothscroll.polyfill()
    }

    // remove force smoothscroll on unmount
    () => {
      window.__forceSmoothScrollPolyfill__ = false;
    }
  }, [])

}


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

////////////////////
//// RESPONSIVE CAROUSEL HOOKS
////////////////////

const windowDeterminedCount = (cardWidth?: number, maxWidth?: number) => {
  let carouselNumItems = 4;
  if (window.innerWidth) {
    carouselNumItems = Math.min(window.innerWidth, maxWidth) / cardWidth;
  }
  return carouselNumItems
}

export const useCalcNumItemsFromWindowWidth = (
  initialNumberOfItems: number,
  maxWidth: number,
) => {

  let [count, setCount] = React.useState(
    initialNumberOfItems || 4
    // initial values
  );

  const theme = useTheme();

  React.useEffect(() => {
    setTimeout(() => {
      setCount(windowDeterminedCount(240, maxWidth))
    }, 0)
    // on componentDidMount, set count to trigger window determined count
    // otherwise initial size with be determined by initialNumberOfItems
  }, [])

  React.useEffect(() => {
    const updateCount = () => {
      // keep to breakpoints defined in /layout/AppTheme
      // lg: 840px: theme.breakpoints.values.lg
      // md: 640px: theme.breakpoints.values.md
      // sm: 440px: theme.breakpoints.values.sm
      setCount(windowDeterminedCount(240, maxWidth))
      // if (window.innerWidth > theme.breakpoints.values.xl) {
      //   setCount(4);
      // } else if (window.innerWidth > theme.breakpoints.values.lg) {
      //   setCount(3);
      // } else if (window.innerWidth > theme.breakpoints.values.md) {
      //   setCount(2);
      // } else if (window.innerWidth > theme.breakpoints.values.sm) {
      //   setCount(1.5);
      // } else {
      //   setCount(1);
      // }
    }
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount)
  }, [window.innerWidth])

  return count
}


export const useCardWidthHeightHook = (
  MAX_WIDTH_CAROUSEL: number,
  NUMBER_OF_ITEMS?: number,
) => {

  const getCardWidthHeight = (numberOfItems: number) => {
    let carouselWidth;
    if (process.browser) {
      carouselWidth = Math.min(
        MAX_WIDTH_CAROUSEL,
        window.innerWidth - 32
      )
    } else {
      carouselWidth = MAX_WIDTH_CAROUSEL
    }
    let cardWidth = (carouselWidth / numberOfItems) - 8;
    let cardHeight = cardWidth * 1.25 - 2;
    // 2px border, 1.25 aspect ratio multiplier
    return  { cardWidth, cardHeight }
  }

  const updateCardDim = () => {
    let carouselNumItems = windowDeterminedCount(240, MAX_WIDTH_CAROUSEL)
    const { cardWidth, cardHeight } = getCardWidthHeight(carouselNumItems)
    setCardDim({
      cardWidth: cardWidth,
      cardHeight: cardHeight,
    });
  }

  const [cardDim, setCardDim] = React.useState({
    cardWidth: 0,
    cardHeight: 0,
  })

  React.useEffect(() => {
    setTimeout(() => {
      updateCardDim()
    }, 0)
    // on componentDidMount, trigger udpateCardDim once
    // needed when mounting carousels dynamically, to get correct card sizes
    // otherwise you will need another "resize" event to trigger
    // updateCardDim() to get the correct card size
  }, [])

  React.useEffect(() => {
    window.addEventListener("resize", updateCardDim);
    return () => window.removeEventListener("resize", updateCardDim)
  }, [window.innerWidth, window.innerHeight])

  return cardDim
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