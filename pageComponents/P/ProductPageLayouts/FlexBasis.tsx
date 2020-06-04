import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import Hidden, { HiddenProps } from "components/HiddenFix";


const flexBasisStyles = (theme: Theme) => createStyles({
  flexBasis66: {
    width: '100%',
    flexGrow: 1,
    flexBasis: '66.66%',

    // outlineOffset: '-2px',
    // outline: '2px dashed #A48',
  },
  flexBasis33: {
    width: '100%',
    flexGrow: 1,
    flexBasis: '33.33%',
    position: 'relative',

    // outlineOffset: '-2px',
    // outline: '2px dashed #A48',
  },
})

interface FlexBasisProps extends WithStyles<typeof flexBasisStyles> {
  className?: any;
  children?: React.ReactElement;
  hidden?: boolean;
  hiddenClassName?: any;
}

const isHiddenComponent = (props: HiddenProps & FlexBasisProps) => {
  return props.hidden ||
    !!props.only ||
    !!props.implementation ||
    !!props.xsDown ||
    !!props.xsUp ||
    !!props.smDown ||
    !!props.smUp ||
    !!props.mdDown ||
    !!props.mdUp ||
    !!props.lgDown ||
    !!props.lgUp ||
    !!props.xlDown ||
    !!props.xlUp ||
    !!props.initialWidth
}

export const FlexBasis66 = withStyles(flexBasisStyles)(
  (props: FlexBasisProps & HiddenProps) => {

    if (isHiddenComponent(props)) {
      return (
        <Hidden className={clsx(
            props.classes.flexBasis66,
            props.className
          )}
          only={props.only}
          implementation={props.implementation}
          xsDown={props.xsDown}
          xsUp={props.xsUp}
          smDown={props.xsDown}
          smUp={props.xsUp}
          mdDown={props.xsDown}
          mdUp={props.xsUp}
          lgDown={props.xsDown}
          lgUp={props.xsUp}
          xlDown={props.xsDown}
          xlUp={props.xsUp}
          // initialWidth={props.initialWidth}
        >
          {props.children}
        </Hidden>
      )
    } else {
      return (
        <div className={clsx(
          props.classes.flexBasis66,
          props.className
        )}>
          {props.children}
        </div>
      )
    }
  }
)

export const FlexBasis33 = withStyles(flexBasisStyles)(
  (props: FlexBasisProps & HiddenProps) => {

    if (isHiddenComponent(props)) {
      return (
        <Hidden className={clsx(
            props.classes.flexBasis66,
            props.className
          )}
          only={props.only}
          implementation={props.implementation}
          xsDown={props.xsDown}
          xsUp={props.xsUp}
          smDown={props.xsDown}
          smUp={props.xsUp}
          mdDown={props.xsDown}
          mdUp={props.xsUp}
          lgDown={props.xsDown}
          lgUp={props.xsUp}
          xlDown={props.xsDown}
          xlUp={props.xsUp}
          initialWidth={props.initialWidth}
        >
          {props.children}
        </Hidden>
      )
    } else {
      return (
        <div className={clsx(
          props.classes.flexBasis33,
          props.className
        )}>
          {props.children}
        </div>
      )
    }
  }
)
