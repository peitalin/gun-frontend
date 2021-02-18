import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
// next
// SSR disable
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Chat
import OpenChatButton from "pageComponents/ChatCenter/OpenChatButton";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import ChatCenter from "pageComponents/ChatCenter";


const OffersAdminPage = (props: ReactProps) => {

  // state
  const { classes } = props;

  return (
    <>
      <MetaHeadersPage
        title="Edit Store - gunmarketplace.com.au"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {({ data, loading, error }: SellerProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            {
              data && data.user && data.user.store &&
              <ChatCenter asModal={false} />
            }
          </div>
        );
      }}
      </SellerProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( OffersAdminPage );


