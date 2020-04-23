import React from "react";
import {oc as option} from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Utils Components
import Loading from "components/Loading";
import LoadingBar from "components/LoadingBar";
// SSR disable
import dynamic from "next/dynamic";




const LoadingBarSSR = (props) => {
  return (
    <div style={{ position: 'relative' }}>
      <LoadingBar
        absoluteTop
        color={Colors.magenta}
        height={4}
        width={'100vw'}
        loading={true}
      />
    </div>
  )
}

export default withStyles(styles)(LoadingBarSSR);
