import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Utils
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import Typography from "@material-ui/core/Typography";
// Components
import Divider from "components/Divider";
// Router
import { useRouter } from "next/router";

// Recommendations
import YouMayAlsoLikeMobile from "components/Recommendations/YouMayAlsoLikeMobile";
// Next
import dynamic from "next/dynamic";
const YouMayAlsoLike = dynamic(
  () => import("components/Recommendations/YouMayAlsoLike"), {
    loading: () => <Loading/>,
    ssr: false,
  }
);
import Hidden from "@material-ui/core/Hidden";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const Categories: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <div className={clsx(
      mdDown ? classes.rootMobile : classes.rootDesktop,
      classes.flexCol
    )}>
      <div className={clsx(
        classes.flexCol,
        classes.maxWidth,
        !mdDown && classes.marginTop,
        classes.padding1,
      )}>
        <ErrorBounds className={classes.sectionContainer}>
          <div className={classes.titleContainer}>
            <Typography variant="h1" className={classes.title}>
              {"Browse Categories"}
            </Typography>
            <Typography variant="h4"
              className={mdDown ? classes.subtitleMobile : classes.subtitleDesktop}
            >
              {"Discover firearm listings across categories"}
            </Typography>
          </div>
          {props.children}
        </ErrorBounds>
      </div>
      <Hidden mdUp>
        <YouMayAlsoLikeMobile/>
      </Hidden>
      <Hidden smDown>
        <YouMayAlsoLike
          // initialProducts={initialProductsLimitedRelease}
          title={"You may also like"}
          maxWidth={1160}
        />
      </Hidden>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  rootDesktop: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  rootMobile: {
    marginTop: '0rem',
    marginBottom: '1rem',
  },
  maxWidth: {
    maxWidth: 1160,
    width: '100%',
  },
  marginTop: {
    marginTop: '2rem',
  },
  padding1: {
    padding: '1rem',
  },
  titleContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: "column",
    marginBottom: '1rem',
    // shrinks classes.title width to own container
  },
  title: {
    marginBottom: "0.5rem",

  },
  subtitleDesktop: {
    marginBottom: "3rem",
    fontWeight: 600,
    fontSize: "1.25rem",
    color: Colors.darkGrey,
  },
  subtitleMobile: {
    marginBottom: "1rem",
    fontWeight: 600,
    fontSize: "0.9rem",
    color: Colors.darkGrey,
  },
  searchTerm: {
    color: Colors.secondary,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    opacity: 1,
    position: 'relative',
    width: '100%',
    marginBottom: "2rem",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    maxWidth: 900,
    padding: '1rem',
  },
});

export default withStyles(styles)( Categories );



