import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Graphql Queries
import { UserPrivate } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, Gradients } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// Components
import ErrorBounds from "components/ErrorBounds";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";

// // Next
// import dynamic from 'next/dynamic'
// const DynamicPaymentMethods = dynamic(() => import('./PaymentMethods'))
import { refetchUser } from "layout/GetUser";
import { useApolloClient } from "@apollo/client";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const BuyPromotedItemPage = (props: ReactProps & ReduxProps) => {

  const {
    classes,
    asModal = true,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const apolloClient = useApolloClient();

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );
  console.log("userRedux BuyPromotedItemPage: ", user);

  React.useEffect(() => {
    refetchUser(apolloClient)
  }, [])

  return (
    <ErrorBounds className={clsx(
      asModal ? classes.root : classes.rootPage,
      smDown ? classes.rootPaddingMobile : classes.rootPaddingDesktop,
    )}>
      <div className={classes.titleRow}>
        <Typography variant="h2" className={classes.title}>
          Buy this promoted item slot
        </Typography>
        {
          asModal &&
          <IconButton
            onClick={() => props.goBack()}
            className={classes.closeButton}
          >
            <ClearIcon/>
          </IconButton>
        }
      </div>

      <div>
        1. Add a Stripe credit card checkout here.
      </div>
      <div>
        2. Purchase slot
      </div>
      <div>
        3. Pick one of your products to assign to slot
      </div>


    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  goBack(): void;
  asModal?: boolean;
}
interface QueryData {
  user: UserPrivate;
}
interface ReduxProps {
}



const styles = (theme: Theme) => createStyles({
  root: {
    maxWidth: "720px",
    position: "relative",
    overflowY: "hidden",
    height: "100%",
  },
  rootPage: {
    maxWidth: "720px",
    position: "relative",
  },
  rootPaddingDesktop: {
    padding: "2rem",
  },
  rootPaddingMobile: {
    padding: "1rem",
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: "1rem",
  },
  closeButton: {
    position: "absolute",
    right: '1rem',
    top: '1rem',
  },
  titleRow2: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  section: {
    paddingBottom: '0.5rem',
    marginBottom: '2rem',
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapMediumNavy}`
      : `1px solid ${Colors.slateGrey}`,
  },
  sectionLast: {
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: '30%',
  },
  textField: {
    marginBottom: '0.5rem',
    minWidth: 250,
    width: "100%",
  },
  link: {
    color: "#2484FF",
    cursor: 'pointer',
  },
  showPasswordChanger: {
    marginBottom: '0.5rem',
  },
  profileTitle: {
    fontWeight: 600,
    lineHeight: '1.5rem',
    marginBottom: '0.1rem',
  },
});

export default withStyles(styles)( BuyPromotedItemPage );

