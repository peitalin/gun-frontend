import React from "react";
import clsx from "clsx";
// Graphql Queries
import { UserPrivate } from "typings/gqlTypes";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius, Gradients, isThemeDark, BorderRadius2x } from "layout/AppTheme";
// Material UI
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
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
import EditUserLicenseForm from "./UserLicenses/EditUserLicenseForm";
import UserLicenses from "./UserLicenses";
import AdvancedSettings from "./AdvancedSettings";
// // Next
// import dynamic from 'next/dynamic'
// const DynamicPaymentMethods = dynamic(() => import('./PaymentMethods'))
import { refetchUser } from "layout/GetUser";
import { useApolloClient } from "@apollo/client";
// media query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";




const MySettings = (props: ReactProps & ReduxProps) => {

  const {
    classes,
    asModal = true,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));

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
          <IconButton onClick={() => props.goBack()} size="large">
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
        {
          user &&
          <UserLicenses user={user} />
        }
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
    padding: '2rem',
    margin: '1rem 0rem',
    borderRadius: BorderRadius2x,
    // borderBottom: isThemeDark(theme)
    //   ? `1px solid ${Colors.uniswapMediumNavy}`
    //   : `1px solid ${Colors.slateGrey}`,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapMediumNavy}`
      : `1px solid ${Colors.slateGrey}`,
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
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

