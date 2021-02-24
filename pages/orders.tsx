import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import MyOrders from "pageComponents/MyOrders";

// next
// SSR disable
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";


const MyOrdersHistoryPage = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Orders"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {(dataUser: SellerProfileProps) => {
        return (
          <div className={classes.contentContainerPublicPage}>
            <MyOrders withRecommendations={true}/>
          </div>
        )
      }}
      </SellerProfileWrapper>
    </>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  contentContainerPublicPage: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
})

export default withStyles(styles)( MyOrdersHistoryPage );


