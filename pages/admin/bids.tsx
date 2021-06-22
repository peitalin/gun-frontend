import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
// GraphQL
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import BiddingRoom from "pageComponents/BiddingRoom";

// next
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";


const BidsPage: NextPage<ReactProps> = (props) => {

  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Offers"
        robots="noindex"
      />
      <SellerProfileWrapper>
        {(dataUser: SellerProfileProps) => {
          return (
            <div className={classes.contentContainerPublicPage}>
              <BiddingRoom asModal={false} />
            </div>
          )
        }}
      </SellerProfileWrapper>
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


export default withStyles(styles)( BidsPage );






