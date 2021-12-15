import React from "react"
import Hidden from "components/HiddenFix";


const ShowOnMobileOrDesktopSSR: React.FC<ReactProps> = (props) => {

  const {
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
        className={props.className}
        xlUp
        implementation={props.implementation ?? "css"}
      >
        {props.children}
      </Hidden>
    )
  } else if (mobile) {
    return (
      <Hidden
        className={props.className}
        xlUp
        implementation={props.implementation ?? "css"}
      >
        {props.children}
      </Hidden>
    )
  } else if (desktop) {
    return (
      <Hidden
        className={props.className}
        xlDown
        implementation={props.implementation ?? "css"}
      >
        {props.children}
      </Hidden>
    );
  } else {
    // is nothing supplied default to desktop
    return (
      <Hidden
        className={props.className}
        xlDown
        implementation={props.implementation ?? "css"}
      >
        {props.children}
      </Hidden>
    );
  }
}

interface ReactProps {
  mobile?: boolean
  desktop?: boolean
  implementation?: "css"|"js"
  className?: any;
}



export default ShowOnMobileOrDesktopSSR