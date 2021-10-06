import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import {
  NextPage, NextPageContext
} from 'next';
import { ApolloClient, useApolloClient, useLazyQuery } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import Trending from "pageComponents/Trending";
import VerifyEmailBanner from "components/VerifyGunLicenseBanner";
import {
  GET_NEWS_ITEM_BY_CLAIM_ID,
} from "queries/news-items-claims-mutations"
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
import { useSnackbar } from "notistack";



const EditTrendingNewsItem: NextPage<ReactProps> = (props) => {

  const {
    classes
  } = props;

  const router = useRouter()
  const snackbar = useSnackbar()

  const [errMsg, setErrMsg] = React.useState(undefined)

  const claimId = router?.query?.claimId as string
  console.log("claimId: ", claimId)
  // dispatch ref Id to backend to see if its valid.
  // if valid, display a "claim/edit" product page

  // 1. upon image upload, swap out all images
  // 2. then offer to create an account + claim the item
  // externalproduct -> internalProduct
  const [getNewsItemByClaimId, response] = useLazyQuery<QueryData, QueryVar>(
    GET_NEWS_ITEM_BY_CLAIM_ID, {
    variables: {
      claimId: claimId
    },
    onError: (err) => {
      setErrMsg(err.graphQLErrors?.[0]?.message)
      snackbar.enqueueSnackbar(err.graphQLErrors?.[0]?.message, {
        variant: "error"
      })
    },
  })

  React.useEffect(() => {
    if (claimId?.startsWith('c')) {
      getNewsItemByClaimId()
    }
  }, [claimId])

  let newsItem = response?.data?.getNewsItemByClaimId

  return (
    <>
      <MetaHeadersPage
        title="Claim your product listing - Gun Marketplace"
        ogTitle="Claim your product listing - Gun Marketplace"
        description={"Claim your product listing."}
        ogDescription={"Claim your product listing."}
        robots="noindex"
      />

      <div className={classes.fixedOuter}>
        <div>
          { `claimId: ${claimId}` }
        </div>
        <div>
          {`newsItemId: ${newsItem?.id ?? "NA"}`}
        </div>
        {
          errMsg &&
          <div>
            {errMsg}
          </div>
        }
      </div>

      {
        newsItem &&
        <div className={classes.rootClaim}>
          <ProductClaim
            newsItem={newsItem}
            claimId={claimId}
          />
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
  rootClaim: {
    marginTop: '2rem',
  },
  fixedOuter: {
    right: '1rem',
    bottom: '1rem',
    position: "fixed",
  },
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  initialNewsItem: NewsItem
}


// export async function getServerSideProps(ctx: NextPageContext) {

//   const claimId: string = ctx.query.c as any;
//   const newsItemId: string = ctx.query.newsItemId as any

//   if (!claimId) {
//     return {
//       props: {
//         initialNewsItem: null,
//         classes: null,
//       }
//     };
//   }

//   try {
//     const { data } = await serverApolloClient(ctx).query<QueryData, QueryVar>({
//       query: GET_NEWS_ITEM_BY_CLAIM_ID,
//       variables: {
//         claimId: claimId
//       },
//     })
//     return {
//       props: {
//         initialNewsItem: data?.getNewsItemByClaimId,
//         classes: null,
//       }
//     };
//   } catch(e) {
//     return {
//       props: {
//         initialNewsItem: null,
//         classes: null,
//       }
//     };
//   }
// }

interface QueryData {
  getNewsItemByClaimId: NewsItem
}
interface QueryVar {
  claimId: String
}

export default withStyles(styles)( EditTrendingNewsItem );






