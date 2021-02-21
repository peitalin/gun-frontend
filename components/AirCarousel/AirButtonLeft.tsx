import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";


const AirButtonLeft: React.FC<ReactProps> = (props) => {
  return (
    <div className={clsx("air-carousel-button-left", props.className)}
      style={{
        left: "-14px",
        position: "absolute",
        top: "50%",
        display: "block",
        transform: "translateY(-50%)",
        zIndex: 1501,
        ...props.style
      }}
      onMouseOver={props.onMouseOver}
    >
      <button type="button"
        id="air-carousel-button-left"
        className={clsx(
          props.classes.airCarouselButton,
          props.showButton ? 'fadeInFast' : 'hidden',
        )}
        onClick={props.onClick}
      >
        <span className="air-carousel-button-icon-container"
          style={{
            display: "inline-block",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-45%, -50%)",
            fontSize: "16px",
          }}
        >
          <svg
            viewBox="0 0 18 18"
            role="img"
            aria-label="Previous"
            focusable="false"
            style={{
              height: "10px",
              width: "10px",
              display: "block",
              // fill: "currentcolor"
              fill: Colors.uniswapLighterGrey,
            }}
          >
            <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
              fillRule="evenodd"
            />
          </svg>
        </span>
      </button>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  onClick?(...args: any): void;
  onMouseOver?(a: any): void;
  showButton?: boolean;
  style?: any;
  className?: any;
}

const styles = (theme: Theme) => createStyles({
  airCarouselButton: {
    width: "32px",
    height: "32px",
    display: "inline-block",
    cursor: "pointer",
    textAlign: "center",
    lineHeight: 1,
    position: "relative",
    touchAction: "manipulation",
    boxShadow: "rgba(0, 0, 0, 0.14) 0px 1px 1px 1px",
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    "&:active": {
      boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 0px 1px, rgba(255, 255, 255, 0.7) 0px 0px 0px 5px",
      outline: "none",
      transition: "box-shadow 0.2s ease 0s",
    },
    "&:focus": {
      outline: "none",
      border: "2px solid #e1e1e1",
      // border: `2px solid ${Colors.uniswapLighterGrey}`,
      borderRadius: "50%",
    }
  },
})

export default withStyles(styles)(AirButtonLeft);