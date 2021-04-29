import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { isThemeDark } from "layout/AppTheme";
// Typings
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import { Colors } from "layout/AppTheme";
import { useRouter } from "next/router";




const ErrorPage = (props: ReactProps) => {

  const { classes, statusCode, message } = props;
  const router = useRouter();

  return (
    <div className={clsx(classes.root, classes.flexRow)}>
      <div className={clsx(classes.flexCol, classes.maxWidth)}>
        <div className={classes.noResultsContainer}>
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
      </div>
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
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
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

export default withStyles(styles)( ErrorPage );



ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}