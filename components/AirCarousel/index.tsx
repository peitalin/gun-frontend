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



const AirCarousel: React.FC<ReactProps> = (props) => {

  const [cursor, setCursor] = React.useState(0);
  const [showLeftButton, setShowLeftButton] = React.useState(false);
  const [showRightButton, setShowRightButton] = React.useState(false);
  // dom elements
  const [airCarousel, setAirCarousel] = React.useState(undefined);

  const {
    disableButtons = false,
    disableSmartButtons = false,
    showPositionIndicator = false,
    totalNumberOfItems = 0,
    leftDither = false,
    rightDither = false,
    scrollItemsPerClick = 4,
  } = props;


  React.useEffect(() => {
    if (process.browser) {
      // console.log('setting new scroll id', props.id)
      let el = document.querySelector(`#${props.id}`)
      setAirCarousel(el)
    }
  }, [props.id])

  const airItems = process.browser
    ? document.querySelectorAll('.air-carousel>li')
    : [];

  // number of airItems above 3, multiple by width of each item
  const maxCursor = (airItems.length - 3) * option(airItems)[0].clientWidth(0);

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
          "fadeInFast",
        )}
        style={{
          position: "relative",
          zIndex: 0,
          width: "100%",
        }}
      >
        {
          !disableButtons &&
          (React.Children.count(props.children) > 0) &&
          <>
            <AirButtonLeft
              onClick={() => {
                let newCursor = (cursor - option(airItems)[0].clientWidth(0) * scrollItemsPerClick);
                smScroll((newCursor < 0) ? 0 : newCursor)
                setCursor((newCursor <= 0) ? 0 : newCursor)
                setShowLeftButton((newCursor <= 0) ? false : true)
                setShowRightButton((newCursor >= maxCursor) ? false : true)
                if(props.handleClickLeft) {
                  props.handleClickLeft()
                }
              }}
              carouselCursor={cursor}
              showButton={showLeftButton || disableSmartButtons}
            />
            <AirButtonRight
              onClick={() => {
                let newCursor = (cursor + option(airItems)[0].clientWidth(0)) * scrollItemsPerClick;
                smScroll((newCursor > maxCursor) ? maxCursor : newCursor)
                setCursor((newCursor > maxCursor) ? maxCursor : newCursor)
                setShowLeftButton((newCursor <= 0) ? false : true)
                setShowRightButton((newCursor >= maxCursor) ? false : true)
                if(props.handleClickRight) {
                  props.handleClickRight()
                }
              }}
              carouselCursor={cursor}
              showButton={showRightButton || disableSmartButtons}
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
          style={{ overflow: "hidden" }}
        >
          {
            leftDither &&
            <AirLeftDither/>
          }
          <ul id={props.id} className="air-carousel" style={{
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
  scrollSnapType?: string;
  handleClickLeft?(): void;
  handleClickRight?(): void;
  rightDither?: boolean;
  leftDither?: boolean;
  scrollItemsPerClick?: number;
}

// export default React.memo(
//   (props: React.PropsWithChildren<ReactProps>) => <AirCarousel {...props}/>,
// );

export default AirCarousel;


