import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// SSR
import { NextPage, NextPageContext } from 'next';
import Login from "layout/Login";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const SignupPage: NextPage<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Sign Up - Gun Marketplace - Buy guns smarter. Sell guns faster."
        ogTitle="Sign Up - Gun Marketplace - Buy guns smarter. Sell guns faster."
        description={`
          Create an account for free.
        `}
        ogDescription={`
          Create an account for free.
        `}
      />
      <div className={classes.root}>
        <div className={classes.maxWidth}>
          <Login
            redirectOnComplete={"/"}
            redirectDelay={500}
            initialTabIndex={1} // set initial tab to login page
            asFormLayout={true} // form, not modal
          />
        </div>
      </div>
    </>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    minHeight: 'calc(100vh - 124px)',
    height: '100%',
  },
  maxWidth: {
    maxWidth: 400,
  },
});

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( SignupPage );



