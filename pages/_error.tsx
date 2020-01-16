import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
// Typings
import { PageBasedConnection, Product } from "typings/gqlTypes";
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
// import ProductPageRecommendations from "pageComponents/Products/ProductPageRecommendations";
// Next
import dynamic from "next/dynamic";
const YouMayAlsoLikeCarousel = dynamic(
  () => import("components/Carousels/YouMayAlsoLikeCarousel"), {
    loading: () => <Loading/>,
    ssr: false,
  }
);
import Hidden from "@material-ui/core/Hidden";




const ErrorPage = (props: ReactProps) => {

  const { classes, statusCode, message } = props;
  const router = useRouter();

  return (
    <div className={clsx(classes.root, classes.flexRow)}>
      <Divider style={{ width: '90%', marginBottom: "1rem" }}/>
      <div className={clsx(classes.flexCol, classes.maxWidth)}>
        <div className={classes.noResultsContainer}>
          <Typography variant="h4" className={classes.title}>
            This page does not exist.
          </Typography>
          <Typography>
            The link you used may be broken,
          </Typography>
          <Typography>
            or product listing may not exist.
          </Typography>
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
      <Divider style={{ width: '90%', margin: "1rem" }}/>
      {/* <Hidden mdUp>
        <div className={classes.pageRecommendationsBox}>
          <ProductPageRecommendations/>
        </div>
      </Hidden> */}
      <Hidden smDown>
        <YouMayAlsoLikeCarousel
          // initialProducts={initialProductsLimitedRelease}
          title={"You may also like"}
          maxWidthCarousel={2000}
        />
      </Hidden>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  statusCode?: string | number;
  message?: string;
}

const styles = (theme: Theme) => createStyles({
  root: {
    margin: '2rem 1rem',
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
    marginBottom: '1rem',
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      color: Colors.secondaryBright,
    }
  },
  pageRecommendationsBox: {
    marginTop: '2rem',
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

export default withStyles(styles)( ErrorPage );



ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}