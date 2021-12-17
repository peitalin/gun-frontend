import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import Link from "next/link";
import Button from '@material-ui/core/Button';
import ArrowStripeIcon from "components/ArrowStripeIcon";



const StripeArrowButton: React.FC<ReactProps> = (props) => {

  const {
    classes,
    href,
    title,
    isMobile = false
  } = props;
  // const theme = useTheme();

  return (
    <div className={clsx(
      classes.stripeArrowButtonRoot,
      props.className,
    )} style={props.style}>
      <Link href={href}>
        <a>
          <Button
            className={
              clsx(
                classes.buttonGoTo,
                isMobile ? classes.buttonHeightMobile : classes.buttonHeightDesktop,
                props.buttonClassName,
              )
            }
            style={props.buttonStyle}
            variant="text"
            color="primary"
            classes={{
              label: isMobile
                ? classes.buttonLabelMobile
                : classes.buttonLabelDesktop
            }}
          >
            <ArrowStripeIcon
              title={title ?? "Go Now"}
            />
          </Button>
        </a>
      </Link>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  href: string
  title?: string
  isMobile?: boolean
  className?: any
  buttonClassName?: any
  style?: any
  buttonStyle?: any;
}

export const styles = (theme: Theme) => createStyles({
  stripeArrowButtonRoot: {
    maxWidth: 180,
  },
  buttonGoTo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    color: Colors.cream,
    width: '100%',
    maxWidth: 200,
    padding: 0,
    // borderRadius: BorderRadius,
    // border: `0px solid ${Colors.charcoal}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      color: Colors.cream,
      // border: `1px solid ${Colors.secondaryBright}`,
      backgroundColor: Colors.secondaryBright,
      transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  buttonLabelMobile: {
    fontSize: '0.9rem',
  },
  buttonHeightMobile: {
    height: 40,
  },
  buttonHeightDesktop: {
    height: 44,
  },
  buttonLabelDesktop: {
    fontSize: '1rem',
    height: '100%',
  },
})


export default withStyles(styles)( StripeArrowButton );






