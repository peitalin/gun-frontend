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
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";


const OffersAdminViewer = (props: ReactProps) => {

  // state
  const { classes } = props;

  return (
    <>
      <MetaHeadersPage
        title="Offers - View bids - gunmarketplace.com.au"
        robots="noindex"
      />
      <AdminProfileWrapper>
        {({ data, loading, error }: AdminProfileProps) => {
          return (
            <div className={classes.contentContainer}>
              NOT IMPLEMENTED YET. VIEW BIDS AS ADMIN
            </div>
          );
        }}
      </AdminProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( OffersAdminViewer );


