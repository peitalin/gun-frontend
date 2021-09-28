import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import TrendingItems from "pageComponents/Trending/trendingItems";
import VerifyEmailBanner from "components/VerifyGunLicenseBanner";

// next
import dynamic from "next/dynamic";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";


const TrendingItemsPageSSR: NextPage<ReactProps> = (props) => {

  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Trending used items for sale"
        ogTitle="Trending used items for sale"
        description={"Browse trending used gun items across Australia."}
        ogDescription={"Browse trending used gun items across Australia"}
      />
      <UserProfileWrapper>
        {(dataUser: UserProfileProps) => {
          return (
            <div className={classes.contentContainerPublicPage}>
              {
                dataUser?.data?.user?.emailVerified
                ? <TrendingItems />
                : <div style={{ padding: '1rem'}}>
                    <VerifyEmailBanner/>
                  </div>
              }
            </div>
          )
        }}
      </UserProfileWrapper>
      {/* <div className={classes.contentContainerPublicPage}>
        <TrendingItems />
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






