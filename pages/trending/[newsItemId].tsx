import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import {
  NextPage, NextPageContext
} from 'next';
import { ApolloClient, useApolloClient, useQuery } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import Trending from "pageComponents/Trending";
import VerifyEmailBanner from "components/VerifyGunLicenseBanner";
import {
  GET_NEWS_ITEM_BY_ID,
} from "queries/news-items-queries"
import {
  NewsItem
} from "typings/gqlTypes"

// next
import dynamic from "next/dynamic";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useRouter } from "next/router";
import ProductClaim from "pageComponents/ProductClaim";



const EditTrendingNewsItem: NextPage<ReactProps> = (props) => {

  const {
    classes
  } = props;

  const router = useRouter()
  // const client = useApolloClient()

  const claimId = router?.query?.c
  const newsItemId: string = router?.query?.newsItemId as any;
  console.log("claimId: ", claimId)
  // dispatch ref Id to backend to see if its valid.
  // if valid, display a "claim/edit" product page

  // 1. upon image upload, swap out all images
  // 2. then offer to create an account + claim the item
  // externalproduct -> internalProduct
  const { data } = useQuery<QueryData, QueryVar>(
    GET_NEWS_ITEM_BY_ID, {
    variables: {
      newsItemId: newsItemId
    },
  })


  return (
    <>
      <MetaHeadersPage
        title="Claim your product listing - gunmarketplace.com.au"
        ogTitle="Claim your product listing - gunmarketplace.com.au"
        description={"Claim your product listing."}
        ogDescription={"Claim your product listing."}
      />
      <div>
        c:
        { router?.query?.c }
      </div>
      <div>
        newsItemId:
        { router?.query?.newsItemId }
      </div>
      <div>
        newsItem:
        { JSON.stringify(data?.getNewsItemById)}
      </div>

      {
        data?.getNewsItemById &&
        <div className={classes.contentContainer}>
          <div className={classes.rootOuter}>
            <ProductClaim
              newsItem={data.getNewsItemById}
            />
          </div>
        </div>
      }
      {/* <UserProfileWrapper>
        {(dataUser: UserProfileProps) => {
          return (
            <div className={classes.contentContainerPublicPage}>
              {
                dataUser?.data?.user?.emailVerified
                ? <Trending />
                : <div style={{ padding: '1rem'}}>
                    <VerifyEmailBanner />
                  </div>
              }
            </div>
          )
        }}
      </UserProfileWrapper> */}
      {/* <div className={classes.contentContainerPublicPage}>
        <Trending/>
      </div> */}
    </>
  )
}


const styles = (theme: Theme) => createStyles({
  // contentContainerPublicPage: {
  //   position: "relative",
  //   flexGrow: 1,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   marginBottom: '1rem',
  // },
  rootOuter: {
    // backgroundColor: Colors.foregroundColor,
  },
  contentContainer: {
    flexBasis: '65%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: 800,
    // marginTop: '2rem',
    // padding: '0rem 1rem 2rem 1rem',
  },
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  initialNewsItem: NewsItem
}


export async function getServerSideProps(ctx: NextPageContext) {

  const claimId: string = ctx.query.c as any;
  const newsItemId: string = ctx.query.newsItemId as any

  if (!claimId) {
    return {
      props: {
        initialNewsItem: null,
        classes: null,
      }
    };
  }

  try {
    const { data } = await serverApolloClient(ctx).query<QueryData, QueryVar>({
      query: GET_NEWS_ITEM_BY_ID,
      variables: {
        newsItemId: newsItemId
      },
    })
    return {
      props: {
        initialNewsItem: data?.getNewsItemById,
        classes: null,
      }
    };
  } catch(e) {
    return {
      props: {
        initialNewsItem: null,
        classes: null,
      }
    };
  }
}

interface QueryData {
  getNewsItemById: NewsItem
}
interface QueryVar {
  newsItemId: String
}

export default withStyles(styles)( EditTrendingNewsItem );






