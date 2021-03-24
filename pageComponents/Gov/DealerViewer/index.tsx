import React from "react";
import clsx from "clsx";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  Dealer,
} from "typings/gqlTypes";
// Components
import DealerSearch from "./DealerSearch";
import DisplayAllDealers from "./DisplayAllDealers";
import DealerProfileForm from "./DealerProfileForm";

// Graphql
import { useApolloClient } from "@apollo/client";
import {
  GET_ALL_DEALERS,
  SEARCH_DEALER_AS_ADMIN,
} from "queries/dealers-queries";
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";
// Snackbar
import { useSnackbar } from "notistack";
// router
import { useRouter } from "next/router";



const DealerViewer: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const aClient = useApolloClient();
  const snackbar = useSnackbar();
  const router = useRouter();

 // state
  const [errorMsg, setErrorMsg] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [dealerIdOrLicenseNumber, setDealerIdOrLicenseNumber] = React.useState(undefined);
  const [dealer, setDealer] = React.useState<Dealer>(
    router?.query?.dealerIdOrLicenseNumber as any
  );
  const [allDealers, setAllDealers] = React.useState<Dealer[]>([]);

  console.log("query: ", router?.query)


  const searchDealerAsAdmin = async(dealerIdOrLicenseNumber: string) => {
    try {
      const { loading, errors, data } = await aClient.query<QueryData, QueryVar>({
        query: SEARCH_DEALER_AS_ADMIN,
        variables: {
          dealerIdOrLicenseNumber: dealerIdOrLicenseNumber
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.searchDealerAsAdmin) {

        setDealer(data.searchDealerAsAdmin)

        let urlPath = router.asPath.split('?')[0]
        router.push(
          `${router.pathname}?dealerIdOrLicenseNumber=${dealerIdOrLicenseNumber}`,
          `${urlPath}?dealerIdOrLicenseNumber=${dealerIdOrLicenseNumber}`,
          { shallow: true }
        )
      }
    } catch(e) {
      snackbar.enqueueSnackbar(`dealerIdOrLicenseNumber does not exist`, { variant: "error" })
    }
  }

  const getAllDealers = async(limit: number, offset = 0) => {
    try {
      const { loading, errors, data } = await aClient.query<QueryData2, QueryVar2>({
        query: GET_ALL_DEALERS,
        variables: {
        },
      })
      if (data.getAllDealers) {
        console.log("recent users: ", data.getAllDealers);
        setAllDealers(data.getAllDealers)
      }
    } catch(e) {
      snackbar.enqueueSnackbar(`recent users do not exist`, { variant: "error" })
    }
  }


  React.useEffect(() => {
    getAllDealers(6, 0)
    if (!!router?.query?.dealerIdOrLicenseNumber) {
      let dealerIdOrLicenseNumber: string = router?.query?.dealerIdOrLicenseNumber as any
      setDealerIdOrLicenseNumber(dealerIdOrLicenseNumber)
      searchDealerAsAdmin(dealerIdOrLicenseNumber)
    }
  }, [])

  if (dealer) {
    console.log("incoming dealer: ", dealer)
    console.log("dealer :", dealer)
  }

  const admin = useSelector<GrandReduxState, UserPrivate>(
    state => state?.reduxLogin?.user
  );

  if (!dealer?.id) {
    return (
      <DealerSearch
        dealerIdOrLicenseNumber={dealerIdOrLicenseNumber}
        setDealerIdOrLicenseNumber={setDealerIdOrLicenseNumber}
        searchDealerAsAdmin={searchDealerAsAdmin}
        errorMsg={errorMsg}
        loading={loading}
      >
        <DisplayAllDealers
          allDealers={allDealers}
          setDealerIdOrLicenseNumber={setDealerIdOrLicenseNumber}
        />
      </DealerSearch>
    )
  }

  return (
    <>
      <div className={classes.sectionPaper}>
        <DealerSearch
          dealerIdOrLicenseNumber={dealerIdOrLicenseNumber}
          setDealerIdOrLicenseNumber={setDealerIdOrLicenseNumber}
          searchDealerAsAdmin={searchDealerAsAdmin}
          errorMsg={errorMsg}
          loading={loading}
        >
          <DisplayAllDealers
            allDealers={allDealers}
            setDealerIdOrLicenseNumber={setDealerIdOrLicenseNumber}
          />
        </DealerSearch>
      </div>

      <div className={classes.sectionPaper}>
        <DealerProfileForm
          dealer={dealer}
          setDealer={setDealer}
          searchDealerAsAdmin={searchDealerAsAdmin}
        />
      </div>

    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}

interface QueryData {
  searchDealerAsAdmin: Dealer;
}
interface QueryVar {
  dealerIdOrLicenseNumber: string;
}
interface QueryData2 {
  getAllDealers: Dealer[];
}
interface QueryVar2 {
}


const styles = (theme: Theme) => createStyles({
  searchRoot: {
  },
  sectionPaper: {
    padding: '3rem',
    marginBottom: '2rem',
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
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
  section: {
    margin: '2rem',
  },
  section1: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  textField: {
    marginBottom: '0.5rem',
  },
  titleSpacer: {
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
  goBackText: {
    marginLeft: '0.5rem',
  },
  form: {
    width: '100%',
  },
  actualPrice: {
    color: Colors.secondary,
  },
  backButton: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
  },
  recentOrders: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
  },
});


export default withStyles(styles)( DealerViewer );



