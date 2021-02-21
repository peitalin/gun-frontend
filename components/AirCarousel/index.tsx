import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// utils
import { smoothScroll } from "./carouselUtils";
// components
import ErrorBounds from "components/ErrorBounds";
import AirButtonLeft from "./AirButtonLeft";
import AirButtonRight from "./AirButtonRight";
import PositionIndicator from "./PositionIndicator";
import { useScrollXPosition } from "utils/hooks";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const AirCarousel: React.FC<ReactProps> = (props) => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"))

  const {
    disableButtons = false,
    disableSmartButtons = false,
    showPositionIndicator = false,
    totalNumberOfItems = 0,
    leftDither = false,
    rightDither = false,
    scrollItemsPerClick = 4,
    onlyShowButtonsOnMouseOver = true,
  } = props;

  const [cursor, setCursor] = React.useState(0);
  const [showLeftButton, setShowLeftButton] = React.useState(false);
  const [showRightButton, setShowRightButton] = React.useState(false);
  // dom elements
  const [airCarousel, setAirCarousel] = React.useState(undefined);
  const [showButtons, setShowButtons] = React.useState(!onlyShowButtonsOnMouseOver);

  React.useEffect(() => {
    if (process.browser) {
      // console.log('setting new scroll id', props.id)
      let el = document.querySelector(`#${props.id}`)
      setAirCarousel(el)
    }
  }, [props.id])

  const airItems = process.browser
    ? document.querySelectorAll(`.${props.id} > li`)
    : [];

  // number of airItems above 3, multiply by width of each item
  // const maxCursor = (airItems.length - 3) * option(airItems)[0].clientWidth(0);
  let cardWidth = option(airItems)[0].clientWidth(0);
  const maxCursor = (airItems.length - 1) * cardWidth;

  React.useEffect(() => {
    setShowRightButton(true)
  }, [])


  const smScroll = smoothScroll(airCarousel);
  let {
    scrollLeft,
    scrollWidth,
    clientWidth,
  } = useScrollXPosition(airCarousel, props.id);

  const selectedDot = Math.round(scrollLeft / clientWidth);


  return (
    <ErrorBounds fragment>
      <div
        className={clsx(
          "air-carousel-outer",
          // "fadeInFast",
        )}
        // disable on mobile, otheriwse need to double tap for link navigation
        onMouseOver={() => {
          if (onlyShowButtonsOnMouseOver) {
            setShowButtons(true)
          }
        }}
        onMouseLeave={() => {
          if (onlyShowButtonsOnMouseOver) {
            setShowButtons(false)
          }
        }}
        style={{
          position: "relative",
          zIndex: 0,
          width: "100%",
          overflow: 'hidden', // tuck buttons inside frame
          ...props.style,
        }}
      >
        {
          !disableButtons &&
          (React.Children.count(props.children) > 1) &&
          <>
            <AirButtonLeft
              className={showButtons ? "fadeInFast" : "hidden"}
              onClick={() => {
                console.log('clicked left button')
                let newCursor = (cursor - option(airItems)[0].clientWidth(0) * scrollItemsPerClick);
                // smScroll((newCursor < 0) ? 0 : newCursor)
                smScroll(0)
                setCursor((newCursor <= 0) ? 0 : newCursor)

                setShowLeftButton((newCursor <= 0) ? false : true)
                setShowRightButton((newCursor >= maxCursor) ? false : true)
                if (props.handleClickLeft) {
                  props.handleClickLeft()
                }
              }}
              // showButton={showLeftButton || disableSmartButtons}
              showButton={true}
              onMouseOver={props.onMouseOver}
              style={props.buttonLeftStyle}
            />
            <AirButtonRight
              className={showButtons ? "fadeInFast" : "hidden"}
              onClick={() => {
                let newCursor = (cursor + option(airItems)[0].clientWidth(0)) * scrollItemsPerClick;
                // console.log("newCursor: ", airItems[0])
                // console.log("airItems: ", newCursor)
                smScroll((newCursor > maxCursor) ? maxCursor : newCursor)
                setCursor((newCursor > maxCursor) ? maxCursor : newCursor)

                setShowLeftButton((newCursor <= 0) ? false : true)
                setShowRightButton((newCursor >= maxCursor) ? false : true)
                if (props.handleClickRight) {
                  props.handleClickRight()
                }
              }}
              // showButton={showRightButton || disableSmartButtons}
              showButton={true}
              onMouseOver={props.onMouseOver}
              style={props.buttonRightStyle}
            />
          </>
        }
        {
          showPositionIndicator &&
          (totalNumberOfItems > 0) &&
          <PositionIndicator
            numberOfItems={totalNumberOfItems}
            selectedDot={selectedDot}
          />
        }
        <div className="air-carousel-inner"
          style={{
            overflow: "hidden",
            ...props.innerCarouselStyle,
          }}
        >
          {
            leftDither &&
            <AirLeftDither/>
          }
          <ul id={props.id} className={`${props.id}`} style={{
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            marginTop: 0,
            paddingLeft: 0,
            display: 'flex',
            overflowX: 'auto',
            minWidth: '100%',
            scrollSnapType: props.scrollSnapType || 'x mandatory',
            listStyle: 'none',
            scrollbarWidth: 'none' // remove scrollbars on firefox
          }}>
            {props.children}
          </ul>
          {
            rightDither &&
            <AirRightDither/>
          }
        </div>
      </div>
    </ErrorBounds>
  )
}

const AirRightDither = (props) => {
  return (
    <div className={clsx("air-right-dither", "fadeIn")} style={{
      backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255, 1) 90%)",
      position: "absolute",
      height: "100%",
      width: "15%",
      right: "0px",
      bottom: "0px",
      zIndex: 1501,
      pointerEvents: "none",
      ...props.styles
    }}/>
  )
}

const AirLeftDither = (props) => {
  return (
    <div className={clsx("air-left-dither", "fadeIn")} style={{
      backgroundImage: "linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255, 1) 90%)",
      position: "absolute",
      height: "100%",
      width: "15%",
      left: "0px",
      bottom: "0px",
      zIndex: 1501,
      pointerEvents: "none",
      ...props.styles
    }}/>
  )
}


interface ReactProps {
  id: string; // ul id to identity which carousel
  disableButtons?: boolean;
  disableSmartButtons?: boolean;
  showPositionIndicator?: boolean;
  totalNumberOfItems?: number;
  scrollSnapType?:
    "x mandatory" | "y mandator" | "both mandatory" | "none" |
    "x proximity" | "y proximity" | "both proximity";
  // https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
    // "x mandatory" |
    // "y mandatory" |
    // "both mandatory" |
    // "x proximity" |
    // "y proximity" |
    // "both proximity" |
  handleClickLeft?(): void;
  handleClickRight?(): void;
  rightDither?: boolean;
  leftDither?: boolean;
  scrollItemsPerClick?: number;
  onMouseOver?(a: any): void;
  buttonLeftStyle?: any;
  buttonRightStyle?: any;
  style?: any;
  innerCarouselStyle?: any;
  onlyShowButtonsOnMouseOver?: boolean;
}

// export default React.memo(
//   (props: React.PropsWithChildren<ReactProps>) => <AirCarousel {...props}/>,
// );

export default AirCarousel;


