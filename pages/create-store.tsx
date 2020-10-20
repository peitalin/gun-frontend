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
const { publicRuntimeConfig: { EFC_ENV } } = getConfig()




const CreateStorePageSSR = (props: ReactProps) => {

  const { classes } = props;
  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  return (
    <ErrorBounds className={"fadeIn"}>
      <MetaHeadersPage
        title="Create a Digital Product Store For Free - Relay.shop"
        ogTitle="Create a Digital Product Store For Free - Relay.shop"
        description={`
          Earn passive income with Relay.shop. Create a free store,
          upload your files, get a link, and earn money — with no subscription fees.
          Sign up for free.
        `}
        ogDescription={`
          Earn passive income with Relay.shop. Create a free store,
          upload your files, get a link, and earn money — with no subscription fees.
          Sign up for free.
        `}
        ogImage={
          EFC_ENV === "development"
          ? "https://image-content.fileworks.net/og-img-relay-start.png"
          : "https://image-content.relaydownloads.com/og-img-relay-start.png"
        }
        ogUrl={
          EFC_ENV === "development"
          ? "https://fileworks.net/create-store"
          : "https://relaydownloads.com/create-store"
        }
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




