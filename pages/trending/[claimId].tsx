import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import {
  NextPage, NextPageContext
} from 'next';
// gql
import {
  GET_NEWS_ITEM_BY_CLAIM_ID,
} from "queries/news-items-claims-mutations"
import { useLazyQuery } from "@apollo/client";
// typings
import {
  NewsItem,
  UserPrivate,
  Role,
} from "typings/gqlTypes"

// next
import dynamic from "next/dynamic";
// components
import LoadingBarSSR from "components/LoadingBarSSR";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
import ProductClaim from "pageComponents/ProductClaim";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// router
import { useRouter } from "next/router";
// snackbar
import { useSnackbar } from "notistack";
// redux
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer"
import { Colors } from "layout/AppTheme";



const EditTrendingNewsItem: NextPage<ReactProps> = (props) => {

  const {
    classes
  } = props;

  const router = useRouter()
  const snackbar = useSnackbar()
  const user = useSelector<GrandReduxState, UserPrivate>(s => {
    return s.reduxLogin.user
  })

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

      {
        (user?.userRole === Role.PLATFORM_ADMIN ||
          user?.userRole === Role.PLATFORM_EDITOR) &&
        <div className={classes.fixedOuter}>
          <div className={classes.claimText}>
            { `claimId: ${claimId}` }
          </div>
          <div className={classes.claimText}>
            {`newsItemId: ${newsItem?.id ?? "NA"}`}
          </div>
          {
            errMsg &&
            <div className={classes.errorText}>
              {errMsg}
            </div>
          }
        </div>
      }

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
  claimText: {
    color: Colors.uniswapMediumGrey,
  },
  errorText: {
    color: Colors.lightRed,
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






