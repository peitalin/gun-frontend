import React from "react";
import clsx from "clsx";
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius, Colors, isThemeDark, BorderRadius3x } from "layout/AppTheme";
// Router
import Link from "next/link";
// Material UI
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const PromotedBadge = (props: ReactProps) => {

  const {
    classes,
  } = props;

  const theme = useTheme();

  return (
    <Link href={"/promotions"}>
      <a className={clsx(classes.sourceSiteLink, props.className)}
        target={"_blank"}
        style={props.style}
      >
        <div className={clsx(classes.adType)}>
          Promoted
        </div>
      </a>
    </Link>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
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
    minHeight: 28,
    width: '100%',
    color: Colors.cream,
    "& > a > svg": {
      fill: Colors.cream,
    },
    "&:hover > a > svg": {
      fill: Colors.black,
    },
    "&:hover": {
      color: Colors.black,
    },
    transition:  theme.transitions.create(['color', 'fill'], {
      easing: theme.transitions.easing.easeInOut,
      duration: 200,
    }),
    cursor: "pointer",
    fontSize: "0.825rem",
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    // background: Colors.lightBlue,
    background: Colors.magenta,
  },
});



export default withStyles(styles)(PromotedBadge)