import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Utils Components
import ErrorBounds from 'components/ErrorBounds';
import Loading from "components/Loading";
// SSR
import { NextPage, NextPageContext } from 'next';
import ApolloClient from "apollo-client";
import dynamic from "next/dynamic";
// GraphQL
import { serverApolloClient } from "utils/apollo";
import ProductGallery from "pageComponents/ProductGallery";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";



const FrontPage: NextPage<ReactProps> = (props) => {

  return (
    <div>
      <h1>
        gunmarket place
      </h1>
      <ProductGallery/>

      <div style={{
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
        <div style={{
          maxWidth: '400px',
        }}>
          <Card
            elevation={0} // remove box-shadow
          >
            <CardActionArea
              // classes={{
              //   root: chooseCardMediaStyle()
              // }}
            >
              <CardMedia
                component="img"
                // className={!loading ? 'shimmer' : null}
                // classes={{
                //   media: chooseCardMediaStyle()
                // }}
                src={"https://storage.googleapis.com/gunmarket-images-dev/o_1aj0lfq1b1r397ojmqbp6j17phf.jpg"}
              />
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

FrontPage.getInitialProps = async (ctx: Context) => {

  // Will trigger this getInitialProps when requesting route /pages/ProductGallery
  // otherwise initialProps may be fed via /pages/index.tsx's getInitialProps
  const aClient = serverApolloClient(ctx);
  const emptyConnection = { pageInfo: {}, edges: [] };

  try {

    // const req3 = aClient.query({
    //   query: GET_LIMITED_RELEASE_PRODUCTS,
    //   variables: {
    //     query: {
    //       count: 5,
    //       cursor: null,
    //       pageBackwards: false,
    //       sortAscending: false,
    //     }
    //   }
    // });

    return {
      classes: undefined,
    } as any;

  } catch(e) {
    return {
      classes: undefined,
    };
  }
}


export default withStyles(styles)( FrontPage );






