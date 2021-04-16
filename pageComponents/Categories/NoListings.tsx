import React from "react";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Product } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Components
import { Colors } from "layout/AppTheme";
import Typography from "@material-ui/core/Typography";
import Divider from "components/Divider";




const NoListings = (props: ReactProps) => {

  const { classes } = props;

  return (
    <ErrorBounds className={classes.noResultsContainer}>
      <Typography variant="h4" className={classes.title}>
        No Results
      </Typography>
      <Typography>
        Try search other keywords,
        Try search other keywords, browse by
        <Link href={"/categories"}>
          <a className={classes.link}>
            {" categories"}
          </a>
        </Link>
        , or
        <Link href={"/sell"}>
          <a className={classes.link}>
            {" upload your product"}
          </a>
        </Link>
        .
      </Typography>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
}


export const styles = (theme: Theme) => createStyles({
  noResultsContainer: {
    minHeight: '30vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: Colors.cream,
    borderRadius: '8px',
    width: '100%',
  },
  title: {
    marginBottom: '0.5rem',
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      color: Colors.secondaryBright,
    }
  },
});


export default withStyles(styles)( NoListings );

