import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
// Typings
import { Product } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "components/Divider";
// Components
import { Colors } from "layout/AppTheme";
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




const SuspendedPage = (props: ReactProps) => {

  const { classes, statusCode, message } = props;
  const router = useRouter();

  return (
    <div className={clsx(classes.root, classes.flexCol)}>
      <div className={clsx(classes.flexCol, classes.maxWidth)}>
        <div className={classes.noResultsContainer}>
          {
            props.title &&
            <Typography variant="h4" className={classes.title}>
              {props.title}
            </Typography>
          }
          {
            props.subtitle &&
          <Typography>
            {props.subtitle}
          </Typography>
          }
          {
            message &&
            <Typography>
              {message}
            </Typography>
          }
          {
            statusCode &&
            <Typography>
              {`Status: ${statusCode}`}
            </Typography>
          }
          <br/>
          <Button
            variant="outlined"
            classes={{
              root: classes.callToActionButton
            }}
            onClick={() => router.push("/")}
          >
            Browse Marketplace
          </Button>
        </div>
      </div>
      <Hidden mdUp>
        <YouMayAlsoLikeMobile/>
      </Hidden>
      <Hidden smDown>
        <YouMayAlsoLike
          // initialProducts={initialProductsLimitedRelease}
          title={"You may also like"}
        />
      </Hidden>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  subtitle?: string;
  statusCode?: string | number;
  message?: string;
}

const styles = (theme: Theme) => createStyles({
  root: {
    margin: '2rem 0rem',
  },
  maxWidth: {
    maxWidth: 900,
    width: '100%',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  noResultsContainer: {
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: Colors.foregroundColor,
    borderRadius: '8px',
    width: '100%',
  },
  title: {
    marginBottom: '1rem',
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      color: Colors.secondaryBright,
    }
  },
  callToActionButton: {
    backgroundColor: Colors.red,
    border: '0px solid #222',
    color: Colors.cream,
    "&:hover": {
      backgroundColor: fade(Colors.red, 0.9),
      border: '0px solid #222',
      color: Colors.cream,
      transition: theme.transitions.create('backgroundColor', {
        easing: theme.transitions.easing.easeIn,
        duration: 100,
      })
    },
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
        duration: 100,
    }),
  },
});

export default withStyles(styles)( SuspendedPage );

