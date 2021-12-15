import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import clsx from "clsx";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  ProductsConnection,
  ConnectionQuery,
} from "typings/gqlTypes";
// Utils Components
import LoadingBarSSR from "components/LoadingBarSSR";
import Typography from "@mui/material/Typography";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
import IconButtonCancel from "components/IconButtonCancel";
// Components
// import PayoutMetrics from "pageComponents/SellerProfileDashboard/PayoutMetrics";
// import PublishedProducts from "pageComponents/SellerProfileDashboard/PublishedProductsList";
import ChangePayoutMethod from "pageComponents/SellerDashboard/ChangePayoutMethod";
// media query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
// apollo
import { useQuery, useLazyQuery, useApolloClient } from "@apollo/client";
// import { GET_DASHBOARD_PRODUCTS_CONNECTION } from "queries/store-queries";
// Meta headers
import CardMedia from "@mui/material/CardMedia";
import HomeSection2 from "./HomeSection2";



const SellerDashboardHome = (props: ReactProps) => {

  const {
    classes,
    user,
  } = props;

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={
      xsDown ? classes.rootXs : classes.root
    }>
      <Typography variant={"h2"}
        className={xsDown ? classes.padding1 : null}
      >
        Seller Dashboard
      </Typography>

      <HomeSection2/>

    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
}
interface QueryVar {
  searchTerm?: string;
  query?: ConnectionQuery;
}
interface QueryData {
  user: UserPrivate;
}

export const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '2rem 1rem 2rem 1rem',
  },
  rootXs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '2rem 0rem 2rem 0rem',
  },
  padding1: {
    padding: '0rem 0rem 1rem 1rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contentContainer: {
    flexBasis: '70%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: 800,
  },
  downIcon: {
    width: 40,
  },
});


export default withStyles(styles)( SellerDashboardHome );


