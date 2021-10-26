import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { NextPage, NextPageContext } from 'next';
// Utils
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import { Colors, isThemeDark } from "layout/AppTheme";
import { useRouter } from "next/router";
// Analytics
import AlignCenterLayout from "components/AlignCenterLayout";




const Error404Page = (props: ReactProps) => {

  const { classes, statusCode, message } = props;
  const router = useRouter();

  let productId = (
    router.asPath?.startsWith("/f/")
    && router?.asPath.split('/')?.slice(-1)?.[0]?.startsWith('p')
  ) ? router?.asPath.split('/')?.slice(-1)?.[0]
    : undefined

  React.useEffect(() => {
    // only for promoted products
    // check if this product is actually listed as on the promotedSlot
    console.log("router.asPath::::", router.asPath)
    if (productId) {
      router.replace(
        "/p/[productId]",
        `/p/${productId}`
      )
    }
    // can make it so only non-expired products get featured page
    // OR allow expired ones to continue having this page until it is replaced
    // by the admins (promotedSlot.productId is overridden by admins)
  }, [productId])

  return (
    <AlignCenterLayout
      maxWidth={900}
      className={classes.root}
      // dont show when redirecting /f/ pages to /p/ pages
      // when a productId is found
      withRecommendations={!productId}
    >
      <div className={clsx(classes.noResultsContainer, classes.padding2)}>
        {
          productId
          ? <>
              <Typography variant="h4" className={classes.title}>
                This product is not featured...
              </Typography>
              <Typography>
                Redirecting...
              </Typography>
            </>
          : <>
              <Typography variant="h4" className={classes.title}>
                This page does not exist.
              </Typography>
              <Typography>
                The link you used may be broken,
              </Typography>
              <Typography>
                or product listing may not be available.
              </Typography>
            </>
        }
        {
          message &&
          <Typography>
            {message}
          </Typography>
        }
        {
          statusCode &&
          <Typography>
            {`Status: ${statusCode}`}
          </Typography>
        }
        <br/>
        {
          !productId &&
          <Button
            variant="outlined"
            classes={{
              root: classes.callToActionButton
            }}
            onClick={() => router.push("/")}
          >
            Browse Marketplace
          </Button>
        }

      </div>
    </AlignCenterLayout>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  statusCode?: string | number;
  message?: string;
}

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  padding2: {
    padding: '2rem',
  },
  noResultsContainer: {
    minHeight: '33vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // background: Colors.cream,
    borderRadius: '8px',
    width: '100%',
  },
  title: {
    marginBottom: '1rem',
  },
  message: {
    fontWeight: 600,
    marginTop: '0.5rem',
    color: Colors.red,
    // color: isThemeDark(theme)
    //   ? Colors.uniswapLightestGrey
    //   : Colors.slateGreyBlack,
  },
  statusCode: {
    marginTop: '0.5rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      color: Colors.secondaryBright,
    }
  },
  callToActionButton: {
    backgroundColor: Colors.secondary,
    border: '0px solid #222',
    color: Colors.cream,
    height: 40,
    "&:hover": {
      backgroundColor: fade(Colors.secondary, 0.9),
      border: '0px solid #222',
      color: Colors.cream,
      transition: theme.transitions.create('backgroundColor', {
        easing: theme.transitions.easing.easeIn,
        duration: 100,
      })
    },
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
        duration: 100,
    }),
  },
});

export default withStyles(styles)( Error404Page );


// export async function getServerSideProps(ctx: NextPageContext) {
// Error404Page.getInitialProps = (ctx: NextPageContext) => {
//   let res = ctx?.res;
//   let err = ctx?.err
//   const statusCode = res ? res?.statusCode : err ? err?.statusCode : 404
//   return { statusCode }
// }