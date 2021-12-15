import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Typings
import { UserPrivate } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Components
import CreateStoreForm from "pageComponents/StorePayoutCreation/CreateStorePayoutForm";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const CreateStorePageSSR = (props: ReactProps) => {

  const { classes } = props;
  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  return (
    <ErrorBounds>
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
        //   "https://image-content.gunmarketplace.com.au/og-img-gm-start.png"
        // }
        // ogUrl={
        //   process.env.NODE_ENV === "development"
        //   ? "https://dev.gunmarketplace.com.au/create-store"
        //   : "https://www.gumarketplace.com.au/create-store"
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

export const getStaticProps = async (context) => {
  return { props: { } };
};


export default withStyles(styles)( CreateStorePageSSR );




