import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { isThemeDark } from "layout/AppTheme";
// Utils
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "components/Divider";
// Components
import { Colors } from "layout/AppTheme";
import { useRouter } from "next/router";
// Next
import dynamic from "next/dynamic";
import Hidden from "@material-ui/core/Hidden";
// Analytics
import AlignCenterLayout from "components/AlignCenterLayout";




const Error404Page = (props: ReactProps) => {

  const { classes, statusCode, message } = props;
  const router = useRouter();

  return (
    <AlignCenterLayout
      maxWidth={900}
      className={classes.root}
    >
      <div className={clsx(classes.noResultsContainer, classes.padding2)}>
        <Typography variant="h4" className={classes.title}>
          This page does not exist.
        </Typography>
        <Typography>
          The link you used may be broken,
        </Typography>
        <Typography>
          or product listing may not be available.
        </Typography>
        {
          message &&
          <Typography className={classes.message}>
            {message}
          </Typography>
        }
        {
          statusCode &&
          <Typography className={classes.statusCode}>
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
    </AlignCenterLayout>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  statusCode?: string | number;
  message?: string;
}

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  padding2: {
    padding: '2rem',
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
    minHeight: '33vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // background: Colors.cream,
    borderRadius: '8px',
    width: '100%',
  },
  title: {
    marginBottom: '1rem',
  },
  message: {
    fontWeight: 600,
    marginTop: '0.5rem',
    color: Colors.red,
    // color: isThemeDark(theme)
    //   ? Colors.uniswapLightestGrey
    //   : Colors.slateGreyBlack,
  },
  statusCode: {
    marginTop: '0.5rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      color: Colors.secondaryBright,
    }
  },
  callToActionButton: {
    backgroundColor: Colors.secondary,
    border: '0px solid #222',
    color: Colors.cream,
    height: 40,
    "&:hover": {
      backgroundColor: fade(Colors.secondary, 0.9),
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

export default withStyles(styles)( Error404Page );



Error404Page.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}