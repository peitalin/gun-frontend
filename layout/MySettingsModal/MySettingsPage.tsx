import React from "react";
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

import PaymentMethods from "./PaymentMethods";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangePayoutMethod from "./ChangePayoutMethod";
import ChangeUserProfileForm from "./ChangeUserProfileForm";
import ChangeUserLicenseForm from "./ChangeUserLicenseForm";
import AdvancedSettings from "./AdvancedSettings";
// // Next
// import dynamic from 'next/dynamic'
// const DynamicPaymentMethods = dynamic(() => import('./PaymentMethods'))
import { refetchUser } from "layout/GetUser";
import { useApolloClient } from "@apollo/client";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const MySettings = (props: ReactProps & ReduxProps) => {

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
  console.log("userRedux MySettings: ", user);

  React.useEffect(() => {
    refetchUser(apolloClient)
  }, [])

  return (
    <ErrorBounds className={clsx(
      asModal ? classes.root : classes.rootPage,
      smDown ? classes.rootPaddingMobile : classes.rootPaddingDesktop,
    )}>
      <div className={props.classes.titleRow}>
        <Typography variant="h2">
          My Settings
        </Typography>
        {
          asModal &&
          <IconButton onClick={() => props.goBack()}>
            <ClearIcon/>
          </IconButton>
        }
      </div>

      <div className={classes.section}>
        <ChangeUserProfileForm
          goBack={props.goBack}
        />
      </div>

      <div className={classes.section}>
        <ChangePasswordForm/>
      </div>

      <div className={classes.section}>
        <ChangeUserLicenseForm
          goBack={props.goBack}
        />
      </div>

      {
        user?.store &&
        <div className={classes.section}>
          <ChangePayoutMethod/>
        </div >
      }

      {/* <div className={classes.sectionLast}>
        <AdvancedSettings
          user={user}
          goBack={props.goBack}
        />
      </div> */}

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

export default withStyles(styles)( MySettings );

