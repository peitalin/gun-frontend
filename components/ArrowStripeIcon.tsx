import React from 'react';
// styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, Colors, isThemeDark } from "layout/AppTheme";



const ArrowStripeIcon: React.FC<ReactProps> = (props) => {
  const { classes } = props;
	return (
    <div className={clsx(classes.stripeArrow, props.className)}
      style={{ color: props.color }}
    >
      {
        props.title ? props.title : null
      }
      <svg className="HoverArrow"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden="true"
        style={{ stroke: props.color }}
      >
        <g fillRule="evenodd">
          <path className="HoverArrow__linePath"
            d="M0 5h7"
          />
          <path className="HoverArrow__tipPath"
            d="M1 1l4 4-4 4"
          />
        </g>
      </svg>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: any;
  className?: any;
  color?: string;
}

const duration = '100ms';

const styles = (theme: Theme) => createStyles({
  stripeArrow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    transition: theme.transitions.create('transform', {
      easing: "cubic-bezier(0.215,0.61,0.355,1)",
      duration: duration,
    }),
    "& > .HoverArrow": {
      position: 'relative',
      marginTop: '0.1rem',
      marginLeft: '8px',
      strokeWidth: 2,
      fill: 'none',
      stroke: 'currentColor',
    },
    "& > .HoverArrow .HoverArrow__linePath": {
      opacity: 0,
      transition: theme.transitions.create('opacity', {
        easing: "cubic-bezier(0.215,0.61,0.355,1)",
        duration: duration,
      }),
    },
    "&:hover > .HoverArrow .HoverArrow__linePath": {
      opacity: 1,
      transition: theme.transitions.create('opacity', {
        // easing: theme.transitions.easing.sharp,
        easing: "cubic-bezier(0.215,0.61,0.355,1)",
        duration: duration,
      }),
    },
    "&:hover > .HoverArrow .HoverArrow__tipPath": {
      transform: "translateX(3px)",
      transition: theme.transitions.create('transform', {
        easing: "cubic-bezier(0.215,0.61,0.355,1)",
        duration: duration,
      }),
    },
  },
})

export default withStyles(styles)(ArrowStripeIcon)