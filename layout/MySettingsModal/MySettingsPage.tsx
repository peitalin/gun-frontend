import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Graphql Queries
import { useQuery } from "@apollo/react-hooks";
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
import UpdateMySettingsButton from "./UpdateMySettingsButton";
import PaymentMethods from "./PaymentMethods";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangePayoutMethod from "./ChangePayoutMethod";
import AdvancedSettings from "./AdvancedSettings";
// Typings
import { HtmlEvent, EditUserProfileInput } from "typings";
// // Next
// import dynamic from 'next/dynamic'
// const DynamicPaymentMethods = dynamic(() => import('./PaymentMethods'))




const MySettings = (props: ReactProps & ReduxProps) => {

  const {
    classes,
    asModal = true,
  } = props;
  // fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSetFirstName = (e: HtmlEvent) => {
    let name = e.target.value;
    setFirstName(name);
  };

  const handleSetLastName = (e: HtmlEvent) => {
    let lname = e.target.value;
    setLastName(lname);
  };

  const handleSetEmail = (e: HtmlEvent) => {
    let email: string = e.target.value;
    setEmail(email)
  };

  const prepareUserEditInput = (): EditUserProfileInput => {
    let userEditInput = {} as EditUserProfileInput;
    if (firstName) {
      userEditInput = { ...userEditInput, firstName }
    }
    if (lastName) {
      userEditInput = { ...userEditInput, lastName }
    }
    if (email) {
      userEditInput = { ...userEditInput, email }
    }
    return userEditInput
  }

  const resetProfileEditForm = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
  }

  const { loading, data, error } = useQuery<QueryData>(
    GET_USER, {
    variables: {},
    onError: (e) => console.log(),
    errorPolicy: "all",
  });

  if (loading) {
    return <Loading loading={loading} delay={"400ms"} />;
  }
  if (error) {
    return <ErrorDisplay title={"User Settings"} error={error}/>;
  }
  if (!option(data).user.id()) {
    return <ErrorDisplay title={"User Settings"}/>;
  } else {
    let { user } = data;
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
          <Typography variant="body1" className={classes.profileTitle}>
            Name
          </Typography>
          <form autoComplete="off">
            <TextInput
              placeholder={user.firstName}
              className={classes.textField}
              value={firstName}
              onChange={handleSetFirstName}
              inputProps={{ style: { width: '100%' }}}
            />
          </form>

          <Typography variant="body1" className={classes.profileTitle}>
            Lastname
          </Typography>
          <form autoComplete="off">
            <TextInput
              placeholder={user.lastName}
              className={classes.textField}
              value={lastName}
              onChange={handleSetLastName}
              inputProps={{ style: { width: '100%' }}}
            />
          </form>

          <Typography variant="body1" className={classes.profileTitle}>
            Email
          </Typography>
          <form autoComplete="off">
            <TextInput
              // required
              // disabled={true}
              placeholder={user.email}
              className={classes.textField}
              value={email}
              onChange={handleSetEmail}
              inputProps={{ style: { width: '100%' }}}
            />
          </form>

          <div className={classes.buttonContainer}>
            <UpdateMySettingsButton
              disabled={firstName==="" && lastName==="" && email===""}
              resetProfileEditForm={resetProfileEditForm}
              userProfile={prepareUserEditInput()}
            />
          </div>
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

        <ErrorBounds className={classes.section}>
          <PaymentMethods user={user}/>
        </ErrorBounds>


        <div className={classes.sectionLast}>
          <AdvancedSettings/>
        </div>

        {/* <div className={classes.endDivSpacer}></div>
        <div
          className={classes.endDiv}
          onClick={() => props.goBack()}
        >
          Close
        </div> */}

      </ErrorBounds>
    );
  }
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: '0.5rem',
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

