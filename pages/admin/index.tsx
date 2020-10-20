import React from "react";
import {oc as option} from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Utils Components
import LoadingBarSSR from "components/LoadingBarSSR";
import Typography from "@material-ui/core/Typography";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// SSR disable
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import Home from "pageComponents/SellerProfileDashboard/Home";



const SellerProfileDashboard = (props: ReactProps) => {

  const {
    classes
  } = props;

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <MetaHeadersPage
        title={"Seller Dashboard - Relay.shop"}
        robots="noindex"
      />
      <SellerProfileWrapper>
      {({ data, loading, error }: SellerProfileProps) => {
        return (
          <Home user={data.user}/>
        );
      }}
      </SellerProfileWrapper>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( SellerProfileDashboard );


