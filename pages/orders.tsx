import React from "react";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import MyOrders from "pageComponents/MyOrders";

// next
// SSR disable
import dynamic from "next/dynamic";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";


const MyOrdersHistoryPage = (props: ReactProps) => {

  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Orders"
        robots="noindex"
      />
      <UserProfileWrapper>
      {(dataUser: UserProfileProps) => {
        return (
          <div className={classes.contentContainerPublicPage}>
            <MyOrders withRecommendations={false}/>
          </div>
        )
      }}
      </UserProfileWrapper>
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


