import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import Trending from "pageComponents/Trending";
import VerifyAccountBanner from "components/VerifyAccountBanner";

// next
import dynamic from "next/dynamic";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { ProductType } from "typings/gqlTypes";


const TrendingItemsPageSSR: NextPage<ReactProps> = (props) => {

  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Trending used guns for sale - gunmarketplace.com.au"
        ogTitle="Trending used guns for sale - gunmarketplace.com.au"
        description={"Browse used guns from usedguns.com.au, ssaagunsales.com, ozgunsales.com, etc."}
        ogDescription={"Browse used guns from usedguns.com.au, ssaagunsales.com, ozgunsales.com, etc."}
      />
      <UserProfileWrapper>
        {(dataUser: UserProfileProps) => {
          return (
            <div className={classes.contentContainerPublicPage}>
              {
                dataUser?.data?.user?.emailVerified
                ? <Trending />
                : <div style={{ padding: '1rem'}}>
                    <VerifyAccountBanner/>
                  </div>
              }
            </div>
          )
        }}
      </UserProfileWrapper>
      {/* <div className={classes.contentContainerPublicPage}>
        <Trending/>
      </div> */}
    </>
  )
}


const styles = (theme: Theme) => createStyles({
  contentContainerPublicPage: {
    position: "relative",
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};


export default withStyles(styles)( TrendingItemsPageSSR );






