import React from "react";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { styles } from "pageComponents/SellerDashboard/styles";
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
import OpenChatButton from "pageComponents/BiddingRoom/OpenChatButton";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import BiddingRoom from "pageComponents/BiddingRoom";


const OffersAdminPage = (props: ReactProps) => {

  // state
  const { classes } = props;

  return (
    <>
      <MetaHeadersPage
        title="Offers - View bids on your listings - gunmarketplace.com.au"
        robots="noindex"
      />
      <SellerProfileWrapper>
        {({ data, loading, error }: SellerProfileProps) => {
          return (
            <div className={classes.contentContainer}>
              {
                data && data.user && data.user.store &&
                <BiddingRoom asModal={false} />
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

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( OffersAdminPage );


