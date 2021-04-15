import React from "react";
import {oc as option} from "ts-optchain";
import classNames from "classnames";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Typings
import { UserPrivate } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import CreateStoreForm from "pageComponents/StoreCreation/CreateStoreForm";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// ENV variables
import getConfig from 'next/config'




const CreateStorePageSSR = (props: ReactProps) => {

  const { classes } = props;
  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  return (
    <ErrorBounds className={"fadeIn"}>
      <MetaHeadersPage
        title="Add seller details"
        ogTitle="Add seller details"
        description={`
          Start selling your registered firearms with Gun Marketplace.
          Create a free account and upload your product.
        `}
        ogDescription={`
          Start selling your registered firearms with Gun Marketplace.
          Create a free account and upload your product.
        `}
        // ogImage={
        //   process.env.NODE_ENV === "development"
        //   ? "https://image-content.fileworks.net/og-img-relay-start.png"
        //   : "https://image-content.relaydownloads.com/og-img-relay-start.png"
        // }
        // ogUrl={
        //   process.env.NODE_ENV === "development"
        //   ? "https://fileworks.net/create-store"
        //   : "https://relaydownloads.com/create-store"
        // }
      />
      <div className={classes.flexCol}>
        <CreateStoreForm />
      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
}


const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem',
  },
});


export default withStyles(styles)( CreateStorePageSSR );




