import React from "react";
// styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// SSR
import { NextPage, NextPageContext } from 'next';
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import TrendingItems from "pageComponents/Trending/trendingItems";
import VerifyEmailBanner from "components/VerifyGunLicenseBanner";

// GraphQL
import { serverApolloClient } from "utils/apollo";
import { GET_PROMOTED_LIST } from "queries/promoted_lists-queries";

// next
import dynamic from "next/dynamic";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { ProductType, PromotedList } from "typings/gqlTypes";


const TrendingItemsPageSSR: NextPage<ReactProps> = (props) => {

  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Trending - Gun Marketplace - Buy guns smarter. Sell guns faster."
        ogTitle="Trending - Gun Marketplace - Buy guns smarter. Sell guns faster."
        description={"Browse trending used gun items for sale."}
        ogDescription={"Browse trending used gun items for sale."}
        robots="noindex"
      />
      <UserProfileWrapper>
        {(dataUser: UserProfileProps) => {
          return (
            <div className={classes.contentContainerPublicPage}>
              {
                dataUser?.data?.user?.emailVerified
                ? <TrendingItems
                    initialPromotedLists={props.initialPromotedLists}
                  />
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
  initialPromotedLists: PromotedList[]
}


//////////// SSR ///////////
interface Context extends NextPageContext {
}

interface QData {
  getPromotedList: PromotedList;
}
interface QVar {
  promotedListId: string
  limit: number
  offset: number
}


export async function getStaticProps(ctx: Context) {

  const aClient = serverApolloClient(ctx);

  let promotedLists = {
    "promoted_list_0001": undefined,
    "promoted_list_0002": undefined,
  }

  const { data: data1 } = await aClient.query<QData, QVar>({
    query: GET_PROMOTED_LIST,
    variables: {
      promotedListId: 'promoted_list_0001',
      limit: 4,
      offset: 0,
    },
  })
  const { data: data2 } = await aClient.query<QData, QVar>({
    query: GET_PROMOTED_LIST,
    variables: {
      promotedListId: 'promoted_list_0002',
      limit: 4,
      offset: 0,
    },
  })
  promotedLists['promoted_list_0001'] = data1?.getPromotedList
  promotedLists['promoted_list_0002'] = data2?.getPromotedList
  console.log("ppplist: ", promotedLists)


  return {
    props: {
      initialPromotedLists: promotedLists,
    }, // will be passed to the page component as props
    revalidate: 60, // 1min
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
  }
}

export default withStyles(styles)( TrendingItemsPageSSR );






