import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors, isThemeDark, BorderRadius3x } from "layout/AppTheme";
// Router
import Link from "next/link";
// Material UI
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LaunchIcon from '@material-ui/icons/Launch';



const AdType = (props: ReactProps) => {

  const {
    classes,
    productId,
		adType,
		sourceSiteUrl,
  } = props;

  const theme = useTheme();

  if (!adType || !sourceSiteUrl) {
    return <div className={classes.sourceSiteLink}></div>
  }

  return productId
    ? <Link
        href={
          props.promotedSlotId ? "/f/[productId]" : "/p/[productId]"
        }
        as={
          props.promotedSlotId ? `/f/${productId}` : `/p/${productId}`
        }
      >
        <a className={clsx(classes.sourceSiteLink, props.className)}
          target={"_blank"}
          style={props.style}
        >
          <div className={clsx(
            classes.adType,
            adType.match(/[pP]rivate/g)
              ? classes.adTypePrivate
              : classes.adTypeDealer
          )}>
            {adType ?? ""}
            <LaunchIcon className={classes.sourceSiteUrlIcon}/>
          </div>
        </a>
      </Link>
    : <Link href={sourceSiteUrl ?? ""}>
        <a className={clsx(classes.sourceSiteLink, props.className)}
          target={"_blank"}
          style={props.style}
        >
          <div className={clsx(
            classes.adType,
            adType?.match(/[pP]rivate/g)
              ? classes.adTypePrivate
              : classes.adTypeDealer
          )}>
            {adType ?? ""}
            <LaunchIcon className={classes.sourceSiteUrlIcon}/>
          </div>
        </a>
      </Link>
}


interface ReactProps extends WithStyles<typeof styles> {
  productId: string
  adType: string
  sourceSiteUrl: string
  promotedSlotId?: string
  className?: any;
  style?: any;
}


const styles = (theme: Theme) => createStyles({
  sourceSiteLink: {
    marginTop: '0.5rem',
    marginRight: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceSiteUrlIcon: {
    fontWeight: 600,
    marginLeft: "0.25rem",
  },
  sourceSite: {
    fontWeight: 800,
    fontSize: '0.8rem',
    "&:hover": {
      color: Colors.blue,
    },
  },
  adType: {
    padding: "0.25rem 0.75rem",
    width: '100%',
    color: Colors.black,
    "& > a > svg": {
      fill: Colors.black,
    },
    "&:hover > a > svg": {
      fill: Colors.ultramarineBlue,
    },
    "&:hover": {
      color: Colors.ultramarineBlue,
    },
    transition:  theme.transitions.create(['color', 'fill'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 200,
    }),
    cursor: "pointer",
    fontSize: "0.9rem",
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
  },
  adTypePrivate: {
    // background: Colors.yellow,
    background: Colors.lightBlue,
    minWidth: 115,
  },
  adTypeDealer: {
    // background: Colors.orange,
    background: Colors.purple,
    minWidth: 115,
  },
});



export default withStyles(styles)(AdType)