import React from "react"
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import Hidden from "components/HiddenFix";

const ShowOnMobileOrDesktopSSR: React.FC<ReactProps> = (props) => {

  const {
    classes,
    className,
    mobile,
    desktop,
  } = props;

  React.useEffect(() => {
    if (mobile && desktop) {
      console.warn("Don't use both <mobile> and <desktop> props")
    }
    if (!mobile && !desktop) {
      console.warn("Need at least one of <mobile> and <desktop> props")
    }
  })

  if (mobile && desktop) {
    // misued, don't supply both args
    // default to mobile
    return (
      <Hidden
        className={clsx(classes.width100, props.className)}
        lgUp
        implementation="css"
      >
        {props.children}
      </Hidden>
    )
  } else if (mobile) {
    return (
      <Hidden
        className={clsx(classes.width100, props.className)}
        lgUp
        implementation="css"
      >
        {props.children}
      </Hidden>
    )
  } else if (desktop) {
    return (
      <Hidden
        className={clsx(classes.width100, props.className)}
        mdDown
        implementation="css"
      >
        {props.children}
      </Hidden>
    )
  } else {
    // is nothing supplied default to desktop
    return (
      <Hidden
        className={clsx(classes.width100, props.className)}
        mdDown
        implementation="css"
      >
        {props.children}
      </Hidden>
    )
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  mobile?: boolean
  desktop?: boolean
  className?: any;
}

const styles = (theme: Theme) => createStyles({
  width100: { width: '100%' },
});


export default withStyles(styles)( ShowOnMobileOrDesktopSSR );