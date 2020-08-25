import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Graphql Queries
import { useQuery } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { UserPrivate } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// Components
import Divider from "components/Divider";
import Loading from "components/Loading";
import ErrorDisplay from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";

import PaymentMethods from "./PaymentMethods";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangePayoutMethod from "./ChangePayoutMethod";
import ChangeUserEmailForm from "./ChangeUserEmailForm";
import AdvancedSettings from "./AdvancedSettings";
// Typings
import { HtmlEvent, EditUserProfileInput } from "typings";
// // Next
// import dynamic from 'next/dynamic'
// const DynamicPaymentMethods = dynamic(() => import('./PaymentMethods'))
import { refetchUser } from "layout/GetUser";
import { useApolloClient } from "@apollo/client";




const MySettings = (props: ReactProps & ReduxProps) => {

  const {
    classes,
    asModal = true,
  } = props;

  const apolloClient = useApolloClient();

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );
  console.log("userRedux MySettings: ", user);

  React.useEffect(() => {
    refetchUser(apolloClient)
  }, [])

  return (
    <ErrorBounds className={clsx(
      asModal ? classes.root : classes.rootPage
    )}>
      <div className={props.classes.titleRow}>
        <Typography variant="h2">
          My Settings
        </Typography>
        <IconButton onClick={() => props.goBack()}>
          <ClearIcon/>
        </IconButton>
      </div>

      <div className={props.classes.titleRow2}>
        <Typography variant="h3">
          Edit Profile
        </Typography>
      </div>

      <div className={classes.section}>
        <ChangeUserEmailForm
          goBack={props.goBack}
        />
      </div>

      <div className={classes.section}>
        <ChangePasswordForm/>
      </div>

      {
        option(user).store() &&
        <div className={classes.section}>
          <ChangePayoutMethod/>
        </div >
      }

      <div className={classes.section}>
        payment methods
      </div>

      <div className={classes.sectionLast}>
        <AdvancedSettings
          user={user}
          goBack={props.goBack}
        />
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
    padding: "2rem",
    maxWidth: "720px",
    position: "relative",
    overflowY: "hidden",
    height: "100%",
  },
  rootPage: {
    padding: "0rem",
    maxWidth: "720px",
    position: "relative",
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
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
    borderBottom: '1px solid #f0f0f0',
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
  endDivSpacer: {
    height: '4.1rem',
    // a little larger than endDiv to prevent scroll locking
  },
  endDiv: {
    background: Colors.deepRed,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4rem',
    color: Colors.cream,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: theme.transitions.create('backgroundColor', {
      easing: theme.transitions.easing.easeIn,
      duration: 200,
    }),
    "&:hover": {
      background: fade(Colors.deepRed, 0.9),
      transition: theme.transitions.create('backgroundColor', {
        easing: theme.transitions.easing.easeIn,
        duration: 200,
      })
    },
  },
});

export default withStyles(styles)( MySettings );

